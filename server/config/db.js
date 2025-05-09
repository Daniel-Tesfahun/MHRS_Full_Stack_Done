import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10, // Limiting #connection at the same time
    queueLimit: 0, // Unlimited Waiting requests in queue
    waitForConnections: true // Waiting in the queue
});

const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database connected successfully!!");
        connection.release();
    } catch (error) {
        console.log("Error connecting database!!");
        throw error;
    }
};

export {pool, checkConnection};