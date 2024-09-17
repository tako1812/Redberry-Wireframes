"use strict";

const addListingBtn = document.querySelector(".add-listing-btn");
const InputAddress = document.querySelector(".input-address");
const validAddress = document.querySelector(".valid-address");

const validInputs = (input) => input.length >= 2;
addListingBtn.addEventListener("click", function () {
  const address = InputAddress.value;

  if (validInputs(address)) {
    validAddress.classList.add("is-valid");
  }
  if (!validInputs(address)) {
    validAddress.classList.add("not-valid");
  }
});
