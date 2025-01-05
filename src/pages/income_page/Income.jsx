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
  BankOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
    },
    {
      id: 2,
      name: "Freelance Project",
      amount: 25000,
      date: "15th Mar, 2024",
      category: "Freelance",
    },
    {
      id: 3,
      name: "Stock Dividend",
      amount: 7500,
      date: "22nd Apr, 2024",
      category: "Investment",
    },
    {
      id: 4,
      name: "Rental Income",
      amount: 35000,
      date: "5th May, 2024",
      category: "Real Estate",
    },
    {
      id: 5,
      name: "Consulting Fee",
      amount: 45000,
      date: "30th Jun, 2024",
      category: "Business",
    },
  ]);

  const chartData = [
    { name: "Employment", value: 85000, color: "#52C41A" },
    { name: "Freelance", value: 25000, color: "#1890FF" },
    { name: "Investment", value: 7500, color: "#722ED1" },
    { name: "Real Estate", value: 35000, color: "#FA8C16" },
    { name: "Business", value: 45000, color: "#EB2F96" },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#52C41A",
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
              Income
            </Title>
            <Row gutter={16}>
              <Col>
                <Input
                  placeholder="Search income..."
                  prefix={<SearchOutlined />}
                  style={{ width: 250 }}
                />
              </Col>
              <Col>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{ background: "#52C41A" }}
                >
                  Add Income
                </Button>
              </Col>
            </Row>
          </Row>

          {/* Main Content */}
          <Row gutter={24}>
            {/* Income List */}
            <Col span={16}>
              <Card>
                <List
                  dataSource={incomes}
                  renderItem={(income) => (
                    <List.Item key={income.id} style={{ padding: "12px" }}>
                      <List.Item.Meta
                        avatar={
                          <div
                            style={{
                              background: "rgba(82, 196, 26, 0.1)",
                              padding: 8,
                              borderRadius: 8,
                            }}
                          >
                            <BankOutlined
                              style={{ fontSize: 24, color: "#52C41A" }}
                            />
                          </div>
                        }
                        title={<Text strong>{income.name}</Text>}
                        description={income.category}
                      />
                      <div style={{ textAlign: "right" }}>
                        <Text strong style={{ color: "#52C41A" }}>
                          Rs.{income.amount.toLocaleString()}
                        </Text>
                        <br />
                        <Text type="secondary">
                          <CalendarOutlined style={{ marginRight: 8 }} />
                          {income.date}
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
                <Title level={4}>Income Breakdown</Title>
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
                    <List.Item
                      extra={
                        <Text strong>Rs.{item.value.toLocaleString()}</Text>
                      }
                    >
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
                      title="Total Income"
                      value={197500}
                      prefix="Rs."
                      valueStyle={{ color: "#52C41A" }}
                    />
                  </Col>
                  <Col span={24}>
                    <Statistic
                      title="Highest Income"
                      value={85000}
                      prefix="Rs."
                      valueStyle={{ color: "#52C41A" }}
                    />
                  </Col>
                  <Col span={24}>
                    <Statistic
                      title="Average Income"
                      value={39500}
                      prefix="Rs."
                      valueStyle={{ color: "#52C41A" }}
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

export default Income;
