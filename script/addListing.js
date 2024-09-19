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
const validInputs = (input) => input.length >= 2;
const requiredInput = (inputs) => inputs.trim() !== "";  //(a == null) !!!!!

const validWordsNumber = (inputs) => inputs.split(" ").length > 5 ;
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
  if (!requiredInput(description)) listingDescription.classList.add("not-valid-input");
  
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
//  RENDER REGIONS DROPDOWN LIST
//
const regionsCountainer = document.querySelector(".regions-container");
const regionsDatas =[];
//
//
let selectedValue=[];
const getSelectedValue = function() {
  selectedValue.push(regionsCountainer.value);
}
regionsCountainer.addEventListener('change', getSelectedValue);
//
const renderRegions = async function () {
  regionsCountainer.innerHTML = "";
  const res = await fetch(
    "https://api.real-estate-manager.redberryinternship.ge/api/regions"
  );
  const datas = await res.json();
  regionsDatas.push(...datas);

  datas.map((data) => {
    const html = `
          <option value="${data.name}">${data.name}</option>
        `;
    regionsCountainer.insertAdjacentHTML("afterbegin", html);
  });

};
renderRegions();
console.log(selectedValue);
//
//
//
const renderCities = async function () {

  const res = await fetch(
    "https://api.real-estate-manager.redberryinternship.ge/api/cities"
  );
  const datas = await res.json();
  console.log(datas);

  if ((datas.map(data => data.region_id)) === selectedValue[0]) {
      console.log(data.region_id);
  }

  //if (regionsDatas.map(r => ))

  /*
  datas.map((data) => {
    const html = `
          <option value="${data.name}">${data.name}</option>
        `;
  
  });*/
};
renderCities();