import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  DatePicker,
  Radio,
  Card,
  Typography,
  Button,
  Modal,
} from "antd";
import { FilterOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const Report = () => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filterType, setFilterType] = useState("monthly");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample data - replace with your actual data
  const data = [
    { month: "Jan", income: 38, expense: 60 },
    { month: "Feb", income: 90, expense: 55 },
    { month: "Mar", income: 32, expense: 85 },
    { month: "Apr", income: 28, expense: 82 },
    { month: "May", income: 15, expense: 35 },
    { month: "Jun", income: 12, expense: 90 },
    { month: "Jul", income: 78, expense: 95 },
    { month: "Aug", income: 18, expense: 68 },
    { month: "Sep", income: 65, expense: 15 },
    { month: "Oct", income: 72, expense: 55 },
    { month: "Nov", income: 60, expense: 36 },
    { month: "Dec", income: 45, expense: 82 },
  ];

  const showFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const handleOk = () => {
    setIsFilterModalVisible(false);
  };

  const handleCancel = () => {
    setIsFilterModalVisible(false);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header with Filter Button */}
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="m-0 text-green-500">
            Reports
          </Title>
          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={showFilterModal}
            className="bg-black hover:bg-gray-800"
          >
            Filter
          </Button>
        </div>

        {/* Main Chart Card - Now Bigger */}
        <Card className="shadow-lg rounded-lg mb-6">
          <div className="h-[calc(100vh-280px)] min-h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 14 }}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis tick={{ fontSize: 14 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                />
                <Legend
                  height={36}
                  iconSize={10}
                  wrapperStyle={{ fontSize: "14px" }}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#818cf8"
                  strokeWidth={3}
                  dot={{ r: 6, strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#f87171"
                  strokeWidth={3}
                  dot={{ r: 6, strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-md">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Total Income</p>
              <p className="text-2xl font-semibold text-green-500">$12,450</p>
            </div>
          </Card>
          <Card className="shadow-md">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Total Expenses</p>
              <p className="text-2xl font-semibold text-red-500">$8,250</p>
            </div>
          </Card>
          <Card className="shadow-md">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Net Savings</p>
              <p className="text-2xl font-semibold text-blue-500">$4,200</p>
            </div>
          </Card>
        </div>

        {/* Filter Modal */}
        <Modal
          title="Filter Options"
          open={isFilterModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleOk}
              className="bg-black hover:bg-gray-800"
            >
              Apply Filters
            </Button>,
          ]}
        >
          <div className="space-y-6 py-4">
            <div>
              <p className="text-gray-600 mb-2">Time Period</p>
              <Radio.Group
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full"
              >
                <div className="grid grid-cols-3 gap-2">
                  <Radio.Button value="weekly" className="text-center">
                    Weekly
                  </Radio.Button>
                  <Radio.Button value="monthly" className="text-center">
                    Monthly
                  </Radio.Button>
                  <Radio.Button value="yearly" className="text-center">
                    Yearly
                  </Radio.Button>
                </div>
              </Radio.Group>
            </div>

            <div>
              <p className="text-gray-600 mb-2">Category</p>
              <Select
                defaultValue="all"
                style={{ width: "100%" }}
                onChange={setSelectedCategory}
                options={[
                  { value: "all", label: "All Categories" },
                  { value: "food", label: "Food" },
                  { value: "transport", label: "Transport" },
                  { value: "utilities", label: "Utilities" },
                ]}
              />
            </div>

            <div>
              <p className="text-gray-600 mb-2">Date Range</p>
              <RangePicker className="w-full" />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Report;
