import AdminModel from "../models/AdminModel.js";
import { loginAdmin, registerAdmin } from "../service/AuthServices.js";

export const register = async (req, res) => {
  // Remember to add validation for password and stuffs

  const { firstName, lastName, userName, password } = req.body;
  if (!firstName || !lastName || !userName || !password) {
    return res
      .status(400)
      .json({ sucess: false, message: "All fields are required!!" });
  }

  const admin = new AdminModel({ firstName, lastName, userName, password });

  try {
    const response = await registerAdmin(admin);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(500).json(response);
    }
  } catch (error) {
    return { success: false, message: "Registration faild!!!" };
  }
};

export const login = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!!" });
  }

  try {
    const response = await loginAdmin(userName, password);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return { success: false, message: "Login faild, Please try again!!" };
  }
};
