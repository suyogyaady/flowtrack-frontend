import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  InputNumber,
  message,
} from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  createExpenseApi,
  createIncomeApi,
  createTransactionApi,
} from "../apis/Api";

const { Option } = Select;

const TransactionModals = ({ onAdd }) => {
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [incomeForm] = Form.useForm();
  const [expenseForm] = Form.useForm();

  const categoryOptions = {
    income: ["Salary", "Investment", "Dividend", "Bonus", "Other"],
    expense: [
      "Food",
      "Transportation",
      "Entertainment",
      "Shopping",
      "Utilities",
      "Other",
    ],
  };

  const handleIncomeSubmit = (values) => {
    console.log("Income submitted:", {
      ...values,
      type: "income",
      date: values.date.format("YYYY-MM-DD"),
    });

    createIncomeApi({
      incomeName: values.name,
      incomeAmount: values.amount,
      incomeDescription: values.notes,
      incomeCategory: values.category,
      incomeDate: values.date.format("YYYY-MM-DD"),
    })
      .then((res) => {
        createTransactionApi({
          transactionType: "Income",
          ExpenseID: null,
          IncomeID: res.data.data._id,
          transactionDate: values.date.format("YYYY-MM-DD"),
        })
          .then((res) => {
            message.success("Income added successfully!");
            incomeForm.resetFields();
            setIsIncomeModalOpen(false);
            onAdd();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    // incomeForm.resetFields();
    // setIsIncomeModalOpen(false);
  };

  const handleExpenseSubmit = (values) => {
    console.log("Expense submitted:", {
      ...values,
      type: "expense",
      date: values.date.format("YYYY-MM-DD"),
    });

    createExpenseApi({
      expenseName: values.name,
      expenseAmount: values.amount,
      expenseDescription: values.notes,
      expenseCategory: values.category,
      expenseDate: values.date.format("YYYY-MM-DD"),
    })
      .then((res) => {
        createTransactionApi({
          transactionType: "Expense",
          ExpenseID: res.data.expense._id,
          IncomeID: null,
          transactionDate: values.date.format("YYYY-MM-DD"),
        })
          .then((res) => {
            message.success("Income added successfully!");
            expenseForm.resetFields();
            setIsExpenseModalOpen(false);
            onAdd();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    // expenseForm.resetFields();
    // setIsExpenseModalOpen(false);
  };

  const FormContent = ({ categories }) => (
    <>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter a name" }]}
      >
        <Input placeholder="Enter transaction name" />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select placeholder="Select category">
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: "Please enter an amount" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          formatter={(value) =>
            `Rs. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/Rs\.\s?|(,*)/g, "")}
          min={0}
        />
      </Form.Item>

      <Form.Item
        name="date"
        label="Date"
        rules={[{ required: true, message: "Please select a date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="notes" label="Notes">
        <Input.TextArea rows={4} placeholder="Enter additional notes" />
      </Form.Item>
    </>
  );

  return (
    <>
      {/* Income Modal */}
      <Modal
        title="Add Income"
        open={isIncomeModalOpen}
        onCancel={() => setIsIncomeModalOpen(false)}
        footer={null}
      >
        <Form form={incomeForm} layout="vertical" onFinish={handleIncomeSubmit}>
          <FormContent categories={categoryOptions.income} />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", backgroundColor: "#52c41a" }}
            >
              Add Income
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Expense Modal */}
      <Modal
        title="Add Expense"
        open={isExpenseModalOpen}
        onCancel={() => setIsExpenseModalOpen(false)}
        footer={null}
      >
        <Form
          form={expenseForm}
          layout="vertical"
          onFinish={handleExpenseSubmit}
        >
          <FormContent categories={categoryOptions.expense} />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              danger
              style={{ width: "100%" }}
            >
              Add Expense
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Floating Action Buttons */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: "flex",
          gap: 16,
          zIndex: 1000,
        }}
      >
        <Button
          type="primary"
          shape="circle"
          icon={<PlusCircleOutlined />}
          size="large"
          onClick={() => setIsIncomeModalOpen(true)}
          style={{
            backgroundColor: "#52c41a",
            boxShadow: "0 2px 8px rgba(82, 196, 26, 0.5)",
          }}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<MinusCircleOutlined />}
          size="large"
          danger
          onClick={() => setIsExpenseModalOpen(true)}
          style={{
            boxShadow: "0 2px 8px rgba(245, 34, 45, 0.5)",
          }}
        />
      </div>
    </>
  );
};

export default TransactionModals;
