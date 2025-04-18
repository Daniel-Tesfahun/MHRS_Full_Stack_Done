import axios from "axios";
import { jwtDecode } from "jwt-decode";
// To decode and check token expiration

const apiClient = axios.create({
  baseURL: "https://server.mhrs.ethiopbytes.com", // Base URL for your API
});

// Function to check if the token is expired
const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token); // Decode the token to get the `exp` field
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTime; // Check if the token has expired
  } catch (error) {
    console.error("Invalid token format:", error);
    return true; // Treat invalid tokens as expired
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Retrieve the token
    if (token) {
      // Check if the token is expired
      if (isTokenExpired(token)) {
        localStorage.removeItem("authToken"); // Remove expired token
        localStorage.removeItem("adminId");
        window.location.href = "/login"; // Redirect to the login page
        throw new Error("Token expired"); // Prevent the request from being sent
      }
      config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

// Response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken"); // Remove the token if the server rejects it
      localStorage.removeItem("adminId");
      window.location.href = "/login"; // Redirect to the login page
    }
    return Promise.reject(error); // Handle other errors
  }
);

export default apiClient;

// IF i need to use the token in other files i can use this code
// import jwtDecode from "jwt-decode";

// const checkRole = () => {
//   const token = localStorage.getItem("authToken");
//   if (token) {
//     const decoded = jwtDecode(token);
//     console.log("User Role:", decoded.role);
//     return decoded.role;
//   }
//   return null;
// };

// Using it
// const role = checkRole();
// if (role === "Admin") {
//   // Allow access
// } else {
//   // Redirect or deny access
// }
