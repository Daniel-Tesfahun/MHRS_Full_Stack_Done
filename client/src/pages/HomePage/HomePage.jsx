import React, { useState } from "react";
import "./HomePage.css";
import NavBar from "../../components/NavBar/NavBar";

function HomePage() {
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

  // for the useEffect hook, we can use the sorted data to set the state
  // setApprovedRes((prev) =>
  //   [...prev].sort((a, b) => new Date(b.reservationDate) - new Date(a.reservationDate))
  // );

  const adminInfo = {
    aId: 1,
    firstName: "Daniel",
    lastName: "Tesfahun",
    userName: "dan1",
    role: "Director",
    updated: "2025-04-04T21:00:00.000Z",
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
                {(adminInfo?.role === "Admin" ||
                  adminInfo?.role === "Director") && <th>Reservation Id</th>}
                <th>Reserver Office</th>
                <th>Hall Name</th>
                <th>Reservation Date</th>
                <th>Time Of Day</th>
                <th>Reserver Email</th>
                <th>Approved By</th>
              </tr>
            </thead>
            <tbody>
              {sortedHallInfo.map((apprRes, index) => (
                <tr key={index}>
                  {(adminInfo?.role === "Admin" ||
                    adminInfo?.role === "Director") && (
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
                  <td data-label="Time Of Day">{apprRes.timeOfDay}</td>
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
