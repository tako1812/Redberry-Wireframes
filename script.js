"use strict";

const filtersContainer = document.querySelector(".filters-container");
const filteredContainer = document.querySelector(".filtered-inputs");
//
const regionsContainer = document.querySelector(".regions-box");
const minPriceInput = document.querySelector(".min-price-input");
const maxPriceInput = document.querySelector(".max-price-input");
const minAreaInput = document.querySelector(".min-area-input");
const maxAreaInput = document.querySelector(".max-area-input");
let listings =[];
/*/////////////////////////////////*/
//  add/remove filters containers
//
filtersContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn-filter");
  if(!clicked)return;
  const data = clicked.getAttribute('data-filter');
  document
    .querySelector(`.filter-content-${data}`)
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
let bedroomsAmount = [];
//
regionsContainer.addEventListener("click", function (e) {
  document.querySelectorAll('[type="checkbox"]').forEach((item) => {
    if (item.checked === true && !regions.includes(item.value)) {
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
    const price1 = clicked.getAttribute("dataset");
    minPrice = +price1;
    
  });
//
//
document.querySelectorAll(".maxPrice-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".maxPrice-categorie");
    maxPriceInput.value = clicked.textContent;
    const price2 = clicked.getAttribute("dataset");
    maxPrice = +price2;
  });
});
//
//
document.querySelectorAll(".minArea-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".minArea-categorie");
    minAreaInput.value = clicked.textContent;
    const area1 = clicked.getAttribute("dataset");
    minArea = +area1; 
  });
});
//
//
document.querySelectorAll(".maxArea-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".maxArea-categorie");
    maxAreaInput.value = clicked.textContent;
    const area2 = clicked.getAttribute("dataset");
    maxArea = +area2; 
  });
});
//
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
const filterListing = function() {
  const filterData = listings.filter(listing => {
      const regionMatch = regions.length === 0 || regions.includes(listing.city.region.name); 
      const priceMatch = (!minPrice || listing.price >= minPrice) && (!maxPrice || listing.price <= maxPrice); 
      const areaMatch = (!minArea || listing.area >= minArea) && (!maxArea || listing.area <= maxArea);  
      const bedroomMatch = bedroomsAmount.length === 0 || bedrooms.includes(listing.bedrooms);  
      return regionMatch && priceMatch && areaMatch && bedroomMatch; 
    });

  listingsContainer.innerHTML = "";
  filterData.map((data) => { 
    const html =`
    <figure class="listing-card">
      <img
        class="listing-img"
        src="${data.image}"
        rel="image of appartment"
      />
      <div class="cards-content">
        <h1 class="listing-price">${data.price}</h1>
        <div class="flex">
          <ion-icon class="listing-details" name="location"></ion-icon>
          <p class="listing-details">${data.city.name} ${data.address}</p>
        </div>
        <div class="listing-description-container">
          <div class="flex">
            <ion-icon class="listing-details" name="bed"></ion-icon>
            <p class="listing-details">${data.bedrooms}</p>
          </div>
          <div class="flex">
            <ion-icon class="listing-details" name="expand"></ion-icon>
            <p class="listing-details">${data.area}მ</p>
          </div>
          <div class="flex">
            <ion-icon class="listing-details" name="pin"></ion-icon>
            <p class="listing-details">${data.zip_code}</p>
          </div>
        </div>
      </div>
    </figure>`;
    listingsContainer.innerHTML += html;
  });
};

filteredContainer.innerHTML="";
filtersContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn-choose");
  if (!clicked) return;

  console.log(regions);
  let html = regions.map(
    (region) => `
    <div class="filtered-item">
        <p>${region}</p>
        <ion-icon  class="close-icon" name="close-outline"></ion-icon>
    </div>`
  );
  if(html)btnClear.classList.remove('hidden');

  if (minPrice > 0 || maxPrice > 0) {
    html += `<div class="filtered-item">
    <p>${minPrice} - ${maxPrice}</p>
    <ion-icon class="close-icon" name="close-outline"></ion-icon>
    </div>`;
    btnClear.classList.remove('hidden');
  }

  if (minArea > 0 || maxArea > 0)  {
    html += ` <div class="filtered-item">
             <p>${minArea}-${maxArea}</p>
             <ion-icon class="close-icon" name="close-outline"></ion-icon>
             </div>`;
             btnClear.classList.remove('hidden');
  }

  if (bedroomsAmount.length > 0) {
    html += `
          <div class="filtered-item">
              <p>${bedroomsAmount}</p>
              <ion-icon   class="close-icon" name="close-outline"></ion-icon>
          </div>`;
          btnClear.classList.remove('hidden');
  }
  filteredContainer.innerHTML = html;
  filterListing();

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
  //filteredInputs.remove();
  filteredContainer.innerHTML = "";
  regions = [];
  minPrice = 0;
  maxPrice = 0;
  minArea = 0;
  maxArea = 0;
  bedroomsAmount = [];
  filterListing();
  btnClear.classList.add('hidden');

  document.querySelectorAll('[type="checkbox"]').forEach((item) => {
    item.checked = false;
  });

});
/*////////////////////////////////////////*/
//  Open Listing Page
//
const btnAddListing = document.querySelector('.btn-addListing');

btnAddListing.addEventListener('click', function() {
  window.location.href="../pages/addlisting.html";
});

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
  
}
//
const checkSymbolsSurname = function () {
  const surname = inputSurname.value;
  //
  if (validSymbols(surname )) validSurname.classList.add("is-valid");
  if (!validSymbols(surname)) validSurname.classList.add("not-valid");
  
  //if (requiredInput(surname)) inputSurname.classList.add("not-valid-input");
  
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
//
/*////////////////////////////////////////*/
//  UPLOAD AGENT
//
formAgent.addEventListener("submit", function(e) {
  e.preventDefault();
  const token ="9d109274-ed65-48e6-a843-284dc8f78e83";
  const userFile = document.getElementById('file-upload').files[0];

  const nameValid = checkSymbolsName();
  const surnameValid = checkSymbolsSurname();
  const phoneValid = checkNumberValidation();
  const emailIsValid = checkEmailValidation();

  if((!nameValid) && (!surnameValid) && (!phoneValid) && (!emailIsValid)) return;

  const formData = new FormData();
  formData.append('name', inputName.value);
  formData.append('surname', inputSurname.value);
  formData.append('phone', inputPhoneNum.value);  
  formData.append('email', inputEmail.value);
  formData.append('avatar', userFile);
  
  fetch("https://api.real-estate-manager.redberryinternship.ge/api/agents", {
      method: "POST",
      headers: {
         Authorization:`Bearer ${token}`,
         accept:"application/json",
      },
      body: formData,
    }).then((response) => response.json()).then((res) => console.log(res));
});
/*////////////////////////////////////////*/
//  create listing card
//
const listingsContainer = document.querySelector(".listings-container");
const createListingCard = async function () {
  const token ="9d109274-ed65-48e6-a843-284dc8f78e83";
  
  const res = await fetch(
    "https://api.real-estate-manager.redberryinternship.ge/api/real-estates"
  ,{
    method: "GET",
    headers: {
        Authorization:`Bearer ${token}`,
         accept:"application/json",
      },
    }
  )
  const datas = await res.json();
  listings = datas;
  
  datas.map((data) => { 
    const html =`
    <figure class="listing-card" dataset = "${data.id}">
      <img
        class="listing-img"
        src="${data.image}"
        rel="image of appartment"
      />
      <div class="cards-content">
        <h1 class="listing-price">${data.price}</h1>
        <div class="flex">
          <ion-icon class="listing-details" name="location"></ion-icon>
          <p class="listing-details">${data.city.name} ${data.address}</p>
        </div>
        <div class="listing-description-container">
          <div class="flex">
            <ion-icon class="listing-details" name="bed"></ion-icon>
            <p class="listing-details">${data.bedrooms}</p>
          </div>
          <div class="flex">
            <ion-icon class="listing-details" name="expand"></ion-icon>
            <p class="listing-details">${data.area}მ</p>
          </div>
          <div class="flex">
            <ion-icon class="listing-details" name="pin"></ion-icon>
            <p class="listing-details">${data.zip_code}</p>
          </div>
        </div>
      </div>
    </figure>`;
    listingsContainer.innerHTML += html;
    const cards = document.querySelectorAll('.listing-card');
    cards.forEach(card => card.addEventListener("click", function() {
        window.location.href = "./pages/listingDetailed.html";
        const pageId = card.getAttribute('dataset');
        localStorage.setItem("page-id",pageId);

    }));
  });
};
createListingCard();



