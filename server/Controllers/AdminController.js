import {
  approveReservation,
  deleteReservation,
  getAllHallInfo,
  getAllReservations,
  rejectReservation,
} from "../service/AdminService.js";

export const reservationApproval = async (req, res) => {
  try {
    const { rId } = req.params;
    const approvedBy = req.admin.userName; // Assuming you have user info in req.user

    // Call the service to approve the reservation
    const result = await approveReservation(rId, approvedBy);

    return res.status(result.statCode).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error from API.",
    });
  }
};

export const reservationRejection = async (req, res) => {
  try {
    const { rId } = req.params;

    // Call the service to reject the reservation
    const result = await rejectReservation(rId);

    return res.status(result.statCode).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error from the API.",
    });
  }
};

export const get_AllReservations = async (req, res) => {
  try {
    const result = await getAllReservations();
    return res.status(result.statCode).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error from the API.",
    });
  }
};

export const get_ApprovedReservations = async (req, res) => {
  try {
    const result = await getAllHallInfo();
    return res.status(result.statCode).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error from the API.",
    });
  }
};

export const delete_Reservation = async (req, res) => {
  try {
    const { rId } = req.params;

    // Call the service to delete the reservation
    const result = await deleteReservation(rId);

    return res.status(result.statCode).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error from the API.",
    });
  }
};
