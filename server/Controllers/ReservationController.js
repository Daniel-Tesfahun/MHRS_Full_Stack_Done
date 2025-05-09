import ReservationModel from "../models/ReservationModel.js";
import { bookReservationService } from "../service/ReservationService.js";

export const bookReservation = async (req, res) => {
  const {
    reserverOffice,
    reserverName,
    reserverPhone,
    reserverEmail,
    timeOfDay,
    reservationDate,
    hId,
  } = req.body;

  if (
    !reserverOffice ||
    !reserverName ||
    !reserverPhone ||
    !reserverEmail ||
    !timeOfDay ||
    !reservationDate ||
    !hId
  ) {
    return res
      .status(400)
      .json({ sucess: false, message: "All fields are required!!" });
  }

  const reservationDetails = new ReservationModel({
    reserverOffice,
    reserverName,
    reserverPhone,
    reserverEmail,
    timeOfDay,
    reservationDate,
    hId,
  });

  try {
    const response = await bookReservationService(reservationDetails);
    return res.status(response.statCode).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error from the reservation API!!",
      error: error,
    });
  }
};
