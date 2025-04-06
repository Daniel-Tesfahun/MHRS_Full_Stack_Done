import React, { useState } from "react";
import "./DisplayHalls.css";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";

const DisplayHalls = () => {
  const initializeHalls = [
    {
      hId: 1,
      hallName: "Hall A",
      capacity: 100,
      location: "First Floor",
    },
    {
      hId: 2,
      hallName: "Hall B",
      capacity: 150,
      location: "Second Floor",
    },
    {
      hId: 3,
      hallName: "Hall C",
      capacity: 200,
      location: "Third Floor",
    },
    {
      hId: 4,
      hallName: "Hall D",
      capacity: 250,
      location: "Fourth Floor",
    },
    {
      hId: 5,
      hallName: "Hall E",
      capacity: 300,
      location: "Fifth Floor",
    },
    {
      hId: 6,
      hallName: "Hall F",
      capacity: 350,
      location: "Sixth Floor",
    },
  ];

  const sortedHall = initializeHalls.sort((a, b) => b.hId - a.hId);
  const [approvedRes, setApprovedRes] = useState(sortedHall);

  const handleDelete = (hId) => {
    const updatedRes = approvedRes.filter((res) => res.hId !== hId);
    setApprovedRes(updatedRes); // Update state to remove the deleted row
  };

  const currentRole = "Director";

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
            {approvedRes.map((apprRes, index) => (
              <tr key={index}>
                <td data-label="Hall ID">{apprRes.hId}</td>
                <td data-label="Hall Name">{apprRes.hallName}</td>
                <td data-label="Capacity">{apprRes.capacity}</td>
                <td data-label="Location">{apprRes.location}</td>
                <td>
                  {/* Action Buttons */}
                  <div
                    className="delete-button"
                    onClick={() => handleDelete(apprRes.hId)}
                  >
                    Delete
                  </div>
                  <Link
                    to={`/updateHall/${apprRes.hId}`}
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

export default DisplayHalls;
