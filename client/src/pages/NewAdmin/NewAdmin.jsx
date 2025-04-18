import React, { useState } from "react";
import "./NewAdmin.css";
import NavBar from "../../components/NavBar/NavBar";
import { addNewAdmin } from "../../api/DirectorRequest";
import { toast } from "react-toastify";

function NewAdmin() {
  const initializeLoginData = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    role: "",
  };

  const [data, setData] = useState(initializeLoginData);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === confirmPassword) {
      try {
        const response = await addNewAdmin(data);
        if (response.data.success) {
          toast.success(response.data.message);
          setData(initializeLoginData);
          setConfirmPassword("");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(
          error.response.data.message || "An unexpected error occurred."
        );
      }
    } else {
      toast.info("Password and Confirm Password do not match!");
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
      <div className="signup-page">
        <form className="signup-form" onSubmit={handleSubmit}>
          <header className="signup-header">
            <h2>Registration Form</h2>
          </header>
          <div className="signup-inputs">
            <div className="signup-name-container">
              <label>First Name</label>
              <input
                type="text"
                className="signup-name-input"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                placeholder="Example: Yohana"
                required
              />
            </div>
            <div className="signup-name-container">
              <label>Last Name</label>
              <input
                type="text"
                className="signup-name-input"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                placeholder="Example: Temesgen"
                required
              />
            </div>
            <div className="signup-name-container">
              <label>User Name</label>
              <input
                type="text"
                className="signup-name-input"
                name="userName"
                value={data.userName}
                onChange={handleChange}
                placeholder="Example: Yoh13"
                required
              />
            </div>
            <div className="signup-name-container">
              <label>Password</label>
              <input
                type="password"
                className="signup-name-input"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Example: yoh13@123"
                required
              />
            </div>
            <div className="signup-name-container">
              <label>Confirm Password</label>
              <input
                type="password"
                className="signup-name-input"
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
            <button type="submit" className="signup-btn">
              Add New Admin
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewAdmin;
