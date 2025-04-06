import React, { useState } from "react";
import "./UpdateHall.css";
import NavBar from "../../components/NavBar/NavBar";

function UpdateHall() {
  const initializeLoginData = {
    hallName: "",
    capacity: 0,
    location: "",
  };

  const [data, setData] = useState(initializeLoginData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", data);
    setData(initializeLoginData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  return (
    <>
      <NavBar />
      <div className="update-hall-page">
        <form className="update-hall-form" onSubmit={handleSubmit}>
          <header className="update-hall-header">
            <h2>Hall Update Form</h2>
          </header>
          <div className="update-hall-inputs">
            <div className="update-hall-name-container">
              <label>Hall Name</label>
              <input
                type="text"
                className="update-hall-name-input"
                name="hallName"
                value={data.hallName}
                onChange={handleChange}
                placeholder="Example: Room A"
                required
              />
            </div>
            <div className="update-hall-name-container">
              <label>Capacity</label>
              <input
                type="number"
                min="1"
                className="update-hall-name-input"
                name="capacity"
                value={data.capacity || ""}
                onChange={handleChange}
                placeholder="Example: 100"
                required
              />
            </div>
            <div className="update-hall-name-container">
              <label>Location</label>
              <input
                type="text"
                className="update-hall-name-input"
                name="location"
                value={data.location}
                onChange={handleChange}
                placeholder="Example: Yeka kifleketema"
                required
              />
            </div>
            <button type="submit" className="update-hall-btn">
              Update Hall
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateHall;
