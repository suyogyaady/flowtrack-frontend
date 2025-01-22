import React, { useEffect, useState } from "react";
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
  notification,
} from "antd";
import Icon, {
  PlusOutlined,
  SearchOutlined,
  DollarOutlined,
  CalendarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarCircleOutlined,
  CarOutlined,
  ThunderboltOutlined,
  SmileOutlined,
  HeartOutlined,
  ShoppingOutlined,
  BookOutlined,
  UserOutlined,
  GiftOutlined,
  EllipsisOutlined,
  QuestionCircleOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

import ExpenseModal from "../../components/ExpenseModal";
import { getAllExpensesApi } from "../../apis/Api";
import { icons } from "antd/es/image/PreviewGroup";

const { Title, Text } = Typography;
const { Content } = Layout;

const COLORS = {
  Food: "#ff7a45", // Red
  Transportation: "#ffa940", // Orange
  Utilities: "#52c41a", // Green
  Entertainment: "#722ed1", // Purple
  Healthcare: "#13c2c2", // Cyan
  Clothing: "#eb2f96", // Pink
  Education: "#2f54eb", // Blue
  Personal: "#fa8c16", // Light Orange
  Gifts: "#ff4d4f", // Coral
  Other: "#8C8C8C", // Grey
};

const ICONS = {
  Food: CoffeeOutlined, // Food-related icon
  Transportation: CarOutlined, // Transportation icon
  Utilities: ThunderboltOutlined, // Utilities icon
  Entertainment: SmileOutlined, // Entertainment icon
  Healthcare: HeartOutlined, // Healthcare icon
  Clothing: ShoppingOutlined, // Clothing icon
  Education: BookOutlined, // Education icon
  Personal: UserOutlined, // Personal icon
  Gifts: GiftOutlined, // Gift icon
  Other: QuestionCircleOutlined, // Generic/Other icon
};

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openExpenseModal, setOpenExpenseModal] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await getAllExpensesApi();
      setExpenses(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch expense data",
      });
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to process chart data
  const processChartData = (expenses) => {
    if (!Array.isArray(expenses)) return [];

    const categoryTotals = {};
    expenses.forEach((expense) => {
      const category = expense.ExpenseID?.expenseCategory || "Other";
      categoryTotals[category] =
        (categoryTotals[category] || 0) +
        (expense.ExpenseID?.expenseAmount || 0);
    });

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const chartData = processChartData(expenses);

  const getCategoryColor = (category) => {
    // const categoryData = chartData.find((item) => item.name === category);
    // return categoryData ? categoryData.color : "#1890ff";
    return COLORS[category] || "#1890ff";
  };

  const getCategoryColorForPie = (category) => {
    return COLORS[category] || "#1890ff";
  };

  const getIcon = (category) => {
    return (
      <Icon
        component={ICONS[category]}
        style={{ color: getCategoryColor(category), fontSize: "24px" }}
      />
    );
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

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.ExpenseID.expenseName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      expense.ExpenseID.expenseCategory
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const onAdd = () => {
    fetchExpenses();
  };

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const highestExpense = Math.max(
    ...expenses.map((expense) => expense.amount),
    0
  );
  const averageExpense = expenses.length ? totalExpense / expenses.length : 0;

  return (
    <Content style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
      {/* Header */}
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: 24 }}
        gutter={[16, 16]}
        className="mb-6"
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
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </Col>
            <Col xs={24} sm={12}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setOpenExpenseModal(true)}
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
                  value={totalExpense}
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
                  value={highestExpense}
                  precision={2}
                  prefix="Rs."
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card bordered={false} style={{ height: "100%" }}>
                <Statistic
                  title="Average Expense"
                  value={averageExpense}
                  precision={2}
                  prefix="Rs."
                  valueStyle={{ color: "#FA8C16" }}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Expense List */}
        <Col xs={24} lg={16}>
          <Card bordered={false}>
            <List
              loading={loading}
              dataSource={filteredExpenses}
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
                          background: `${getCategoryColor(
                            expense.ExpenseID.expenseCategory
                          )}20`,
                          padding: 12,
                          borderRadius: 12,
                        }}
                      >
                        {getIcon(expense.ExpenseID.expenseCategory)}
                      </div>
                    }
                    title={
                      <Space align="center">
                        <Text strong style={{ fontSize: 16 }}>
                          {expense.ExpenseID.expenseName}
                        </Text>
                        <Tag
                          color={getCategoryColor(
                            expense.ExpenseID.expenseCategory
                          )}
                        >
                          {expense.ExpenseID.expenseCategory}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Text type="secondary">
                        <CalendarOutlined style={{ marginRight: 8 }} />

                        {new Date(expense.transactionDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </Text>
                    }
                  />
                  <Space direction="vertical" align="end">
                    <Text strong style={{ fontSize: 18 }}>
                      Rs.{expense.ExpenseID.expenseAmount.toLocaleString()}
                    </Text>
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
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          // Auto fill color without categort name
                          getCategoryColorForPie(entry.name)
                        }
                      />
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
      <ExpenseModal
        open={openExpenseModal}
        onClose={() => {
          setOpenExpenseModal(false);
        }}
        onAdd={onAdd}
      />
    </Content>
  );
};

export default Expense;
