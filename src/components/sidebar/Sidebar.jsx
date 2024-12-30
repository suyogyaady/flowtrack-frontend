import React, { useState } from "react";
import {
  LayoutDashboard,
  Receipt,
  LineChart,
  Settings,
  Menu,
} from "lucide-react";
import Logo from "../../assets/images/Logo2.png";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Transactions",
      icon: <Receipt size={20} />,
      path: "/transactions",
    },
    {
      title: "Expense",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M16 10l-4 4-4-4" />
        </svg>
      ),
      path: "/expense",
    },
    {
      title: "Income",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M8 14l4-4 4 4" />
        </svg>
      ),
      path: "/income",
    },
    {
      title: "Reports",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="4" width="6" height="16" />
          <rect x="9" y="8" width="6" height="12" />
          <rect x="16" y="12" width="6" height="8" />
        </svg>
      ),
      path: "/reports",
    },
    {
      title: "Analytics",
      icon: <LineChart size={20} />,
      path: "/analytics",
    },
    {
      title: "Setting",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="btn d-lg-none position-fixed top-0 start-0 mt-2 ms-2 z-3"
        style={{ backgroundColor: "#1e1e2d", color: "#ffffff" }}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Backdrop */}
      <div
        className={`position-fixed top-0 start-0 h-100 w-100 bg-dark bg-opacity-50 d-lg-none ${
          isMobileOpen ? "d-block" : "d-none"
        }`}
        style={{ zIndex: 1040 }}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Main Sidebar */}
      <div
        className={`
          d-flex flex-column flex-shrink-0 text-white
          position-fixed start-0 top-0 h-100 transition-all
          ${isExpanded ? "w-250px" : "w-70px"}
          ${isMobileOpen ? "translate-start-0" : "translate-start-100"}
          d-lg-flex
        `}
        style={{
          backgroundColor: "#1e1e2d",
          zIndex: 1045,
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Logo Section */}
        <div
          className="p-3 border-bottom"
          style={{ borderColor: "#2d2d3f !important" }}
        >
          <div className="d-flex align-items-center">
            {isExpanded ? (
              <>
                <img
                  src={Logo}
                  alt="Logo"
                  className="rounded"
                  style={{
                    height: "110px",
                    width: "110px",
                  }}
                />
              </>
            ) : (
              <>
                <img
                  src={Logo}
                  alt="Logo"
                  className="rounded"
                  style={{
                    height: "40px",
                    width: "40px",
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="nav flex-column p-2 flex-grow-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <a
                key={index}
                href={item.path}
                className={`
                  nav-link d-flex align-items-center py-3 px-3 mb-1 rounded
                  ${isActive ? "active" : ""}
                `}
                style={{
                  color: isActive ? "#ffffff" : "#9899ac",
                  backgroundColor: isActive ? "#2fb344" : "transparent",
                  transition: "all 0.2s ease",
                  opacity: isActive ? 1 : 0.85,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.backgroundColor = "#2d2d3f";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.opacity = "0.85";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
              >
                <span className="d-flex align-items-center justify-content-center">
                  {item.icon}
                </span>
                {isExpanded && (
                  <span className="ms-3" style={{ fontSize: "0.95rem" }}>
                    {item.title}
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;