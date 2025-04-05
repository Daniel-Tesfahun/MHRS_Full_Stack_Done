import React, { useState } from "react";
import "./HomePage.css";
import NavBar from "../../components/NavBar/NavBar";

function HomePage() {
  const [approvedRes, setApprovedRes] = useState([]);

  return (
    <div className="home-container">
      <NavBar />
      <header className="header">
        <h1>Welcome to the Meeting Hall Reservation System</h1>
        <p>Plan your events and reserve halls seamlessly.</p>
      </header>
      {/* Section 1 */}
      <section className="section section1">
        <div className="UserTable">
          <table>
            <thead>
              <tr>
                {/* <th>Reservation Id</th>
                <th>Reserver Office</th>
                <th>Hall Name</th>
                <th>Reservation Date</th>
                <th>Time Of Day</th>
                <th>Reserver Email</th>
                <th>Approved By</th> */}
              </tr>
            </thead>
            <tbody>
              {/* {approvedRes.map((apprRes) => (
                <tr key={index}>
                  <td>{apprRes.reservationId}</td>
                  <td>{apprRes.reserverOffice}</td>
                  <td>{apprRes.reservationDate}</td>
                  <td>{apprRes.timeOfDay}</td>
                  <td>{apprRes.reserverEmail}</td>
                  <td>{apprRes.approvedBy}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2 */}
      <section className="section section2">
        <h1>Section 2</h1>
      </section>

      {/* Section 3 */}
      <section className="section section3">
        <h1>Section 3</h1>
      </section>
    </div>
  );
}

export default HomePage;
