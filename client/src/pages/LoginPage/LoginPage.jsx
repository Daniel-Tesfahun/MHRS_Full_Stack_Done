import React, { useState } from "react";
import "./LoginPage.css";
import NavBar from "../../components/NavBar/NavBar";
import { login } from "../../api/AdminRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const initializeLoginData = {
    userName: "",
    password: "",
  };

  const [data, setData] = useState(initializeLoginData);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(data);
      if (response.data.success) {
        const token = response.data.token;
        const adminId = response.data.aId;
        localStorage.setItem("adminId", adminId);
        localStorage.setItem("authToken", token);
        toast.success(response.data.message);
        navigate(`/dashboard/${response.data?.aId}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "An unexpected error occurred."
      );
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <header className="login-header">
            <h2>Login Form</h2>
          </header>
          <div className="login-inputs">
            <div className="login-name-container">
              <label>User Name</label>
              <input
                type="text"
                className="login-name-input"
                name="userName"
                value={data.userName}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>
            <div className="login-name-container">
              <label>Password</label>
              <input
                type="password"
                className="login-name-input"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
