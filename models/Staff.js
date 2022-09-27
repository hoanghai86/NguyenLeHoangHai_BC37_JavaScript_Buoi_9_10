function Staff(
  staffId,
  fullName,
  email,
  password,
  datepicker,
  basicSalary,
  position,
  workTime
) {
  //thuộc tính
  this.staffId = staffId;
  this.fullName = fullName;
  this.email = email;
  this.password = password;
  this.datepicker = datepicker;
  this.basicSalary = basicSalary;
  this.position = position;
  this.workTime = workTime;

  //phương thức
  this.totalSalary = function () {
    if (this.position === "Giám đốc") {
      return this.basicSalary * 3;
    } else if (this.position === "Trưởng phòng") {
      return this.basicSalary * 2;
    } else if (this.position === "Nhân viên") {
      return this.basicSalary;
    }
  };
}
