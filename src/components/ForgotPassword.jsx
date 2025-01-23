import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { resetPassword, sendPasswordResetEmail } from "../apis/Api";

const ForgotPasswordModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (values) => {
    setLoading(true);
    sendPasswordResetEmail(values.email)
      .then((response) => {
        if (response.data.success) {
          message.success("OTP sent successfully");
          setIsOtpSent(true);
          setEmail(values.email);
        } else {
          message.error(response.data.message || "Failed to send OTP");
        }
      })
      .catch((error) => {
        message.error("Failed to send OTP");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResetPassword = async (values) => {
    setLoading(true);
    resetPassword({ email, otp: values.otp, newPassword: values.newPassword })
      .then((response) => {
        if (response.data.success) {
          message.success("Password reset successfully");
          onClose();
        } else {
          message.error(response.data.message || "Failed to reset password");
        }
      })
      .catch((error) => {
        message.error("Failed to reset password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsOtpSent(false);
    setEmail("");
    onClose();
  };

  return (
    <Modal
      title={isOtpSent ? "Reset Password" : "Forgot Password"}
      open={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={isOtpSent ? handleResetPassword : handleSendOtp}
      >
        {!isOtpSent ? (
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
        ) : (
          <>
            <Form.Item
              name="otp"
              label="OTP"
              rules={[{ required: true, message: "Please input the OTP!" }]}
            >
              <Input placeholder="Enter OTP sent to your email" />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: "Please input your new password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password placeholder="Enter new password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match!");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>
          </>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {isOtpSent ? "Reset Password" : "Send OTP"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForgotPasswordModal;
