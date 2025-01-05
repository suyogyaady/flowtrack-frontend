import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Alert,
  Modal,
  message,
  Space,
  Typography,
  theme,
} from "antd";
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  LockOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { Text, Paragraph } = Typography;

const DeleteAccount = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { token } = theme.useToken();

  const showConfirmModal = (values) => {
    Modal.confirm({
      title: (
        <Space>
          <WarningOutlined style={{ color: token.colorError }} />
          <Text strong style={{ color: token.colorError }}>
            Delete Account Permanently
          </Text>
        </Space>
      ),
      icon: null,
      content: (
        <div style={{ paddingTop: "16px" }}>
          <Alert
            message="Warning: Irreversible Action"
            description="This will permanently delete your account and remove all associated data. This action cannot be undone."
            type="error"
            showIcon
            icon={<ExclamationCircleOutlined />}
            style={{ marginBottom: "16px" }}
          />
          <Paragraph>
            Please type your password to confirm this action.
          </Paragraph>
        </div>
      ),
      okText: "Delete Account",
      okButtonProps: {
        danger: true,
        icon: <DeleteOutlined />,
        size: "large",
      },
      cancelText: "Cancel",
      cancelButtonProps: {
        size: "large",
      },
      onOk: () => handleDeleteAccount(values),
      width: 480,
      centered: true,
    });
  };

  const handleDeleteAccount = async (values) => {
    try {
      setLoading(true);
      // Add your delete account API call here
      // await deleteAccountApi(values.password);

      message.success({
        content: "Account deletion process initiated successfully",
        icon: <DeleteOutlined style={{ color: token.colorSuccess }} />,
      });
      form.resetFields();
    } catch (error) {
      message.error({
        content: "Failed to delete account. Please try again.",
        icon: <DeleteOutlined style={{ color: token.colorError }} />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Alert
          message="Important Notice"
          description={
            <Space direction="vertical">
              <Text>By deleting your account:</Text>
              <ul style={{ paddingLeft: "20px", margin: "8px 0" }}>
                <li>All your data will be permanently deleted</li>
                <li>You won't be able to recover your account</li>
                <li>Your data will be removed within 90 business days</li>
                <li>
                  You'll need to create a new account to use our services again
                </li>
              </ul>
              <Text>
                Need help? Contact us at{" "}
                <a
                  href="mailto:support@example.com"
                  style={{ color: token.colorPrimary }}
                >
                  support@example.com
                </a>
              </Text>
            </Space>
          }
          type="warning"
          showIcon
          icon={<ExclamationCircleOutlined />}
        />

        <Form form={form} layout="vertical" onFinish={showConfirmModal}>
          <Form.Item
            name="password"
            label={<Text strong>Enter your password to confirm deletion</Text>}
            rules={[
              {
                required: true,
                message: "Please enter your password to confirm deletion",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              danger
              htmlType="submit"
              loading={loading}
              icon={<DeleteOutlined />}
              size="large"
              block
            >
              {loading ? "Processing..." : "Delete Account"}
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default DeleteAccount;
