import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Typography,
  Table,
  Tag,
  Statistic,
} from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  getAllTransactionsApi,
  getSingleprofileApi,
  getTotalExpensesApi,
  getTotalIncomesApi,
  getTransactionsByUserApi,
} from "../../apis/Api";
import TransactionModals from "../../components/transactionModels";

const { Content } = Layout;

const Dashboard = () => {
  const [budget, setBudget] = useState(0);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [change, setChange] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const aggregateMonthlyData = (transactions) => {
    const monthlyData = Array(12)
      .fill(0)
      .map((_, i) => ({
        month: new Date(2025, i).toLocaleString("default", { month: "short" }),
        amount: 0,
      }));

    transactions.forEach((transaction) => {
      const date = new Date(transaction.transactionDate);
      const monthIndex = date.getMonth();
      const amount =
        transaction.amount *
        (transaction.transactionType === "Income" ? 1 : -1);
      monthlyData[monthIndex].amount += amount;
    });

    return monthlyData;
  };

  const aggregateExpenseData = (transactions) => {
    const expenseData = {};

    transactions
      .filter((t) => t.transactionType === "Expense")
      .forEach((transaction) => {
        const category = transaction.ExpenseID.expenseName;
        if (!expenseData[category]) {
          expenseData[category] = {
            name: category,
            value: 0,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          };
        }
        expenseData[category].value += transaction.amount;
      });

    return Object.values(expenseData);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    getSingleprofileApi()
      .then((res) => {
        const { budget } = res.data.user;
        setUser(res.data.user);
        setBudget(budget);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    getTotalIncomesApi()
      .then((res) => {
        setTotalIncome(res.data.totalIncomes);
      })
      .catch((err) => console.log(err));

    getTotalExpensesApi()
      .then((res) => {
        console.log(res.data);
        setTotalExpense(res.data.totalExpenses);
      })
      .catch((err) => console.log(err));

    getTransactionsByUserApi()
      .then((res) => {
        setTransactions(res.data);
        setMonthlyData(aggregateMonthlyData(res.data));
        setExpenseData(aggregateExpenseData(res.data));
      })
      .catch((err) => console.log(err));
  }, [change]);

  const handleAdd = () => {
    console.log("add");
    setChange(!change);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: ["ExpenseID", "expenseName"],
      key: "name",
      render: (text, record) =>
        record.transactionType === "Expense"
          ? record.ExpenseID?.expenseName
          : record.IncomeID?.incomeName,
    },
    {
      title: "Category",
      dataIndex: "transactionType",
      key: "category",
      render: (text) => (
        <Tag color={text === "Expense" ? "red" : "green"}>{text}</Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <span
          style={{
            color: record.transactionType === "Income" ? "#52c41a" : "#f5222d",
            fontWeight: "bold",
          }}
        >
          Rs.{amount.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "transactionDate",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <Layout className="bg-black">
      <Content
        style={{ margin: "24px", minHeight: "100vh" }}
        className="bg-black"
      >
        {/* Summary Statistics */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Balance"
                value={isLoading ? "Loading..." : `Rs.${budget}`}
                loading={isLoading}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Expense"
                value={totalExpense}
                prefix="Rs."
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Income"
                value={totalIncome}
                prefix="Rs."
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Charts Section */}
        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          <Col xs={24} lg={12}>
            <Card title="Overview">
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#1890ff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Lifestyle">
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <Row gutter={[16, 8]} style={{ marginTop: "16px" }}>
                {expenseData.map((item) => (
                  <Col span={8} key={item.name}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: item.color,
                        }}
                      />
                      <span>
                        {item.name}: Rs.{item.value.toLocaleString()}
                      </span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Transactions Table */}
        <Card title="Transactions" style={{ marginTop: "16px" }}>
          <Table
            columns={columns}
            dataSource={transactions}
            rowKey="_id"
            pagination={false}
          />
        </Card>
      </Content>
      <TransactionModals onAdd={handleAdd} />
    </Layout>
  );
};

export default Dashboard;
