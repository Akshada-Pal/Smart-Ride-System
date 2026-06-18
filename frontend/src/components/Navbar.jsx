import React, { useState } from "react";
import { getUser, logout } from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/global.css";

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        SMART RIDE
      </div>

      {/* MOBILE MENU */}
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* NAVIGATION LINKS */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

        <li
          className={isActive("/") ? "active-link" : ""}
          onClick={() => navigate("/")}
        >
          Home
        </li>

        <li onClick={() => navigate("/cars")}>
          Cars
        </li>

        <li onClick={() => navigate("/contact")}>
          Contact
        </li>

        {user && (
          <>
            <li onClick={() => navigate("/dashboard")}>
              Dashboard
            </li>

            <li onClick={() => navigate("/premium")}>
              Premium
            </li>

            {user.role === "admin" && (
              <li onClick={() => navigate("/admin")}>
                Admin
              </li>
            )}
          </>
        )}
      </ul>

      {/* RIGHT SIDE */}
      <div className={`nav-right ${menuOpen ? "active" : ""}`}>
        {!user ? (
          <div className="auth-buttons">
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        ) : (
          <>
           <div className="profile">
  <span className="avatar">
    {user.name?.charAt(0).toUpperCase()}
  </span>

  <span>
    {user.name}
  </span>
</div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>

    </nav>
  );
};

export default Navbar;