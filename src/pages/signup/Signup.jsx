import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Layout,
  Typography,
  Spin,
  Space,
  Select,
  notification,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  DollarOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { registerUserApi } from "../../apis/Api";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Signup = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const titleOptions = [
    { value: "Student", label: "Student" },
    { value: "Professional", label: "Professional" },
    { value: "Business Owner", label: "Business Owner" },
    { value: "Developer", label: "Developer" },
    { value: "Designer", label: "Designer" },
    { value: "Other", label: "Other" },
  ];

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await registerUserApi(values);
      if (response.data.success) {
        notification.success({
          message: "Welcome aboard! 🎉",
          description: "Account created successfully. Please log in.",
          placement: "top",
        });
        form.resetFields();
        navigate("/login"); // Redirect to login page
      } else {
        throw new Error(response.data.message || "Registration failed.");
      }
    } catch (err) {
      notification.error({
        message: "Oops!",
        description: err.message || "Something went wrong. Please try again.",
        placement: "top",
      });
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
                {/* Signup Form Section */}
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
                    Create Account
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
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <UserOutlined
                              style={{ color: "rgba(255, 255, 255, 0.45)" }}
                            />
                          }
                          placeholder="Username"
                        />
                      </Form.Item>

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
                        name="title"
                        rules={[
                          {
                            required: true,
                            message: "Please select your title!",
                          },
                        ]}
                      >
                        <Select
                          options={titleOptions}
                          placeholder="Select your title"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>

                      <Form.Item
                        name="budget"
                        rules={[
                          {
                            required: true,
                            message: "Please input your budget!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <DollarOutlined
                              style={{ color: "rgba(255, 255, 255, 0.45)" }}
                            />
                          }
                          placeholder="Initial Budget"
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
                            min: 8,
                            message: "Password must be at least 8 characters!",
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

                      <Form.Item
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("Passwords don't match!")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          prefix={
                            <LockOutlined
                              style={{ color: "rgba(255, 255, 255, 0.45)" }}
                            />
                          }
                          placeholder="Confirm Password"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </Form.Item>

                      <Button
                        type="primary"
                        block
                        htmlType="submit"
                        loading={loading}
                        style={{ height: 48, marginBottom: 24 }}
                      >
                        Create Account
                      </Button>

                      <Paragraph
                        style={{ textAlign: "center", marginBottom: 0 }}
                      >
                        Already have an account?{" "}
                        <Button
                          type="link"
                          href="/login"
                          style={{ padding: "0 4px" }}
                        >
                          Sign in
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
                      Take Control of Your Finances
                    </Title>
                    <Paragraph style={{ textAlign: "center", fontSize: 16 }}>
                      Join thousands of users who are already managing their
                      finances smarter. Start tracking, budgeting, and achieving
                      your financial goals today.
                    </Paragraph>
                  </div>
                )}
              </div>
            </Space>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Signup;
