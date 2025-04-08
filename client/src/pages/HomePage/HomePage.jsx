import React, { useEffect, useState } from "react";
import "./HomePage.css";
import NavBar from "../../components/NavBar/NavBar";
import { getAllApprovedReservations } from "../../api/UserRequest";
import { checkRole } from "../../assets/CheckRole";

function HomePage() {
  const [approvedRes, setApprovedRes] = useState([]);

  useEffect(() => {
    const fetchApprovedReservations = async () => {
      try {
        const response = await getAllApprovedReservations();
        const unsorted = response.data.data;
        const sortedReservations = unsorted.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
        console.log(response);
        setApprovedRes(sortedReservations);
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      }
    };

    fetchApprovedReservations();
  }, []);

  const adminInfo = {
    aId: 1,
    firstName: "Daniel",
    lastName: "Tesfahun",
    userName: "dan1",
    role: "Director",
    updated: "2025-04-04T21:00:00.000Z",
  };
  const check = checkRole();

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
                    {new Date(apprRes.reservationDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </td>
                  <td data-label="Time">{apprRes.reservationTime}</td>
                  <td data-label="Reserver Email">{apprRes.reserverEmail}</td>
                  <td data-label="Approved By">{apprRes.approvedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Section 2
      <section className="section section2">
        <h1>Section 2</h1>
      </section>

      {/* Section 3 */}
      {/*
      <section className="section section3">
        <h1>Section 3</h1>
      </section>{" "}
      */}
    </div>
  );
}

export default HomePage;
