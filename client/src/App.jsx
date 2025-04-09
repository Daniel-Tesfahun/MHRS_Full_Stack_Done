import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ReservationPage from "./pages/ReservationPage/ReservationPage";
import DashBoard from "./pages/DashBoard/DashBoard";
import NewAdmin from "./pages/NewAdmin/NewAdmin";
import UpdateAdmin from "./pages/UpdateAdmin/UpdateAdmin";
import NewHall from "./pages/NewHall/NewHall";
import UpdateHall from "./pages/UpdateHall/UpdateHall";
import DisplayAdmins from "./pages/DisplayAdmins/DisplayAdmins";
import DisplayHalls from "./pages/DisplayHalls/DisplayHalls";
import ApproveReservations from "./pages/ApproveReservations/ApproveReservations";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reservation" element={<ReservationPage />} />

      {/* Restricted routes */}
      <Route
        path="/dashboard/:aId"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Director"]}>
            <DashBoard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute allowedRoles={["Director"]}>
            <NewAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/updateAdmin/:aId"
        element={
          <ProtectedRoute allowedRoles={["Director"]}>
            <UpdateAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addHall"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Director"]}>
            <NewHall />
          </ProtectedRoute>
        }
      />
      <Route
        path="/updateHall/:hId"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Director"]}>
            <UpdateHall />
          </ProtectedRoute>
        }
      />
      <Route
        path="/displayAdmins"
        element={
          <ProtectedRoute allowedRoles={["Director"]}>
            <DisplayAdmins />
          </ProtectedRoute>
        }
      />
      <Route
        path="/displayHalls"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Director"]}>
            <DisplayHalls />
          </ProtectedRoute>
        }
      />
      <Route
        path="/approveReservation"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Director"]}>
            <ApproveReservations />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
