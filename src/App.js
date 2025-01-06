// App.jsx
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ConfigProvider, theme, App as AntApp, notification } from "antd";
import LandingPage from "./pages/landing_page/LandingPage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import HelpPage from "./pages/help_page/HelpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Transaction from "./pages/transaction_page/Transaction";
import Expense from "./pages/expense_page/Expense";
import Income from "./pages/income_page/Income";
import Report from "./pages/reports_page/Report";

const customTheme = {
  token: {
    background: "black",
    colorPrimary: "#000000",
    borderRadius: 8,
    colorBgContainer: "#141414",
    colorBgElevated: "#1f1f1f",
    colorBorder: "#303030",
    colorText: "#ffffff",
    colorTextSecondary: "rgba(255, 255, 255, 0.65)",
    controlHeight: 40,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    // Additional custom tokens
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1890ff",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
  },
  components: {
    Button: {
      primaryColor: "#28A648",
      borderRadius: 8,
      controlHeight: 40,
    },
    Input: {
      controlHeight: 40,
      borderRadius: 8,
    },
    Card: {
      borderRadius: 12,
    },
  },
};

function App() {
  notification.config({
    placement: "topRight",
    duration: 3,
    rtl: false,
  });

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        ...customTheme,
      }}
    >
      <AntApp>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes Group */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Transaction />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expense"
              element={
                <ProtectedRoute>
                  <Expense />
                </ProtectedRoute>
              }
            />
            <Route
              path="/income"
              element={
                <ProtectedRoute>
                  <Income />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Report />
                </ProtectedRoute>
              }
            />

            {/* Settings Routes */}
            <Route path="/settings">
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="help"
                element={
                  <ProtectedRoute>
                    <HelpPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
