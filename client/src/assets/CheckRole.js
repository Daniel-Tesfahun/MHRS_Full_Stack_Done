import { jwtDecode } from "jwt-decode";

export const checkRole = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    const decoded = jwtDecode(token);
    // console.log("User Role:", decoded.role);
    return decoded.role;
  }
  return null;
};
