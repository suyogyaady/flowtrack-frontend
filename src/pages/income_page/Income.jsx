import React, { useState } from "react";
import {
  Layout,
  Typography,
  Input,
  Button,
  List,
  Card,
  Row,
  Col,
  Statistic,
  Tag,
  Tooltip,
  Space,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  BankOutlined,
  CalendarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const { Title, Text } = Typography;
const { Content } = Layout;

const Income = () => {
  const [incomes] = useState([
    {
      id: 1,
      name: "Salary",
      amount: 85000,
      date: "1st Jan, 2024",
      category: "Employment",
      trend: "up",
    },
    {
      id: 2,
      name: "Freelance Project",
      amount: 25000,
      date: "15th Mar, 2024",
      category: "Freelance",
      trend: "down",
    },
    {
      id: 3,
      name: "Stock Dividend",
      amount: 7500,
      date: "22nd Apr, 2024",
      category: "Investment",
      trend: "up",
    },
    {
      id: 4,
      name: "Rental Income",
      amount: 35000,
      date: "5th May, 2024",
      category: "Real Estate",
      trend: "up",
    },
    {
      id: 5,
      name: "Consulting Fee",
      amount: 45000,
      date: "30th Jun, 2024",
      category: "Business",
      trend: "down",
    },
  ]);

  const chartData = [
    { name: "Employment", value: 85000, color: "#52C41A" },
    { name: "Freelance", value: 25000, color: "#4DABF7" },
    { name: "Investment", value: 7500, color: "#51CF66" },
    { name: "Real Estate", value: 35000, color: "#845EF7" },
    { name: "Business", value: 45000, color: "#FCC419" },
  ];

  const getCategoryColor = (category) => {
    const categoryData = chartData.find((item) => item.name === category);
    return categoryData ? categoryData.color : "#1890ff";
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const highestIncome = Math.max(...incomes.map((income) => income.amount));
  const averageIncome = totalIncome / incomes.length;

  return (
    <Content style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
      {/* Header */}
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: 24 }}
        gutter={[16, 16]}
      >
        <Col xs={24} sm={24} md={8}>
          <Title level={2} style={{ margin: 0, color: "#fff" }}>
            Income Tracker
          </Title>
        </Col>
        <Col xs={24} sm={24} md={16}>
          <Row gutter={16} justify="end">
            <Col xs={24} sm={12}>
              <Input
                placeholder="Search income..."
                prefix={<SearchOutlined />}
                style={{ width: "100%" }}
              />
            </Col>
            <Col xs={24} sm={12}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ width: "100%" }}
              >
                Add Income
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        {/* Quick Stats Cards */}
        <Col xs={24}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <Card bordered={false} style={{ height: "100%" }}>
                <Statistic
                  title="Total Income"
                  value={totalIncome}
                  precision={2}
                  prefix="Rs."
                  valueStyle={{ color: "#52C41A" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card bordered={false} style={{ height: "100%" }}>
                <Statistic
                  title="Highest Income"
                  value={highestIncome}
                  precision={2}
                  prefix="Rs."
                  valueStyle={{ color: "#52C41A" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card bordered={false} style={{ height: "100%" }}>
                <Statistic
                  title="Average Income"
                  value={averageIncome}
                  precision={2}
                  prefix="Rs."
                  valueStyle={{ color: "#52C41A" }}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Income List */}
        <Col xs={24} lg={16}>
          <Card bordered={false}>
            <List
              dataSource={incomes}
              renderItem={(income) => (
                <List.Item
                  key={income.id}
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    background: "rgba(255, 255, 255, 0.04)",
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <div
                        style={{
                          background: `${getCategoryColor(income.category)}20`,
                          padding: 12,
                          borderRadius: 12,
                        }}
                      >
                        <BankOutlined
                          style={{
                            fontSize: 24,
                            color: getCategoryColor(income.category),
                          }}
                        />
                      </div>
                    }
                    title={
                      <Space align="center">
                        <Text strong style={{ fontSize: 16 }}>
                          {income.name}
                        </Text>
                        <Tag color={getCategoryColor(income.category)}>
                          {income.category}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Text type="secondary">
                        <CalendarOutlined style={{ marginRight: 8 }} />
                        {income.date}
                      </Text>
                    }
                  />
                  <Space direction="vertical" align="end">
                    <Text strong style={{ fontSize: 18 }}>
                      Rs.{income.amount.toLocaleString()}
                    </Text>
                    <Tooltip
                      title={
                        income.trend === "up"
                          ? "Higher than last month"
                          : "Lower than last month"
                      }
                    >
                      {income.trend === "up" ? (
                        <Tag color="green">
                          <ArrowUpOutlined /> Increased
                        </Tag>
                      ) : (
                        <Tag color="red">
                          <ArrowDownOutlined /> Decreased
                        </Tag>
                      )}
                    </Tooltip>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Charts */}
        <Col xs={24} lg={8}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <Title level={4}>Income Overview</Title>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={renderCustomizedLabel}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <List
              size="small"
              dataSource={chartData}
              renderItem={(item) => (
                <List.Item
                  extra={
                    <Text strong style={{ color: item.color }}>
                      Rs.{item.value.toLocaleString()}
                    </Text>
                  }
                >
                  <Space>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: item.color,
                      }}
                    />
                    <Text>{item.name}</Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Income;
