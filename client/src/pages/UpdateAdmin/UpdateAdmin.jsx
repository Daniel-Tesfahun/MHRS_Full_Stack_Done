import React, { useState } from "react";
import "./UpdateAdmin.css";
import NavBar from "../../components/NavBar/NavBar";

function UpdateAdmin() {
  const initializeLoginData = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    role: "",
  };

  const [data, setData] = useState(initializeLoginData);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password === confirmPassword) {
      setData(initializeLoginData);
      setConfirmPassword("");
      console.log("Form submitted", data);
    } else {
      alert("Password and Confirm Password do not match!");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const roles = ["Admin", "Director"];
  return (
    <>
      <NavBar />
      <div className="update-admin-page">
        <form className="update-admin-form" onSubmit={handleSubmit}>
          <header className="update-admin-header">
            <h2>Update Admin Form</h2>
          </header>
          <div className="update-admin-inputs">
            <div className="update-admin-name-container">
              <label>First Name</label>
              <input
                type="text"
                className="update-admin-name-input"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                placeholder="Example: Yohana"
                required
              />
            </div>
            <div className="update-admin-name-container">
              <label>Last Name</label>
              <input
                type="text"
                className="update-admin-name-input"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                placeholder="Example: Temesgen"
                required
              />
            </div>
            <div className="update-admin-name-container">
              <label>User Name</label>
              <input
                type="text"
                className="update-admin-name-input"
                name="userName"
                value={data.userName}
                onChange={handleChange}
                placeholder="Example: Yoh13"
                required
              />
            </div>
            <div className="update-admin-name-container">
              <label>Password</label>
              <input
                type="password"
                className="update-admin-name-input"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Example: yoh13@123"
                required
              />
            </div>
            <div className="update-admin-name-container">
              <label>Password</label>
              <input
                type="password"
                className="update-admin-name-input"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Example: yoh13@123"
                required
              />
            </div>
            <div className="res-company-name-container">
              <label>Select Role:</label>
              <select
                className="res-company-select"
                name="role"
                value={data.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Roles
                </option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="update-admin-btn">
              Update Admin
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateAdmin;
