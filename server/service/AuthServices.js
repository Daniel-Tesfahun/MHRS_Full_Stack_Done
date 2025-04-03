import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const loginAdmin = async (userName, password) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM admins WHERE userName = ?;`,
      [userName]
    );

    if (rows.length === 0) {
      return {
        statCode: 404,
        success: false,
        message: "User not found!!",
      };
    }

    const admin = rows[0];
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return {
        statCode: 401,
        success: false,
        message: "Invalid password!!",
      };
    }
    const JWT_KEY = process.env.JWT_KEY;

    const token = jwt.sign(
      { id: admin.aId, userName: admin.userName, role: admin.role },
      JWT_KEY,
      { expiresIn: "8h" }
    );

    return {
      statCode: 200,
      success: true,
      message: "Login successfull!!",
      token: token,
    };
  } catch (error) {
    return {
      statCode: 500,
      success: false,
      message: "Internal server error",
      error: error,
    };
  }
};
