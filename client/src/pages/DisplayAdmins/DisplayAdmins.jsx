import React, { useState } from "react";
import "./DisplayAdmins.css";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";

const DisplayAdmins = () => {
  const initializeAdminInfo = [
    {
      aId: 1,
      firstName: "Daniel",
      lastName: "Tesfahun",
      userName: "dan1",
      role: "Director",
      updated: "2025-04-04T21:00:00.000Z",
    },
    {
      aId: 2,
      firstName: "Abel",
      lastName: "Hailu",
      userName: "abel_h",
      role: "Administrator",
      updated: "2025-03-29T12:00:00.000Z",
    },
    {
      aId: 3,
      firstName: "Eden",
      lastName: "Wondimu",
      userName: "edenw",
      role: "Manager",
      updated: "2025-04-01T15:30:00.000Z",
    },
    {
      aId: 4,
      firstName: "Martha",
      lastName: "Kebede",
      userName: "martha_k",
      role: "Supervisor",
      updated: "2025-04-10T10:20:00.000Z",
    },
    {
      aId: 5,
      firstName: "Yohannes",
      lastName: "Gidey",
      userName: "yoh_g",
      role: "Coordinator",
      updated: "2025-04-07T14:45:00.000Z",
    },
    {
      aId: 6,
      firstName: "Sara",
      lastName: "Mengistu",
      userName: "sara_m",
      role: "Assistant Manager",
      updated: "2025-04-12T18:25:00.000Z",
    },
    {
      aId: 7,
      firstName: "Tewodros",
      lastName: "Lemma",
      userName: "tewodros_lemma",
      role: "Team Lead",
      updated: "2025-04-05T09:10:00.000Z",
    },
    {
      aId: 8,
      firstName: "Hana",
      lastName: "Mulugeta",
      userName: "hana.m",
      role: "HR Specialist",
      updated: "2025-04-02T11:40:00.000Z",
    },
    {
      aId: 9,
      firstName: "Samuel",
      lastName: "Getachew",
      userName: "samuel_g",
      role: "Operations Manager",
      updated: "2025-04-15T20:00:00.000Z",
    },
    {
      aId: 10,
      firstName: "Liya",
      lastName: "Asfaw",
      userName: "liya_asfaw",
      role: "Logistics Officer",
      updated: "2025-04-08T13:50:00.000Z",
    },
  ];

  const sortedHallInfo = initializeAdminInfo.sort(
    (a, b) => new Date(b.updated) - new Date(a.updated)
  );
  const [approvedRes, setApprovedRes] = useState(sortedHallInfo);

  const handleDelete = (aId) => {
    const updatedRes = approvedRes.filter((res) => res.aId !== aId);
    setApprovedRes(updatedRes); // Update state to remove the deleted row
  };

  const currentRole = "Director";

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
              <th>Actions</th> {/* New column for action buttons */}
            </tr>
          </thead>
          <tbody>
            {approvedRes.map((apprRes, index) => (
              <tr key={index}>
                <td data-label="Admin ID">{apprRes.aId}</td>
                <td data-label="First Name">{apprRes.firstName}</td>
                <td data-label="Last Name">{apprRes.lastName}</td>
                <td data-label="User Name">{apprRes.userName}</td>
                <td data-label="Role">{apprRes.role}</td>
                <td data-label="Updated At">
                  {new Date(apprRes.updated).toLocaleDateString()}
                </td>
                <td>
                  {/* Action Buttons */}
                  <div
                    className="delete-button"
                    onClick={() => handleDelete(apprRes.aId)}
                  >
                    Delete
                  </div>
                  <Link
                    to={`/updateAdmin/${apprRes.aId}`}
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
