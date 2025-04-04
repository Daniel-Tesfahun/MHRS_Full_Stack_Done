import { pool } from "../config/db.js";

export const bookReservationService = async (reservationDetails) => {
  const {
    reserverOffice,
    reserverName,
    reserverPhone,
    reserverEmail,
    timeOfDay,
    reservationDate,
    hId,
  } = reservationDetails;

  try {
    // Check if the hall is already booked for the same date and time slot
    const [existingReservations] = await pool.query(
      `SELECT * FROM reservations WHERE hId = ? AND reservationDate = ? AND timeOfDay = ?`,
      [hId, reservationDate, timeOfDay]
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
      `INSERT INTO reservations (reserverOffice, reserverName, reserverPhone, reserverEmail, timeOfDay, reservationDate, hId, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        reserverOffice,
        reserverName,
        reserverPhone,
        reserverEmail,
        timeOfDay,
        reservationDate,
        hId,
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
      message: "Internal server error from DB!!",
      error: error,
    };
  }
};
