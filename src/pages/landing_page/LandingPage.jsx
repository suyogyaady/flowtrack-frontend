import React from "react";
import Logo from "../../assets/images/logoAll.png";

const LandingPage = () => {
  const handleClick = () => {
    console.log("Journey begun!");
    window.location.href = "/login";
    // Add navigation or API calls here
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Background Curves */}
      <svg
        className="position-absolute"
        style={{ width: "100%", height: "100%", top: 0, left: 0, zIndex: 0 }}
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
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            {/* Logo Icon */}
            <div className="mb-3"></div>
            <img
              src={Logo}
              alt="FlowTrack Logo"
              className="img-fluid"
              style={{
                maxWidth: "600px",
                maxHeight: "600px",
                transform: "scale(0.9)",
                animation: "float 3s ease-in-out infinite",
              }}
            />
            {/* CTA Button */}
            <button
              onClick={handleClick}
              className="btn px-4 py-2 rounded-pill"
              style={{
                backgroundColor: "#40c057",
                color: "white",
                fontSize: "1.1rem",
                padding: "12px 30px",
                border: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(64, 192, 87, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Begin Your Journey
              <span className="ms-2">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
