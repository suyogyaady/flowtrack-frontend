import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  Card,
  Row,
  Col,
  Typography,
  Slider,
  InputNumber,
  Space,
  Statistic,
  Select,
  Alert,
  Spin,
  DatePicker,
} from "antd";
import {
  DollarOutlined,
  PercentageOutlined,
  RiseOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import * as tf from "@tensorflow/tfjs";
import { getMonthlyTransactionsWithBudgetApi } from "../../apis/Api";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const FinancialAnalytics = () => {
  // State for historical and projected data
  const [historicalData, setHistoricalData] = useState([]);
  const [projectedData, setProjectedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for what-if parameters
  const [incomeGrowth, setIncomeGrowth] = useState(5);
  const [expenseGrowth, setExpenseGrowth] = useState(3);
  const [savingsTarget, setSavingsTarget] = useState(30);
  const [projectionMonths, setProjectionMonths] = useState(12);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // State for model and predictions
  const [model, setModel] = useState(null);
  const [predictionInterval, setPredictionInterval] = useState(95);

  // Function to validate data
  const validateData = (data) => {
    if (!Array.isArray(data)) {
      throw new Error("Input data must be an array");
    }

    if (data.length === 0) {
      throw new Error("Input data array is empty");
    }

    const requiredFields = ["income", "expense", "budget"];
    const hasRequiredFields = data.every((item) =>
      requiredFields.every(
        (field) => typeof item[field] === "number" && !isNaN(item[field])
      )
    );

    if (!hasRequiredFields) {
      throw new Error(
        "Each data item must have numeric income, expense, and budget fields"
      );
    }

    return true;
  };

  // Function to normalize data for TensorFlow
  const normalizeData = (data) => {
    try {
      validateData(data);

      const maxIncome = Math.max(...data.map((d) => d.income));
      const maxExpense = Math.max(...data.map((d) => d.expense));
      const maxBudget = Math.max(...data.map((d) => d.budget));

      return {
        normalizedData: data.map((d) => ({
          ...d,
          income: d.income / maxIncome,
          expense: d.expense / maxExpense,
          budget: d.budget / maxBudget,
        })),
        maxValues: { maxIncome, maxExpense, maxBudget },
      };
    } catch (error) {
      throw new Error(`Data normalization failed: ${error.message}`);
    }
  };

  // Train TensorFlow model
  const trainModel = async (data) => {
    try {
      if (!data) {
        throw new Error("No data provided for training");
      }

      const { normalizedData, maxValues } = normalizeData(data);

      const sequences = normalizedData.map((_, i) => i);
      const values = normalizedData.map((d) => [d.income, d.expense, d.budget]);

      const xs = tf.tensor2d(sequences, [sequences.length, 1]);
      const ys = tf.tensor2d(values, [values.length, 3]);

      const model = tf.sequential();
      model.add(
        tf.layers.dense({ units: 32, inputShape: [1], activation: "relu" })
      );
      model.add(tf.layers.dense({ units: 16, activation: "relu" }));
      model.add(tf.layers.dense({ units: 3 }));

      model.compile({
        optimizer: tf.train.adam(0.01),
        loss: "meanSquaredError",
      });

      await model.fit(xs, ys, {
        epochs: 200,
        batchSize: 32,
        shuffle: true,
        verbose: 0,
      });

      setModel({ model, maxValues });
      return { model, maxValues };
    } catch (error) {
      console.error("Error training model:", error);
      setError(`Failed to train prediction model: ${error.message}`);
      return null;
    }
  };

  // Generate projections based on model and parameters
  const generateProjections = async (trainedModel) => {
    if (!trainedModel) return;

    try {
      const lastTimestamp = historicalData.length - 1;
      const futureTimestamps = Array.from(
        { length: projectionMonths },
        (_, i) => lastTimestamp + i + 1
      );

      const predictions = await trainedModel.model
        .predict(tf.tensor2d(futureTimestamps, [futureTimestamps.length, 1]))
        .array();

      const projectedData = predictions.map((pred, i) => {
        // Denormalize predictions
        const baseIncome =
          pred[0] * trainedModel.maxValues.maxIncome * (1 + incomeGrowth / 100);
        const baseExpense =
          pred[1] *
          trainedModel.maxValues.maxExpense *
          (1 + expenseGrowth / 100);
        const baseBudget = pred[2] * trainedModel.maxValues.maxBudget;

        const month = new Date(
          selectedYear,
          (lastTimestamp + i + 1) % 12,
          1
        ).toLocaleString("default", { month: "short" });

        return {
          month,
          income: Math.max(0, baseIncome),
          expense: Math.max(0, baseExpense),
          budget: Math.max(0, baseBudget * (1 - savingsTarget / 100)),
          savings: Math.max(0, baseIncome - baseExpense),
          projected: true,
        };
      });

      setProjectedData(projectedData);
    } catch (error) {
      console.error("Error generating projections:", error);
      setError("Failed to generate projections: " + error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Mock data for testing
        getMonthlyTransactionsWithBudgetApi(selectedYear)
          .then(async (response) => {
            const mockData = response.data.map((item) => ({
              month: item.month,
              income: item.income,
              expense: item.expense,
              budget: item.budget,
            }));
            setHistoricalData(mockData);
            const trainedModel = await trainModel(mockData);
            if (trainedModel) {
              await generateProjections(trainedModel);
            }
          })
          .catch((error) => {
            console.error("Error loading data:", error);
            setError(`Failed to load historical data: ${error.message}`);
          });
      } catch (error) {
        console.error("Error loading data:", error);
        setError(`Failed to load historical data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  useEffect(() => {
    if (model) {
      generateProjections(model);
    }
  }, [incomeGrowth, expenseGrowth, savingsTarget, projectionMonths, model]);

  const renderChart = () => {
    const combinedData = [...historicalData, ...projectedData];

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={combinedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis
            dataKey="month"
            tick={{ fill: "#8c8c8c" }}
            axisLine={{ stroke: "#d9d9d9" }}
          />
          <YAxis tick={{ fill: "#8c8c8c" }} axisLine={{ stroke: "#d9d9d9" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #d9d9d9",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#52c41a"
            strokeWidth={2}
            dot={false}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#f5222d"
            strokeWidth={2}
            dot={false}
            name="Expenses"
          />
          <Line
            type="monotone"
            dataKey="budget"
            stroke="#1890ff"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Budget Target"
          />
          <ReferenceLine y={0} stroke="#d9d9d9" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div style={{ padding: "24px", minHeight: "100vh" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={2}>Financial Analytics & Projections</Title>
            <Paragraph type="secondary">
              Analyze your financial trends and explore future scenarios using
              AI-powered predictions
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={8}>
          <Card title="Analysis Parameters" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <div>
                <Text strong>Income Growth Rate (%)</Text>
                <Slider
                  value={incomeGrowth}
                  onChange={setIncomeGrowth}
                  min={-10}
                  max={20}
                  marks={{ "-10": "-10%", 0: "0%", 10: "10%", 20: "20%" }}
                />
              </div>

              <div>
                <Text strong>Expense Growth Rate (%)</Text>
                <Slider
                  value={expenseGrowth}
                  onChange={setExpenseGrowth}
                  min={-10}
                  max={20}
                  marks={{ "-10": "-10%", 0: "0%", 10: "10%", 20: "20%" }}
                />
              </div>

              <div>
                <Text strong>Savings Target (%)</Text>
                <Slider
                  value={savingsTarget}
                  onChange={setSavingsTarget}
                  min={0}
                  max={50}
                  marks={{ 0: "0%", 25: "25%", 50: "50%" }}
                />
              </div>

              <div>
                <Text strong>Projection Months</Text>
                <InputNumber
                  style={{ width: "100%" }}
                  value={projectionMonths}
                  onChange={setProjectionMonths}
                  min={1}
                  max={48}
                  addonAfter="months"
                />
              </div>

              <div>
                <Text strong>Year</Text>
                <DatePicker.YearPicker
                  style={{ width: "100%" }}
                  value={null}
                  onChange={(date) =>
                    setSelectedYear(date?.year() || new Date().getFullYear())
                  }
                />
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card
            title="Financial Projections"
            extra={
              <Select
                value={predictionInterval}
                style={{ width: 150 }}
                onChange={setPredictionInterval}
              >
                <Option value={90}>90% Confidence</Option>
                <Option value={95}>95% Confidence</Option>
                <Option value={99}>99% Confidence</Option>
              </Select>
            }
            bordered={false}
          >
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <Spin size="large" />
                <Text style={{ display: "block", marginTop: "16px" }}>
                  Analyzing financial data...
                </Text>
              </div>
            ) : error ? (
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
              />
            ) : (
              renderChart()
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Projected Monthly Income"
              value={projectedData[projectedData.length - 1]?.income || 0}
              precision={2}
              prefix="₹"
              valueStyle={{ color: "#52c41a" }}
              suffix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Projected Monthly Expense"
              value={projectedData[projectedData.length - 1]?.expense || 0}
              precision={2}
              prefix="₹"
              valueStyle={{ color: "#f5222d" }}
              suffix={<PercentageOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Projected Savings"
              value={projectedData[projectedData.length - 1]?.savings || 0}
              precision={2}
              prefix="₹"
              valueStyle={{ color: "#1890ff" }}
              suffix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Alert
            message="AI Prediction Disclaimer"
            description={
              <Text type="secondary">
                These projections use machine learning to analyze historical
                patterns and user-defined parameters. Results are estimates and
                should be used as one of many tools in financial planning.
                Actual results may vary significantly based on market conditions
                and other factors.
              </Text>
            }
            type="info"
            showIcon
            icon={<CalculatorOutlined />}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FinancialAnalytics;
