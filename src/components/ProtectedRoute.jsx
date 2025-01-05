import { Navigate, useLocation } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./sidebar/Sidebar";
const { Content } = Layout;

const MainLayout = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Layout
      style={{
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <Layout
        style={{ minHeight: "100vh", transition: "all 0.2s", marginLeft: 300 }}
      >
        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
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
