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
  BankOutlined,
  CalendarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MoneyCollectFilled,
  DollarCircleOutlined,
  StockOutlined,
  GiftOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  FundOutlined,
  SafetyOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";
import { getAllIncomesApi } from "../../apis/Api";
import IncomeModals from "../../components/IncomeModal";

const { Title, Text } = Typography;
const { Content } = Layout;

const COLORS = {
  Salary: "#52C41A",
  "Interest Received": "#13C2C2",
  Dividend: "#2F54EB",
  Bonus: "#722ED1",
  Overtime: "#FA8C16",
  "Rental Income": "#EB2F96",
  Investment: "#1890FF",
  Pension: "#F5222D",
  Other: "#8C8C8C",
};

const ICONS = {
  Salary: DollarCircleOutlined,
  "Interest Received": BankOutlined,
  Dividend: StockOutlined,
  Bonus: GiftOutlined,
  Overtime: ClockCircleOutlined,
  "Rental Income": HomeOutlined,
  Investment: FundOutlined,
  Pension: SafetyOutlined,
  Other: QuestionCircleOutlined,
};

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openIncomeModal, setOpenIncomeModal] = useState(false);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const response = await getAllIncomesApi();
      setIncomes(response.data);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch income data",
      });
    } finally {
      setLoading(false);
    }
  };

  const processChartData = (incomes) => {
    const categoryTotals = {};
    incomes.forEach((income) => {
      const category = income.IncomeID.incomeCategory;
      categoryTotals[category] =
        (categoryTotals[category] || 0) + income.amount;
    });

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getCategoryColor = (category) => {
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

  const filteredIncomes = incomes.filter(
    (income) =>
      income.IncomeID.incomeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      income.IncomeID.incomeCategory
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const onAdd = () => {
    fetchIncomes();
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const highestIncome = Math.max(...incomes.map((income) => income.amount), 0);
  const averageIncome = incomes.length ? totalIncome / incomes.length : 0;

  const chartData = processChartData(incomes);

  return (
    <Content style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
      {/* Header */}
      <Row
        justify="space-between"
        align="middle"
        gutter={[16, 16]}
        className="mb-6"
      >
        <Col xs={24} sm={24} md={8}>
          <Title level={2}>Income Tracker</Title>
        </Col>
        <Col xs={24} sm={24} md={16}>
          <Row gutter={16} justify="end">
            <Col xs={24} sm={12}>
              <Input
                placeholder="Search income..."
                prefix={<SearchOutlined />}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </Col>
            <Col xs={24} sm={12}>
              <Button
                type="primary"
                onClick={() => setOpenIncomeModal(true)}
                icon={<PlusOutlined />}
                block
              >
                Add Income
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Total Income"
              value={totalIncome}
              precision={2}
              prefix="Rs."
              valueStyle={{ color: "#52C41A" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Highest Income"
              value={highestIncome}
              precision={2}
              prefix="Rs."
              valueStyle={{ color: "#2F54EB" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Average Income"
              value={averageIncome}
              precision={2}
              prefix="Rs."
              valueStyle={{ color: "#FA8C16" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        {/* Income List */}
        <Col xs={24} lg={16}>
          <Card bordered={false}>
            <List
              loading={loading}
              dataSource={filteredIncomes}
              renderItem={(income) => (
                <List.Item
                  key={income._id}
                  className="rounded-lg mb-2 bg-gray-50"
                >
                  <List.Item.Meta
                    avatar={
                      <div
                        style={{
                          background: `${getCategoryColor(
                            income.IncomeID.incomeCategory
                          )}20`,
                          padding: 12,
                          borderRadius: 12,
                        }}
                      >
                        {getIcon(income.IncomeID.incomeCategory)}
                      </div>
                    }
                    title={
                      <Space>
                        <Text strong>{income.IncomeID.incomeName}</Text>
                        <Tag
                          color={getCategoryColor(
                            income.IncomeID.incomeCategory
                          )}
                        >
                          {income.IncomeID.incomeCategory}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Text type="secondary">
                        <CalendarOutlined className="mr-2" />
                        {new Date(
                          income.IncomeID.incomeDate
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </Text>
                    }
                  />
                  <Space direction="vertical" align="end">
                    <Text strong className="text-lg">
                      Rs.{income.amount.toLocaleString()}
                    </Text>
                    <Tooltip
                      title={
                        income.trend === "up"
                          ? "Higher than last month"
                          : "Lower than last month"
                      }
                    >
                      {/* {income.trend === "up" ? (
                        <Tag color="success">
                          <ArrowUpOutlined /> Increased
                        </Tag>
                      ) : (
                        <Tag color="error">
                          <ArrowDownOutlined /> Decreased
                        </Tag>
                      )} */}
                    </Tooltip>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Chart */}
        <Col xs={24} lg={8}>
          <Card bordered={false}>
            <Title level={4}>Income Distribution</Title>
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
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <List
              size="small"
              dataSource={chartData}
              renderItem={(item) => (
                <List.Item
                  extra={
                    <Text strong style={{ color: getCategoryColor(item.name) }}>
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
                        backgroundColor: getCategoryColor(item.name),
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
      <IncomeModals
        open={openIncomeModal}
        onClose={() => {
          setOpenIncomeModal(false);
        }}
        onAdd={onAdd}
      />
    </Content>
  );
};

export default Income;
