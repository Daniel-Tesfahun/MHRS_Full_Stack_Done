import React, { useEffect, useState } from "react";
import "./HomePage.css";
import NavBar from "../../components/NavBar/NavBar";
import { getAllApprovedReservations } from "../../api/UserRequest";
import { checkRole } from "../../assets/CheckRole";
import { EthiopianDateUtil } from "mui-ethiopian-datepicker";

function HomePage() {
  const [approvedRes, setApprovedRes] = useState([]);

  useEffect(() => {
    const fetchApprovedReservations = async () => {
      try {
        const response = await getAllApprovedReservations();
        const unsorted = response.data.data;
        const sortedReservations = unsorted.sort(
          (a, b) => new Date(b.reservationDate) - new Date(a.reservationDate)
        );
        setApprovedRes(sortedReservations);
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      }
    };

    fetchApprovedReservations();
  }, []);

  const check = checkRole();

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
    <div className="home-container">
      <NavBar />
      <header className="header">
        <h1>Welcome to the Meeting Hall Reservation System</h1>
        <p>Plan your events and reserve halls seamlessly.</p>
      </header>
      {/* Section 1 */}
      <section className="section section1">
        <h1>Check Your Reservations Status Here</h1>
        <div className="UsersList">
          <h1 style={{ color: "#374151" }}>Approved Reservations</h1>
          <table>
            <thead>
              <tr>
                {check && <th>Reservation Id</th>}
                <th>Reserver Office</th>
                <th>Hall Name</th>
                <th>Reservation Date</th>
                <th>Time</th>
                <th>Reserver Email</th>
                <th>Approved By</th>
              </tr>
            </thead>
            <tbody>
              {approvedRes.map((apprRes, index) => (
                <tr key={index}>
                  {check && (
                    <td data-label="Reservation Id">{apprRes.reservationId}</td>
                  )}
                  <td data-label="Reserver Office">{apprRes.reserverOffice}</td>
                  <td data-label="Hall Name">{apprRes.hallName}</td>
                  <td data-label="Reservation Date">
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
                  <td data-label="Time">
                    {timeMapping[apprRes.reservationTime] ||
                      apprRes.reservationTime}
                  </td>
                  <td data-label="Reserver Email">{apprRes.reserverEmail}</td>
                  <td data-label="Approved By">{apprRes.approvedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
