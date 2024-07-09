let elForm = document.querySelector("form")
let elList = document.querySelector(".list")
let modalWrapper = document.querySelector(".wrapper")
let elModal = document.querySelector(".modal")
let elComplated = document.querySelector(".complated")
let elUnComplated = document.querySelector(".uncomplated")
let elAll = document.querySelector(".all")

let array = []

elForm.addEventListener("submit" , (event) => {
    event.preventDefault()
    let data = {
        id: array.length + 1,
        value:event.target[0].value,
        isComplated:false
    }
    array.push(data)
    event.target.reset()
    addList(array,elList)
})

function addList(list,arr){
    arr.innerHTML = ""
    list.forEach((value, index) => {
        let elItem = document.createElement("li")
        elItem.classList = `flex justify-between relative ${value.isComplated ? "before:w-[60%] before:h-[2px] before:bg-black before:absolute before:top-6 before:right-0 before:left-11 before:bottom-0": ""}`
        elItem.innerHTML = `
        <div class="flex items-center">
                <button onclick={clickCheck(${value.id})} class="w-[20px] h-[20px] mr-[5px]  rounded-[45%] border-[2px] border-violet-300 ${value.isComplated ? "white" : "bg-violet-500" } flex justify-center items-center"><svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs>
                      <path id="check-a" d="M4.29289322,0.292893219 C4.68341751,-0.0976310729 5.31658249,-0.0976310729 5.70710678,0.292893219 C6.09763107,0.683417511 6.09763107,1.31658249 5.70710678,1.70710678 L1.90917969,5.46118164 C1.5186554,5.85170593 0.885490417,5.85170593 0.494966125,5.46118164 C0.104441833,5.07065735 0.104441833,4.43749237 0.494966125,4.04696808 L4.29289322,0.292893219 Z"/>
                      <path id="check-c" d="M10.7071068,13.2928932 C11.0976311,13.6834175 11.0976311,14.3165825 10.7071068,14.7071068 C10.3165825,15.0976311 9.68341751,15.0976311 9.29289322,14.7071068 L0.292893219,5.70710678 C-0.0976310729,5.31658249 -0.0976310729,4.68341751 0.292893219,4.29289322 L4.29289322,0.292893219 C4.68341751,-0.0976310729 5.31658249,-0.0976310729 5.70710678,0.292893219 C6.09763107,0.683417511 6.09763107,1.31658249 5.70710678,1.70710678 L2.41421356,5 L10.7071068,13.2928932 Z"/>
                    </defs>
                    <g fill="none" fill-rule="evenodd" transform="rotate(-90 11 7)">
                      <g transform="translate(1 1)">
                        <mask id="check-b" fill="#ffffff">
                          <use xlink:href="#check-a"/>
                        </mask>
                        <use fill="#D8D8D8" fill-rule="nonzero" xlink:href="#check-a"/>
                        <g fill="${value.isComplated ? "#FFA0A0" : "white"}" mask="url(#check-b)">
                          <rect width="24" height="24" transform="translate(-7 -5)"/>
                        </g>
                      </g>
                      <mask id="check-d" fill="#ffffff">
                        <use xlink:href="#check-c"/>
                      </mask>
                      <use fill="#000000" fill-rule="nonzero" xlink:href="#check-c"/>
                      <g fill="${value.isComplated ? "#7600FF" : "white"}" mask="url(#check-d)">
                        <rect width="24" height="24" transform="translate(-6 -4)"/>
                      </g>
                    </g>
                  </svg></button>
                <span class="text-slate-6
                00 text-[20px]">${index + 1}.</span>
                <p class="text-violet-500 text-[23px]">${value.value}</p>
            </div>
            <div class="flex justify-between gap-3">
                <button onclick={updateTodo(${value.id})} class="p-3 bg-green-500 rounded-[12px] text-white font-medium ">Update</button>
                <button onclick={clickDelete(${value.id})} class="p-3 bg-red-500 rounded-[12px] text-white font-medium ">Delete</button>
            </div>  `
            elList.append(elItem)      
    });
    document.getElementById("all").textContent = array.length
    document.getElementById("uncomplated").textContent = array.length
    let trueobj = []
    findedelement = array.filter(item => item.isComplated == true)
    trueobj.push(findedelement)
    document.getElementById("complated").textContent = findedelement.length
    document.getElementById("uncomplated").textContent = array.length - findedelement.length
}

function clickDelete(id){
    let findedIndex = array.findIndex(item => item.id == id)
    array.splice(findedIndex,1)
    addList(array,elList)
}


function clickCheck(id){
    let findedObj = array.find(item => item.id == id)
    findedObj.isComplated = !findedObj.isComplated    
     addList(array,elList)
}


function updateTodo(id){
  modalWrapper.classList.add("!top-0")
  elModal.classList.add("!scale-100")
  const updateObj = array.find(item => item.id == id)
  console.log(updateObj);
  elModal.innerHTML = `
       <p class="p-5 text-[25px] font-semibold text-violet-600">Change <span class="text-yellow-400">your</span> <span class="text-white">ToDo</span> </p>
       <div class="p-5 flex  items-center gap-5 ">
            <input value="${updateObj.value}" class="update-value py-3 w-[100%] pl-5  border-[2px] border-violet-300 rounded-lg outline-none  text-violet-400 focus:shadow-lg focus:shadow-violet-600" placeholder="update Todo" type="text" />
            <button onclick={updateTodoBtnClick(${id})} class="bg-violet-500 w-[40%] p-2.5 font-semibold text-white rounded-lg text-[20px]"> Update</button>
       </div>
  `
}

function updateTodoBtnClick(id){
  const updateObj = array.find(item => item.id == id)
  let newValue = document.querySelector(".update-value").value
  updateObj.value = newValue
  modalWrapper.classList.remove("!top-0")
  elModal.classList.remove("!scale-100")
  addList(array,elList)
}

modalWrapper.addEventListener("click", function(e){
  if(e.target.value == "wrapper"){
    modalWrapper.classList.remove("!top-0")
    elModal.classList.remove("!scale-100")
  }
})

elComplated.addEventListener("click" , () =>{
  let complatedCount = array.filter(value => value.isComplated == true)
  addList(complatedCount,elList)
})
elUnComplated.addEventListener("click" , () =>{
  let uncomplatedCount = array.filter(value => value.isComplated == false)
  addList(uncomplatedCount,elList)
})
elAll.addEventListener("click" , () =>{
  addList(array,elList)
})

