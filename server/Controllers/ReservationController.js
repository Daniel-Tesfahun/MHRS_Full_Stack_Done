import ReservationModel from "../models/ReservationModel.js";
import { bookReservationService } from "../service/reservationService.js";

export const bookReservation = async (req, res) => {
  const {
    hallName,
    reserverOffice,
    reserverName,
    reserverPhone,
    reserverEmail,
    timeOfDay,
    reservationDate,
  } = req.body;

  if (
    !hallName ||
    !reserverOffice ||
    !reserverName ||
    !reserverPhone ||
    !reserverEmail ||
    !timeOfDay ||
    !reservationDate
  ) {
    return res
      .status(400)
      .json({ sucess: false, message: "All fields are required!!" });
  }

  const reservationDetails = new ReservationModel({
    hallName,
    reserverOffice,
    reserverName,
    reserverPhone,
    reserverEmail,
    timeOfDay,
    reservationDate,
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
