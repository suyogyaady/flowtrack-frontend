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

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
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

      const response = await loginWithGoogle({
        token: credentialResponse.credential,
      });

      if (response.data.success) {
        message.success("Successfully logged in with Google!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.userData));
        navigate(
          response.data.userData.isAdmin ? "/admin/dashboard" : "/dashboard"
        );
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
      navigate(res.data.userData.isAdmin ? "/admin/dashboard" : "/dashboard");
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
              <div style={{ textAlign: "center" }}>
                <img
                  src="/logo.png"
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
                {/* Login Form Section */}
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
                    Welcome Back
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
                        style={{ height: 48, marginBottom: 24 }}
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

                {/* Right Section - Feature Highlights */}
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
                      src="/feature-image.png"
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
            border-color: #1890ff;
          }

          .ant-btn-primary {
            background: linear-gradient(45deg, #1890ff, #096dd9);
          }

          .ant-btn-primary:hover {
            background: linear-gradient(45deg, #40a9ff, #1890ff);
          }
        `}
      </style>
    </Layout>
  );
};

export default Login;
