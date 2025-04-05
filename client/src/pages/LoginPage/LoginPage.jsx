import React, { useState } from "react";
import "./LoginPage.css";
import NavBar from "../../components/NavBar/NavBar";

function LoginPage() {
  const initializeLoginData = {
    userName: "",
    password: "",
  };

  const [data, setData] = useState(initializeLoginData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
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
                placeholder="Example: ab123"
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
                placeholder="Example: #A2b3c"
                required
              />
            </div>
            <button type="submit" className="login-btn">
              BOOK A MEETING HALL
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
