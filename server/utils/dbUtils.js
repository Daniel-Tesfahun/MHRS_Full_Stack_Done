import { pool } from "../config/db.js";

const adminsTableQuery = `CREATE TABLE IF NOT EXISTS admins (
    aId INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(35) NOT NULL,
    lastName VARCHAR(35) NOT NULL,
    userName VARCHAR(25) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    role ENUM('Admin', 'Director') NOT NULL DEFAULT 'Admin',
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    updated TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);`;

// The composite unique will Prevent duplicate reservations for the same time slot on a given day with each hall
const reservationsTableQuery = `CREATE TABLE IF NOT EXISTS reservations(
    rId INT PRIMARY KEY AUTO_INCREMENT,
    reserverOffice VARCHAR(35) NOT NULL,
    reserverName VARCHAR(35) NOT NULL,
    reserverPhone VARCHAR(18) NOT NULL,
    reserverEmail VARCHAR(50) NOT NULL,
    timeOfDay ENUM('Morning', 'Afternoon', 'All Day'),
    reservationDate DATE NOT NULL,
    approvedStatus ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
    hId INT NOT NULL, 
    aId INT ,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    updated TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    UNIQUE ( hId, reservationDate, timeOfDay),
    FOREIGN KEY (hId) REFERENCES hallDetails(hId) ON DELETE CASCADE,
    FOREIGN KEY (aId) REFERENCES admins(aId) ON DELETE SET NULL
);`;

const hallDetailsTableQuery = `CREATE TABLE IF NOT EXISTS hallDetails (
    hId INT PRIMARY KEY AUTO_INCREMENT,
    hallName VARCHAR(50) NOT NULL UNIQUE,
    capacity INT NOT NULL,
    location VARCHAR(50) NOT NULL
);`;

// const hallInfoTableQuery = `CREATE TABLE IF NOT EXISTS hallInfo (
//     hInfoId INT PRIMARY KEY AUTO_INCREMENT,
//     hallName VARCHAR(50) NOT NULL,
//     approvedBy VARCHAR(25) NOT NULL,
//     reservedBy VARCHAR(35) NOT NULL,
//     reservationId INT NOT NULL,
// 	   reservationDate DATE NOT NULL,
//     timeOfDay ENUM('Morning', 'Afternoon', 'All Day'),
//     reserverEmail VARCHAR(50) NOT NULL,
//     created TIMESTAMP NOT NULL DEFAULT NOW(),
//     updated TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
//     FOREIGN KEY (hallName) REFERENCES hallDetails(hallName) ON DELETE CASCADE,
//     FOREIGN KEY (approvedBy) REFERENCES admins(userName) ON DELETE CASCADE,
//     FOREIGN KEY (reservedBy) REFERENCES reservations(reserverOffice) ON DELETE CASCADE,
//     FOREIGN KEY (reservationId) REFERENCES reservations(rId) ON DELETE CASCADE,
//     FOREIGN KEY (reservationDate) REFERENCES reservations(reservationDate) ON DELETE CASCADE,
//     FOREIGN KEY (reserverEmail) REFERENCES reservations(reserverEmail) ON DELETE CASCADE,
//     FOREIGN KEY (timeOfDay) REFERENCES reservations(timeOfDay) ON DELETE CASCADE
// );`;

const adminsInitQuery = `INSERT IGNORE INTO admins (firstName, lastName, userName, password, role, created, updated) VALUES 
    ('Daniel', 'Tesfahun', 'dan1', '$2b$10$DUemMrfNbnCxgMk3J6hdLe8YzG.EbXo7X3iJaTnmFl3LsXXDbP.FG', 'Director','2025-04-02 13:54:38', '2025-04-02 13:54:38'),
    ('Filimon', 'Mitku', 'fil1', '$2b$10$oPuPzlBLL5IIQ.OLdmDfY.Pg8kI.7qUOMW/AClJjmGbGurhHy9y.a', 'Admin','2025-04-02 14:04:07', '2025-04-02 14:04:07');
`;

const hallDetailsInitQuery = `INSERT IGNORE INTO hallDetails (hallName, capacity, location) VALUES 
    ('Hall A', 100, 'First Floor'),
    ('Hall B', 150, 'Second Floor');`;

const sampleReservationQuery = `INSERT IGNORE INTO reservations (reserverOffice, reserverName, reserverPhone, reserverEmail, timeOfDay, reservationDate, hId, created, updated) VALUES 
    ('Finance Department', 'Abel Hailu', '0912345678', 'abel.hailu@example.com', 'Morning', '2025-04-05', 1, NOW(), NOW()),
    ('HR Department', 'Marta Tesfaye', '0923456789', 'marta.tesfaye@example.com', 'Afternoon', '2025-04-06', 2, NOW(), NOW()),
    ('IT Department', 'Samuel Bekele', '0934567890', 'samuel.bekele@example.com', 'All Day', '2025-04-07', 1, NOW(), NOW());
`;

const createTable = async (tableName, query) => {
  try {
    await pool.query(query);
    console.log(`${tableName} is created successfully!!`);
  } catch (error) {
    console.log(`Error creating ${tableName}`, error);
  }
};

const initInsert = async (tableName, query) => {
  try {
    await pool.query(query);
    console.log(`Values inserted into ${tableName} successfully!!`);
  } catch (error) {
    console.log(`Error inserting into ${tableName}`, error);
  }
};

const createAllTables = async () => {
  try {
    await createTable("Admins", adminsTableQuery);
    await initInsert("Admins", adminsInitQuery);
    await createTable("HallDetails", hallDetailsTableQuery);
    await initInsert("HallDetails", hallDetailsInitQuery);
    await createTable("Reservations", reservationsTableQuery);
    await initInsert("Reservations", sampleReservationQuery);
    console.log("All tables created successfully!!");
  } catch (error) {
    console.log("Error creating all tables", error);
    throw error;
  }
};

export default createAllTables;
