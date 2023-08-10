import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/header-logo.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Implement sign up logic here
  };

  const handleLogin = () => {
    // Implement login logic here
  };

  const handleGuestContinue = () => {
    navigate("/events");
  };

  return (
    <div id="nav">
      <div id="main-logo-container">
        <img src={logo} id="main-logo" alt="Logo" />
      </div>
      <h1>Login</h1>
      <button className="nav-btn"onClick={handleSignUp}>Sign Up</button>
      <button className="nav-btn"onClick={handleLogin}>Login</button>
      <button className="nav-btn"onClick={handleGuestContinue}>Continue as Guest</button>
    </div>
  );
}
