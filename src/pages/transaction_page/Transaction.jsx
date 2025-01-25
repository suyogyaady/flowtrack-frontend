import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Table,
  Input,
  Select,
  Button,
  Tag,
  Modal,
  Form,
  DatePicker,
  Card,
  Space,
  Row,
  Col,
  Typography,
  Tooltip,
  Statistic,
  Menu,
  Dropdown,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  FilterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  deleteExpenseApi,
  deleteIncomeApi,
  getSingleprofileApi,
  getTransactionsByUserApi,
} from "../../apis/Api";
import TransactionModals from "../../components/transactionModels";

const { Title, Text } = Typography;

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [change, setChange] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    getSingleprofileApi()
      .then((res) => {
        const { budget } = res.data.user;
        setUser(res.data.user);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    getTransactionsByUserApi()
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => console.log(err));
  }, [change]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    search: "",
  });
  const [editingRecord, setEditingRecord] = useState(null);

  const totalIncome = transactions
    .filter((t) => t.transactionType.toLowerCase() === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.transactionType.toLowerCase() === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleExport = (format) => {
    const dataToExport = filteredTransactions.map((t) => ({
      Name: t.IncomeID ? t.IncomeID.incomeName : t.ExpenseID.expenseName,
      Amount: t.amount,
      Category: t.IncomeID
        ? t.IncomeID.incomeCategory
        : t.ExpenseID.expenseCategory,
      Date: new Date(t.transactionDate).toLocaleDateString("en-GB"),
      Type: t.transactionType,
    }));

    let content = "";
    let fileName = `transactions_${new Date().toISOString().split("T")[0]}`;

    if (format === "csv") {
      const headers = Object.keys(dataToExport[0]).join(",");
      const rows = dataToExport.map((row) => Object.values(row).join(","));
      content = [headers, ...rows].join("\n");
      fileName += ".csv";
    } else if (format === "json") {
      content = JSON.stringify(dataToExport, null, 2);
      fileName += ".json";
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const exportMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => handleExport("csv")}>
        Export as CSV
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleExport("json")}>
        Export as JSON
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Text strong>
          {record.IncomeID
            ? record.IncomeID.incomeName
            : record.ExpenseID
            ? record.ExpenseID.expenseName
            : ""}
        </Text>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <Text
          strong
          style={{
            color:
              record.transactionType.toLowerCase() === "income"
                ? "#52C41A"
                : "#ff4d4f",
            fontSize: "16px",
          }}
        >
          {record.transactionType.toLowerCase() === "income" ? "Rs." : "Rs."}
          {amount.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text, record) => (
        <Tag color="blue">
          {record.IncomeID
            ? record.IncomeID.incomeCategory
            : record.ExpenseID
            ? record.ExpenseID.expenseCategory
            : ""}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (date) => (
        <Text>
          {new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Text>
      ),
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
      render: (transactionType) => (
        <Tag
          color={
            transactionType.toLowerCase() === "income" ? "success" : "error"
          }
        >
          {transactionType}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              style={{ color: "#ff4d4f" }}
              onClick={() => handleDelete(record._id, record.transactionType)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleDelete = (id, transactionType) => {
    Modal.confirm({
      title: "Are you sure you want to delete this transaction?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        console.log("Api call here");
        if (transactionType.toLowerCase() === "income") {
          deleteIncomeApi(id)
            .then(() => {
              setChange(!change);
            })
            .catch((err) => console.log(err));
        }
        if (transactionType.toLowerCase() === "expense") {
          deleteExpenseApi(id)
            .then(() => {
              setChange(!change);
            })
            .catch((err) => console.log(err));
        }
      },
    });
  };

  const handleEdit = (record) => {
    const initialValues = {
      name: record.IncomeID
        ? record.IncomeID.incomeName
        : record.ExpenseID.expenseName,
      amount: record.amount,
      type: record.IncomeID
        ? record.IncomeID.incomeCategory
        : record.ExpenseID.expenseCategory,
      category: record.transactionType.toLowerCase(),
      date: record.transactionDate ? dayjs(record.transactionDate) : null,
    };

    setEditingRecord(record);
    form.setFieldsValue(initialValues);
    setIsModalVisible(true);
  };

  const handleSubmit = (values) => {
    const formattedValues = {
      transactionDate: values.date.format("YYYY-MM-DD"),
      amount: Number(values.amount),
      transactionType:
        values.category.charAt(0).toUpperCase() + values.category.slice(1),
      [values.category.toLowerCase() === "income" ? "IncomeID" : "ExpenseID"]: {
        [values.category.toLowerCase() === "income"
          ? "incomeName"
          : "expenseName"]: values.name,
        [values.category.toLowerCase() === "income"
          ? "incomeAmount"
          : "expenseAmount"]: Number(values.amount),
        [values.category.toLowerCase() === "income"
          ? "incomeCategory"
          : "expenseCategory"]: values.type,
      },
    };

    if (editingRecord) {
      setTransactions(
        transactions.map((t) =>
          t._id === editingRecord._id
            ? { ...formattedValues, _id: editingRecord._id }
            : t
        )
      );
    } else {
      const newTransaction = {
        _id: Math.random().toString(36).substr(2, 9),
        ...formattedValues,
      };
      setTransactions([...transactions, newTransaction]);
    }

    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const filteredTransactions = transactions.filter((t) => {
    const name = t.IncomeID
      ? t.IncomeID.incomeName
      : t.ExpenseID
      ? t.ExpenseID.expenseName
      : "";
    const searchMatch =
      name.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.transactionType.toLowerCase().includes(filters.search.toLowerCase());
    const categoryMatch =
      !filters.category || t.transactionType.toLowerCase() === filters.category;
    const typeMatch =
      !filters.type ||
      (t.IncomeID
        ? t.IncomeID.incomeCategory
        : t.ExpenseID
        ? t.ExpenseID.expenseCategory
        : ""
      )
        .toLowerCase()
        .includes(filters.type.toLowerCase());

    return searchMatch && categoryMatch && typeMatch;
  });

  return (
    <div style={{ padding: "24px" }}>
      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Total Income"
              value={totalIncome}
              precision={2}
              prefix="Rs."
              valueStyle={{ color: "#52C41A" }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Total Expense"
              value={totalExpense}
              precision={2}
              prefix="Rs."
              valueStyle={{ color: "#ff4d4f" }}
              suffix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Balance"
              value={balance}
              precision={2}
              prefix="Rs."
              valueStyle={{ color: balance >= 0 ? "#52C41A" : "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Header Actions */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col xs={24} md={16}>
          <Space wrap>
            <Input
              placeholder="Search transactions..."
              prefix={<SearchOutlined />}
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              style={{ width: 250 }}
            />
            <Select
              placeholder="Category"
              allowClear
              value={filters.category}
              onChange={(value) => setFilters({ ...filters, category: value })}
              style={{ width: 150 }}
            >
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
            <Input
              placeholder="Filter by type"
              prefix={<FilterOutlined />}
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              style={{ width: 200 }}
            />
            <Dropdown overlay={exportMenu}>
              <Button icon={<DownloadOutlined />}>Save As</Button>
            </Dropdown>
          </Space>
        </Col>
        <Col
          xs={24}
          md={8}
          style={{ textAlign: "right", marginTop: { xs: 16, md: 0 } }}
        ></Col>
      </Row>

      {/* Transaction Table */}
      <Card bordered={false}>
        <Table
          columns={columns}
          dataSource={filteredTransactions}
          rowKey="_id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingRecord ? "Edit Transaction" : "Add New Transaction"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingRecord(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editingRecord}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please input the amount!" }]}
          >
            <Input type="number" prefix="Rs." />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please input the type!" }]}
          >
            <Select>
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="Investment">Investment</Select.Option>
              <Select.Option value="Savings">Savings</Select.Option>
              <Select.Option value="Rent">Rent</Select.Option>
              <Select.Option value="Bills">Bills</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Shopping">Shopping</Select.Option>
              <Select.Option value="Travel">Travel</Select.Option>
              <Select.Option value="Entertainment">Entertainment</Select.Option>
              <Select.Option value="Education">Education</Select.Option>
              <Select.Option value="Healthcare">Healthcare</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select the category!" }]}
          >
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  setEditingRecord(null);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#52C41A" }}
              >
                {editingRecord ? "Update" : "Add"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <TransactionModals
        onAdd={() => {
          setChange(!change);
        }}
      />
    </div>
  );
};

export default Transaction;
