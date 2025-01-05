import React from "react";
import Logo from "../../assets/images/logoAll.png";

const LandingPage = () => {
  const handleClick = () => {
    console.log("Journey begun!");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen  items-center justify-center relative overflow-hidden bg-white">
      {/* Background Curves */}
      <svg
        className="absolute w-full h-full top-0 left-0 z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Left blue curve */}
        <path
          d="M0,100 Q0,50 30,0"
          fill="none"
          stroke="#007bff"
          strokeWidth="0.3"
          style={{ opacity: 0.3 }}
        />
        {/* Right green curve */}
        <path
          d="M100,0 Q100,50 70,100"
          fill="none"
          stroke="#40c057"
          strokeWidth="0.3"
          style={{ opacity: 0.3 }}
        />
      </svg>

      {/* Main Content */}
      <div className="container relative z-10">
        <div className="flex flex-col items-center">
          {/* Logo Icon */}
          <div className="mb-6">
            <img
              src={Logo}
              alt="FlowTrack Logo"
              className="max-w-[600px] max-h-[600px] scale-90 animate-float"
            />
          </div>
          {/* CTA Button */}
          <button
            onClick={handleClick}
            className="bg-green-500 text-white text-lg py-3 px-8 rounded-full shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            Begin Your Journey
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

/* Tailwind Custom Animation in CSS */
/* Include in a global CSS file if needed */
/* @keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-float {
  animation: float 3s ease-in-out infinite;
} */
