class ReservationModel {
  constructor({
    reserverOffice,
    reserverName,
    reserverPhone,
    reserverEmail,
    timeOfDay,
    reservationDate,
    hId,
  }) {
    this.reserverOffice = reserverOffice;
    this.reserverName = reserverName;
    this.reserverPhone = reserverPhone;
    this.reserverEmail = reserverEmail;
    this.timeOfDay = timeOfDay;
    this.reservationDate = reservationDate;
    this.hId = hId;
  }
}

export default ReservationModel;
