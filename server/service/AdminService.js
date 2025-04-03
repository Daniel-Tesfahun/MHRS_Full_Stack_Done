import { pool } from "../config/db.js";

export const approveReservation = async (rId, approvedBy) => {
  try {
    // Check if the reservation is already approved
    const [existingReservation] = await pool.query(
      `SELECT * FROM reservations WHERE rId = ? AND approvedStatus = 'Approved'`,
      [rId]
    );
    if (existingReservation.length > 0) {
      return {
        success: false,
        statCode: 400,
        message: "Reservation is already approved.",
      };
    }
    // Update the reservation status to 'Approved'
    const [result] = await pool.query(
      `UPDATE reservations SET approvedStatus = 'Approved' WHERE rId = ?`,
      [rId]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        statCode: 404,
        message: "Reservation not found.",
      };
    }

    // Fetch the updated reservation details
    const [updatedReservation] = await pool.query(
      `SELECT * FROM reservations WHERE rId = ?`,
      [rId]
    );

    const data = updatedReservation[0];
    const {
      hallName,
      reserverOffice,
      reserverEmail,
      timeOfDay,
      reservationDate,
    } = data;

    // Insert into hallInfo table
    await pool.query(
      `INSERT INTO hallInfo (hallName, approvedBy, reservedBy, reservationId, reservationDate, timeOfDay, reserverEmail,created, updated) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        hallName,
        approvedBy,
        reserverOffice,
        rId,
        reservationDate,
        timeOfDay,
        reserverEmail,
      ]
    );

    return {
      success: true,
      statCode: 200,
      message: `Reservation of ${hallName} by ${reserverOffice} for ${reservationDate} ${timeOfDay} approved successfully.`,
    };
  } catch (error) {
    return {
      success: false,
      statCode: 500,
      message: "Internal server error.",
      error: error,
    };
  }
};

export const rejectReservation = async (rId) => {
  try {
    // Update the reservation status to 'Rejected'
    const [result] = await pool.query(
      `UPDATE reservations SET approvedStatus = 'Rejected' WHERE rId = ?`,
      [rId]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        statCode: 404,
        message: "Reservation not found.",
      };
    }

    // Fetch the updated reservation details
    const [updatedReservation] = await pool.query(
      `SELECT * FROM reservations WHERE rId = ?`,
      [rId]
    );

    const data = updatedReservation[0];
    const { hallName, reserverOffice, timeOfDay, reservationDate } = data;

    return {
      success: true,
      statCode: 200,
      message: `Reservation of ${hallName} by ${reserverOffice} for ${reservationDate} ${timeOfDay} rejected successfully.`,
    };
  } catch (error) {
    return {
      success: false,
      statCode: 500,
      message: "Internal server error.",
      error: error,
    };
  }
};

export const getAllReservations = async () => {
  try {
    const [reservations] = await pool.query(`SELECT * FROM reservations`);
    return {
      success: true,
      statCode: 200,
      message: "All reservations fetched successfully.",
      data: reservations,
    };
  } catch (error) {
    return {
      success: false,
      statCode: 500,
      message: "Internal server error.",
      error: error,
    };
  }
};

export const getAllHallInfo = async () => {
  try {
    const [hallInfo] = await pool.query(`SELECT * FROM hallInfo`);
    return {
      success: true,
      statCode: 200,
      message: "All hall info fetched successfully.",
      data: hallInfo,
    };
  } catch (error) {
    return {
      success: false,
      statCode: 500,
      message: "Internal server error from DB.",
      error: error,
    };
  }
};

export const deleteReservation = async (rId) => {
  try {
    // Delete the reservation from the reservations table
    const [result] = await pool.query(
      `DELETE FROM reservations WHERE rId = ?`,
      [rId]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        statCode: 404,
        message: "Reservation not found.",
      };
    }

    return {
      success: true,
      statCode: 200,
      message: "Reservation deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      statCode: 500,
      message: "Internal server error from DB.",
      error: error,
    };
  }
};
