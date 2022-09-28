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

  //công thức tính tiền lương nhân viên theo chức vụ
  this.totalSalary = function () {
    if (this.position === "Sếp") {
      return this.basicSalary * 3;
    } else if (this.position === "Trưởng phòng") {
      return this.basicSalary * 2;
    } else if (this.position === "Nhân viên") {
      return this.basicSalary;
    }
  };

  //công thức xếp loại nhân viên theo giờ làm
  this.classification = function () {
    if (this.workTime >= 192) {
      return "Xuất sắc";
    } else if (this.workTime >= 176) {
      return "Giỏi";
    } else if (this.workTime >= 160) {
      return "Khá";
    } else return "Trung bình";
  };
}
