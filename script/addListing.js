"use strict";

const addListingBtn = document.querySelector(".add-listing-btn");
const inputAddress = document.querySelector(".input-address");
const validAddress = document.querySelector(".valid-address");
const listingDescription = document.querySelector(".listing-description");
const validDescription = document.querySelector(".valid-description");
const validPostcode = document.querySelector(".valid-postcode");
const validPrice = document.querySelector(".valid-price");
const validArea = document.querySelector(".valid-area");
const validBedroomsNum = document.querySelector(".valid-bedrooms-number");
const postcodeNum = document.querySelector(".postcode");
const listingPrice = document.querySelector(".listing-price");
const listingArea = document.querySelector(".listing-area");
const bedroomsNumber = document.querySelector(".bedrooms-number");
//
const regionsCountainer = document.querySelector(".regions-container");
const citiesCountainer = document.querySelector(".cities-container");
//
const validInputs = (input) => input.length >= 2;
const requiredInput = (inputs) => inputs.trim() !== ""; //(a == null) !!!!!

const validWordsNumber = (inputs) => inputs.split(" ").length > 5;
const validNumber = (inputs) => Number.isFinite(inputs);
//
//
const checkAddressValidation = function () {
  const address = inputAddress.value;

  if (validInputs(address)) validAddress.classList.add("is-valid");

  if (!validInputs(address)) validAddress.classList.add("not-valid");

  /*
  if (!validInputs(address) || !requiredInput(address)) {
    inputAddress.classList.add("not-valid-input"); //!!!!
    validAddress.classList.add("not-valid");
  }*/
};
//
const checkDescriptionValidation = function () {
  const description = listingDescription.value;

  if (validWordsNumber(description)) validDescription.classList.add("is-valid");

  if (!validWordsNumber(description)) {
    validDescription.classList.add("not-valid");
    listingDescription.classList.add("not-valid-input");
  }
  if (!requiredInput(description))
    listingDescription.classList.add("not-valid-input");

  //if (!validWordsAmount(description) || !requiredInput(description))
};

const checkNumberValidation = function () {
  const postcode = +postcodeNum.value;
  const price = +listingPrice.value;
  const area = +listingArea.value;
  const bedrooms = +bedroomsNumber.value;

  if (validNumber(postcode)) validPostcode.classList.add("is-valid");
  if (!validNumber(postcode)) validPostcode.classList.add("not-valid");

  if (validNumber(price)) validPrice.classList.add("is-valid");
  if (!validNumber(price)) validPrice.classList.add("not-valid");

  if (validNumber(area)) validArea.classList.add("is-valid");
  if (!validNumber(area)) validArea.classList.add("not-valid");

  if (validNumber(bedrooms)) validBedroomsNum.classList.add("is-valid");
  if (!validNumber(bedrooms)) validBedroomsNum.classList.add("not-valid");
};

addListingBtn.addEventListener("click", checkAddressValidation);
addListingBtn.addEventListener("click", checkDescriptionValidation);
addListingBtn.addEventListener("click", checkNumberValidation);

/*////////////////////////////////////////*/
//  RENDER REGION/CITY DROPDOWN LIST
//
//  Get dropdown value
let selectedValue = [];
const getSelectedValue = function () {
  selectedValue.push(regionsCountainer.value);
};
regionsCountainer.addEventListener("change", getSelectedValue);
//
//
const renderRegionsCities = async function () {
  // get data - render regions
  regionsCountainer.innerHTML = "";
  const res = await fetch(
    "https://api.real-estate-manager.redberryinternship.ge/api/regions"
  );
  const regionsDatas = await res.json();
  regionsDatas.map((data) => {
    const html = `
          <option value="${data.name}">${data.name}</option>
        `;
    regionsCountainer.insertAdjacentHTML("afterbegin", html);
  });

  // get data - render cities
  const response = await fetch(
    "https://api.real-estate-manager.redberryinternship.ge/api/cities"
  );
  const citiesDatas = await response.json();

  regionsDatas.map((dataR) => {
    if (dataR.name === selectedValue[0]) {
      const city = [];
      citiesDatas.forEach(function (cityD) {
        if (cityD.region_id === dataR.id) {
          city.push(cityD.name);
        }
      });
      citiesCountainer.innerHTML = "";
      const htmlC = city.map(
        (data) => `
              <option value="${data}">${data}</option>
            `
      );
      citiesCountainer.insertAdjacentHTML("afterbegin", htmlC);
    }
  });
};
renderRegionsCities();

/*////////////////////////////////////////*/
//  UPLOAD LISTING
//
const addListingBtn = document.querySelector(".add-listing-btn");
const uploadListing = function (e) {};
