import React, { useState, useEffect, useRef } from "react";
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
  Card,
  Row,
  Col,
  Typography,
  Radio,
  Select,
  Space,
  Statistic,
  DatePicker,
  Button,
  message,
  Dropdown,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  WalletOutlined,
  LeftOutlined,
  RightOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { getTransactionsByMonthApi } from "../../apis/Api";
import html2canvas from "html2canvas";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Report = () => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("line");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [year, setYear] = useState(new Date().getFullYear());
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransactionsByMonthApi(year);
        const formattedData = response.data.map((item) => ({
          ...item,
          month: monthNames[item.month - 1],
          income: item.income || 0,
          expense: item.expense || 0,
        }));
        setData(formattedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [year]);

  const totalIncome = data.reduce((sum, item) => sum + (item.income || 0), 0);
  const totalExpense = data.reduce((sum, item) => sum + (item.expense || 0), 0);
  const netSavings = totalIncome - totalExpense;

  const exportToCSV = () => {
    try {
      const csvContent = [
        ["Month", "Income", "Expense", "Net Savings"],
        ...data.map((item) => [
          item.month,
          item.income.toFixed(2),
          item.expense.toFixed(2),
          (item.income - item.expense).toFixed(2),
        ]),
        [
          "Total",
          totalIncome.toFixed(2),
          totalExpense.toFixed(2),
          netSavings.toFixed(2),
        ],
      ]
        .map((row) => row.join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `financial_report_${year}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      message.success("CSV file downloaded successfully");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      message.error("Failed to download CSV file");
    }
  };

  const exportToImage = async (format) => {
    try {
      if (!chartRef.current) {
        message.error("Chart element not found");
        return;
      }

      const canvas = await html2canvas(chartRef.current);
      const url = canvas.toDataURL(`image/${format}`);
      const link = document.createElement("a");
      link.href = url;
      link.download = `financial_report_${year}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      message.success(`${format.toUpperCase()} file downloaded successfully`);
    } catch (error) {
      console.error(`Error exporting ${format}:`, error);
      message.error(`Failed to download ${format.toUpperCase()} file`);
    }
  };

  const exportItems = [
    {
      key: "csv",
      label: "Save as CSV",
      onClick: () => exportToCSV(),
    },
    {
      key: "png",
      label: "Save as PNG",
      onClick: () => exportToImage("png"),
    },
    {
      key: "jpg",
      label: "Save as JPG",
      onClick: () => exportToImage("jpeg"),
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card size="small" className="custom-tooltip">
          <p className="mb-0">Month: {label}</p>
          {payload.map((p, index) => (
            <p key={index} style={{ color: p.color, margin: "4px 0" }}>
              {p.name}: Rs.{p.value.toLocaleString()}
            </p>
          ))}
        </Card>
      );
    }
    return null;
  };

  const renderChart = () => {
    const ChartComponent = chartType === "line" ? LineChart : AreaChart;
    const DataComponent = chartType === "line" ? Line : Area;

    return (
      <ChartComponent
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" padding={{ left: 20, right: 20 }} />
        <YAxis tickFormatter={(value) => `Rs.${value / 1000}K`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <DataComponent
          type="monotone"
          dataKey="income"
          stroke="#52C41A"
          fill="#52C41A"
          fillOpacity={0.2}
          strokeWidth={3}
          dot={chartType === "line" ? { r: 6, strokeWidth: 2 } : false}
          activeDot={chartType === "line" ? { r: 8 } : false}
        />
        <DataComponent
          type="monotone"
          dataKey="expense"
          stroke="#ff4d4f"
          fill="#ff4d4f"
          fillOpacity={0.2}
          strokeWidth={3}
          dot={chartType === "line" ? { r: 6, strokeWidth: 2 } : false}
          activeDot={chartType === "line" ? { r: 8 } : false}
        />
      </ChartComponent>
    );
  };

  return (
    <div style={{ padding: "16px 24px" }}>
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col xs={24} md={12}>
          <Title level={2} style={{ margin: 0 }}>
            Financial Reports {year}
          </Title>
        </Col>
        <Col xs={24} md={12}>
          <Space wrap style={{ width: "100%", justifyContent: "flex-end" }}>
            <Select
              value={selectedCategory}
              style={{ width: 160 }}
              onChange={setSelectedCategory}
              options={[
                { value: "all", label: "All Categories" },
                { value: "food", label: "Food" },
                { value: "transport", label: "Transport" },
                { value: "utilities", label: "Utilities" },
              ]}
            />
            <Radio.Group
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              optionType="button"
            >
              <Radio.Button value="line">Line</Radio.Button>
              <Radio.Button value="area">Area</Radio.Button>
            </Radio.Group>
            <Dropdown menu={{ items: exportItems }} placement="bottomRight">
              <Button type="primary" icon={<DownloadOutlined />}>
                Export As
              </Button>
            </Dropdown>
          </Space>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={8}>
          <Card hoverable>
            <Statistic
              title="Total Income"
              value={totalIncome}
              precision={2}
              valueStyle={{ color: "#52C41A" }}
              prefix="Rs."
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card hoverable>
            <Statistic
              title="Total Expenses"
              value={totalExpense}
              precision={2}
              valueStyle={{ color: "#ff4d4f" }}
              prefix="Rs."
              suffix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card hoverable>
            <Statistic
              title="Net Savings"
              value={netSavings}
              precision={2}
              valueStyle={{ color: "#1890ff" }}
              prefix="Rs."
              suffix={<WalletOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card
        style={{ marginTop: 24 }}
        extra={
          <Space>
            <LeftOutlined
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={() => setYear((prev) => prev - 1)}
            />
            <RightOutlined
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={() => setYear((prev) => prev + 1)}
            />
          </Space>
        }
      >
        <div
          ref={chartRef}
          style={{ height: "calc(100vh - 380px)", minHeight: "400px" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Report;
