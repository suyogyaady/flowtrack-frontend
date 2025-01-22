import React from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  message,
} from "antd";
import { createExpenseApi, createTransactionApi } from "../apis/Api";

const { Option } = Select;

const ExpenseModal = ({ open, onClose, onAdd }) => {
  const [expenseForm] = Form.useForm();

  const categoryOptions = {
    expense: [
      "Food",
      "Transportation",
      "Utilities",
      "Entertainment",
      "Healthcare",
      "Clothing",
      "Education",
      "Personal",
      "Gifts",
      "Other",
    ],
  };
  const handleExpenseSubmit = (values) => {
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
          IncomeId: null,
          transactionDate: values.date.format("YYYY-MM-DD"),
        })
          .then(() => {
            message.success("Expense added successfully!");
            expenseForm.resetFields();
            onClose();
            onAdd();
          })
          .catch((err) => {
            console.error("Transaction creation failed:", err);
            message.error("Failed to create the transaction.");
          });
      })
      .catch((err) => {
        console.error("Expense creation failed:", err);
        message.error("Failed to add the expense.");
      });
  };

  const FormContent = ({ categories }) => (
    <>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Please enter a name" },
          { min: 3, message: "Name must be at least 3 characters long" },
        ]}
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
        rules={[
          { required: true, message: "Please enter an amount" },
          {
            validator: (_, value) =>
              value > 0
                ? Promise.resolve()
                : Promise.reject(new Error("Amount must be greater than 0")),
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          formatter={(value) =>
            value ? `Rs. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
          }
          parser={(value) => value.replace(/Rs\.\s?|(,*)/g, "")}
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
    <Modal title="Add Expense" open={open} onCancel={onClose} footer={null}>
      <Form form={expenseForm} layout="vertical" onFinish={handleExpenseSubmit}>
        <FormContent categories={categoryOptions.expense} />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", backgroundColor: "#52c41a" }}
          >
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExpenseModal;
