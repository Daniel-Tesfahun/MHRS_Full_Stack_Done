import React, { useState, useEffect } from "react";
import "./DisplayAdmins.css";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import { getAllAdmins, deleteAdmin } from "../../api/DirectorRequest";
import { toast } from "react-toastify";

const DisplayAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchAdminsData = async () => {
      try {
        const response = await getAllAdmins();
        const unsorted = response.data.data;
        const sortedReservations = unsorted.sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );
        setAdmins(sortedReservations);
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      }
    };

    fetchAdminsData();
  }, [fetchTrigger]);

  const handleDelete = async (aId, firstName, lastName) => {
    const userConfirmed = window.confirm(
      `Are you sure you want to Delete ${firstName} ${lastName}?`
    );
    if (!userConfirmed) {
      return; // Exit if the user cancels
    }
    try {
      const response = await deleteAdmin(aId);
      if (response.data.success) {
        toast.success(response.data.message);
        setFetchTrigger((prev) => !prev);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "An unexpected error occurred."
      );
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="UsersList">
        <h1 className="display-admins-header">Display Admins</h1>
        <table>
          <thead>
            <tr>
              <th>Admin ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User Name</th>
              <th>Role</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index}>
                <td data-label="Admin ID">{admin.aId}</td>
                <td data-label="First Name">{admin.firstName}</td>
                <td data-label="Last Name">{admin.lastName}</td>
                <td data-label="User Name">{admin.userName}</td>
                <td data-label="Role">{admin.role}</td>
                <td data-label="Updated At">
                  {new Date(admin.updated).toLocaleDateString()}
                </td>
                <td>
                  {/* Action Buttons */}
                  <div
                    className="delete-button"
                    onClick={() =>
                      handleDelete(admin.aId, admin.firstName, admin.lastName)
                    }
                  >
                    Delete
                  </div>
                  <Link
                    to={`/updateAdmin/${admin.aId}`}
                    className="edit-button"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayAdmins;
