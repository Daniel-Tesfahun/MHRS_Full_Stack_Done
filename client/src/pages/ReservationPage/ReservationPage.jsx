import React, { useState } from "react";
import "./ReservationPage.css";
import NavBar from "../../components/NavBar/NavBar";

// DatePicker Packages
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function ReservationPage() {
  let date = Date();
  // const [dateValue, setDateValue] = useState(dayjs(date));

  const [data, setData] = useState({
    companyName: "",
    reserverName: "",
    reserverPhone: "",
    reservationDate: null, // Starts as null
    timeOfDay: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setData((prevData) => ({ ...prevData, reservationDate: newDate }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(dateValue);
    alert(
      `You reserved a hall for ${data.reservationDate.format("YYYY-MM-DD")} ${
        data.timeOfDay
      }`
    ); // Human readable way
    console.log(data);
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
              <label>Select a Company:</label>
              <select
                className="res-company-select"
                name="companyName"
                value={data.companyName}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a company
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
                  value={data.reservationDate}
                  onChange={handleDateChange}
                  minDate={dayjs(date)}
                  renderInput={(params) => (
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
