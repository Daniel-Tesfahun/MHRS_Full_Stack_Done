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
    // check if the reservation is already booked for the same time slot on the same date and hall and if the timeOfDay does not conflict with existing reservations
    const [existingReservations] = await pool.query(
      `SELECT * FROM reservations 
       WHERE hId = ? 
       AND reservationDate = ? 
       AND (timeOfDay = ? OR timeOfDay = 'All Day' OR ? = 'All Day')`,
      [hId, reservationDate, timeOfDay, timeOfDay]
    );

    const allSlots = ["Morning", "Afternoon", "All Day"];
    const bookedSlots = existingReservations.map(
      (reservation) => reservation.timeOfDay
    );

    // Filter out booked slots based on the selected timeOfDay
    const availableSlots = allSlots.filter((slot) => {
      // "All Day" blocks other slots, and vice versa
      if (bookedSlots.includes("All Day")) return false;
      if (
        slot === "All Day" &&
        (bookedSlots.includes("Morning") || bookedSlots.includes("Afternoon"))
      )
        return false;

      return !bookedSlots.includes(slot);
    });

    if (existingReservations.length > 0) {
      // Extract booked slots
      const bookedSlots = existingReservations.map(
        (reservation) => reservation.timeOfDay
      );

      // Define all possible time slots
      const allSlots = ["Morning", "Afternoon", "All Day"];

      // Determine available slots
      const availableSlots = allSlots.filter((slot) => {
        if (bookedSlots.includes("All Day")) return false; // "All Day" blocks everything
        if (
          slot === "All Day" &&
          (bookedSlots.includes("Morning") || bookedSlots.includes("Afternoon"))
        )
          return false;

        return !bookedSlots.includes(slot);
      });

      // Respond with feedback including available slots in the message
      const slotsMessage =
        availableSlots.length > 0
          ? `Available slots for this day are: ${availableSlots.join(", ")}.`
          : "There are no available slots for this day.";

      return {
        success: false,
        statCode: 409,
        message: `This time slot is already booked! ${slotsMessage}`,
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
