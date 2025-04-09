import React, { useEffect, useState } from "react";
import "./UpdateHall.css";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { editHall, getHallById } from "../../api/AdminRequest";

function UpdateHall() {
  const [hall, setHall] = useState(null);
  const { hId } = useParams();
  const navigate = useNavigate();
  const initializeLoginData = {
    hallName: "",
    capacity: 0,
    location: "",
  };

  const [data, setData] = useState(initializeLoginData);

  useEffect(() => {
    const fetchHallData = async () => {
      try {
        const response = await getHallById(hId);
        setHall(response.data.data);
        setData({
          hallName: response.data.data.hallName || "",
          capacity: response.data.data.capacity || "",
          location: response.data.data.location || "",
        });
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      }
    };

    fetchHallData();
  }, [hId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let resMsg = "";

    if (
      hall.hallName == data.hallName &&
      hall.capacity == data.capacity &&
      hall.location == data.location
    ) {
      resMsg = "You did not change anything!!";
    } else {
      try {
        const response = await editHall(hId, data);
        resMsg = response.data.message;
        if (response.data.success) {
          navigate("/displayHalls");
          setData(initializeLoginData);
        }
      } catch (error) {
        resMsg = error.response.data.message;
        console.log(error);
      }
    }
    alert(resMsg);
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
