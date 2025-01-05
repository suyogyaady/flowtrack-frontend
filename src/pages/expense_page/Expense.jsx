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
  ConfigProvider,
  theme,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DollarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
    },
    {
      id: 2,
      name: "Wedding Expense",
      amount: 50000,
      date: "21th May, 2024",
      category: "Personal",
    },
    {
      id: 3,
      name: "Pushpa 2",
      amount: 2100,
      date: "6th Jun, 2024",
      category: "Entertainment",
    },
    {
      id: 4,
      name: "Polo",
      amount: 6500,
      date: "19th Aug, 2024",
      category: "Clothes",
    },
    {
      id: 5,
      name: "Groceries",
      amount: 175000,
      date: "7th Dec, 2024",
      category: "Housing",
    },
  ]);

  const chartData = [
    { name: "Gift", value: 320, color: "#FF6B6B" },
    { name: "Grocery", value: 150, color: "#4DABF7" },
    { name: "Transportation", value: 120, color: "#51CF66" },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
          colorBgContainer: "#141414",
          colorBgElevated: "#1f1f1f",
          colorBorder: "#303030",
        },
      }}
    >
      <Layout
        style={{ minHeight: "100vh", background: "#141414", padding: 24 }}
      >
        <Content style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Header */}
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 24 }}
          >
            <Title level={2} style={{ margin: 0, color: "#fff" }}>
              Expense
            </Title>
            <Row gutter={16}>
              <Col>
                <Input
                  placeholder="Search expenses..."
                  prefix={<SearchOutlined />}
                  style={{ width: 250 }}
                />
              </Col>
              <Col>
                <Button type="primary" icon={<PlusOutlined />}>
                  Add Expense
                </Button>
              </Col>
            </Row>
          </Row>

          {/* Main Content */}
          <Row gutter={24}>
            {/* Expense List */}
            <Col span={16}>
              <Card>
                <List
                  dataSource={expenses}
                  renderItem={(expense) => (
                    <List.Item key={expense.id} style={{ padding: "12px" }}>
                      <List.Item.Meta
                        avatar={
                          <div
                            style={{
                              background: "rgba(24, 144, 255, 0.1)",
                              padding: 8,
                              borderRadius: 8,
                            }}
                          >
                            <DollarOutlined
                              style={{ fontSize: 24, color: "#1890ff" }}
                            />
                          </div>
                        }
                        title={<Text strong>{expense.name}</Text>}
                        description={expense.category}
                      />
                      <div style={{ textAlign: "right" }}>
                        <Text strong>Rs.{expense.amount.toLocaleString()}</Text>
                        <br />
                        <Text type="secondary">
                          <CalendarOutlined style={{ marginRight: 8 }} />
                          {expense.date}
                        </Text>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* Charts and Stats */}
            <Col span={8}>
              {/* Donut Chart */}
              <Card style={{ marginBottom: 24 }}>
                <Title level={4}>Expense Overview</Title>
                <div style={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <List
                  size="small"
                  dataSource={chartData}
                  renderItem={(item) => (
                    <List.Item extra={<Text strong>${item.value}</Text>}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: item.color,
                            marginRight: 8,
                          }}
                        />
                        <Text>{item.name}</Text>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>

              {/* Quick Stats */}
              <Card>
                <Title level={4}>Quick Stats</Title>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Statistic
                      title="Total Expenses"
                      value={239100}
                      prefix="Rs."
                    />
                  </Col>
                  <Col span={24}>
                    <Statistic
                      title="Highest Expense"
                      value={175000}
                      prefix="Rs."
                    />
                  </Col>
                  <Col span={24}>
                    <Statistic
                      title="Average Expense"
                      value={47820}
                      prefix="Rs."
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default ExpenseTracker;
