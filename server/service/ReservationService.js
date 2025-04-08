import { pool } from "../config/db.js";

export const bookReservationService = async (reservationDetails) => {
  const {
    reserverOffice,
    reserverName,
    reserverPhone,
    reserverEmail,
    timeFrom,
    timeTo,
    reservationDate,
    hId,
  } = reservationDetails;
  console.log(reservationDetails);

  try {
    // Check for time conflicts for the same hall and date
    const [existingReservations] = await pool.query(
      `SELECT * FROM reservations 
        WHERE hId = ? 
        AND reservationDate = ?
        AND (
        (STR_TO_DATE(?, '%h:%i %p') BETWEEN STR_TO_DATE(timeFrom, '%h:%i %p') AND STR_TO_DATE(timeTo, '%h:%i %p')) OR
        (STR_TO_DATE(?, '%h:%i %p') BETWEEN STR_TO_DATE(timeFrom, '%h:%i %p') AND STR_TO_DATE(timeTo, '%h:%i %p')) OR
        (STR_TO_DATE(timeFrom, '%h:%i %p') BETWEEN STR_TO_DATE(?, '%h:%i %p') AND STR_TO_DATE(?, '%h:%i %p')) OR
        (STR_TO_DATE(timeTo, '%h:%i %p') BETWEEN STR_TO_DATE(?, '%h:%i %p') AND STR_TO_DATE(?, '%h:%i %p'))
        )
        `,
      [
        hId,
        reservationDate,
        timeFrom,
        timeTo,
        timeFrom,
        timeTo,
        timeFrom,
        timeTo,
      ]
    );

    if (existingReservations.length > 0) {
      // Gather conflicting reservations
      const conflictingReservations = existingReservations.map(
        (reservation) => `From ${reservation.timeFrom} to ${reservation.timeTo}`
      );

      return {
        success: false,
        statCode: 409,
        message: `The selected time slot is already booked! Conflicting reservations: ${conflictingReservations.join(
          ", "
        )}`,
      };
    }

    // Insert the new reservation
    await pool.query(
      `INSERT INTO reservations (reserverOffice, reserverName, reserverPhone, reserverEmail, timeFrom, timeTo, reservationDate, hId, created, updated)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        reserverOffice,
        reserverName,
        reserverPhone,
        reserverEmail,
        timeFrom,
        timeTo,
        reservationDate,
        hId,
      ]
    );

    return {
      success: true,
      statCode: 201,
      message:
        "Reservation booked successfully. Please wait until the admins approve it!",
    };
  } catch (error) {
    return {
      success: false,
      statCode: 500,
      message: "Internal server error from the database!",
      error: error,
    };
  }
};
