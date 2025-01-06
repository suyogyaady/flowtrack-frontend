import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Select,
  DatePicker,
  Radio,
  Card,
  Typography,
  Button,
  Modal,
  Row,
  Col,
  Statistic,
  Space,
  Divider,
} from "antd";
import {
  FilterOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  WalletOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

const Report = () => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filterType, setFilterType] = useState("monthly");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [chartType, setChartType] = useState("line");

  // Sample data - replace with your actual data
  const data = [
    { month: "Jan", income: 38000, expense: 60000 },
    { month: "Feb", income: 90000, expense: 55000 },
    { month: "Mar", income: 32000, expense: 85000 },
    { month: "Apr", income: 28000, expense: 82000 },
    { month: "May", income: 15000, expense: 35000 },
    { month: "Jun", income: 12000, expense: 90000 },
    { month: "Jul", income: 78000, expense: 95000 },
    { month: "Aug", income: 18000, expense: 68000 },
    { month: "Sep", income: 65000, expense: 15000 },
    { month: "Oct", income: 72000, expense: 55000 },
    { month: "Nov", income: 60000, expense: 36000 },
    { month: "Dec", income: 45000, expense: 82000 },
  ];

  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = data.reduce((sum, item) => sum + item.expense, 0);
  const netSavings = totalIncome - totalExpense;

  const showFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const handleOk = () => {
    setIsFilterModalVisible(false);
  };

  const handleCancel = () => {
    setIsFilterModalVisible(false);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card
          size="small"
          style={{ background: "#1f1f1f", border: "1px solid #303030" }}
        >
          <p style={{ margin: 0, color: "#fff" }}>{label}</p>
          {payload.map((p, index) => (
            <p key={index} style={{ color: p.color, margin: "4px 0" }}>
              {p.name}: ₹{p.value.toLocaleString()}
            </p>
          ))}
        </Card>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (chartType === "line") {
      return (
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#303030" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#fff" }}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            tick={{ fill: "#fff" }}
            tickFormatter={(value) => `₹${value / 1000}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend height={36} iconSize={10} wrapperStyle={{ color: "#fff" }} />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#52C41A"
            strokeWidth={3}
            dot={{ r: 6, strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ff4d4f"
            strokeWidth={3}
            dot={{ r: 6, strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      );
    }
    return (
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#303030" />
        <XAxis
          dataKey="month"
          tick={{ fill: "#fff" }}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis
          tick={{ fill: "#fff" }}
          tickFormatter={(value) => `₹${value / 1000}K`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend height={36} iconSize={10} wrapperStyle={{ color: "#fff" }} />
        <Area
          type="monotone"
          dataKey="income"
          stroke="#52C41A"
          fill="#52C41A"
          fillOpacity={0.2}
          strokeWidth={3}
        />
        <Area
          type="monotone"
          dataKey="expense"
          stroke="#ff4d4f"
          fill="#ff4d4f"
          fillOpacity={0.2}
          strokeWidth={3}
        />
      </AreaChart>
    );
  };

  return (
    <div style={{ padding: 24 }}>
      {/* Header Section */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2} style={{ margin: 0, color: "#fff" }}>
            Financial Reports
          </Title>
        </Col>
        <Col>
          <Space>
            <Radio.Group
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="line">Line Chart</Radio.Button>
              <Radio.Button value="area">Area Chart</Radio.Button>
            </Radio.Group>
            <Button
              type="primary"
              icon={<FilterOutlined />}
              onClick={showFilterModal}
            >
              Filter
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic
              title={<Text style={{ color: "#fff" }}>Total Income</Text>}
              value={totalIncome}
              precision={2}
              valueStyle={{ color: "#52C41A" }}
              prefix="₹"
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic
              title={<Text style={{ color: "#fff" }}>Total Expenses</Text>}
              value={totalExpense}
              precision={2}
              valueStyle={{ color: "#ff4d4f" }}
              prefix="₹"
              suffix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic
              title={<Text style={{ color: "#fff" }}>Net Savings</Text>}
              value={netSavings}
              precision={2}
              valueStyle={{ color: "#1890ff" }}
              prefix="₹"
              suffix={<WalletOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Chart Card */}
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <div style={{ height: "calc(100vh - 380px)", minHeight: "500px" }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Filter Modal */}
      <Modal
        title={<Text style={{ color: "#fff" }}>Filter Options</Text>}
        open={isFilterModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Apply Filters
          </Button>,
        ]}
      >
        <div style={{ padding: "16px 0" }}>
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <div>
              <Text style={{ color: "#fff" }}>Time Period</Text>
              <Radio.Group
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ width: "100%", marginTop: 8 }}
              >
                <Row gutter={8}>
                  <Col span={8}>
                    <Radio.Button
                      value="weekly"
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      Weekly
                    </Radio.Button>
                  </Col>
                  <Col span={8}>
                    <Radio.Button
                      value="monthly"
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      Monthly
                    </Radio.Button>
                  </Col>
                  <Col span={8}>
                    <Radio.Button
                      value="yearly"
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      Yearly
                    </Radio.Button>
                  </Col>
                </Row>
              </Radio.Group>
            </div>

            <div>
              <Text style={{ color: "#fff" }}>Category</Text>
              <Select
                value={selectedCategory}
                style={{ width: "100%", marginTop: 8 }}
                onChange={setSelectedCategory}
                options={[
                  { value: "all", label: "All Categories" },
                  { value: "food", label: "Food" },
                  { value: "transport", label: "Transport" },
                  { value: "utilities", label: "Utilities" },
                ]}
              />
            </div>

            <div>
              <Text style={{ color: "#fff" }}>Date Range</Text>
              <RangePicker style={{ width: "100%", marginTop: 8 }} />
            </div>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default Report;
