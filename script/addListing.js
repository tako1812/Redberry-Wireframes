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
/*const requiredInput = (...inputs) => inputs.every((inp) => inp !== "");*/ //(a == null) !!!!!
const requiredInput = (inputs) => inputs !== "" && inputs !== 0;
const validWordsAmount = (...inputs) => inputs.length >= 5;
const validNumber = (inputs) => Number.isFinite(inputs);

/*const validNumber = (inputs) => inputs.map((inp) => Number.isFinite(inp)); */
//
//
const checkAddressValidation = function () {
  const address = inputAddress.value;

  if (validInputs(address)) {
    validAddress.classList.add("is-valid");
  }
  if (!validInputs(address) || !requiredInput(address)) {
    inputAddress.classList.add("not-valid-input"); //!!!!
    validAddress.classList.add("not-valid");
  }
};
//
const checkDescriptionValidation = function () {
  const description = listingDescription.value;

  if (validWordsAmount(description)) {
    validDescription.classList.add("is-valid");
  }
  if (!validWordsAmount(description) || !requiredInput(description)) {
    validDescription.classList.add("not-valid");
    listingDescription.classList.add("not-valid-input");
  }
};

const checkNumberValidation = function () {
  const postcode = +postcodeNum.value;
  const price = +listingPrice.value;
  const area = +listingArea.value;
  const bedrooms = +bedroomsNumber.value;

  if (validNumber(postcode)) validPostcode.classList.add("is-valid");
  /*
  if (!validNumber(postcode) || !requiredInput(postcode))
    validPostcode.classList.add("not-valid");*/

  console.log(requiredInput(postcode));

  console.log(postcode); //რატომ ვიღებთ 0-სს
  console.log(typeof postcode);
  console.log(
    [postcode, price, area, bedrooms].map((each) => validNumber(each))
  );

  /*
  if (validNumber(postcode)) {
    validPostcode.classList.add("is-valid");
    validPrice.classList.add("is-valid");
    validArea.classList.add("is-valid");
    validBedroomsNum.classList.add("is-valid");
  }
  if (!validNumber(postcode)) {
    validPostcode.classList.add("not-valid");
    validPrice.classList.add("not-valid");
    validArea.classList.add("not-valid");
    validBedroomsNum.classList.add("not-valid");
  }

  if (!requiredInput(postcode)) {
    postcodeNum.classList.add("not-valid");
    listingPrice.classList.add("not-valid-input");
    listingArea.classList.add("not-valid-input");
    bedroomsNumber.classList.add("not-valid-input");
  }*/
};

addListingBtn.addEventListener("click", checkAddressValidation);
addListingBtn.addEventListener("click", checkDescriptionValidation);
addListingBtn.addEventListener("click", checkNumberValidation);

/*   ამან არ იმუშავა
const checkNumberValidation = function () {
  const postcode = +postcodeNum.value;
  const price = +listingPrice.value;
  const area = +listingArea.value;
  const bedrooms = +bedroomsNumber.value;

  if (validNumber(postcode, price, area, bedrooms)) {
    validPostcode.classList.add("is-valid");
    validPrice.classList.add("is-valid");
    validArea.classList.add("is-valid");
    validBedroomsNum.classList.add("is-valid");
  }
  if (!validNumber(postcode, price, area, bedrooms)) {
    validPostcode.classList.add("not-valid");
    validPrice.classList.add("not-valid");
    validArea.classList.add("not-valid");
    validBedroomsNum.classList.add("not-valid");
  }

  if (!requiredInput(postcode, price, area, bedrooms)) {
    postcodeNum.classList.add("not-valid-input");
    listingPrice.classList.add("not-valid-input");
    listingArea.classList.add("not-valid-input");
    bedroomsNumber.classList.add("not-valid-input");
  }

};

*/
