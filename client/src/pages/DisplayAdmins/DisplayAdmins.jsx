import React, { useState } from "react";
import "./DisplayAdmins.css";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";

const DisplayAdmins = () => {
  const initializeHallInfo = [
    {
      hallName: "Hall A",
      approvedBy: "Daniel Tesfahun",
      reserverOffice: "Finance Department",
      reservationId: 1,
      reservationDate: "2025-04-04T21:00:00.000Z",
      timeOfDay: "Morning",
      reserverEmail: "abel.hailu@example.com",
    },
    {
      hallName: "Hall B",
      approvedBy: "Daniel Tesfahun",
      reserverOffice: "Company D",
      reservationId: 4,
      reservationDate: "2025-04-07T21:00:00.000Z",
      timeOfDay: "All Day",
      reserverEmail: "yohG11@gmail.com",
    },
    {
      hallName: "Hall C",
      approvedBy: "Abel Hailu",
      reserverOffice: "Human Resources",
      reservationId: 5,
      reservationDate: "2025-04-10T14:00:00.000Z",
      timeOfDay: "Afternoon",
      reserverEmail: "hr.manager@example.com",
    },
    {
      hallName: "Hall D",
      approvedBy: "Eden Wondimu",
      reserverOffice: "Marketing Team",
      reservationId: 7,
      reservationDate: "2025-04-12T09:00:00.000Z",
      timeOfDay: "Morning",
      reserverEmail: "marketing.lead@example.com",
    },
    {
      hallName: "Hall E",
      approvedBy: "Yohannes Gidey",
      reserverOffice: "Executive Office",
      reservationId: 9,
      reservationDate: "2025-04-15T17:00:00.000Z",
      timeOfDay: "Evening",
      reserverEmail: "ceo@example.com",
    },
    {
      hallName: "Hall F",
      approvedBy: "Martha Kebede",
      reserverOffice: "IT Department",
      reservationId: 11,
      reservationDate: "2025-04-18T10:00:00.000Z",
      timeOfDay: "Morning",
      reserverEmail: "it.support@example.com",
    },
    {
      hallName: "Hall G",
      approvedBy: "Martha Kebede",
      reserverOffice: "Product Team",
      reservationId: 13,
      reservationDate: "2025-04-20T08:00:00.000Z",
      timeOfDay: "Morning",
      reserverEmail: "product.manager@example.com",
    },
    {
      hallName: "Hall H",
      approvedBy: "Abel Hailu",
      reserverOffice: "Customer Service",
      reservationId: 15,
      reservationDate: "2025-04-22T15:00:00.000Z",
      timeOfDay: "Afternoon",
      reserverEmail: "customer.support@example.com",
    },
    {
      hallName: "Hall I",
      approvedBy: "Eden Wondimu",
      reserverOffice: "Legal Department",
      reservationId: 17,
      reservationDate: "2025-04-25T13:00:00.000Z",
      timeOfDay: "Afternoon",
      reserverEmail: "legal.advisor@example.com",
    },
    {
      hallName: "Hall J",
      approvedBy: "Yohannes Gidey",
      reserverOffice: "Accounting",
      reservationId: 19,
      reservationDate: "2025-04-28T19:00:00.000Z",
      timeOfDay: "Evening",
      reserverEmail: "accounting.head@example.com",
    },
  ];

  const [approvedRes, setApprovedRes] = useState(initializeHallInfo);
  const sortedHallInfo = initializeHallInfo.sort(
    (a, b) => new Date(b.reservationDate) - new Date(a.reservationDate)
  );

  const handleDelete = (reservationId) => {
    const updatedRes = approvedRes.filter(
      (res) => res.reservationId !== reservationId
    );
    setApprovedRes(updatedRes); // Update state to remove the deleted row
  };

  const role = "Director";

  return (
    <>
      <NavBar />
      <div className="UsersList">
        <h1 className="display-admins-header">Display Admins</h1>
        <table>
          <thead>
            <tr>
              <th>Reservation Id</th>
              <th>Reserver Office</th>
              <th>Hall Name</th>
              <th>Reservation Date</th>
              <th>Time Of Day</th>
              <th>Reserver Email</th>
              <th>Approved By</th>
              <th>Actions</th> {/* New column for action buttons */}
            </tr>
          </thead>
          <tbody>
            {sortedHallInfo.map((apprRes, index) => (
              <tr key={index}>
                <td>{apprRes.reservationId}</td>
                <td>{apprRes.reserverOffice}</td>
                <td>{apprRes.hallName}</td>
                <td>
                  {new Date(apprRes.reservationDate).toLocaleDateString()}
                </td>
                <td>{apprRes.timeOfDay}</td>
                <td>{apprRes.reserverEmail}</td>
                <td>{apprRes.approvedBy}</td>
                <td>
                  {/* Action Buttons */}
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(apprRes.reservationId)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/edit/${apprRes.reservationId}`}
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
