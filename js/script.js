var webName = document.getElementById("name");
var webUrl = document.getElementById("url");
var addBtn = document.getElementById("add-btn");
var deletBtn = document.getElementById("deletBtn");
var vistBtn = document.getElementById("vistBtn");
var tbody = document.getElementById("tbody");
var alertName = document.getElementById("alertName");
var alertUrl = document.getElementById("alertUrl");
var webBookmark = [];

if (localStorage.getItem("webBookmark") != null) {
  webBookmark = JSON.parse(localStorage.getItem("webBookmark"));
  displayWeb(webBookmark);
}
addBtn.addEventListener("click", function () {
  webInfo = {
    name: webName.value,
    url: webUrl.value,
  };

  webBookmark.push(webInfo);
  clearInput();
  updateLocalStorage();
  removeValidClass();
  displayWeb(webBookmark);
  addBtn.disabled = true;
});
function displayWeb(list) {
  var cartona = "";
  for (var i = 0; i < list.length; i++) {
    cartona += `
          <tr>
            <th>${i + 1}</th>
            <th>${list[i].name}</th>
            <th><button class="btn btn-secondary text-white" id="vistBtn" onclick="vistUrl(${i})"><i class="fa-solid fa-eye me-1"></i>Vist</button></th>
            <th><button class="btn btn-danger text-white" id="deletBtn" onclick="deletUrl(${i})"><i class="fa-solid fa-trash me-1"></i>Delet</button></th>
          </tr>
        `;
    tbody.innerHTML = cartona;
  }
}
function updateLocalStorage() {
  localStorage.setItem("webBookmark", JSON.stringify(webBookmark));
}
function deletUrl(index) {
  webBookmark.splice(index, 1);
  if (webBookmark.length == 0) {
    tbody.innerHTML = "";
  }
  displayWeb(webBookmark);
  updateLocalStorage();
}
function clearInput() {
  webName.value = null;
  webUrl.value = null;
}
function vistUrl(index) {
  window.open(`${webBookmark[index].url}`);
}
function validName() {
  if (/^[a-z]{3,}$/i.test(webName.value)) {
    webName.classList.add("is-valid");
    webName.classList.remove("is-invalid");
    alertName.classList.replace("d-block", "d-none");
  } else {
    webName.classList.add("is-invalid");
    webName.classList.remove("is-valid");
    alertName.classList.replace("d-none", "d-block");
  }
  return /^[a-z]{3,}$/i.test(webName.value);
}
function validUrl() {
  if (/^(https?:\/\/)?(www.)?\w{1,}\.(com)$/i.test(webUrl.value)) {
    webUrl.classList.add("is-valid");
    webUrl.classList.remove("is-invalid");
    alertUrl.classList.replace("d-block", "d-none");
  } else {
    webUrl.classList.add("is-invalid");
    webUrl.classList.remove("is-valid");
    alertUrl.classList.replace("d-none", "d-block");
  }
  return /^(https?:\/\/)?(www.)?\w{1,}\.(com)$/i.test(webUrl.value);
}
function removeValidClass() {
  webName.classList.remove("is-valid");
  webUrl.classList.remove("is-valid");
}

function checkValidation() {
  if (validName() && validUrl()) {
    addBtn.disabled = false;
  } else {
    addBtn.disabled = true;
  }
}

webName.addEventListener("input", checkValidation);
webUrl.addEventListener("input", checkValidation);
