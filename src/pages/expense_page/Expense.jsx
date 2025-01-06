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
  DollarOutlined,
  CalendarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const { Title, Text } = Typography;
const { Content } = Layout;

const ExpenseTracker = () => {
  const [expenses] = useState([
    {
      id: 1,
      name: "KFC",
      amount: 5500,
      date: "17th Feb, 2024",
      category: "Food",
      trend: "up",
    },
    {
      id: 2,
      name: "Wedding Expense",
      amount: 50000,
      date: "21th May, 2024",
      category: "Personal",
      trend: "down",
    },
    {
      id: 3,
      name: "Pushpa 2",
      amount: 2100,
      date: "6th Jun, 2024",
      category: "Entertainment",
      trend: "down",
    },
    {
      id: 4,
      name: "Polo",
      amount: 6500,
      date: "19th Aug, 2024",
      category: "Clothes",
      trend: "up",
    },
    {
      id: 5,
      name: "Groceries",
      amount: 175000,
      date: "7th Dec, 2024",
      category: "Housing",
      trend: "up",
    },
  ]);

  const chartData = [
    { name: "Food", value: 5500, color: "#FF6B6B" },
    { name: "Personal", value: 50000, color: "#4DABF7" },
    { name: "Entertainment", value: 2100, color: "#51CF66" },
    { name: "Clothes", value: 6500, color: "#845EF7" },
    { name: "Housing", value: 175000, color: "#FCC419" },
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
            Expense Tracker
          </Title>
        </Col>
        <Col xs={24} sm={24} md={16}>
          <Row gutter={16} justify="end">
            <Col xs={24} sm={12}>
              <Input
                placeholder="Search expenses..."
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
                Add Expense
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
                  title="Total Expenses"
                  value={239100}
                  precision={2}
                  prefix="Rs."
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card bordered={false} style={{ height: "100%" }}>
                <Statistic
                  title="Highest Expense"
                  value={175000}
                  precision={2}
                  prefix="Rs."
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card bordered={false} style={{ height: "100%" }}>
                <Statistic
                  title="Average Expense"
                  value={47820}
                  precision={2}
                  prefix="Rs."
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Expense List */}
        <Col xs={24} lg={16}>
          <Card bordered={false}>
            <List
              dataSource={expenses}
              renderItem={(expense) => (
                <List.Item
                  key={expense.id}
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
                          background: `${getCategoryColor(expense.category)}20`,
                          padding: 12,
                          borderRadius: 12,
                        }}
                      >
                        <DollarOutlined
                          style={{
                            fontSize: 24,
                            color: getCategoryColor(expense.category),
                          }}
                        />
                      </div>
                    }
                    title={
                      <Space align="center">
                        <Text strong style={{ fontSize: 16 }}>
                          {expense.name}
                        </Text>
                        <Tag color={getCategoryColor(expense.category)}>
                          {expense.category}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Text type="secondary">
                        <CalendarOutlined style={{ marginRight: 8 }} />
                        {expense.date}
                      </Text>
                    }
                  />
                  <Space direction="vertical" align="end">
                    <Text strong style={{ fontSize: 18 }}>
                      Rs.{expense.amount.toLocaleString()}
                    </Text>
                    <Tooltip
                      title={
                        expense.trend === "up"
                          ? "Higher than last month"
                          : "Lower than last month"
                      }
                    >
                      {expense.trend === "up" ? (
                        <Tag color="red">
                          <ArrowUpOutlined /> Increased
                        </Tag>
                      ) : (
                        <Tag color="green">
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
            <Title level={4}>Expense Overview</Title>
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

export default ExpenseTracker;
