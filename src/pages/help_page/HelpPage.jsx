import React, { useState } from "react";
import {
  Input,
  Card,
  Collapse,
  Tag,
  Form,
  Button,
  message,
  Alert,
  Row,
  Col,
  Typography,
  theme,
} from "antd";
import { SearchOutlined, RightOutlined } from "@ant-design/icons";
import { Mail, Phone, MessageCircle } from "lucide-react";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const { token } = theme.useToken();

  const cardStyle = {
    marginBottom: token.marginLG,
    borderRadius: token.borderRadiusLG,
    background: token.colorBgContainer,
    boxShadow: token.boxShadowTertiary,
  };

  const headerStyle = {
    background: token.colorPrimary,
    color: token.colorWhite,
    borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,
    padding: token.paddingMD,
  };

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        'Go to the login page and click "Forgot Password." Follow the instructions to reset your password.',
      category: "Account",
    },
    {
      question: "Can I export my transaction data?",
      answer:
        'Yes! Navigate to the "Reports" section and select "Export Data" to download your transaction history as a CSV file.',
      category: "Data",
    },
    {
      question: "How do I edit or delete a transaction?",
      answer:
        "Click on the transaction from your history, and you'll see options to edit or delete it.",
      category: "Transactions",
    },
    {
      question: "Is my data secure on FlowTrack?",
      answer:
        "Absolutely! FlowTrack uses industry-standard encryption to ensure your financial information remains private and secure.",
      category: "Security",
    },
    {
      question: "Can I connect my bank account to FlowTrack?",
      answer:
        "Currently, this feature is under development. Stay tuned for updates!",
      category: "Features",
    },
  ];

  const gettingStartedSteps = [
    {
      title: "Create an account",
      description: "Sign up using your email address and set a secure password",
      icon: "1",
    },
    {
      title: "Set up your profile",
      description: "Customize your preferences and notification settings",
      icon: "2",
    },
    {
      title: "Add transactions",
      description: "Start tracking your expenses and income",
      icon: "3",
    },
    {
      title: "Create budgets",
      description: "Set up categories and budget limits",
      icon: "4",
    },
    {
      title: "Monitor progress",
      description: "Track your financial goals and analyze spending patterns",
      icon: "5",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (values) => {
    setContactSubmitted(true);
    message.success({
      content: "Message sent successfully!",
      style: {
        marginTop: "64px",
      },
    });
    setTimeout(() => {
      setShowContactForm(false);
      setContactSubmitted(false);
    }, 3000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: token.paddingLG,
        background: token.colorBgLayout,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: token.margin * 3 }}>
          <img
            src="/api/placeholder/150/150"
            alt="FlowTrack Logo"
            style={{
              margin: "0 auto",
              marginBottom: token.marginLG,
              height: "128px",
              width: "auto",
            }}
          />
          <Title level={1} style={{ marginBottom: token.marginMD }}>
            How can we help you?
          </Title>
          <Paragraph
            style={{
              color: token.colorTextSecondary,
              fontSize: token.fontSizeLG,
            }}
          >
            Find answers to common questions or get in touch with our support
            team
          </Paragraph>

          <Input
            prefix={
              <SearchOutlined style={{ color: token.colorTextQuaternary }} />
            }
            placeholder="Search FAQs..."
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              marginTop: token.marginLG,
            }}
            size="large"
          />
        </div>

        {/* Getting Started Section */}
        <Card
          title={
            <span style={{ fontSize: token.fontSizeXL }}>Getting Started</span>
          }
          style={cardStyle}
          headStyle={headerStyle}
        >
          <Row gutter={[token.marginLG, token.marginLG]}>
            {gettingStartedSteps.map((step, index) => (
              <Col xs={24} md={12} key={index}>
                <div style={{ display: "flex", gap: token.marginSM }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: token.colorPrimary,
                      color: token.colorWhite,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: token.fontSizeLG,
                        marginBottom: token.marginXS,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ color: token.colorTextSecondary }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* FAQs Section */}
        <Card
          title={
            <span style={{ fontSize: token.fontSizeXL }}>
              Frequently Asked Questions
            </span>
          }
          style={cardStyle}
          headStyle={headerStyle}
        >
          <Collapse
            expandIcon={({ isActive }) => (
              <RightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{
              background: token.colorBgContainer,
              border: "none",
            }}
          >
            {filteredFaqs.map((faq, index) => (
              <Panel
                header={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>{faq.question}</span>
                    <Tag color="blue" style={{ marginLeft: token.marginXS }}>
                      {faq.category}
                    </Tag>
                  </div>
                }
                key={index}
                style={{
                  marginBottom: token.marginXS,
                  border: `1px solid ${token.colorBorder}`,
                  borderRadius: token.borderRadius,
                }}
              >
                <p style={{ color: token.colorTextSecondary }}>{faq.answer}</p>
              </Panel>
            ))}
          </Collapse>
        </Card>

        {/* Contact Support Section */}
        <Card
          title={
            <span style={{ fontSize: token.fontSizeXL }}>Still Need Help?</span>
          }
          style={cardStyle}
          headStyle={headerStyle}
        >
          <Row
            gutter={[token.marginLG, token.marginLG]}
            style={{ marginBottom: token.marginLG }}
          >
            <Col xs={24} md={12}>
              <Button
                icon={<Mail />}
                size="large"
                block
                style={{
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: token.marginXS,
                }}
                onClick={() => setShowContactForm(true)}
              >
                Email: help@flowtrack.com
              </Button>
            </Col>
            <Col xs={24} md={12}>
              <Button
                icon={<Phone />}
                size="large"
                block
                style={{
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: token.marginXS,
                }}
              >
                Call Us: 9845012345
              </Button>
            </Col>
          </Row>

          {showContactForm && (
            <div style={{ marginTop: token.marginLG }}>
              {contactSubmitted ? (
                <Alert
                  message="Thank you for your message. We'll get back to you soon!"
                  type="success"
                  showIcon
                  style={{ borderRadius: token.borderRadius }}
                />
              ) : (
                <Form layout="vertical" onFinish={handleContactSubmit}>
                  <Row gutter={token.marginLG}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                          { required: true, message: "Please enter your name" },
                        ]}
                      >
                        <Input size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your email",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email",
                          },
                        ]}
                      >
                        <Input size="large" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    label="Subject"
                    name="subject"
                    rules={[
                      { required: true, message: "Please enter a subject" },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Message"
                    name="message"
                    rules={[
                      { required: true, message: "Please enter your message" },
                    ]}
                  >
                    <Input.TextArea rows={4} size="large" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" size="large">
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default HelpPage;
