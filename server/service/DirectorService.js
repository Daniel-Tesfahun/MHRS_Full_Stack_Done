import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";

export const registerAdmin = async (admin) => {
  const hashedPassword = await bcrypt.hash(admin.password, 10);

  try {
    // Check if the username already exists
    const [existingAdmin] = await pool.query(
      `SELECT * FROM admins WHERE userName = ?`,
      [admin.userName]
    );

    if (existingAdmin.length > 0) {
      return {
        statCode: 409,
        success: false,
        message: "Username already exists. Please choose a different one!!",
      };
    }

    const query = `INSERT INTO admins (firstName, lastName, userName, password, role) VALUES (?,?,?,?,?)`;
    const values = [
      admin.firstName,
      admin.lastName,
      admin.userName,
      hashedPassword,
      admin.role,
    ];

    await pool.query(query, values);
    return {
      statCode: 201,
      success: true,
      message: `${admin.role} registered successfully!!`,
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

export const editAdmin = async (updatingAdmin, aId) => {
  try {
    console.log(updatingAdmin);
    // Check if the username exists for update
    const [existingAdmin] = await pool.query(
      `SELECT * FROM admins WHERE aId = ?;`,
      [aId]
    );

    if (existingAdmin.length === 0) {
      return {
        statCode: 404,
        success: false,
        message: "Admin not found!!",
      };
    }

    // Check for duplicate username
    const [usernameCheck] = await pool.query(
      `SELECT * FROM admins WHERE userName = ? AND aId != ?;`,
      [updatingAdmin.userName, aId]
    );
    if (usernameCheck.length > 0) {
      return {
        statCode: 409,
        success: false,
        message: "Username already exists! Choose another.",
      };
    }

    // Hash the password
    const hashedPassword = updatingAdmin.password
      ? await bcrypt.hash(updatingAdmin.password, 10)
      : existingAdmin[0].password; // Keep the current password if not provided

    const query = `UPDATE admins SET firstName = ?, lastName = ?, userName = ?, password = ?, role = ?, updated = NOW() WHERE aId = ?;`;
    const values = [
      updatingAdmin.firstName,
      updatingAdmin.lastName,
      updatingAdmin.userName,
      hashedPassword,
      updatingAdmin.role,
      aId,
    ];

    await pool.query(query, values);
    return {
      statCode: 200,
      success: true,
      message: "Admin updated successfully!!",
    };
  } catch (error) {
    return {
      statCode: 500,
      success: false,
      message: "Internal server error from DB!!",
      error: error,
    };
  }
};

export const deleteAdmin = async (aId) => {
  try {
    // Check if the admin exists for deletion
    const [existingAdmin] = await pool.query(
      `SELECT * FROM admins WHERE aId = ?;`,
      [aId]
    );

    if (existingAdmin.length === 0) {
      return {
        statCode: 404,
        success: false,
        message: "Admin not found!!",
      };
    }

    const query = `DELETE FROM admins WHERE aId = ?;`;
    await pool.query(query, [aId]);
    return {
      statCode: 200,
      success: true,
      message: `${existingAdmin[0].firstName} ${existingAdmin[0].lastName} deleted successfully!!`,
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

export const getAllAdmins = async () => {
  try {
    const query = `SELECT * FROM admins`;
    const [admins] = await pool.query(query);
    return {
      statCode: 200,
      success: true,
      message: "Admins fetched successfully!!",
      data: admins,
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
