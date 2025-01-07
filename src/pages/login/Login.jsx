import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Divider,
  message,
  Card,
  Layout,
  Typography,
  Spin,
  Space,
  Modal,
  Select,
  InputNumber,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import {
  getUserByGoogleEmail,
  loginUserApi,
  loginWithGoogle,
} from "../../apis/Api";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const titleOptions = [
  { value: "Student", label: "Student" },
  { value: "Professional", label: "Professional" },
  { value: "Business Owner", label: "Business Owner" },
  { value: "Developer", label: "Developer" },
  { value: "Designer", label: "Designer" },
  { value: "Other", label: "Other" },
];

const Login = () => {
  const [form] = Form.useForm();
  const [budgetForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [googleCredential, setGoogleCredential] = useState(null);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      if (!credentialResponse.credential) {
        throw new Error("Google authentication failed");
      }

      // First check if user exists
      const userCheckResponse = await getUserByGoogleEmail({
        token: credentialResponse.credential,
      });

      if (!userCheckResponse.data.data) {
        // User doesn't exist, show budget modal
        setGoogleCredential(credentialResponse.credential);
        setShowBudgetModal(true);
        setLoading(false);
        return;
      }

      // User exists, proceed with normal login
      await completeGoogleLogin(credentialResponse.credential);
    } catch (error) {
      console.error("Google login error:", error);
      message.error(
        error.message || "Failed to login with Google. Please try again."
      );
      setLoading(false);
    }
  };

  const completeGoogleLogin = async (credential, budgetData = null) => {
    try {
      setLoading(true);
      const loginData = {
        token: credential,
        ...(budgetData && {
          title: budgetData.title,
          budget: budgetData.budget,
        }),
      };

      const response = await loginWithGoogle(loginData);

      if (response.data.success) {
        message.success("Successfully logged in with Google!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.userData));
        window.location.href = response.data.userData.isAdmin
          ? "/admin/dashboard"
          : "/dashboard";
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      message.error(
        error.message || "Failed to login with Google. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBudgetModalSubmit = async () => {
    try {
      const values = await budgetForm.validateFields();
      setShowBudgetModal(false);
      await completeGoogleLogin(googleCredential, values);
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await loginUserApi(values);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      message.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.userData));
      window.location.href = res.data.userData.isAdmin
        ? "/admin/dashboard"
        : "/dashboard";
    } catch (error) {
      message.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: windowWidth > 768 ? "50px 0" : "20px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              margin: windowWidth <= 768 ? "0 16px" : 0,
            }}
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="/assets/images/LogoTextLight.png"
                  style={{
                    maxWidth: 200,
                    width: "100%",
                    marginBottom: 24,
                  }}
                  alt="Logo"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: windowWidth <= 768 ? "column" : "row",
                  gap: windowWidth <= 768 ? 32 : 48,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    borderRight:
                      windowWidth > 768
                        ? "1px solid rgba(255, 255, 255, 0.12)"
                        : "none",
                    padding: "0 24px",
                  }}
                >
                  <Title
                    level={2}
                    style={{ textAlign: "center", marginBottom: 32 }}
                  >
                    LOGIN
                  </Title>

                  <Spin spinning={loading}>
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleSubmit}
                      requiredMark={false}
                      size="large"
                    >
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email!",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <MailOutlined
                              style={{ color: "rgba(255, 255, 255, 0.45)" }}
                            />
                          }
                          placeholder="Email"
                        />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                          {
                            min: 6,
                            message: "Password must be at least 6 characters!",
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={
                            <LockOutlined
                              style={{ color: "rgba(255, 255, 255, 0.45)" }}
                            />
                          }
                          placeholder="Password"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </Form.Item>

                      <div style={{ textAlign: "right", marginBottom: 24 }}>
                        <Button type="link" style={{ padding: 0 }}>
                          Forgot Password?
                        </Button>
                      </div>

                      <Button
                        type="primary"
                        block
                        htmlType="submit"
                        loading={loading}
                        style={{
                          height: 48,
                          marginBottom: 24,
                          background: "#28A648",
                          transition: "all 0.3s ease",
                          boxShadow: "0 0 10px rgba(255, 140, 0, 0.2)",
                        }}
                      >
                        Login
                      </Button>

                      <Divider>Or continue with</Divider>

                      <div style={{ marginBottom: 24 }}>
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={() => {
                            message.error(
                              "Google login failed. Please try again."
                            );
                          }}
                          useOneTap
                          shape="rectangular"
                          theme="filled_black"
                          size="large"
                          width="100%"
                        />
                      </div>

                      <Paragraph
                        style={{ textAlign: "center", marginBottom: 0 }}
                      >
                        Don't have an account?{" "}
                        <Button
                          type="link"
                          onClick={() => navigate("/signup")}
                          style={{ padding: "0 4px" }}
                        >
                          Sign up now
                        </Button>
                      </Paragraph>
                    </Form>
                  </Spin>
                </div>

                {windowWidth > 768 && (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0 24px",
                    }}
                  >
                    <img
                      src="/assets/images/Logo2.png"
                      alt="Features"
                      style={{
                        maxWidth: 400,
                        width: "100%",
                        marginBottom: 32,
                        animation: "float 3s ease-in-out infinite",
                      }}
                    />
                    <Title
                      level={3}
                      style={{ textAlign: "center", marginBottom: 16 }}
                    >
                      Track Your Finances with Ease
                    </Title>
                    <Paragraph style={{ textAlign: "center", fontSize: 16 }}>
                      Get detailed insights into your spending patterns, set
                      budgets, and achieve your financial goals with our
                      powerful tracking tools.
                    </Paragraph>
                  </div>
                )}
              </div>
            </Space>
          </Card>
        </div>
      </Content>

      <Modal
        title="Complete Your Profile"
        open={showBudgetModal}
        onOk={handleBudgetModalSubmit}
        onCancel={() => {
          setShowBudgetModal(false);
          setGoogleCredential(null);
          budgetForm.resetFields();
        }}
        okText="Complete Registration"
        cancelText="Cancel"
        confirmLoading={loading}
        maskClosable={false}
        style={{ top: 20 }}
      >
        <Form form={budgetForm} layout="vertical" requiredMark={false}>
          <Form.Item
            name="title"
            label="What best describes you?"
            rules={[{ required: true, message: "Please select your title" }]}
          >
            <Select
              options={titleOptions}
              placeholder="Select your title"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="budget"
            label="What's your monthly budget?"
            rules={[
              { required: true, message: "Please enter your monthly budget" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              placeholder="Enter your monthly budget"
            />
          </Form.Item>
        </Form>
      </Modal>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .ant-input-affix-wrapper:focus,
          .ant-input-affix-wrapper-focused {
            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
          }

          .ant-form-item {
            margin-bottom: 24px;
          }

          .ant-input-affix-wrapper {
            background-color: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.15);
          }

          .ant-input-affix-wrapper:hover {
            border-color: #28A648;
          }

          .ant-btn-primary:hover {
            background: #28A648 !important;
            border-color: #28A648 !important;
            box-shadow: 0 0 20px rgba(0, 0, 0, 1) !important;
            transform: translateY(-1px);
          }
          
          .ant-btn-primary:active {
            transform: translateY(1px);
            box-shadow: 0 0 10px rgba(0, 0, 0, 1) !important;
          }

          .ant-modal-content,
          .ant-modal-header {
            background-color: #1f1f1f;
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          }

          .ant-modal-title {
            color: rgba(255, 255, 255, 0.85);
          }

          .ant-modal-close {
            color: rgba(255, 255, 255, 0.45);
          }

          .ant-select-selector,
          .ant-input-number {
            background-color: rgba(255, 255, 255, 0.04) !important;
            border-color: rgba(255, 255, 255, 0.15) !important;
          }

          .ant-select-selector:hover,
          .ant-input-number:hover {
            border-color: #28A648 !important;
          }

          .ant-select-focused .ant-select-selector,
          .ant-input-number-focused {
            border-color: #28A648 !important;
            box-shadow: 0 0 0 2px rgba(40, 166, 72, 0.2) !important;
          }

          .ant-input-number-input {
            color: rgba(255, 255, 255, 0.85) !important;
          }

          .ant-select-selection-placeholder,
          .ant-input-number-input::placeholder {
            color: rgba(255, 255, 255, 0.45) !important;
          }

          .ant-select-arrow {
            color: rgba(255, 255, 255, 0.45);
          }

          .ant-select-dropdown {
            background-color: #1f1f1f;
          }

          .ant-select-item {
            color: rgba(255, 255, 255, 0.85);
          }

          .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
            background-color: rgba(255, 255, 255, 0.08);
          }

          .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
            background-color: rgba(40, 166, 72, 0.2);
            color: #28A648;
          }

          .ant-form-item-label > label {
            color: rgba(255, 255, 255, 0.85);
          }

          .ant-modal-footer .ant-btn {
            background: transparent;
            border-color: rgba(255, 255, 255, 0.15);
            color: rgba(255, 255, 255, 0.85);
          }

          .ant-modal-footer .ant-btn-primary {
            background: #28A648;
            border-color: #28A648;
            color: white;
          }
        `}
      </style>
    </Layout>
  );
};

export default Login;
