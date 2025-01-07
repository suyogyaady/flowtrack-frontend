import React from "react";
import { Layout, Button } from "antd";
import { ArrowRight, PieChart, TrendingUp, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <PieChart className="w-8 h-8 text-green-500" />,
      title: "Expense Analytics",
      description:
        "Visualize your spending patterns with intuitive charts and graphs",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "Budget Tracking",
      description:
        "Set and monitor budgets to reach your financial goals faster",
    },
    {
      icon: <Wallet className="w-8 h-8 text-green-500" />,
      title: "Smart Savings",
      description: "Intelligent suggestions to help you save more effectively",
    },
  ];

  return (
    <Layout className="min-h-screen" style={{ background: "#000000" }}>
      {/* Navigation */}
      <Header
        className="fixed w-full z-50"
        style={{
          background: "rgba(0, 0, 0, 0.95)",
          borderBottom: "1px solid #303030",
          padding: 0,
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-full">
            <div className="text-2xl font-bold text-green-500">FlowTrack</div>
            <Button
              type="primary"
              onClick={() => navigate("/login")}
              style={{ background: "#52c41a", borderColor: "#52c41a" }}
              className="hover:opacity-90 transition-opacity"
            >
              Login
            </Button>
          </div>
        </div>
      </Header>

      {/* Main Content */}
      <Content className="pt-16">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-screen py-20 lg:py-32">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white text-center max-w-4xl">
                Track Your Finances with
                <span className="text-green-500"> Precision</span>
              </h1>
              <p
                className="text-lg md:text-xl mb-8 max-w-2xl text-center"
                style={{ color: "rgba(255, 255, 255, 0.75)" }}
              >
                Take control of your financial future with FlowTrack. Smart
                tracking, intuitive analytics, and personalized insights all in
                one place.
              </p>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate("/signup")}
                style={{
                  background: "#52c41a",
                  borderColor: "#52c41a",
                  height: "48px",
                  padding: "0 32px",
                }}
                className="flex items-center gap-2 hover:opacity-90 transition-opacity text-lg"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  background: "#141414",
                  borderRadius: "16px",
                  border: "1px solid #303030",
                }}
                className="p-8 transition-all duration-300 hover:border-green-500/50 hover:transform hover:-translate-y-1"
              >
                <div
                  className="mb-6 p-3 inline-block rounded-lg"
                  style={{ background: "rgba(82, 196, 26, 0.1)" }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-green-500">
                  {feature.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "rgba(255, 255, 255, 0.75)" }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Content>

      {/* Footer */}
      <Footer
        style={{
          background: "#000000",
          borderTop: "1px solid #303030",
          padding: "24px 0",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div
            className="text-center"
            style={{ color: "rgba(255, 255, 255, 0.65)" }}
          >
            © 2025 FlowTrack. All rights reserved.
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default LandingPage;
