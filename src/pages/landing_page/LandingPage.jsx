import React from "react";
import { Button } from "antd";
import { RightOutlined } from "@ant-design/icons";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-green-50 relative">
      {/* Left Curve */}
      <div className="absolute left-0 h-full">
        <svg
          height="100%"
          width="300"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q30,50 0,100"
            fill="none"
            stroke="#007bff"
            strokeWidth="0.5"
            style={{ opacity: 0.3 }}
          />
        </svg>
      </div>

      {/* Right Curve */}
      <div className="absolute right-0 h-full">
        <svg
          height="100%"
          width="300"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M100,0 Q70,50 100,100"
            fill="none"
            stroke="#40c057"
            strokeWidth="0.5"
            style={{ opacity: 0.3 }}
          />
        </svg>
      </div>

      {/* Center Content */}
      <div className="z-10 flex flex-col items-center space-y-8">
        {/* Logo */}
        <div>
          <img
            src="/assets/images/LogoAllLight.png"
            alt="FlowTrack Logo"
            className="max-w-[200px]"
          />
        </div>

        {/* Login Button */}
        <Button
          type="primary"
          size="large"
          onClick={() => (window.location.href = "/login")}
          className="flex items-center px-8 rounded-full hover:scale-105 transition-transform"
        >
          Begin Your Journey
          <RightOutlined className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
