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
let minPrice = [];
let maxPrice = 0;
let minArea = 0;
let maxArea = 0;

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
/*
document.querySelectorAll(".minPrice-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".minPrice-categorie");
    minPriceInput.value = clicked.textContent;
    minPrice = clicked.textContent;
    console.log(minPrice);
  });
});
console.log(minPrice);
*/

document
  .querySelector(".min-price-coutainer")
  .addEventListener("click", function (e) {
    const clicked = e.target.closest(".minPrice-categorie");
    minPriceInput.value = clicked.textContent;
    minPrice.push(Number(minPriceInput.value));
  });
console.log(minPrice);
console.log(minPrice[0] > 0);
//
//
//
document.querySelectorAll(".maxPrice-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".maxPrice-categorie");
    maxPriceInput.value = clicked.textContent;
    maxPrice = maxPriceInput.value;
  });
});
//
document.querySelectorAll(".minArea-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".minArea-categorie");
    minAreaInput.value = clicked.textContent;
    minArea.push(minAreaInput.value);
  });
});
//
document.querySelectorAll(".maxArea-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".maxArea-categorie");
    maxAreaInput.value = clicked.textContent;
    maxArea.push(maxAreaInput.value);
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

  if (minPrice[0] > 0) {
    html += `<div class="filtered-item">
    <p>${minPrice[0] - maxPrice}</p>
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
const addAgentBtn = document.querySelector(".add-agent-btn");
const inputName = document.querySelector(".form-input-name");
const inputLastName = document.querySelector(".form-input-lastName");
//
//
const validInputs = (...inputs) => inputs.every((input) => input.length >= 2);
const validWords = (...inputs) => inputs.length >= 5;
//
addAgentBtn.addEventListener("click", function (e) {
  const name = inputName.value;
  const lastName = inputLastName.value;
  if (validInputs(name, lastName)) {
  }
});
//
