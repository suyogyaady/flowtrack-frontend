// ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout
      style={{
        overflow: "hidden",
        background: "#181818",
      }}
    >
      <Sidebar
        onCollapse={(collapsed) => setSidebarCollapsed(collapsed)}
        onMobileChange={(isMobile) => setIsMobileView(isMobile)}
      />
      <Layout
        style={{
          minHeight: "100vh",
          transition: "all 0.2s",
          marginLeft: isMobileView ? 0 : sidebarCollapsed ? 80 : 280,
          background: "#181818",
        }}
      >
        <Content
          style={{
            margin: isMobileView ? "64px 16px 24px" : "24px 16px",
            padding: 24,
            background: "#181818",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default ProtectedRoute;
