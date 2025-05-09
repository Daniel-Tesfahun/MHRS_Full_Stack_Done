import React, { useEffect, useState } from "react";
import "./ApproveReservations.css";
import NavBar from "../../components/NavBar/NavBar";
import {
  approveReservation,
  getAllReservations,
  rejectReservation,
} from "../../api/AdminRequest";
import { toast } from "react-toastify";
import { EthiopianDateUtil } from "mui-ethiopian-datepicker";
import DashboardNav from "../../components/DashboardNav/DashboardNav";

const ApproveReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchReservationsData = async () => {
      try {
        const response = await getAllReservations();
        const unsorted = response.data.data;
        const sortedReservations = unsorted.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
        setReservations(sortedReservations);
      } catch (err) {
        console.error("Failed to fetch Reservations data:", err);
      }
    };

    fetchReservationsData();
  }, [fetchTrigger]);

  const handleApprove = async (rId) => {
    try {
      const response = await approveReservation(rId);
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
      console.log(error.response.data.message);
    }
  };
  const handleReject = async (rId) => {
    try {
      const response = await rejectReservation(rId);
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
      console.log(error.response.data.message);
    }
  };

  const ethiopianMonths = [
    "መስከረም",
    "ጥቅምት",
    "ኅዳር",
    "ታህሳስ",
    "ጥር",
    "የካቲት",
    "መጋቢት",
    "ሚያዝያ",
    "ግንቦት",
    "ሰኔ",
    "ሐምሌ",
    "ነሐሴ",
    "ጳጉሜን",
  ];

  const timeMapping = {
    Morning: "ጠዋት",
    Afternoon: "ከሰአት",
    "All Day": "ሙሉ ቀን",
  };

  return (
    <div className="dashboard-container">
      <NavBar />
      <DashboardNav />
      <div className="dashboard-content">
        <div className="UsersList">
          <h1 className="display-admins-header">Display Reservations</h1>
          {reservations.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Hall Name</th>
                  <th>Office</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Approval Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((apprRes, index) => (
                  <tr key={index}>
                    <td data-label="Hall Name">{apprRes.hallName}</td>
                    <td data-label="Office">{apprRes.reserverOffice}</td>
                    <td data-label="Name">{apprRes.reserverName}</td>
                    <td data-label="Phone">{apprRes.reserverPhone}</td>
                    <td data-label="Email">{apprRes.reserverEmail}</td>
                    <td data-label="Time">
                      {timeMapping[apprRes.timeOfDay] || apprRes.timeOfDay}
                    </td>
                    <td data-label="Date">
                      {apprRes.reservationDate
                        ? ethiopianMonths[
                            EthiopianDateUtil.toEth(
                              new Date(apprRes.reservationDate)
                            ).Month - 1
                          ] +
                          " " +
                          EthiopianDateUtil.toEth(
                            new Date(apprRes.reservationDate)
                          ).Day +
                          " " +
                          EthiopianDateUtil.toEth(
                            new Date(apprRes.reservationDate)
                          ).Year
                        : "N/A"}
                    </td>
                    <td data-label="Approval Status">
                      {apprRes.approvedStatus}
                    </td>
                    <td>
                      {/* Action Buttons */}
                      {apprRes.approvedStatus !== "Approved" && (
                        <div
                          className="edit-button"
                          onClick={() => handleApprove(apprRes.rId)}
                        >
                          Approve
                        </div>
                      )}
                      {apprRes.approvedStatus !== "Rejected" && (
                        <div
                          className="delete-button"
                          onClick={() => handleReject(apprRes.rId)}
                        >
                          Reject
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 className="no-reservation-msg">There is no reservation yet!</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApproveReservations;
