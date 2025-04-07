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
      `UPDATE reservations SET approvedStatus = 'Approved', aId = ? WHERE rId = ?`,
      [approvedBy, rId]
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
      `SELECT 
        hallDetails.hallName,
        reservations.reserverOffice,
        reservations.reservationDate,
        reservations.timeOfDay
        FROM 
        reservations
        JOIN 
        hallDetails ON reservations.hId = hallDetails.hId
        WHERE 
        reservations.rId = ?;`,
      [rId]
    );

    const data = updatedReservation[0];
    const { hallName, reserverOffice, reservationDate, timeOfDay } = data;

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

// Insert into hallInfo table
// await pool.query(
//   `INSERT INTO hallInfo (hallName, approvedBy, reservedBy, reservationId, reservationDate, timeOfDay, reserverEmail,created, updated) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
//   [
//     hallName,
//     approvedBy,
//     reserverOffice,
//     rId,
//     reservationDate,
//     timeOfDay,
//     reserverEmail,
//   ]
// );

// return {
//   success: true,
//   statCode: 200,
//   message: `Reservation of ${hallName} by ${reserverOffice} for ${reservationDate} ${timeOfDay} approved successfully.`,
// };

export const rejectReservation = async (rId, rejectedBy) => {
  try {
    // Check if the reservation is already rejected
    const [existingReservation] = await pool.query(
      `SELECT * FROM reservations WHERE rId = ? AND approvedStatus = 'Rejected'`,
      [rId]
    );
    if (existingReservation.length > 0) {
      return {
        success: false,
        statCode: 400,
        message: "Reservation is already rejected.",
      };
    }

    // Update the reservation status to 'Rejected'
    const [result] = await pool.query(
      `UPDATE reservations SET approvedStatus = 'Rejected', aId = ? WHERE rId = ?`,
      [rejectedBy, rId]
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
      `SELECT
        hallDetails.hallName,
        reservations.reserverOffice,
        reservations.reservationDate,
        reservations.timeOfDay
        FROM
        reservations
        JOIN
        hallDetails ON reservations.hId = hallDetails.hId
        WHERE
        reservations.rId = ?;`,
      [rId]
    );

    const data = updatedReservation[0];
    const { hallName, reserverOffice, reservationDate, timeOfDay } = data;

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

// to be edited
export const getAllHallInfo = async () => {
  try {
    const [hallInfo] = await pool.query(`
            SELECT 
                hallDetails.hallName,
                CONCAT(admins.firstName, ' ', admins.lastName) AS approvedBy,
                reservations.reserverOffice,
                reservations.rId AS reservationId,
                reservations.reservationDate,
                reservations.timeOfDay,
                reservations.reserverEmail
            FROM 
                reservations
            JOIN 
                hallDetails ON reservations.hId = hallDetails.hId
            LEFT JOIN 
                admins ON reservations.aId = admins.aId
            WHERE 
                reservations.approvedStatus = 'Approved';
    `);
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

export const getAdminById = async (aId) => {
  try {
    const query = `SELECT * FROM admins WHERE aId = ?`;
    const [admin] = await pool.query(query, [aId]);

    if (admin.length === 0) {
      return {
        statCode: 404,
        success: false,
        message: "Admin not found!!",
      };
    }

    return {
      statCode: 200,
      success: true,
      message: "Admin fetched successfully!!",
      data: admin[0],
    };
  } catch (error) {
    return {
      statCode: 500,
      success: false,
      message: "Internal server error!!",
      error: error,
    };
  }
};
