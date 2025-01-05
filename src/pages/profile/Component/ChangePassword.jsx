import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  message,
  Space,
  Typography,
  theme,
} from "antd";
import {
  LockOutlined,
  SafetyCertificateOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { changePasswordApi } from "../../../apis/Api";

const { Text } = Typography;

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { token } = theme.useToken();

  const handleSubmit = async (values) => {
    const { oldPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      message.error({
        content: "New passwords do not match!",
        icon: <KeyOutlined style={{ color: token.colorError }} />,
      });
      return;
    }

    if (oldPassword === newPassword) {
      message.error({
        content: "New password cannot be the same as the old password!",
        icon: <KeyOutlined style={{ color: token.colorError }} />,
      });
      return;
    }

    try {
      setLoading(true);
      const data = {
        currentPassword: oldPassword,
        newPassword: newPassword,
      };

      const response = await changePasswordApi(data);

      if (response.data.success) {
        message.success({
          content: "Password changed successfully!",
          icon: (
            <SafetyCertificateOutlined style={{ color: token.colorSuccess }} />
          ),
        });
        form.resetFields();
      } else {
        message.error({
          content: response.data.message || "Something went wrong!",
          icon: <KeyOutlined style={{ color: token.colorError }} />,
        });
      }
    } catch (error) {
      console.error(error);
      message.error({
        content: error.response?.data?.message || "Failed to change password!",
        icon: <KeyOutlined style={{ color: token.colorError }} />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Form.Item
            name="oldPassword"
            label={<Text strong>Current Password</Text>}
            rules={[
              {
                required: true,
                message: "Please enter your current password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter current password"
              size="large"
              style={{
                background: token.colorBgContainer,
                borderColor: token.colorBorder,
              }}
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label={<Text strong>New Password</Text>}
            rules={[
              {
                required: true,
                message: "Please enter your new password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter new password"
              size="large"
              style={{
                background: token.colorBgContainer,
                borderColor: token.colorBorder,
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={<Text strong>Confirm New Password</Text>}
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm new password"
              size="large"
              style={{
                background: token.colorBgContainer,
                borderColor: token.colorBorder,
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SafetyCertificateOutlined />}
              size="large"
              block
              style={{
                backgroundColor: token.colorPrimary,
                borderColor: token.colorPrimaryBorder,
              }}
            >
              {loading ? "Changing Password..." : "Change Password"}
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default ChangePassword;
