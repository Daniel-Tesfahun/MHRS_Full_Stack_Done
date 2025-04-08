class ReservationModel {
  constructor({
    reserverOffice,
    reserverName,
    reserverPhone,
    reserverEmail,
    timeFrom,
    timeTo,
    reservationDate,
    hId,
  }) {
    this.reserverOffice = reserverOffice;
    this.reserverName = reserverName;
    this.reserverPhone = reserverPhone;
    this.reserverEmail = reserverEmail;
    (this.timeFrom = timeFrom),
      (this.timeTo = timeTo),
      (this.reservationDate = reservationDate);
    this.hId = hId;
  }
}

export default ReservationModel;
