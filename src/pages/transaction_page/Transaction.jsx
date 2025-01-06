import React, { useState } from "react";
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
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Transaction = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "KFC",
      amount: 5500,
      type: "Food",
      category: "expense",
      date: "2024-02-17",
    },
    {
      id: 2,
      name: "April Salary",
      amount: 50000,
      type: "Salary",
      category: "income",
      date: "2024-05-21",
    },
    {
      id: 3,
      name: "Pushpa 2",
      amount: 2100,
      type: "Entertainment",
      category: "expense",
      date: "2024-06-06",
    },
    {
      id: 4,
      name: "Polo",
      amount: 6500,
      type: "Clothes",
      category: "expense",
      date: "2024-08-19",
    },
    {
      id: 5,
      name: "Vision Dividend",
      amount: 175000,
      type: "Income",
      category: "income",
      date: "2024-12-07",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    search: "",
  });
  const [editingRecord, setEditingRecord] = useState(null);

  const totalIncome = transactions
    .filter((t) => t.category === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.category === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <Text strong>{text}</Text>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <Text
          strong
          style={{
            color: record.category === "income" ? "#52C41A" : "#ff4d4f",
            fontSize: "16px",
          }}
        >
          {record.category === "income" ? "₹" : "-₹"}
          {amount.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag color={category === "income" ? "success" : "error"}>
          {category.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: "#1890ff" }}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              style={{ color: "#ff4d4f" }}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this transaction?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        setTransactions(transactions.filter((t) => t.id !== id));
      },
    });
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({
      ...record,
      date: record.date ? new Date(record.date) : null,
    });
    setIsModalVisible(true);
  };

  const handleSubmit = (values) => {
    const formattedValues = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
      amount: Number(values.amount),
    };

    if (editingRecord) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingRecord.id
            ? { ...formattedValues, id: editingRecord.id }
            : t
        )
      );
    } else {
      const newTransaction = {
        id: Math.max(...transactions.map((t) => t.id)) + 1,
        ...formattedValues,
      };
      setTransactions([...transactions, newTransaction]);
    }

    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const filteredTransactions = transactions.filter((t) => {
    const searchMatch =
      t.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.type.toLowerCase().includes(filters.search.toLowerCase());
    const categoryMatch = !filters.category || t.category === filters.category;
    const typeMatch =
      !filters.type ||
      t.type.toLowerCase().includes(filters.type.toLowerCase());

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
              prefix="₹"
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
              prefix="₹"
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
              prefix="₹"
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
          </Space>
        </Col>
        <Col
          xs={24}
          md={8}
          style={{ textAlign: "right", marginTop: { xs: 16, md: 0 } }}
        >
          <Space wrap style={{ justifyContent: "flex-end" }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingRecord(null);
                form.resetFields();
                setIsModalVisible(true);
              }}
              style={{ backgroundColor: "#52C41A" }}
            >
              Add Transaction
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Transaction Table */}
      <Card bordered={false}>
        <Table
          columns={columns}
          dataSource={filteredTransactions}
          rowKey="id"
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
            <Input type="number" prefix="₹" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please input the type!" }]}
          >
            <Input />
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
    </div>
  );
};

export default Transaction;
