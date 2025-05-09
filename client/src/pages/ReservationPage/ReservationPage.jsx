import React, { useEffect, useState } from "react";
import "./ReservationPage.css";
import NavBar from "../../components/NavBar/NavBar";
import EtDatePicker from "mui-ethiopian-datepicker";
import { EtLocalizationProvider } from "mui-ethiopian-datepicker";
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
    timeOfDay: "",
    hId: defaultHallId,
  });

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

  const companies = [
    "ዋና ስራ አስፈፃሚ ፅ/ቤት",
    "ፍትህ ፅ/ቤት",
    "ሰላምና ፀጥታ ፅ/ቤት",
    "ደንብ ፅ/ቤት",
    "ምክር ቤት ፅ/ቤት",
    "አርሶአደርና ከተማ ግብርና ልማት ፅ/ቤት",
    "ህብረት ስራ ፅ/ቤት",
    "ንግድ ፅ/ቤት",
    "ፋይናንስ ፅ/ቤት",
    "ፕላንና ልማት ፅ/ቤት",
    "ፅዳት አስተዳደር ጽ/ቤት",
    "አካባቢ ጥበቃ ጽ/ቤት",
    "ከተማ ውበትና አረንጓዴ ልማት ጽ/ቤት",
    "ስራ አስኪያጅ ጽ/ቤት",
    "ሲቪል ምዝገባና የነዎሪዎች አገልግሎት ጽ/ቤት",
    "የፐብሊክ ሰርቪስ የሰው ሀብት ልማት ጽ/ቤት",
    "ባህልና ቱሪዝም ጽ/ቤት",
    "ትምህርት ፅ/ቤት",
    "ሴቶችና ህፃናት ፅ/ቤት",
    "ጤና ፅ/ቤት",
    "ኮሙኒኬሽን ፅ/ቤት",
    "የመንግስት ንብረት አስተዳደር ፅ/ቤት",
    "ዲዛይንና ግንባታ ስራዎች ጽ/ቤት",
    "ቤቶች አስተዳደር ልማት ጽ/ቤት",
    "መስሪያ ቦታዎች ልማት ጽ/ቤት",
    "ግንባታ ፍቃድና ቁጥጥር ጽ/ቤት",
    "ኢንዱስትሪ ልማት ጽ/ቤት",
    "ህብረተሰብ ተሳትፎና በጎፍቃድ ማስተባበሪያ ጽ/ቤት",
    "ስራና ክህሎት ጽ/ቤት",
    "ኢኖቬሽን ቴክኖሎጂ ልማት ጽ/ቤት",
    "ወጣቶችና ስፖርት ጽ/ቤት",
    "ሌሎች",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "hId") {
      setData((prevData) => ({ ...prevData, [name]: parseInt(value) }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // const handleDateChange = (newDate) => {
  //   const today = new Date();
  //   if (newDate && newDate > today) {
  //     setData((prevData) => ({
  //       ...prevData,
  //       reservationDate: newDate.toISOString().split("T")[0],
  //     }));
  //   } else {
  //     toast.info("Please select a valid date that is today or in the future.");
  //     setData((prevData) => ({
  //       ...prevData,
  //       reservationDate: today.toISOString().split("T")[0],
  //     }));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...data,
      reservationDate: data.reservationDate
        ? dayjs(data.reservationDate).format("YYYY-MM-DD")
        : null,
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
      timeOfDay: "",
      hId: defaultHallId,
    });
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
              <label>የጠያቂዉ ተቋሙ ስም:</label>
              <select
                className="res-company-select select-office"
                name="reserverOffice"
                value={data.reserverOffice}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  ተቋማት ዝርዝር
                </option>
                {companies.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
            <div className="res-name-container">
              <label>የጠያቂዉ ስም:</label>
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
              <label>የጠያቂዉ ስልክ ቁጥር:</label>
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
              <label>የጠያቂዉ ኢሜል:</label>
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
              <label>የቆይታ ጊዜ:</label>
              <select
                className="res-company-select"
                name="timeOfDay"
                value={data.timeOfDay}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  የቆይታ ጊዜ ይምረጡ
                </option>
                <option value="Morning">ጠዋት</option>
                <option value="Afternoon">ከሰአት</option>
                <option value="All Day">ሙሉ ቀን</option>
              </select>
            </div>
            <div className="res-date-container">
              <label>ቀን:</label>
              <EtLocalizationProvider localType="AMH">
                <EtDatePicker
                  label="ቀን"
                  value={data.reservationDate}
                  minDate={new Date()}
                  onChange={(selectedDate) => {
                    setData((prevData) => ({
                      ...prevData,
                      reservationDate: selectedDate,
                    }));
                  }}
                />
              </EtLocalizationProvider>
            </div>
            <div className="res-company-name-container">
              <label>አዳራሽ ይምረጡ:</label>
              <select
                className="res-company-select"
                name="hId"
                value={data.hId}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  አዳራሾች
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
