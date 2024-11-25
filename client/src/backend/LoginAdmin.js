import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginAdmin.css";
import { useAuth } from "./AuthContext"; // Import the AuthContext

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate authentication
    if (username === "Admin" && password === "Admin") {
      login(); // Update the authentication state
      navigate("/admin"); // Redirect to the admin page
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-admin-container">
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
