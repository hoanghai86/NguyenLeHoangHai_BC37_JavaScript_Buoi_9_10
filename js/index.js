var staffList = []; //tạo mảng rỗng chứa các đối tượng nhân viên
//hàm có chức năng thêm mới danh sách nhân viên vào data
function createStaff() {
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
  if(!data) data = staffList;

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
        <td><button class="btn btn-danger" onclick="deleteStaff('${
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
function searchStaff(){
  var keyword = document.getElementById("searchName").value.toLowerCase().trim();
  var search = [];
  for (var i = 0; i < staffList.length; i++) {
    var classification = staffList[i].classification;
    //nếu trong xếp loại có chứa từ khóa tìm kiếm do người dùng nhập vào
    if(classification.includes(keyword)){
      search.push(staffList[i]); //quăng những nhân viên có xếp loại thỏa điều kiện tìm kiếm vào mảng để in ra
    }
  }
  renderStaff(search); //in mảng tìm kiếm ra màn hình
}

window.onload = function () {
  //code sẽ chạy khi cửa sổ web được bật lên
  getStaffList();
};
