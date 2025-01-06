import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  FileTextOutlined,
  LineChartOutlined,
  SettingOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  BarChartOutlined,
  LogoutOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  Modal,
  Drawer,
  Avatar,
  Typography,
  theme,
  ConfigProvider,
} from "antd";
import { getSingleprofileApi } from "../../apis/Api";

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  // Automatically set the selected menu key based on the URL path
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  // Custom theme configuration
  const { token } = theme.useToken();
  const themeConfig = {
    token: {
      colorPrimary: "#4CAF50",
      colorPrimaryHover: "#45a049",
      colorPrimaryActive: "#3d8b40",
    },
    components: {
      Menu: {
        itemSelectedBg: "#e8f5e9",
        itemSelectedColor: "#2e7d32",
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileDrawerOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    fetchProfileData();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Update selected key whenever the location changes
    setSelectedKey(location.pathname);
  }, [location]);

  const fetchProfileData = async () => {
    try {
      const res = await getSingleprofileApi();
      setPreviewImage(res.data.user.profilePicture);
      setUser(res.data.user);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const mainMenuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/transactions",
      icon: <FileTextOutlined />,
      label: "Transactions",
    },
    {
      key: "/expense",
      icon: <ArrowDownOutlined />,
      label: "Expense",
    },
    {
      key: "/income",
      icon: <ArrowUpOutlined />,
      label: "Income",
    },
    {
      key: "/reports",
      icon: <BarChartOutlined />,
      label: "Reports",
    },
    {
      key: "/analytics",
      icon: <LineChartOutlined />,
      label: "Analytics",
    },
  ];

  const settingsMenuItems = [
    {
      key: "/settings/profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "/settings/help",
      icon: <QuestionCircleOutlined />,
      label: "Help",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      setLogoutModalVisible(true);
      return;
    }
    setSelectedKey(key);
    navigate(key);
    if (mobileView) {
      setMobileDrawerOpen(false);
    }
  };

  const sidebarStyle = {
    backgroundColor: token.colorBgContainer,
    borderRight: `1px solid ${token.colorBorder}`,
  };

  const logoSectionStyle = {
    padding: token.padding,
    borderBottom: `1px solid ${token.colorBorder}`,
    backgroundColor: token.colorBgContainer,
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const profileSectionStyle = {
    padding: token.padding,
    borderTop: `1px solid ${token.colorBorder}`,
    backgroundColor: token.colorBgElevated,
  };

  const SidebarContent = () => (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: token.colorBgContainer,
      }}
    >
      <div style={logoSectionStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/assets/images/Logo2.png"
            alt="FlowTrack"
            style={{ width: 32, height: 32, transition: "all 0.3s" }}
          />
          {!collapsed && (
            <Text
              strong
              style={{
                marginLeft: token.margin,
                color: token.colorText,
                fontSize: token.fontSizeHeading4,
              }}
            >
              FlowTrack
            </Text>
          )}
        </div>
      </div>

      <div style={{ flex: 1, paddingTop: token.padding }}>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={mainMenuItems}
          onClick={handleMenuClick}
          style={{ border: "none" }}
        />
      </div>

      <div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={settingsMenuItems}
          onClick={handleMenuClick}
          style={{
            borderTop: `1px solid ${token.colorBorder}`,
          }}
        />
      </div>

      {user && (
        <div style={profileSectionStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: token.padding,
              borderRadius: token.borderRadius,
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: token.colorBgTextHover,
              },
            }}
          >
            <Avatar
              size={collapsed ? 32 : 40}
              src={
                user.isGoogle
                  ? previewImage
                  : `http://localhost:5000/${previewImage}`
              }
              style={{
                flexShrink: 0,
                border: `2px solid ${themeConfig.token.colorPrimary}`,
              }}
            />
            {!collapsed && (
              <div style={{ marginLeft: token.margin, minWidth: 0 }}>
                <Text
                  strong
                  style={{
                    display: "block",
                    color: token.colorText,
                  }}
                >
                  {user.username}
                </Text>
                <Text
                  style={{
                    color: token.colorTextSecondary,
                    fontSize: token.fontSizeSM,
                  }}
                >
                  {user.email}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ConfigProvider theme={themeConfig}>
      {mobileView ? (
        <>
          <Button
            type="primary"
            icon={
              mobileDrawerOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
            }
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            style={{
              position: "fixed",
              top: token.margin,
              left: token.margin,
              zIndex: 50,
            }}
          />
          <Drawer
            placement="left"
            onClose={() => setMobileDrawerOpen(false)}
            open={mobileDrawerOpen}
            width={280}
            bodyStyle={{ padding: 0 }}
            contentWrapperStyle={{ width: 280 }}
            maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}
            style={{ padding: 0 }}
          >
            <SidebarContent />
          </Drawer>
        </>
      ) : (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={280}
          style={{
            ...sidebarStyle,
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            boxShadow: token.boxShadow,
          }}
        >
          <SidebarContent />
        </Sider>
      )}

      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <LogoutOutlined style={{ marginRight: token.margin }} />
            Confirm Logout
          </div>
        }
        open={logoutModalVisible}
        onOk={handleLogout}
        onCancel={() => setLogoutModalVisible(false)}
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </ConfigProvider>
  );
};

export default Sidebar;
