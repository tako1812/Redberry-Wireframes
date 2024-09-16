"use strict";

const filtersContainer = document.querySelector(".filters-container");
const filteredCountainer = document.querySelector(".filtered-item");
/*/////////////////////////////////*/
//  add/remove filters containers
//
filtersContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn-filter");
  document
    .querySelector(`.filter-content-${clicked.dataset.filter}`)
    .classList.toggle("hidden");
  //1. toggle tu remove   2. roca erti gaxsnii maqvs da meore filtrs vaklikeb
});
/*/////////////////////////////////*/
//  Get Filters Inputs
//
const regionsContent = document.querySelector(".categories-box");
let regions = [];
regionsContent.addEventListener("click", function (e) {
  document.querySelectorAll('[type="checkbox"]').forEach((item) => {
    if (item.checked === true) {
      regions.push(item.value);
    }
  });
});
//
//
const minPriceInput = document.querySelector(".min-price-input");
const maxPriceInput = document.querySelector(".max-price-input");
const minPrice = [];
//
//
document.querySelectorAll(".minPrice-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".minPrice-categorie");
    minPriceInput.value = clicked.textContent;
    minPrice.push(clicked.textContent);
  });
});
console.log(minPrice);
//
//
const maxPrice = [];
document.querySelectorAll(".maxPrice-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".maxPrice-categorie");
    maxPriceInput.value = clicked.textContent;
    maxPrice.push(clicked.textContent);
  });
});
console.log(maxPrice);
//
//
const minAreaInput = document.querySelector(".min-area-input");
const maxAreaInput = document.querySelector(".max-area-input");

const minArea = [];
document.querySelectorAll(".minArea-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".minArea-categorie");
    minAreaInput.value = clicked.textContent;
    minArea.push(minAreaInput.value);
  });
});
console.log(minArea);
//
const maxArea = [];
document.querySelectorAll(".maxArea-categorie").forEach((item) => {
  item.addEventListener("click", function (e) {
    const clicked = e.target.closest(".maxArea-categorie");
    maxAreaInput.value = clicked.textContent;
    maxArea.push(maxAreaInput.value);
  });
});
console.log(maxArea);
/****************/
const bedroomsAmount = [];
document
  .querySelector(".bedrooms-amount")
  .addEventListener("click", function (e) {
    const clicked = e.target.closest(".bedrooms-amount");
    console.log(clicked.textContent);
    bedroomsAmount.push(clicked.textContent);
  });
console.log(bedroomsAmount);

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

  html += `<div class="filtered-item">
        <p>${minPrice}-${maxPrice}</p>
        <ion-icon class="close-icon" name="close-outline"></ion-icon>
        </div>`;
  minPrice[0] = maxPrice[0] = "";

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

  filteredCountainer.innerHTML = "";
  filteredCountainer.insertAdjacentHTML("afterbegin", html);
});
/*//////////////////////////////////////////*/
//  Render Regions
//
const renderRegions = async function () {
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
    regionsContent.insertAdjacentHTML("afterbegin", html);
  });
};
renderRegions();
/*//////////////////////////////////////////*/
//  Close filtered option
//
const filteredContainer = document.querySelector(".filteredInputs-container");
filteredContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".close-icon");
  if (!clicked) return;

  const filteredItem = document.querySelector(".filtered-item");
  filteredItem.remove();
});

/*//////////////////////////////////////////*/
//  Clear button
//
const btnClear = document.querySelector(".btn-clear"); //შიგნით ხომ არ ჩავსვა?
btnClear.addEventListener("click", function () {
  const filteredInputs = document.querySelector(".filtered-inputs");
  filteredInputs.remove();
});
/*//////////////////////////////////////////*/
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
