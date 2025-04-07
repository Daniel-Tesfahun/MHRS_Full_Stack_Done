import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Retrieve the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
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
