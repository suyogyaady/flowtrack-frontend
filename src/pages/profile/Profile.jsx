import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Modal,
  Spin,
  message,
  Card,
  Divider,
  Space,
  Typography,
  theme,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  CameraOutlined,
  LockOutlined,
  DeleteOutlined,
  EditOutlined,
  CloudUploadOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import {
  getSingleprofileApi,
  updateProfileApi,
  uploadProfilePictureApi,
} from "../../apis/Api";
import ChangePassword from "./Component/ChangePassword";
import DeleteAccount from "./Component/DeleteAccount";

const { Title, Text } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const [isGoogle, setIsGoogle] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteAccount, setShowDeleteAccountModal] = useState(false);
  const { token } = theme.useToken();

  const titleOptions = [
    { value: "", label: "Select your title", disabled: true },
    { value: "Student", label: "Student" },
    { value: "Teacher", label: "Teacher" },
    { value: "Businessman", label: "Businessman" },
    { value: "Banker", label: "Banker" },
    { value: "Trader", label: "Trader" },
    { value: "Developer", label: "Developer" },
    { value: "Engineer", label: "Engineer" },
    { value: "Doctor", label: "Doctor" },
    { value: "Consultant", label: "Consultant" },
    { value: "Entrepreneur", label: "Entrepreneur" },
    { value: "Accountant", label: "Accountant" },
    { value: "Manager", label: "Manager" },
    { value: "Designer", label: "Designer" },
    { value: "Other", label: "Other" },
  ];

  // Styles
  const containerStyle = {
    minHeight: "100vh",
    background: token.colorBgContainer,
    padding: "24px",
  };

  const cardStyle = {
    background: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,
  };

  const headerStyle = {
    background: `linear-gradient(135deg, ${token.colorPrimary}, ${token.colorPrimaryActive})`,
    padding: "32px 24px",
    borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,
    marginBottom: "24px",
  };

  const fetchProfileData = async () => {
    try {
      const res = await getSingleprofileApi();
      const { username, email, title, profilePicture, isGoogle } =
        res.data.user;
      setUsername(username);
      setEmail(email);
      setTitle(title);
      setIsGoogle(isGoogle);
      console.log(isGoogle);

      setPreviewImage(profilePicture);
      form.setFieldsValue({ username, email, title });
    } catch (error) {
      message.error("Failed to fetch user profile");
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    fetchProfileData();
  }, []);

  const handleImageUpload = async (info) => {
    const formData = new FormData();
    formData.append("newImage", info);

    try {
      setIsLoading(true);
      const res = await uploadProfilePictureApi(formData);
      if (res.status === 200) {
        message.success({
          content: "Profile picture updated successfully",
          icon: <CloudUploadOutlined style={{ color: token.colorSuccess }} />,
        });
        await fetchProfileData();
      }
    } catch (error) {
      message.error({
        content: "Failed to upload profile picture",
        icon: <CloudUploadOutlined style={{ color: token.colorError }} />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const res = await updateProfileApi(formData);
      if (res.status === 200) {
        message.success({
          content: "Profile updated successfully",
          icon: <EditOutlined style={{ color: token.colorSuccess }} />,
        });
        window.location.reload();
      }
    } catch (error) {
      message.error({
        content: "Failed to update profile",
        icon: <EditOutlined style={{ color: token.colorError }} />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div
        style={{
          ...containerStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Card style={cardStyle} bordered={false}>
        <div style={headerStyle}>
          <Title
            level={2}
            style={{
              color: token.colorTextLightSolid,
              margin: 0,
              textAlign: "center",
            }}
          >
            Profile Settings
          </Title>
        </div>

        <div style={{ padding: "0 24px 24px" }}>
          {/* Profile Picture Section */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={(file) => {
                handleImageUpload(file);
              }}
            >
              <div
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {isGoogle ? (
                  <>
                    <img
                      src={previewImage}
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.3s",
                        ":hover": { opacity: 1 },
                      }}
                    >
                      <CameraOutlined style={{ fontSize: 24, color: "#fff" }} />
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={`http://localhost:5000${previewImage}`}
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.3s",
                        ":hover": { opacity: 1 },
                      }}
                    >
                      <CameraOutlined style={{ fontSize: 24, color: "#fff" }} />
                    </div>
                  </>
                )}
              </div>
            </Upload>
          </div>

          <Form form={form} layout="vertical" onFinish={handleUpdate}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              <Form.Item
                name="username"
                label={<Text strong>Username</Text>}
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  size="large"
                  placeholder="Enter username"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={<Text strong>Email</Text>}
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  size="large"
                  placeholder="Enter email"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="title"
              label={<Text strong>Title</Text>}
              rules={[{ required: true, message: "Please select a title" }]}
            >
              <Select
                options={titleOptions}
                size="large"
                placeholder="Select your title"
              />
            </Form.Item>

            <Divider />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                icon={<EditOutlined />}
                size="large"
                block
              >
                Save Changes
              </Button>

              <Button
                icon={<SafetyCertificateOutlined />}
                onClick={() => setShowPasswordModal(true)}
                size="large"
                block
              >
                Change Password
              </Button>

              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => setShowDeleteAccountModal(true)}
                size="large"
                block
              >
                Delete Account
              </Button>
            </div>
          </Form>
        </div>
      </Card>

      {/* Modals */}
      <Modal
        title={
          <Space>
            <LockOutlined /> <span>Change Password</span>
          </Space>
        }
        open={showPasswordModal}
        onCancel={() => setShowPasswordModal(false)}
        footer={null}
        width={480}
      >
        <ChangePassword />
      </Modal>

      <Modal
        title={
          <Space>
            <DeleteOutlined />{" "}
            <span style={{ color: token.colorError }}>Delete Account</span>
          </Space>
        }
        open={showDeleteAccount}
        onCancel={() => setShowDeleteAccountModal(false)}
        footer={null}
        width={480}
      >
        <DeleteAccount />
      </Modal>
    </div>
  );
};

export default Profile;
