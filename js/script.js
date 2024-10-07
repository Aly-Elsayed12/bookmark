var webNameInput = document.getElementById("name");
var webUrlIuput = document.getElementById("urlInput");
var addBtn = document.getElementById("add-btn");
var deletBtn = document.getElementById("deletBtn");
var vistBtn = document.getElementById("vistBtn");
var editBtn = document.getElementById("edit-btn");
var closeToast = document.getElementById("closeToast");
var table = document.getElementById("table");
var tbody = document.getElementById("tbody");
var emptySection = document.getElementById("emptySection");
var alertName = document.getElementById("alertName");
var alertUrl = document.getElementById("alertUrl");
var alertRepeat = document.getElementById("alertRepeat");
var alersubmit = document.getElementById("alersubmit");
var alerUpdate = document.getElementById("alerUpdate");
var webBookmark = [];
var updatedIndex;

if (localStorage.getItem("webBookmark") != null) {
  webBookmark = JSON.parse(localStorage.getItem("webBookmark"));
  notfound();
  displayWeb(webBookmark);
}
// Actions

addBtn.addEventListener("click", function () {
  if (validName() && validUrl() && checkDuplicateUrlOnSubmit()) {
    webInfo = {
      name: webNameInput.value,
      url: webUrlIuput.value,
    };
    webBookmark.push(webInfo);
    clearInput();
    updateLocalStorage();
    removeValidClass();
    notfound();
    alersubmit.classList.add("show");
    setTimeout(function () {
      alersubmit.classList.remove("show");
    }, 3000);
    displayWeb(webBookmark);
  }
});

function displayWeb(list) {
  var cartona = "";
  for (var i = 0; i < list.length; i++) {
    cartona += `
          <tr>
            <th>${i + 1}</th>
            <th>${list[i].name}</th>
            <th>
            <a title="${
              list[i].url
            }" class="btn btn-secondary text-white" id="vistBtn" onclick="vistUrl(${i})" ><i class="fa-solid fa-eye me-1"></i>Vist</a></th>
            <th>
                          <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i class="fa-solid fa-trash me-1"></i>
                Delete
              </button>

              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Confirm Deletion
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body text-start">
                      Are you sure you want to delete this bookmark ?
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger flex align-items-center"
                        id="deletBtn" onclick="deletUrl(${i})"
                      >
                        Confirm <i class="fa-solid fa-trash me-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            
            
            </th>
            <th><button class="btn btn-primary text-white" onclick="getValueToUpdate(${i})"><i class="fa-solid fa-pen-clip me-1"></i>Edit</button></th>
          </tr>
        `;
    tbody.innerHTML = cartona;
  }
}

function deletUrl(index) {
  webBookmark.splice(index, 1);
  if (webBookmark.length == 0) {
    tbody.innerHTML = "";
  }
  notfound();
  displayWeb(webBookmark);
  updateLocalStorage();
}

function vistUrl(index) {
  if (webBookmark[index].url.includes("https://")) {
    window.open(webBookmark[index].url);
  } else {
    window.open(`https://${webBookmark[index].url}`);
  }
}

function getValueToUpdate(index) {
  webNameInput.value = webBookmark[index].name;
  webUrlIuput.value = webBookmark[index].url;
  editBtn.classList.remove("d-none");
  editBtn.classList.add("d-block");
  addBtn.classList.add("d-none");
  updatedIndex = index;
}
editBtn.addEventListener("click", upDateUrl);

function upDateUrl() {
  if (validName() && validUrl() && checkDuplicateUrlOnUpdate(updatedIndex)) {
    webBookmark[updatedIndex].name = webNameInput.value;
    webBookmark[updatedIndex].url = webUrlIuput.value;
    clearInput();
    editBtn.classList.add("d-none");
    editBtn.classList.remove("d-block");
    addBtn.classList.remove("d-none");
    updateLocalStorage();
    removeValidClass();
    notfound();
    alerUpdate.classList.add("show");
    setTimeout(function () {
      alerUpdate.classList.remove("show");
    }, 3000);
    displayWeb(webBookmark);
  }
}
closeToast.addEventListener("click", function () {
  alersubmit.classList.remove("show");
});

// Some features

function updateLocalStorage() {
  localStorage.setItem("webBookmark", JSON.stringify(webBookmark));
}

function clearInput() {
  webNameInput.value = null;
  webUrlIuput.value = null;
}

function removeValidClass() {
  webNameInput.classList.remove("is-valid");
  webUrlIuput.classList.remove("is-valid");
}

function notfound() {
  if (webBookmark.length == 0) {
    emptySection.classList.add("d-block");
    emptySection.classList.remove("d-none");
    table.classList.add("d-none");
    editBtn.classList.add("d-none");
    editBtn.classList.remove("d-block");
    addBtn.classList.remove("d-none");
  } else {
    emptySection.classList.add("d-none");
    emptySection.classList.remove("d-block");
    table.classList.add("w-100");
    table.classList.remove("d-none");
  }
}

// validtion

function validName() {
  if (/^[a-z]{3,}$/i.test(webNameInput.value)) {
    webNameInput.classList.add("is-valid");
    webNameInput.classList.remove("is-invalid");
    alertName.classList.replace("d-block", "d-none");
  } else {
    webNameInput.classList.add("is-invalid");
    webNameInput.classList.remove("is-valid");
    alertName.classList.replace("d-none", "d-block");
  }
  return /^[a-z]{3,}$/i.test(webNameInput.value);
}

function validUrl() {
  if (/^(https?:\/\/)?(www.)?\w{1,}\.(com)$/i.test(webUrlIuput.value)) {
    webUrlIuput.classList.add("is-valid");
    webUrlIuput.classList.remove("is-invalid");
    alertUrl.classList.replace("d-block", "d-none");
  } else {
    webUrlIuput.classList.add("is-invalid");
    webUrlIuput.classList.remove("is-valid");
    alertUrl.classList.replace("d-none", "d-block");
  }
  return /^(https?:\/\/)?(www.)?\w{1,}\.(com)$/i.test(webUrlIuput.value);
}

function checkDuplicateUrlOnSubmit() {
  if (webBookmark.length === 0) {
    alertRepeat.classList.add("d-none");
    alertRepeat.classList.remove("d-block");
    return true;
  }
  for (let i = 0; i < webBookmark.length; i++) {
    if (webBookmark[i].url !== webUrlIuput.value) {
      alertRepeat.classList.add("d-none");
      alertRepeat.classList.remove("d-block");
      return true;
    } else {
      alertRepeat.classList.remove("d-none");
      alertRepeat.classList.add("d-block");
      return false;
    }
  }
}
function checkDuplicateUrlOnUpdate(index) {
  var existurl = webBookmark[index].url;
  for (let i = 0; i < webBookmark.length; i++) {
    if (i !== index && webBookmark[i].url === webUrlIuput.value) {
      webUrlIuput.classList.add("is-invalid");
      webUrlIuput.classList.remove("is-valid");
      alertRepeat.classList.remove("d-none");
      alertRepeat.classList.add("d-block");
      return false;
    } else {
      webUrlIuput.classList.add("is-valid");
      webUrlIuput.classList.remove("is-invalid");
      alertRepeat.classList.add("d-none");
      alertRepeat.classList.remove("d-block");
    }
  }
  console.log("true");
  return true;
}

webUrlIuput.addEventListener("input", checkDuplicateUrlOnSubmit);
webUrlIuput.addEventListener("input", validUrl);
webNameInput.addEventListener("input", validName);
