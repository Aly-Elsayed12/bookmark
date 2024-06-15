var webName = document.getElementById("name")
var webUrl = document.getElementById("url")
var addBtn = document.getElementById("add-btn")
var deletBtn = document.getElementById("deletBtn")
var vistBtn = document.getElementById("vistBtn")
var webBookmark = []


if(localStorage.getItem("webBookmark") != null){
  webBookmark = JSON.parse(localStorage.getItem("webBookmark"));
  displayWeb(webBookmark)
}
addBtn.addEventListener('click', function(){
  webInfo ={
    name: webName.value,
    url: webUrl.value
  }

  webBookmark.push(webInfo);
  clearInput()
  updateLocalStorage()
  displayWeb(webBookmark)
})
function displayWeb(list) {
  var cartona = ""
  for(var i =0; i < list.length; i++){
    cartona +=`<tbody class="fw-normal">
          <tr>
            <th>${i + 1}</th>
            <th>${list[i].name}</th>
            <th><button class="btn btn-secondary text-white" id="vistBtn" onclick="vistUrl(${i})"><i class="fa-solid fa-eye me-1"></i>Vist</button></th>
            <th><button class="btn btn-danger text-white" id="deletBtn" onclick="deletUrl(${i})"><i class="fa-solid fa-trash me-1"></i>Delet</button></th>
          </tr>
        </tbody>`
        document.getElementById("table").innerHTML = cartona
  }
}
function updateLocalStorage(){
  localStorage.setItem("webBookmark", JSON.stringify(webBookmark))
}
function deletUrl(index){
  webBookmark.splice(index,1)
  updateLocalStorage()
  displayWeb(webBookmark)
}
function clearInput(){
  webName.value = null;
  webUrl.value = null;
}
function vistUrl(index){
  window.open(`https://${webBookmark[index].url}.com`)
}


function vaildInput(ele){
  var regex = {
    name:/^[a-z]{3,}$/i,
    url:/^(https?:\/\/)?(www.)?\w{1,}\.(com)$/i
  }
  if(regex[ele.id].test(ele.value)){
    ele.classList.add("is-valid")
    ele.classList.remove("is-invalid");
    addBtn.removeAttribute("disabled")
  }else{
    ele.classList.add("is-invalid")
    ele.classList.remove("is-valid")
    addBtn.addAttribute("disabled")
  }
}






