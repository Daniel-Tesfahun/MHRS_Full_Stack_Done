import HallDetailModel from "../models/HallDetailModel.js";
import {
  addHallDetails,
  deleteHallDetails,
  getAllHallDetails,
  updateHallDetails,
} from "../service/HallDetailService.js";

export const add_HallDetails = async (req, res) => {
  const { hallName, capacity, location } = req.body;
  if (!hallName || !capacity || !location) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!!" });
  }
  const HallDetails = new HallDetailModel({
    hallName,
    capacity,
    location,
  });

  try {
    const respose = await addHallDetails(HallDetails);
    return res.status(respose.statCode).json(respose);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error from the API!!",
      error: error,
    });
  }
};
export const update_HallDetails = async (req, res) => {
  const { hId } = req.params;
  const { hallName, capacity, location } = req.body;
  if (!hallName || !capacity || !location) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!!" });
  }
  const HallDetails = new HallDetailModel({
    hallName,
    capacity,
    location,
  });

  try {
    const respose = await updateHallDetails(hId, HallDetails);
    return res.status(respose.statCode).json(respose);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error from the API!!",
      error: error,
    });
  }
};
export const get_AllHallDetails = async (req, res) => {
  try {
    const respose = await getAllHallDetails();
    return res.status(respose.statCode).json(respose);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error from the API!!",
      error: error,
    });
  }
};

export const delete_HallDetails = async (req, res) => {
  const { hId } = req.params;
  try {
    const response = await deleteHallDetails(hId);
    return res.status(response.statCode).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error from the API!!",
      error: error,
    });
  }
};
