import { pool } from "../config/db.js";

export const bookReservationService = async (reservationDetails) => {
  const {
    hallName,
    reserverOffice,
    reserverName,
    reserverPhone,
    reserverEmail,
    timeOfDay,
    reservationDate,
  } = reservationDetails;

  try {
    // Check if the hall is already booked for the same date and time slot
    const [existingReservations] = await pool.query(
      `SELECT * FROM reservations WHERE hallName = ? AND reservationDate = ? AND timeOfDay = ?`,
      [hallName, reservationDate, timeOfDay]
    );

    if (existingReservations.length > 0) {
      return {
        success: false,
        statCode: 409,
        message: "This hall is already booked for this time slot on this date.",
      };
    }

    // Insert reservation
    await pool.query(
      `INSERT INTO reservations (hallName, reserverOffice, reserverName, reserverPhone, reserverEmail, timeOfDay, reservationDate, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        hallName,
        reserverOffice,
        reserverName,
        reserverPhone,
        reserverEmail,
        timeOfDay,
        reservationDate,
      ]
    );
    return {
      success: true,
      statCode: 201,
      message:
        "Reservation booked successfully, Please wait until the admins approved it!!",
    };
  } catch (error) {
    return {
      success: false,
      statCode: 500,
      message: "Internal server error!!",
      error: error,
    };
  }
};
