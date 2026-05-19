import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import Navbar from "../components/Navbar";
import leftImage from "../images/left-image.png";
import "../styles.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username, password }
      );

      const userData = res.data.user; 

      localStorage.setItem("user", JSON.stringify(userData));

      setMessage(res.data.message);

      if (userData.role === "personnel") {
        navigate("/PersonnelDashboard");
      } 
      else if (userData.role === "complainant") {
        navigate("/ComplainantDashboard");
      } 
      else {
        setMessage("Unknown user role");
      }

    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <Navbar />

      <div className="signup-layout">

        <div className="left-side">
          <img src={leftImage} alt="login" />
        </div>

        <div className="right-side">

          <h1>Login</h1>

          <label>Username</label>
          <Input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />

          <label>Password</label>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />

          <div className="button-group">
            <Button
              type="button"
              onClick={handleLogin}
              className="login-btn"
            >
              Login
            </Button>
          </div>

          {message && <p>{message}</p>}

         <p style={{ marginTop: "15px", color: "white" }}>
            Are you a Personnel?{" "}
            <span
              style={{
                color: "white",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/personnel-login")}
            >
              Click here
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;