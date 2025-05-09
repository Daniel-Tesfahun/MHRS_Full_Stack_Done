import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyDirector = (req, res, next) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(403)
        .json({ message: "Access denied! No token provided." });
    }

    // Verify the token
    const JWT_KEY = process.env.JWT_KEY;
    const decoded = jwt.verify(token, JWT_KEY);

    // Check role
    if (decoded.role !== "Director") {
      return res.status(403).json({
        message: "Access denied! Only Directors can access this endpoint.",
      });
    }

    req.admin = decoded; // Attach user data to request object for further use
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!", error: error });
  }
};

export const verifyAdmin = (req, res, next) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(403)
        .json({ message: "Access denied! No token provided." });
    }

    // Verify the token
    const JWT_KEY = process.env.JWT_KEY;
    const decoded = jwt.verify(token, JWT_KEY);

    // Check role
    if (decoded.role !== "Admin" && decoded.role !== "Director") {
      return res.status(403).json({
        message:
          "Access denied! Only Admins or Directors can access this endpoint.",
      });
    }

    req.admin = decoded; // Attach user data to request object for further use
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!", error: error });
  }
};
