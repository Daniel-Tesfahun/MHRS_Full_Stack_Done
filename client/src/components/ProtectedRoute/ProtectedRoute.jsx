import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // No token found, redirect to home page
    alert("You must be logged in to access this page.");
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    // Check if the user's role is allowed
    if (allowedRoles.includes(userRole)) {
      return children; // Render the component if authorized
    } else {
      alert("You do not have permission to access this page.");
      return <Navigate to="/" />; // Redirect to home if not authorized
    }
  } catch (error) {
    alert("An error occurred. Redirecting to the home page.");
    console.error("Invalid token format:", error);
    return <Navigate to="/" />; // Redirect to home if there's an error
  }
};

export default ProtectedRoute;
