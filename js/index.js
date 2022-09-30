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
//Không được bỏ trống các ô input
function require(val, spanId) {
  if (val.length === 0) {
    document.getElementById(spanId).style = "display: block";
    document.getElementById(spanId).innerHTML = "*Trường này bắt buộc nhập";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
}

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
  isValid &= require(staffId, "tbTKNV");
  isValid &= require(fullName, "tbTen");
  isValid &= require(email, "tbEmail");
  isValid &= require(password, "tbMatKhau");
  isValid &= require(datepicker, "tbNgay");
  isValid &= require(basicSalary, "tbLuongCB");
  isValid &= require(position, "tbChucVu");
  isValid &= require(workTime, "tbGiolam");

  return isValid;
}

//hàm có chức năng xóa thông báo "Trường này bắt buộc nhập" khi bấm nút "Thêm nhân viên"
function resetFormInsertStaff() {
  document.getElementsByClassName("#sp-thongbao").style = "display:none";
}

window.onload = function () {
  //code sẽ chạy khi cửa sổ web được bật lên
  getStaffList();
};
