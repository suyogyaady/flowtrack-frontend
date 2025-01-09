import React from "react";
import { Layout, Button, Typography } from "antd";
import { ArrowRight, PieChart, TrendingUp, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Expense Analytics",
      description:
        "Visualize your spending patterns with intuitive charts and graphs",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Budget Tracking",
      description:
        "Set and monitor budgets to reach your financial goals faster",
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Smart Savings",
      description: "Intelligent suggestions to help you save more effectively",
    },
  ];

  return (
    <Layout className="min-h-screen bg-slate-900">
      {/* Header */}
      <Header className="fixed w-full z-10 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-white">FlowTrack</div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/login")}
              className="bg-transparent"
            >
              Login
            </Button>
            <Button
              type="primary"
              onClick={() => navigate("/signup")}
              className="bg-blue-500"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Header>

      {/* Main Content */}
      <Content className="pt-16">
        {/* Hero Section */}
        <div className="bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="text-center">
              <Title
                level={1}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Track Your Finances with
                <span className="text-blue-500"> Precision</span>
              </Title>
              <Paragraph className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Take control of your financial future with FlowTrack. Smart
                tracking, intuitive analytics, and personalized insights all in
                one place.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate("/signup")}
                className="bg-blue-500 h-12 px-8"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-slate-700 p-6 rounded-lg">
                  <div className="mb-4 text-blue-500">{feature.icon}</div>
                  <Title level={3} className="text-white mb-4">
                    {feature.title}
                  </Title>
                  <Paragraph className="text-slate-300">
                    {feature.description}
                  </Paragraph>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Title level={2} className="text-white mb-2">
                  50K+
                </Title>
                <Paragraph className="text-slate-300">Active Users</Paragraph>
              </div>
              <div>
                <Title level={2} className="text-white mb-2">
                  $2M+
                </Title>
                <Paragraph className="text-slate-300">
                  Tracked Monthly
                </Paragraph>
              </div>
              <div>
                <Title level={2} className="text-white mb-2">
                  98%
                </Title>
                <Paragraph className="text-slate-300">
                  User Satisfaction
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </Content>

      {/* Footer */}
      <Footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-slate-300">
            © 2025 FlowTrack. All rights reserved.
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default LandingPage;
