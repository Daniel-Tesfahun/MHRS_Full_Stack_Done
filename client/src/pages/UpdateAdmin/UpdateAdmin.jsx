import React, { useEffect, useState } from "react";
import "./UpdateAdmin.css";
import NavBar from "../../components/NavBar/NavBar";
import { getAdminById } from "../../api/AdminRequest";
import { useNavigate, useParams } from "react-router-dom";
import { updateAdmin } from "../../api/DirectorRequest";
import { toast } from "react-toastify";

function UpdateAdmin() {
  const [admin, setAdmin] = useState(null);
  const { aId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    role: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await getAdminById(aId);
        setAdmin(response.data.data);
        setData({
          firstName: response.data.data.firstName || "",
          lastName: response.data.data.lastName || "",
          userName: response.data.data.userName || "",
          password: "", // We Keept password empty for security purposes
          role: response.data.data.role || "",
        });
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      }
    };

    fetchAdminData();
  }, [aId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      data.password == "" &&
      admin.firstName == data.firstName &&
      admin.lastName == data.lastName &&
      admin.userName == data.userName &&
      admin.role == data.role
    ) {
      toast.info("You did not change anything!!");
    } else {
      if (data.password === confirmPassword) {
        try {
          const response = await updateAdmin(aId, data);
          if (response.data.success) {
            toast.success(response.data.message);
            navigate("/displayAdmins");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(
            error.response.data.message || "An unexpected error occurred."
          );
          console.log(error.response.data.message);
        }
      } else {
        toast.info("Password and Confirm Password do not match!");
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleTogglePassword = () => {
    setShowPasswordInputs(!showPasswordInputs);
    setConfirmPassword("");
    data.password = "";
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
            <button
              className="update-admin-btn show-pass-btn"
              type="button"
              onClick={handleTogglePassword}
            >
              {showPasswordInputs ? "No Password" : "With Password"}
            </button>
            {showPasswordInputs && (
              <>
                <div className="update-admin-name-container">
                  <label>Password</label>
                  <input
                    type="password"
                    className="update-admin-name-input"
                    name="password"
                    value={showPasswordInputs ? data.password : ""}
                    onChange={handleChange}
                    placeholder="Example: yoh13@123"
                    required
                  />
                </div>
                <div className="update-admin-name-container">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="update-admin-name-input"
                    name="confirmPassword"
                    value={showPasswordInputs ? confirmPassword : ""}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Example: yoh13@123"
                    required
                  />
                </div>
              </>
            )}
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
