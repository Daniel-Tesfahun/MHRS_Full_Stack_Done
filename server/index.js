import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { checkConnection } from "./config/db.js";
import createAllTables from "./utils/dbUtils.js";

// Routes
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import DirectorRoute from "./Routes/DirectorRoute.js";
import AdminRoute from "./Routes/AdminRoute.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  try {
    // For devs team
    await checkConnection();
    await createAllTables();
  } catch (error) {
    // At the time of dev
    console.log(error, "\nFaild to initialize the database!!");
  }
});

// Route Usage
app.use("/api/director", DirectorRoute);
app.use("/api/admin", AdminRoute);
app.use("/api/authAdmin", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/", async (req, res) => res.status(404).send("404, Page not found!!"));
