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
} from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
  const [filters, setFilters] = useState({ type: "", category: "" });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <span
          className={`font-medium ${
            record.category === "income" ? "text-green-500" : "text-red-500"
          }`}
        >
          {record.category === "income" ? "₹" : "-₹"}
          {amount}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
        <div className="space-x-2">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-blue-500 hover:text-blue-600"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            className="text-red-500 hover:text-red-600"
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleAdd = (values) => {
    const newTransaction = {
      id: transactions.length + 1,
      ...values,
      date: values.date.format("YYYY-MM-DD"),
    };
    setTransactions([...transactions, newTransaction]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredTransactions = transactions.filter((t) => {
    return (
      (!filters.type ||
        t.type.toLowerCase().includes(filters.type.toLowerCase())) &&
      (!filters.category || t.category === filters.category)
    );
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="bg-green-500 hover:bg-green-600"
          onClick={() => setIsModalVisible(true)}
        >
          Add Transaction
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type Filter
            </label>
            <Input
              placeholder="Filter by type"
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Select
              className="w-full"
              placeholder="Select category"
              onChange={(value) => setFilters({ ...filters, category: value })}
              allowClear
            >
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredTransactions}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="border rounded-lg"
        />
      </div>

      <Modal
        title="Add New Transaction"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAdd}>
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
            <Input type="number" />
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
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item className="mb-0">
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-green-500 hover:bg-green-600"
              >
                Add
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Transaction;
