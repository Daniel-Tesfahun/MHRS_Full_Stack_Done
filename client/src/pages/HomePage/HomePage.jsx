import React from "react";
import "./HomePage.css";
import NavBar from "../../components/NavBar/NavBar";

function HomePage() {
  return (
    <div className="home-container">
      <NavBar />
      <header className="header">
        <h1>Welcome to the Meeting Hall Reservation System</h1>
        <p>Plan your events and reserve halls seamlessly.</p>
      </header>
      {/* Section 1 */}
      <section className="section section1">
        <h1>Section 1</h1>
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
