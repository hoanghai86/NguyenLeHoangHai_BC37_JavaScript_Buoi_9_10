var staffList = []; //tạo mảng rỗng chứa các đối tượng nhân viên
//hàm có chức năng thêm mới danh sách nhân viên vào data
function createStaff() {
  //0.Kiểm tra dữ liệu đầu vào trước khi lưu
  var isFormValid = validateForm();
  if (!isFormValid) return;

  //1.Lấy thông tin người dùng nhập vô
  var staffId = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var workTime = +document.getElementById("gioLam").value;

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

  //5.in danh sách nhân viên ra màn hình
  renderStaff();
  //6.lưu danh sách nhân viên vào localStorage
  setStaffList();
  //7.Xóa ô input để người dùng có thể nhập tiếp
  document.getElementById("btnReset").click();

  //8.Focus con trỏ chuột vào ô tài khoản
  document.getElementById("tknv").focus();
}

// hàm in bảng danh sách nhân viên ra màn hình
function renderStaff(data) {
  //nếu trong hàm không truyền mảng data nào thì ta gán mặc định là truyền mảng staffList
  if (!data) data = staffList;

  var tableHTML = "";
  for (var i = 0; i < data.length; i++) {
    var currentStaff = data[i];

    tableHTML += `<tr>
        <td>${currentStaff.staffId}</td>
        <td>${currentStaff.fullName}</td>
        <td>${currentStaff.email}</td>
        <td>${currentStaff.workTime}</td>
        <td>${currentStaff.position}</td>
        <td>${currentStaff.totalSalary()}</td>
        <td>${currentStaff.classification()}</td>
        <td style="width: 150px;"><button class="btn btn-primary" id="btnSua" data-toggle="modal" data-target="#myModal" onclick="getUpdateStaff('${
          currentStaff.staffId
        }')">Sửa</button>
        <button class="btn btn-danger" onclick="deleteStaff('${
          currentStaff.staffId
        }')">Xóa</button></td>
        </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = tableHTML;
}

//lưu danh sách nhân viên xuống localStorage
function setStaffList() {
  var staffListJSON = JSON.stringify(staffList);
  localStorage.setItem("Staff", staffListJSON);
}

function mapData(staffListLocal) {
  var result = [];
  for (var i = 0; i < staffListLocal.length; i++) {
    var oldStaff = staffListLocal[i];
    var newStaff = new Staff(
      oldStaff.staffId,
      oldStaff.fullName,
      oldStaff.email,
      oldStaff.password,
      oldStaff.datepicker,
      oldStaff.basicSalary,
      oldStaff.position,
      oldStaff.workTime
    );
    result.push(newStaff);
  }
  return result;
}

//lấy danh sách nhân viên lên lại giao diện
function getStaffList() {
  var staffListJSON = localStorage.getItem("Staff");
  if (!staffListJSON) return;
  staffList = mapData(JSON.parse(staffListJSON));
  renderStaff();
}

//hàm có chức năng tìm kiếm vị trí mã nhân viên
function findByID(staffId) {
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].staffId === staffId) {
      return i;
    }
  }
  return -1;
}

//hàm có chức năng xóa nhân viên trong danh sách
function deleteStaff(staffId) {
  var index = findByID(staffId);
  if (index === -1) {
    alert("Mã nhân viên không tồn tại !!!");
    return;
  }
  staffList.splice(index, 1);
  setStaffList();
  renderStaff();
}

//hàm có chức năng tìm kiếm theo xếp loại nhân viên
function searchStaff() {
  var keyword = document
    .getElementById("searchName")
    .value.toLowerCase()
    .trim();

  var search = [];
  for (var i = 0; i < staffList.length; i++) {
    var classification = staffList[i].classification().toLowerCase();
    //nếu trong xếp loại có chứa từ khóa tìm kiếm do người dùng nhập vào
    if (classification.includes(keyword)) {
      search.push(staffList[i]); //quăng những nhân viên có xếp loại thỏa điều kiện tìm kiếm vào mảng để in ra
    }
  }
  renderStaff(search); //in mảng tìm kiếm ra màn hình
}

//hàm có chức năng lấy thông tin nhân viên cần sửa lên form modal
function getUpdateStaff(staffId) {
  var index = findByID(staffId);
  if (index == -1) {
    return alert("Mã nhân viên không tồn tại !!!");
  }

  var staff = staffList[index];
  document.getElementById("tknv").value = staff.staffId;
  document.getElementById("name").value = staff.fullName;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.password;
  document.getElementById("datepicker").value = staff.datepicker;
  document.getElementById("luongCB").value = staff.basicSalary;
  document.getElementById("chucvu").value = staff.position;
  document.getElementById("gioLam").value = staff.workTime;

  document.getElementById("tknv").disabled = true;
}

//cho người dùng sửa thông tin trên modal form, nhất nút cập nhật, chạy hàm này
function updateStaff() {
  var staffId = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var workTime = +document.getElementById("gioLam").value;

  var index = findByID(staffId); //tìm vị trí nhân viên muốn sửa dựa vào mã nhân viên
  var staff = staffList[index];
  staff.fullName = fullName;
  staff.email = email;
  staff.password = password;
  staff.datepicker = datepicker;
  staff.basicSalary = basicSalary;
  staff.position = position;
  staffList.workTime = workTime;

  setStaffList(); //lưu thông tin thay đổi xuống data
  renderStaff(); //render lại giao diện

  document.getElementById("btnReset").click(); //cài auto click nút reset
  document.getElementById("tknv").disabled = false; //mở lại ô input mã nhân viên cho người dùng nhập
}

//VALIDATION FORM
//kiểm tra không được bỏ trống các ô input
function require(val, spanId) {
  if (val.length === 0) {
    document.getElementById(spanId).style = "display: block";
    document.getElementById(spanId).innerHTML = "*Trường này bắt buộc nhập";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
}

//kiểm tra nhập đúng độ dài ký tự
function checkLength(val, spanId, min, max) {
  if (val.length < min || val.length > max) {
    document.getElementById(spanId).style = "display: block";
    document.getElementById(
      spanId
    ).innerHTML = `*Độ dài phải từ ${min} tới ${max} ký tự`;
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
}

//kiểm tra nhập đúng định dạng trường "Tài khoản"
function checkStringStaffId(val, spanId) {
  var pattern = /^[A-z0-9]+$/g;
  if (pattern.test(val)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).style = "display: block";
  document.getElementById(spanId).innerHTML =
    "*Vui lòng nhập theo mẫu: NV001, NV002...";
  return false;
}

//kiểm tra tên nhân viên (Tên nhân viên phải là chữ)
function checkStringFullName(val, spanId) {
  var pattern =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;

  if (pattern.test(val)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).style = "display: block";
  document.getElementById(spanId).innerHTML = "*Trường này chỉ được gõ chữ !!!";
  return false;
}

//kiểm tra định dạng email
function checkStringEmail(val, spanId) {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
  if (pattern.test(val)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).style = "display: block";
  document.getElementById(spanId).innerHTML =
    "*Vui lòng nhập đúng định dạng email !!!";
}

//kiểm tra định dạng mật khẩu (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt))
function checkStringPassword(val, spanId) {
  var pattern =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-z0-9!@#$%^&*]{6,10}$/g;
  if (pattern.test(val)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).style = "display: block";
  document.getElementById(spanId).innerHTML =
    "*Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt !!!";
}

//kiểm tra ngày tháng theo định dạng mm/dd/yyyy
function checkDatePicker(val, spanId) {
  var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/g;
  if (pattern.test(val)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).style = "display: block";
  document.getElementById(spanId).innerHTML =
    "*Vui lòng nhập đúng định dạng mm/dd/yyyy !!!";
}

//kiểm tra tiền lương nhập vào (Lương cơ bản từ 1 triệu đến 20 triệu)
function checkStringBasicSalary(val, spanId) {}

function validateForm() {
  var staffId = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var basicSalary = document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var workTime = document.getElementById("gioLam").value;

  var isValid = true;
  isValid &=
    require(staffId, "tbTKNV") &&
    checkLength(staffId, "tbTKNV", 4, 6) &&
    checkStringStaffId(staffId, "tbTKNV");
  isValid &=
    require(fullName, "tbTen") && checkStringFullName(fullName, "tbTen");
  isValid &= require(email, "tbEmail") && checkStringEmail(email, "tbEmail");
  isValid &=
    require(password, "tbMatKhau") &&
    checkLength(password, "tbMatKhau", 6, 10) &&
    checkStringPassword(password, "tbMatKhau");
  isValid &=
    require(datepicker, "tbNgay") && checkDatePicker(datepicker, "tbNgay");
  isValid &= require(basicSalary, "tbLuongCB");
  // isValid &= require(position, "tbChucVu");
  // isValid &= require(workTime, "tbGiolam");

  return isValid;
}

//hàm có chức năng xóa thông báo "Trường này bắt buộc nhập" khi bấm nút "Thêm nhân viên"
function resetFormInsertStaff() {
  document.getElementById("btnReset").click();
  document.getElementById("tknv").disabled = false;
  document.getElementById("tbTKNV").style.display = "none";
  document.getElementById("tbTKNV").style.display = "none";
  document.getElementById("tbTen").style.display = "none";
  document.getElementById("tbEmail").style.display = "none";
  document.getElementById("tbMatKhau").style.display = "none";
  document.getElementById("tbNgay").style.display = "none";
  document.getElementById("tbLuongCB").style.display = "none";
  document.getElementById("tbChucVu").style.display = "none";
  document.getElementById("tbGiolam").style.display = "none";
}

window.onload = function () {
  //code sẽ chạy khi cửa sổ web được bật lên
  getStaffList();
};
