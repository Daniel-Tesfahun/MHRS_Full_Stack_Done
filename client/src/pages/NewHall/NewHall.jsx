import React, { useState } from "react";
import "./NewHall.css";
import NavBar from "../../components/NavBar/NavBar";
import { addNewHall } from "../../api/AdminRequest";
import { toast } from "react-toastify";

function NewHall() {
  const initializeNewHallData = {
    hallName: "",
    capacity: 0,
    location: "",
  };

  const [msgState, setMsgState] = useState("");
  const [data, setData] = useState(initializeNewHallData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addNewHall(data);
      if (response.data.success) {
        toast.success(response.data.message);
        setData(initializeNewHallData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "An unexpected error occurred."
      );
    }
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
      <div className="new-hall-page">
        <form className="new-hall-form" onSubmit={handleSubmit}>
          <header className="new-hall-header">
            <h2>New Hall Form</h2>
          </header>
          <div className="new-hall-inputs">
            <div className="new-hall-name-container">
              <label>Hall Name</label>
              <input
                type="text"
                className="new-hall-name-input"
                name="hallName"
                value={data.hallName}
                onChange={handleChange}
                placeholder="Example: Room A"
                required
              />
            </div>
            <div className="new-hall-name-container">
              <label>Capacity</label>
              <input
                type="number"
                min="1"
                className="new-hall-name-input"
                name="capacity"
                value={data.capacity || ""}
                onChange={handleChange}
                placeholder="Example: 100"
                required
              />
            </div>
            <div className="new-hall-name-container">
              <label>Location</label>
              <input
                type="text"
                className="new-hall-name-input"
                name="location"
                value={data.location}
                onChange={handleChange}
                placeholder="Example: Yeka kifleketema"
                required
              />
            </div>
            <button type="submit" className="new-hall-btn">
              Add New Hall
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewHall;
