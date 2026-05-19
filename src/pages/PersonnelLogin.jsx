import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import Navbar from "../components/Navbar";

import leftImage from "../images/left-image.png";
import bg from "../images/signbg.png";

import "../styles.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("LOGIN INPUT:", username, password);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      setMessage(res.data.message);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login Successful!");

      // redirect based on role (optional but better)
      if (res.data.user.role === "personnel") {
        navigate("/PersonnelDashboard");
      } else {
        navigate("/ComplainantDashboard");
      }

    } catch (err) {

      const errorMessage =
        err.response?.data?.message || "Login failed";

      setMessage(errorMessage);

      toast.error(errorMessage);
    }
  };

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Navbar />

      <div className="signup-layout">

        {/* LEFT IMAGE */}
        <div className="left-side">
          <img src={leftImage} alt="login" />
        </div>

        {/* RIGHT SIDE */}
        <div className="right-side">

          <h1>Personnel Login</h1>

          <form onSubmit={handleLogin}>

            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />

<button type="submit" style={{ marginTop: "10px" }}>
  Login
</button>
          </form>

          <p>{message}</p>

        </div>
      </div>
    </div>
  );
}

export default Login;