import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
     const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9800";

  const navigate = useNavigate();

  const handleLogin = async () => {
    const userdata = { username, password };

    await axios.post(`${API_URL}/Login`, userdata).then((res) => {
      if (res.data.status === 450) {
        toast.error(res.data.message);
      } else if (res.data.status === 451) {
        toast.error(res.data.message);
      } else if (res.data.status === 250) {
        toast.success(res.data.message,{autoClose:2000,position:"top-left"});
        setTimeout(() => {
          navigate("/dashboard");
        },1000);
      } else {
        toast.error("Unexpected response");
      }
    });
  };

  const handleEnter = (enter) => {
    if (enter.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Fragment>
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <ToastContainer />
        <div className="card card-size p-4 shadow-sm">
          <h2 className="text-center mb-4">User Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleEnter}
            className="form-control mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleEnter}
            className="form-control mb-3"
          />
          <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
            Login
          </button>
          <p className="text-center">
            <Link to="/Registerpage">New User? Register Here</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
