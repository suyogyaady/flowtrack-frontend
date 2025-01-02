import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { Plus, Minus } from "lucide-react";
import { getSingleprofileApi } from "../../apis/Api";

const Dashboard = () => {
  const sidebarWidth = "240px";

  //use state for user's budget
  const [budget, setBudget] = useState(0);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Call API initially (page load) - set all fetch details to state(1)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    getSingleprofileApi()
      .then((res) => {
        console.log("API response:", res.data);
        const { budget } = res.data.user;
        setBudget(budget);
        setIsLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Ensure loading state is updated
      });
  }, []);

  const monthlyData = [
    { month: "Jan", amount: 18000 },
    { month: "Feb", amount: 55000 },
    { month: "Mar", amount: 22000 },
    { month: "Apr", amount: 4000 },
    { month: "May", amount: 18000 },
    { month: "Jun", amount: 58000 },
    { month: "Jul", amount: 62000 },
    { month: "Aug", amount: 42000 },
    { month: "Sep", amount: 35000 },
    { month: "Oct", amount: 32000 },
    { month: "Nov", amount: 18000 },
    { month: "Dec", amount: 8000 },
  ];

  const expenseData = [
    { name: "Transportation", value: 120, color: "#22c55e" },
    { name: "Grocery", value: 150, color: "#3b82f6" },
    { name: "Gift", value: 999, color: "#ef4444" },
  ];

  const transactions = [
    {
      name: "KFC",
      category: "Food",
      amount: "Rs.5500",
      date: "17th Feb, 2024",
      type: "expense",
    },
    {
      name: "April Salary",
      category: "Salary",
      amount: "Rs.50000",
      date: "21st May, 2024",
      type: "income",
    },
    {
      name: "Pushpa 2",
      category: "Entertainment",
      amount: "Rs.2100",
      date: "6th Jun, 2024",
      type: "expense",
    },
    {
      name: "Polo",
      category: "Clothes",
      amount: "Rs.6500",
      date: "19th Aug, 2024",
      type: "expense",
    },
    {
      name: "Vision Dividend",
      category: "Income",
      amount: "Rs.175000",
      date: "7th Dec, 2024",
      type: "income",
    },
  ];

  return (
    <>
      <div
        style={{
          marginLeft: sidebarWidth,
          padding: "24px",
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          {/* Total Balance Card */}
          {/* Total Balance Card */}
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <div style={{ color: "#888" }}>Total Balance</div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              {isLoading ? "Loading..." : `Rs.${budget}`}
            </div>
          </div>

          {/* Total Expense Card */}
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <div style={{ color: "#888" }}>Total Expense</div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>Rs.7,540</div>
          </div>

          {/* Total Income Card */}
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <div style={{ color: "#888" }}>Total Income</div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>Rs.7,540</div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Overview Chart */}
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Overview
            </h2>
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Bar dataKey="amount" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expense Distribution */}
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Lifestyle
            </h2>
            <div style={{ height: "300px" }}>
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
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: "16px" }}>
              {expenseData.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: item.color,
                      }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span>${item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "16px",
              borderRadius: "8px",
              gridColumn: "span 2",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Transactions
            </h2>
            <div>
              {transactions.map((transaction) => (
                <div
                  key={transaction.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px",
                    marginBottom: "8px",
                    borderRadius: "6px",
                    transition: "background-color 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#333")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <div>
                    <div style={{ fontWeight: 500 }}>{transaction.name}</div>
                    <div style={{ color: "#888", fontSize: "14px" }}>
                      {transaction.category}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        color:
                          transaction.type === "income" ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {transaction.amount}
                    </div>
                    <div style={{ color: "#888", fontSize: "14px" }}>
                      {transaction.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          zIndex: 1000,
        }}
      >
        <button
          style={{
            width: "56px",
            height: "56px",
            backgroundColor: "#22c55e",
            color: "white",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(34, 197, 94, 0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          title="Add Income"
        >
          <Plus size={24} />
        </button>
        <button
          style={{
            width: "56px",
            height: "56px",
            backgroundColor: "#ef4444",
            color: "white",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          title="Add Expense"
        >
          <Minus size={24} />
        </button>
      </div>
    </>
  );
};

export default Dashboard;
