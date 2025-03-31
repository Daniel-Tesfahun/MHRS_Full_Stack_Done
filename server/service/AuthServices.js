import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const registerAdmin = async (admin) => {
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    try {
        const query = `INSERT INTO admins (firstName, lastName, userName, password) VALUES (?,?,?,?)`;
        const values = [admin.firstName, admin.lastName, admin.userName, hashedPassword];

        await pool.query(query, values);
        return {success: true, message: "Admin registered successfully!!"};
    } catch (error) {
        return {success: false, message: "Registration failed from server!!", error: error};
    }
}

export const loginAdmin = async (userName, password) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM admins WHERE userName = ?;`, [userName]);

        if(rows.length === 0) {
            return {success: false, message: "Admin does not found!!"};
        }

        const admin = rows[0];
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if(!passwordMatch) {
            return {success: false, message: "Invalid password!!"};
        }
        const JWT_KEY = process.env.JWT_KEY;

        const token = jwt.sign(
            {id: admin.id, userName: admin.userName},
            JWT_KEY,
            {expiresIn: "8h"}
        );

        return {success: true, message: "Login successfull!!", token: token};
    } catch (error) {
        return {success: false, message: "Internal server error", error: error};
    }
}