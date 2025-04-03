import { loginAdmin } from "../service/AuthServices.js";

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
      return res.status(response.statCode).json(response);
    } else {
      return res.status(response.statCode).json(response);
    }
  } catch (error) {
    return res.status(500).json({
      statCode: 500,
      success: false,
      message: "Login faild, Please try again!!",
    });
  }
};
