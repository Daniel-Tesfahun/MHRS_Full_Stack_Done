import React, { useEffect, useState } from "react";
import "./ApproveReservations.css";
import NavBar from "../../components/NavBar/NavBar";
import { getAllReservations } from "../../api/AdminRequest";

const ApproveReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservationsData = async () => {
      try {
        const response = await getAllReservations();
        const unsorted = response.data.data;
        const sortedReservations = unsorted.sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );
        setReservations(sortedReservations);
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      }
    };

    fetchReservationsData();
  }, []);
  console.log(reservations);

  const handleApprove = (rId) => {
    const updatedRes = reservations.filter((res) => res.rId !== rId);
    setReservations(updatedRes); // Update state to remove the deleted row
  };
  const handleReject = (rId) => {
    const updatedRes = reservations.filter((res) => res.rId !== rId);
    setReservations(updatedRes); // Update state to remove the deleted row
  };

  return (
    <>
      <NavBar />
      <div className="UsersList">
        <h1 className="display-admins-header">Display Reservations</h1>
        {reservations.length > 0 ? (
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
              {reservations.map((apprRes, index) => (
                <tr key={index}>
                  <td data-label="Office">{apprRes.reserverOffice}</td>
                  <td data-label="Name">{apprRes.reserverName}</td>
                  <td data-label="Phone">{apprRes.reserverPhone}</td>
                  <td data-label="Email">{apprRes.reserverEmail}</td>
                  <td data-label="Time Of Day">{apprRes.timeOfDay}</td>
                  <td data-label="Date">
                    {new Date(apprRes.reservationDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
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
        ) : (
          <h3 className="no-reservation-msg">There is no reservation yet!</h3>
        )}
      </div>
    </>
  );
};

export default ApproveReservations;
