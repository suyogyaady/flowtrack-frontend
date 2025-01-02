import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LandingPage from "./pages/landing_page/LandingPage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Sidebar></Sidebar>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
