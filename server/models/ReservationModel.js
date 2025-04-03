class ReservationModel {
  constructor({
    hallName,
    reserverOffice,
    reserverName,
    reserverPhone,
    reserverEmail,
    timeOfDay,
    reservationDate,
  }) {
    this.hallName = hallName;
    this.reserverOffice = reserverOffice;
    this.reserverName = reserverName;
    this.reserverPhone = reserverPhone;
    this.reserverEmail = reserverEmail;
    this.timeOfDay = timeOfDay;
    this.reservationDate = reservationDate;
  }
}

export default ReservationModel;
