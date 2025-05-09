import { pool } from "../config/db.js";

export const addHallDetails = async (HallDetails) => {
  const { hallName, capacity, location } = HallDetails;
  try {
    // Check if hallName already exists
    const [existingHall] = await pool.query(
      "SELECT * FROM hallDetails WHERE hallName = ?",
      [hallName]
    );
    if (existingHall.length > 0) {
      return {
        success: false,
        statCode: 409,
        message: "Hall name already exists",
      };
    }

    await pool.query(
      "INSERT INTO hallDetails (hallName, capacity, location) VALUES (?, ?, ?)",
      [hallName, capacity, location]
    );
    return {
      success: true,
      statCode: 201,
      message: "Hall details added successfully",
    };
  } catch (error) {
    return {
      success: false,
      statCode: 500,
      message: "Internal server error from the DB!!",
      error: error,
    };
  }
};

export const updateHallDetails = async (hId, HallDetails) => {
  const { hallName, capacity, location } = HallDetails;
  try {
    // Check if hallId exists
    const [hall] = await pool.query("SELECT * FROM hallDetails WHERE hId = ?", [
      hId,
    ]);
    if (hall.length === 0) {
      return {
        success: false,
        statCode: 404,
        message: "Hall ID not found",
      };
    }

    // Check if hallName already exists
    const [existingHall] = await pool.query(
      "SELECT * FROM hallDetails WHERE hallName = ? AND hId != ?",
      [hallName, hId]
    );
    if (existingHall.length > 0) {
      return {
        success: false,
        statCode: 409,
        message: "Hall name already exists, please choose another one!!",
      };
    }

    await pool.query(
      "UPDATE hallDetails SET hallName = ?, capacity = ?, location = ? WHERE hId = ?",
      [hallName, capacity, location, hId]
    );
    return {
      success: true,
      statCode: 200,
      message: "Hall details updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      statCode: 500,
      message: "Internal server error from the DB!!",
      error: error,
    };
  }
};

export const getAllHallDetails = async () => {
  try {
    const [hallDetails] = await pool.query("SELECT * FROM hallDetails");
    return {
      success: true,
      statCode: 200,
      message: "All hall details fetched successfully",
      data: hallDetails,
    };
  } catch (error) {
    return {
      success: false,
      statCode: 500,
      message: "Internal server error from the DB!!",
      error: error,
    };
  }
};

export const getSingleHallDetail = async (hId) => {
  try {
    const [hallDetail] = await pool.query(
      "SELECT * FROM hallDetails WHERE hId = ?",
      [hId]
    );
    if (hallDetail.length > 0) {
      return {
        success: true,
        statCode: 200,
        message: "Hall detail fetched successfully",
        data: hallDetail[0], // Return the single hall object
      };
    } else {
      return {
        success: false,
        statCode: 404,
        message: "Hall not found",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      statCode: 500,
      message: "Internal server error from the DB!!",
      error: error,
    };
  }
};

export const deleteHallDetails = async (hId) => {
  try {
    // Check if hallId exists
    const [hall] = await pool.query("SELECT * FROM hallDetails WHERE hId = ?", [
      hId,
    ]);
    if (hall.length === 0) {
      return {
        success: false,
        statCode: 404,
        message: "Hall ID not found",
      };
    }

    const hallName = hall[0].hallName;

    await pool.query("DELETE FROM hallDetails WHERE hId = ?", [hId]);
    return {
      success: true,
      statCode: 200,
      message: `Hall details for ${hallName} deleted successfully`,
    };
  } catch (error) {
    return {
      success: false,
      statCode: 500,
      message: "Internal server error from the DB!!",
      error: error,
    };
  }
};
