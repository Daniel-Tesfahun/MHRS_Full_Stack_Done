import React, { useState } from "react";
import "./ReservationPage.css";
import NavBar from "../../components/NavBar/NavBar";

// DatePicker Packages
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { reserveHall } from "../../api/UserRequest";

function ReservationPage() {
  let date = Date();
  const defaultHallId = 1; // Default hall ID
  // const [dateValue, setDateValue] = useState(dayjs(date));

  const initializeReservationData = {
    reserverOffice: "",
    reserverName: "",
    reserverPhone: "",
    reserverEmail: "",
    reservationDate: null, // Starts as null
    timeOfDay: "",
    hId: defaultHallId,
  };
  const [data, setData] = useState(initializeReservationData);

  // reset form data
  const resetForm = () => {
    setData(initializeReservationData);
  };

  const companies = [
    "Company A",
    "Company B",
    "Company C",
    "Company D",
    "Company E",
    "Company F",
    "Company G",
    "Company H",
    "Company I",
    "Company J",
    "Company K",
    "Company L",
    "Company M",
    "Company N",
    "Company O",
    "Company P",
    "Company Q",
    "Company R",
    "Company S",
    "Company T",
    "Company U",
    "Company V",
    "Company W",
    "Company X",
    "Company Y",
  ];

  const halls = {
    "Hall A": 1,
    "Hall B": 2,
  };

  const handleChange = (e) => {
    if (e.target.name === "hId") {
      setData((prevData) => ({ ...prevData, hId: parseInt(e.target.value) }));
    } else {
      const { name, value } = e.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleDateChange = (newDate) => {
    const today = dayjs(); // Get today's date

    if (dayjs(newDate).isValid() && dayjs(newDate).isAfter(today, "day")) {
      setData((prevData) => ({
        ...prevData,
        reservationDate: dayjs(newDate), // Store as a dayjs object
      }));
    } else {
      alert("Please select a valid date that is today or in the future.");
      setData((prevData) => ({
        ...prevData,
        reservationDate: today, // Reset to today's date if invalid
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...data,
      reservationDate: data.reservationDate
        ? data.reservationDate.format("YYYY-MM-DD")
        : null,
    };

    let resMessage = "";

    try {
      const response = await reserveHall(formattedData);
      resMessage = response.data.message;
      if (response.data.success) {
        resetForm();
      }
    } catch (error) {
      // console.error("Error during reservation:", error);
      resMessage = error.response.data.message;
    }
    alert(resMessage);
  };

  return (
    <>
      <NavBar />
      <div className="reservation-page">
        <form onSubmit={handleSubmit} className="res-form">
          <header className="res-header">
            <h2>Reservation Form</h2>
          </header>
          <div className="res-inputs">
            <div className="res-company-name-container">
              <label>Select an Office:</label>
              <select
                className="res-company-select"
                name="reserverOffice"
                value={data.reserverOffice}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select an office
                </option>
                {companies.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
            <div className="res-name-container">
              <label>Reserver Name</label>
              <input
                type="text"
                className="res-name-input"
                name="reserverName"
                value={data.reserverName}
                onChange={handleChange}
                placeholder="Example: Abel Hailu"
                required
              />
            </div>
            <div className="res-name-container">
              <label>Reserver Phone</label>
              <input
                type="text"
                className="res-name-input"
                name="reserverPhone"
                value={data.reserverPhone}
                onChange={handleChange}
                placeholder="Example: 0912345678"
                required
              />
            </div>
            <div className="res-name-container">
              <label>Reserver Email</label>
              <input
                type="email"
                className="res-name-input"
                name="reserverEmail"
                value={data.reserverEmail}
                onChange={handleChange}
                placeholder="Ex: abelh@gmail.com"
                required
              />
            </div>
            <div className="res-company-name-container">
              <label>Select Time:</label>
              <select
                className="res-company-select"
                name="timeOfDay"
                value={data.timeOfDay}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Choose an option
                </option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="All Day">All Day</option>
              </select>
            </div>
            <div className="res-date-container">
              <label>Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={data.reservationDate || null}
                  onChange={handleDateChange}
                  minDate={dayjs(date)}
                  format="DD/MM/YYYY"
                  textField={(params) => (
                    <input
                      {...params}
                      name="reservationDate"
                      style={{ width: "100%" }}
                      required
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="res-company-name-container">
              <label>Select a Hall:</label>
              <select
                className="res-company-select"
                name="hId"
                value={data.hId} // Default
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a Hall
                </option>
                {Object.entries(halls).map(([hallName, hallId]) => (
                  <option key={hallId} value={hallId}>
                    {hallName}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="res-btn">
              BOOK A MEETING HALL
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ReservationPage;
