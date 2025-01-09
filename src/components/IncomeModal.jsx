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
import { createIncomeApi, createTransactionApi } from "../apis/Api";

const { Option } = Select;

const IncomeModals = ({ open, onClose, onAdd }) => {
  const [incomeForm] = Form.useForm();

  const categoryOptions = {
    income: [
      "Salary",
      "Interest Received",
      "Dividend",
      "Bonus",
      "Overtime",
      "Rental Income",
      "Investment",
      "Pension",
      "Other",
    ],
  };

  const handleIncomeSubmit = (values) => {
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
          .then(() => {
            message.success("Income added successfully!");
            incomeForm.resetFields();
            onClose();
            onAdd();
          })
          .catch((err) => {
            console.error("Transaction creation failed:", err);
            message.error("Failed to create the transaction.");
          });
      })
      .catch((err) => {
        console.error("Income creation failed:", err);
        message.error("Failed to add the income.");
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
    <Modal title="Add Income" open={open} onCancel={onClose} footer={null}>
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
  );
};

export default IncomeModals;
