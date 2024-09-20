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
//  Functions
const validSymbols = (input) => input.trim().length > 1;
const requiredInput = (inputs) => inputs.trim() !== ""; 
const validWordsNumber = (inputs) => inputs.trim().split(" ").length > 4;
const validNumber = (inputs) => Number.isFinite(inputs);
//
//
const checkAddressValidation = function () {
  const address = inputAddress.value;

  if (validSymbols(address)) validAddress.classList.add("is-valid");
  if (!validSymbols(address)) validAddress.classList.add("not-valid");
  if (!requiredInput(address)) inputAddress.classList.add("not-valid-input"); 

    
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
let selectedValue = [];
let dataRegions;
let dataCities;
//
// get dropdown value // render cities
const getSelectedValue = function () {
  selectedValue.push(regionsCountainer.value);

  dataRegions.map((dataR) => {
    if (dataR.name === selectedValue[0]) {
      const cities = [];
      dataCities.forEach(function (cityD) {
        if (cityD.region_id === dataR.id) {
          cities.push(cityD.name);
        }
      });
      citiesCountainer.innerHTML = "";
      const htmlC = cities.map(
        (data) => `
              <option value="${data}">${data}</option>
            `
      );
      citiesCountainer.insertAdjacentHTML("afterbegin", htmlC);
    }
  });
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
  dataRegions = regionsDatas;
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
  dataCities = citiesDatas;

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
const formContainer = document.querySelector(".cta-form-listing");

//
formContainer.addEventListener("submit", function (e) {
  e.preventDefault();

  const dataArr = [...new FormData(formContainer)];
  const formData = Object.fromEntries(dataArr);
  //{rent: 'on', address: 'fff', postcode: 'fff', region: 'აფხაზეთი', city: 'კახეთი', …}
});

const uploadListing = async function (formData) {
  const sendData = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(uploadData),
  });
};
