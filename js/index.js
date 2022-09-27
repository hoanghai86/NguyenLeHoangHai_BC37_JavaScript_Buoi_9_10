var staffList = []; //tạo mảng rỗng chứa các đối tượng nhân viên
function createStaff() {
  //1.Lấy thông tin người dùng nhập vô
  var staffId = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var workTime = +document.getElementById("tbGiolam").value;

  //2.kiểm tra mã nhân viên có bị trùng trong database không
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].staffId === staffId) {
      alert("Mã nhân viên đã tồn tại !!!");
      return;
    }
  }

  //3.nếu không trùng thì tiến hành tạo đối tượng nhân viên mới
  var newStaff = new Staff(
    staffId,
    fullName,
    email,
    password,
    datepicker,
    basicSalary,
    position,
    workTime
  );

  //4.push đối tượng nhân viên vào mảng staffList
    staffList.push(newStaff);



}
