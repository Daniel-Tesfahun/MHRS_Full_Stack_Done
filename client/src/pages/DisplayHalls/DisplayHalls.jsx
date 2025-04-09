import React, { useEffect, useState } from "react";
import "./DisplayHalls.css";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import { getAllHallDetails } from "../../api/UserRequest";
import { deleteHall } from "../../api/AdminRequest";

const DisplayHalls = () => {
  const [halls, setHalls] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchHallsData = async () => {
      try {
        const response = await getAllHallDetails();
        const unsorted = response.data.data;
        const sortedReservations = unsorted.sort((a, b) => b.hId - a.hId);
        setHalls(sortedReservations);
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      }
    };

    fetchHallsData();
  }, [fetchTrigger]);
  console.log(halls);

  const handleDelete = async (hId, hallName) => {
    let delMsg = "";
    const userConfirmed = window.confirm(
      `Are you sure you want to Delete ${hallName}?`
    );
    if (!userConfirmed) {
      return; // Exit if the user cancels
    }
    try {
      const response = await deleteHall(hId);
      delMsg = response.data.message;
      if (response.data.success) {
        setFetchTrigger((prev) => !prev);
      }
    } catch (error) {
      delMsg = error.response.data?.message;
      console.log(error);
    }
    alert(delMsg);
  };

  return (
    <>
      <NavBar />
      <div className="UsersList">
        <h1 className="display-admins-header">Display Halls</h1>
        <table>
          <thead>
            <tr>
              <th>Hall ID</th>
              <th>Hall Name</th>
              <th>Capacity</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {halls.map((hall, index) => (
              <tr key={index}>
                <td data-label="Hall ID">{hall.hId}</td>
                <td data-label="Hall Name">{hall.hallName}</td>
                <td data-label="Capacity">{hall.capacity}</td>
                <td data-label="Location">{hall.location}</td>
                <td>
                  {/* Action Buttons */}
                  <div
                    className="delete-button"
                    onClick={() => handleDelete(hall.hId, hall.hallName)}
                  >
                    Delete
                  </div>
                  <Link to={`/updateHall/${hall.hId}`} className="edit-button">
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

export default DisplayHalls;
