import { pool } from "../config/db.js";

const adminsTableQuery = `CREATE TABLE IF NOT EXISTS admins (
	id INT PRIMARY KEY AUTO_INCREMENT,
	firstName VARCHAR(35) NOT NULL,
    lastName VARCHAR(35) NOT NULL,
    userName VARCHAR(25) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    updated TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);`;

const reservationsTableQuery = `CREATE TABLE IF NOT EXISTS reservations(
	id INT PRIMARY KEY AUTO_INCREMENT,
    companyName VARCHAR(35) NOT NULL,
    reserverName VARCHAR(35) NOT NULL,
    reserverPhone VARCHAR(18) NOT NULL,
    timeOfDay ENUM('Morning', 'Afternoon', 'All Day'),
    reservationDate VARCHAR(50) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    updated TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);`;

const createTable = async (tableName, query) => {
  try {
    await pool.query(query);
    console.log(`${tableName} is created successfully!!`);
  } catch (error) {
    console.log(`Error creating ${tableName}`, error);
  }
};

const createAllTables = async () => {
  try {
    await createTable("Admins", adminsTableQuery);
    await createTable("Reservations", reservationsTableQuery);
    console.log("All tables created successfully!!");
  } catch (error) {
    console.log("Error creating all tables", error);
    throw error;
  }
};

export default createAllTables;
