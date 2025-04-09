import React, { useEffect, useState } from "react";
import "./ReservationPage.css";
import NavBar from "../../components/NavBar/NavBar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import dayjs from "dayjs";
import { getAllHallDetails, reserveHall } from "../../api/UserRequest";
import { toast } from "react-toastify";

function ReservationPage() {
  const defaultHallId = 1; // Default hall ID
  const [data, setData] = useState({
    reserverOffice: "",
    reserverName: "",
    reserverPhone: "",
    reserverEmail: "",
    reservationDate: null,
    timeFrom: "",
    timeTo: "",
    hId: defaultHallId,
  });

  const [resTime, setResTime] = useState(["10:00", "11:00"]);
  const [allHalls, setAllHalls] = useState([]);

  useEffect(() => {
    const fetchHall = async () => {
      try {
        const response = await getAllHallDetails();
        setAllHalls(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchHall();
  }, []);

  const formatTimeTo12Hour = (time24) => {
    let [hours, minutes] = time24.split(":");
    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 and 12 to 12
    return `${hours}:${minutes} ${suffix}`;
  };

  const companies = ["Office A", "Office B", "Office C"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "hId") {
      setData((prevData) => ({ ...prevData, [name]: parseInt(value) }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleDateChange = (newDate) => {
    const today = dayjs();
    if (dayjs(newDate).isValid() && dayjs(newDate).isAfter(today, "day")) {
      setData((prevData) => ({
        ...prevData,
        reservationDate: dayjs(newDate).format("YYYY-MM-DD"),
      }));
    } else {
      alert("Please select a valid date that is today or in the future.");
      setData((prevData) => ({
        ...prevData,
        reservationDate: today.format("YYYY-MM-DD"),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resTime[0] || !resTime[1]) {
      toast.info("Please select a valid time range!");
      return;
    }
    if (
      dayjs(`2023-01-01 ${resTime[0]}`).isAfter(
        dayjs(`2023-01-01 ${resTime[1]}`)
      )
    ) {
      toast.info("The end time cannot be earlier than the start time!");
      return;
    }
    // Format time into 12-hour format
    const formattedTime = resTime.map(formatTimeTo12Hour);

    const formattedData = {
      ...data,
      reservationDate: data.reservationDate
        ? dayjs(data.reservationDate).format("YYYY-MM-DD")
        : null,
      timeFrom: formattedTime[0],
      timeTo: formattedTime[1],
    };

    try {
      const response = await reserveHall(formattedData);
      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "An unexpected error occurred."
      );
      console.log(error);
    }
  };

  const resetForm = () => {
    setData({
      reserverOffice: "",
      reserverName: "",
      reserverPhone: "",
      reserverEmail: "",
      reservationDate: null,
      timeFrom: "",
      timeTo: "",
      hId: defaultHallId,
    });
    setResTime(["10:00", "11:00"]);
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                placeholder="Example: Abel Hailu"
                required
              />
            </div>
            <div className="res-name-container">
              <label>Reserver Phone</label>
              <input
                type="tel"
                className="res-name-input"
                name="reserverPhone"
                value={data.reserverPhone}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                placeholder="Ex: abelh@gmail.com"
                required
              />
            </div>
            <div className="res-company-name-container">
              <label>Select Time:</label>
              <TimeRangePicker onChange={setResTime} value={resTime} required />
            </div>
            <div className="res-date-container">
              <label>Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={
                    data.reservationDate
                      ? dayjs(data.reservationDate, "YYYY-MM-DD")
                      : null
                  }
                  onChange={handleDateChange}
                  minDate={dayjs()}
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
                value={data.hId}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select a Hall
                </option>
                {allHalls.map((hall) => (
                  <option key={hall.hId} value={hall.hId}>
                    {hall.hallName}
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
