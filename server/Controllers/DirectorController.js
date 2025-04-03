import AdminModel from "../models/AdminModel.js";
import {
  deleteAdmin,
  editAdmin,
  getAllAdmins,
  registerAdmin,
} from "../service/DirectorService.js";

export const register = async (req, res) => {
  // Remember to add validation for password and stuffs

  const { firstName, lastName, userName, password, role } = req.body;
  if (!firstName || !lastName || !userName || !password || !role) {
    return res
      .status(400)
      .json({ sucess: false, message: "All fields are required!!" });
  }

  const admin = new AdminModel({
    firstName,
    lastName,
    userName,
    password,
    role,
  });

  try {
    const response = await registerAdmin(admin);

    return res.status(response.statCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Registration faild!!!" });
  }
};

export const updateAdmin = async (req, res) => {
  const { aId } = req.params;
  const { firstName, lastName, userName, role } = req.body;
  if (!firstName || !lastName || !userName || !role) {
    return res
      .status(400)
      .json({ sucess: false, message: "All fields are required!!" });
  }

  try {
    const response = await editAdmin(
      { firstName, lastName, userName, role },
      aId
    );

    return res.status(response.statCode).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Update faild in the API!!!",
      error: error,
    });
  }
};

export const delete_Admin = async (req, res) => {
  const { aId } = req.params;

  try {
    const response = await deleteAdmin(aId);
    return res.status(response.statCode).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Deletion faild in the API!!!",
      error: error,
    });
  }
};

export const get_AllAdmins = async (req, res) => {
  try {
    const response = await getAllAdmins();
    return res.status(response.statCode).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!!",
      error: error,
    });
  }
};
