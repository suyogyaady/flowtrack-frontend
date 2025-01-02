import React, { useState } from "react";
import {
  LayoutDashboard,
  Receipt,
  LineChart,
  Settings,
  Menu,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  BarChart3,
  X,
} from "lucide-react";
import Logo from "../../assets/images/Logo2.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/dashboard");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const buttonStyle = {
    fontSize: "16px",
    padding: "8px 16px",
    borderRadius: "20px",
    transition: "all 0.3s ease",
  };

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
      icon: <TrendingDown size={20} />,
      path: "/expense",
    },
    {
      title: "Income",
      icon: <TrendingUp size={20} />,
      path: "/income",
    },
    {
      title: "Reports",
      icon: <BarChart3 size={20} />,
      path: "/reports",
    },
    {
      title: "Analytics",
      icon: <LineChart size={20} />,
      path: "/analytics",
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: null,
      submenu: [
        { title: "Profile", path: "/settings/profile" },
        { title: "Help", path: "/settings/help" },
        {
          title: "Logout",
          path: "/logout",
          action: () => setShowLogoutModal(true),
        },
      ],
    },
  ];

  const handleNavigation = (path, action) => {
    if (action) {
      action();
    } else if (path) {
      setActiveItem(path);
      navigate(path);
    }
    if (window.innerWidth < 992) {
      setIsMobileOpen(false);
    }
  };

  return (
    user && (
      <>
        {/* Mobile Toggle Button */}
        <button
          className="btn btn-link text-light d-lg-none position-fixed top-0 start-0 mt-3 ms-3"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Backdrop for mobile */}
        <div
          className={`position-fixed top-0 start-0 h-100 w-100 bg-dark bg-opacity-50 d-lg-none ${
            isMobileOpen ? "d-block" : "d-none"
          }`}
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`d-flex flex-column bg-dark text-white position-fixed top-0 start-0 h-100 ${
            isExpanded ? "sidebar-expanded" : "sidebar-collapsed"
          } ${isMobileOpen ? "sidebar-mobile-open" : ""}`}
          style={{
            width: isExpanded ? "240px" : "90px",
            transition: "all 0.3s ease-in-out",
            zIndex: 1045,
          }}
        >
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary">
            <div className="d-flex align-items-center">
              <img
                src={Logo}
                alt="Logo"
                className="rounded-circle"
                style={{
                  height: isExpanded ? "50px" : "30px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/dashboard")}
              />
              {isExpanded && (
                <span className="fw-bold fs-5 ms-3">FlowTrack</span>
              )}
            </div>
            <button
              className="btn btn-link text-white p-0 d-none d-lg-block"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronDown
                size={20}
                style={{
                  transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                  transition: "transform 0.3s",
                }}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow-1 py-2">
            {menuItems.map((item, index) => (
              <div key={index} className="px-2 mb-1">
                <button
                  className={`btn w-100 text-start d-flex align-items-center py-2 px-3 ${
                    activeItem === item.path
                      ? "btn-primary"
                      : "btn-dark text-secondary"
                  }`}
                  onClick={() => {
                    if (item.submenu) {
                      setIsSettingsOpen(!isSettingsOpen);
                    } else {
                      handleNavigation(item.path, item.action);
                    }
                  }}
                  title={!isExpanded ? item.title : ""}
                >
                  {item.icon}
                  {isExpanded && <span className="ms-3">{item.title}</span>}
                  {item.submenu && isExpanded && (
                    <ChevronDown
                      size={16}
                      className="ms-auto"
                      style={{
                        transform: isSettingsOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    />
                  )}
                </button>
                {item.submenu && isSettingsOpen && isExpanded && (
                  <div className="ms-4">
                    {item.submenu.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        className={`btn w-100 text-start py-2 px-3 ${
                          activeItem === subItem.path
                            ? "btn-primary"
                            : "btn-dark text-secondary"
                        }`}
                        onClick={() =>
                          handleNavigation(subItem.path, subItem.action)
                        }
                      >
                        {subItem.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-top border-secondary p-3">
            <div className="d-flex align-items-center">
              <div className="rounded-circle bg-primary p-2 text-center text-white">
                JD
              </div>
              {isExpanded && (
                <div className="ms-3">
                  <p className="mb-0">{user.username}</p>
                  <small>{user.email}</small>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logout Confirmation Modal */}
        <div
          className={`modal fade ${showLogoutModal ? "show" : ""}`}
          style={{ display: showLogoutModal ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="logoutModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="logoutModalLabel">
                  Confirm Logout
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLogoutModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">Are you sure you want to logout?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    handleLogout();
                    setShowLogoutModal(false);
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Backdrop */}
        {showLogoutModal && (
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowLogoutModal(false)}
          ></div>
        )}

        {/* Add required CSS */}
        <style>
          {`
          .sidebar-expanded::-webkit-scrollbar {
            width: 6px;
          }
          .sidebar-expanded::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.2);
          }
          .sidebar-collapsed .btn {
            justify-content: center;
          }
          @media (max-width: 991.98px) {
            .sidebar-mobile-open {
              transform: translateX(0) !important;
            }
            .sidebar-expanded {
              transform: translateX(-100%);
            }
          }
        `}
        </style>
      </>
    )
  );
};

export default Sidebar;
