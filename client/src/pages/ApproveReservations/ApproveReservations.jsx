import React, { useState } from "react";
import "./ApproveReservations.css";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";

const ApproveReservations = () => {
  const initializeReservation = [
    {
      rId: 1,
      reserverOffice: "Finance Department",
      reserverName: "Abel Hailu",
      reserverPhone: "0912345678",
      reserverEmail: "abel.hailu@example.com",
      timeOfDay: "Morning",
      reservationDate: "2025-04-04T21:00:00.000Z",
      approvedStatus: "Approved",
      hId: 1,
      aId: 1,
      created: "2025-04-04T00:52:11.000Z",
      updated: "2025-04-04T00:53:33.000Z",
    },
  ];

  const sortedHall = initializeReservation.sort(
    (a, b) => new Date(b.reservationDate) - new Date(a.reservationDate)
  );
  const [approvedRes, setApprovedRes] = useState(sortedHall);

  const handleApprove = (rId) => {
    const updatedRes = approvedRes.filter((res) => res.rId !== rId);
    setApprovedRes(updatedRes); // Update state to remove the deleted row
  };
  const handleReject = (rId) => {
    const updatedRes = approvedRes.filter((res) => res.rId !== rId);
    setApprovedRes(updatedRes); // Update state to remove the deleted row
  };

  return (
    <>
      <NavBar />
      <div className="UsersList">
        <h1 className="display-admins-header">Display Reservations</h1>
        <table>
          <thead>
            <tr>
              <th>Office</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Time Of Day</th>
              <th>Date</th>
              <th>Approval Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedRes.map((apprRes, index) => (
              <tr key={index}>
                <td data-label="Office">{apprRes.reserverOffice}</td>
                <td data-label="Name">{apprRes.reserverName}</td>
                <td data-label="Phone">{apprRes.reserverPhone}</td>
                <td data-label="Email">{apprRes.reserverEmail}</td>
                <td data-label="Time Of Day">{apprRes.timeOfDay}</td>
                <td data-label="Date">
                  {new Date(apprRes.reservationDate).toLocaleDateString()}
                </td>
                <td data-label="Approval Status">{apprRes.approvedStatus}</td>
                <td>
                  {/* Action Buttons */}
                  <div
                    className="delete-button"
                    onClick={() => handleApprove(apprRes.rId)}
                  >
                    Approve
                  </div>
                  <div
                    className="edit-button"
                    onClick={() => handleReject(apprRes.rId)}
                  >
                    Reject
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApproveReservations;
