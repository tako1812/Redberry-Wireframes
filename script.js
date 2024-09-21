"use strict";

const filtersContainer = document.querySelector(".filters-container");
const filteredContainer = document.querySelector(".filtered-inputs");
//
const regionsContainer = document.querySelector(".regions-box");
const minPriceInput = document.querySelector(".min-price-input");
const maxPriceInput = document.querySelector(".max-price-input");
const minAreaInput = document.querySelector(".min-area-input");
const maxAreaInput = document.querySelector(".max-area-input");
/*/////////////////////////////////*/
//  add/remove filters containers
//
filtersContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn-filter");
  document
    .querySelector(`.filter-content-${clicked.dataset.filter}`)
    .classList.toggle("hidden");
});
/*/////////////////////////////////////////////////*/
//  Get Filters Inputs
//
let regions = [];
let minPrice = 0;
let maxPrice = 0;
let minArea = 0;
let maxArea = 0;

console.log(minPrice);

const bedroomsAmount = [];
regionsContainer.addEventListener("click", function (e) {
  document.querySelectorAll('[type="checkbox"]').forEach((item) => {
    if (item.checked === true) {
      regions.push(item.value);
    }
  });
});
//
//
document
  .querySelector(".min-price-coutainer")
  .addEventListener("click", function (e) {
    const clicked = e.target.closest(".minPrice-categorie");
    minPriceInput.value = clicked.textContent;
    minPrice = +minPriceInput.value;
    console.log(minPrice);
  });

//
//
//
document.querySelectorAll(".maxPrice-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".maxPrice-categorie");
    maxPriceInput.value = clicked.textContent;
    maxPrice = +maxPriceInput.value;
  });
});
//
document.querySelectorAll(".minArea-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".minArea-categorie");
    minAreaInput.value = clicked.textContent;
    minArea.push(+minAreaInput.value);
  });
});

//
document.querySelectorAll(".maxArea-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".maxArea-categorie");
    maxAreaInput.value = clicked.textContent;
    maxArea.push(+maxAreaInput.value);
  });
});
//
document
  .querySelector(".bedrooms-amount")
  .addEventListener("click", function (e) {
    const clicked = e.target.closest(".bedrooms-amount");
    console.log(clicked.textContent);
    bedroomsAmount.push(clicked.textContent);
  });
//
//
filteredContainer.innerHTML = "";
filtersContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn-choose");

  if (!clicked) return;

  let html = regions.map(
    (region) => `
    <div class="filtered-item">
        <p>${region}</p>
        <ion-icon  class="close-icon" name="close-outline"></ion-icon>
    </div>`
  );

  if (minPrice > 0 || maxPrice > 0) {
    html += `<div class="filtered-item">
    <p>${minPrice} - ${maxPrice}</p>
    <ion-icon class="close-icon" name="close-outline"></ion-icon>
    </div>`;
  }

  /*
  html += `<div class="filtered-item">
        <p>${minPrice}-${maxPrice}</p>
        <ion-icon class="close-icon" name="close-outline"></ion-icon>
        </div>`;*/
  /*minPrice[0] = maxPrice[0] = "";*/

  /*
        minPrices.map(price =>  `
        <div class="filtered-item">
            <p>${price}-1000 000</p>
            <ion-icon   class="close-icon" name="close-outline"></ion-icon>
            </div>`);
            maxPrice.map(price => 
            <p>100000-${price}</p>`);*/

  html += ` <div class="filtered-item">
           <p>${minArea}-${maxArea}</p>
           <ion-icon class="close-icon" name="close-outline"></ion-icon>
           </div>`;

  html += `
        <div class="filtered-item">
            <p>${bedroomsAmount}</p>
            <ion-icon   class="close-icon" name="close-outline"></ion-icon>
        </div>`;

  filteredContainer.insertAdjacentHTML("afterbegin", html);
});
/*////////////////////////////////////////*/
//  Render Regions
//
const renderRegions = async function () {
  regionsContainer.innerHTML = "";
  const res = await fetch(
    "https://api.real-estate-manager.redberryinternship.ge/api/regions"
  );
  const datas = await res.json();
  console.log(datas);

  datas.map((data) => {
    const html = `
        <div class="input-label-container">
        <input
          class="checkbox"
          type="checkbox"
          id="region1"
          name="region1"
          value="${data.name}"
        />
        <label for="region1"> ${data.name}</label>
      </div>
        `;
    regionsContainer.insertAdjacentHTML("afterbegin", html);
  });
};
renderRegions();
/*/////////////////////////////////////////*/
//  Close(X) filtered user inputs
//
const filteredInputsContainer = document.querySelector(
  ".filteredInputs-container"
);
filteredInputsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".close-icon");
  if (!clicked) return;

  const filteredItem = document.querySelector(".filtered-item");
  filteredItem.remove();
});

/*////////////////////////////////////////*/
//  Clear button
//
const btnClear = document.querySelector(".btn-clear");
btnClear.addEventListener("click", function () {
  const filteredInputs = document.querySelector(".filtered-inputs");
  filteredInputs.remove();
});
/*////////////////////////////////////////*/
//  Open Listing Page
//
const btnAddListing = document.querySelector('.btn-addListing');
const openPage = document.location.href=".//pages/addlisting.html";
btnAddListing.addEventListener('click', openPage);

/*btnAddListing.addEventListener('click', function() {
  document.location.href=".//pages/addlisting.html";
});*/

/*////////////////////////////////////////*/
//  Add agent window functionality(open/close)
//
const btnAddAgent = document.querySelector(".btn-addAgent");
const addAgentWindow = document.querySelector(".add-agent-window");
const overlay = document.querySelector(".overlay");
//
const openWindow = function () {
  addAgentWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeWindow = function () {
  addAgentWindow.classList.add("hidden");
  overlay.classList.add("hidden");
};
//
btnAddAgent.addEventListener("click", openWindow);
overlay.addEventListener("click", closeWindow);
/*////////////////////////////////////////*/
//  AGENT FORM VALIDATION
//
const formAgent = document.querySelector('.cta-form-agent');
const addAgentBtn = document.querySelector(".add-agent-btn");
const inputName = document.querySelector('.form-input-name');
const inputSurname= document.querySelector(".surname");
const validName = document.querySelector(".valid-name");
const validSurname = document.querySelector(".valid-surname");
const inputPhoneNum = document.querySelector(".form-input-number");
const validNumber = document.querySelector(".valid-number");
const inputEmail = document.querySelector(".form-input-email");
const validEmail = document.querySelector(".valid-email");
//
//   Functions
const validSymbols = (input) => input.trim().length > 1;
const requiredInput = (inputs) => inputs.trim() === ""; 
const validNumbers = (inputs) => Number.isFinite(inputs);
const validPhoneNum  = (input) => input.length === 9;
const validPhoneStartInd = (input) => input.startsWith("5");
//const validEmailInputs = (input) => input.trim().includes("@"); 
const validEmailEnd = (input) => input.trim().endsWith("@redberry.ge"); 
//
//
const checkSymbolsName = function () {
  const name = inputName.value;
  //
  if (validSymbols(name)) validName.classList.add("is-valid");
  if (!validSymbols(name)) validName.classList.add("not-valid");
  inputName.value = "";
}
//
const checkSymbolsSurname = function () {
  const surname = inputSurname.value;
  //
  if (validSymbols(surname )) validSurname.classList.add("is-valid");
  if (!validSymbols(surname)) validSurname.classList.add("not-valid");
  
  //if (requiredInput(surname)) inputSurname.classList.add("not-valid-input");
  inputSurname.value= "";
};
//
const checkNumberValidation = function () {
  const phoneNum = inputPhoneNum.value;

  if (validNumbers(phoneNum)) validNumber.classList.add("is-valid");
  if (validPhoneNum(phoneNum)) validNumber.classList.add("is-valid");
  if (validPhoneStartInd(phoneNum)) validNumber.classList.add("is-valid");

  //if ((!validPhoneNum(phoneNum))) validNumber.classList.add("not-valid");
  
  if (!validNumbers(phoneNum) || !validPhoneNum(phoneNum) || !validPhoneStartInd(phoneNum)) {
   validNumber.classList.add("not-valid");
  };
  inputPhoneNum.value= "";
    
};
const checkEmailValidation = function() {
  const email = inputEmail.value;

  if (validEmailEnd(email)) validEmail.classList.add("is-valid");

  if (!validEmailEnd(email)) {
    validEmail.classList.add("not-valid");
    return false;
  } 
  return true;
}
//addAgentBtn.addEventListener("click", checkSymbolsName);
//addAgentBtn.addEventListener("click", checkNumberValidation);
//addAgentBtn.addEventListener("click", checkEmailValidation);*/
//
/*////////////////////////////////////////*/
//  UPLOAD AGENT
//
formAgent.addEventListener("submit", function(e) {
  e.preventDefault();
  const token ="9d0eaf47-5af0-4ec3-9820-f608e45749ce";
  const userFile = document.getElementById('file-upload').files[0];

  /*checkSymbolsSurname() 
  checkSymbolsName();
  checkNumberValidation();
  checkEmailValidation();
  console.log(inputName.value);*/

  const emailIsValid = checkEmailValidation();
  if(!emailIsValid) return;
  const formData = new FormData();

  //const formData = Object.fromEntries(dataArr);

  formData.append('name', inputName.value);
  formData.append('surname', inputSurname.value);
  formData.append('phone', inputPhoneNum.value);  
  formData.append('email', inputEmail.value);
  formData.append('avatar', userFile);
  
  console.log(inputName.value);
  

  fetch("https://api.real-estate-manager.redberryinternship.ge/api/agents", {
      method: "POST",
      headers: {
         Authorization:`Bearer ${token}`,
         accept:"application/json",
      },
      body: formData,
    }).then((response) => response.json()).then((res) => console.log(res));
  
  


});


/********************/

const rend = async function () {
  const token ="9d0eaf47-5af0-4ec3-9820-f608e45749ce";
  
  const res = await fetch(
    "https://api.real-estate-manager.redberryinternship.ge/api/agents"
  ,{
    method: "GET",
    headers: {
        Authorization:`Bearer ${token}`,
         accept:"application/json",
      },
    }
  )
  const datas = await res.json();
  console.log(datas);
};
rend();




