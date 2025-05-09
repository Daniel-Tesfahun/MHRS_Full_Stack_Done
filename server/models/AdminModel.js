class AdminModel {
  constructor(admin) {
    (this.firstName = admin.firstName),
      (this.lastName = admin.lastName),
      (this.userName = admin.userName),
      (this.password = admin.password),
      (this.role = admin.role);
  }
}

export default AdminModel;
