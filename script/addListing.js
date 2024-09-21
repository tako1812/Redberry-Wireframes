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
const agentsCountainer= document.getElementById('select-agent');
//
//  Functions
const validSymbols = (input) => input.trim().length > 1;
const requiredInput = (inputs) => inputs.trim() !== ""; 
const validWordsNumber = (inputs) => inputs.trim().split(" ").length > 4;
const validNumber = (inputs) => Number.isFinite(inputs);
//
//
const checkAddressValidation = function () {
  let result = true; 
  const address = inputAddress.value;

  if (validSymbols(address)) validAddress.classList.add("is-valid");
  if (!validSymbols(address))  {
    validAddress.classList.add("not-valid")
    result  = false;
  };
  if (!requiredInput(address)) {
    inputAddress.classList.add("not-valid-input") 
    result = false;
  };
  return result;
};
//
const checkDescriptionValidation = function () {
  let result = true; 
  const description = listingDescription.value;

  if (validWordsNumber(description)) validDescription.classList.add("is-valid");

  if (!validWordsNumber(description)) {
    validDescription.classList.add("not-valid");
    listingDescription.classList.add("not-valid-input");
    result = false;
    
  }
  if (!requiredInput(description)) {    
    listingDescription.classList.add("not-valid-input");
    result = false;
  }
  return result;

};

const checkNumberValidation = function () {
  let result = true;
  const postcode = +postcodeNum.value;
  const price = +listingPrice.value;
  const area = +listingArea.value;
  const bedrooms = +bedroomsNumber.value;

  if (validNumber(postcode)) validPostcode.classList.add("is-valid");
  if (!validNumber(postcode)) {
   validPostcode.classList.add("not-valid");
   result = false;
  }  

  if (validNumber(price)) validPrice.classList.add("is-valid");
  if (!validNumber(price)) {
    validPrice.classList.add("not-valid");
    result = false;
  }
  if (validNumber(area)) validArea.classList.add("is-valid");
  if (!validNumber(area)) {
    validArea.classList.add("not-valid");
    result = false; 
  }
  if (validNumber(bedrooms)) validBedroomsNum.classList.add("is-valid");
  if (!validNumber(bedrooms)) {
    validBedroomsNum.classList.add("not-valid");
    result = false;
  }
  return result; 
};

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
  const cities = dataCities.filter(city => city.region_id == regionsCountainer.value);
  
  citiesCountainer.innerHTML = "";
  const htmlC = cities.map(
    (data) => `
          <option value="${data.id}">${data.name}</option>
        `
  );
  citiesCountainer.insertAdjacentHTML("afterbegin", htmlC);
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
          <option value="${data.id}">${data.name}</option>
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
              <option value="${data.id}">${data.id}</option>
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
const ratios = document.querySelector('.transactionType-box');
let ratioValue =[];
//
formContainer.addEventListener("submit", function(e) {
  e.preventDefault();
  const token ="9d109274-ed65-48e6-a843-284dc8f78e83";
  const userFile = document.querySelector('.image-upload').files[0];

  const validAddress = checkAddressValidation();
  const validDescription = checkDescriptionValidation();
  const validNumbers = checkNumberValidation();

  console.log(validAddress,validDescription, validNumbers);

  if((!validAddress) && (!validDescription) && (!validNumbers)) return;

  console.log(2222);

  const formData = new FormData();
  formData.append('is_rental', "1");
  formData.append('price', listingPrice.value);
  formData.append('zip_code', postcodeNum.value);  
  formData.append('area', listingArea.value);
  formData.append('address', inputAddress.value);
  formData.append('bedrooms', bedroomsNumber.value);
  formData.append('description', listingDescription.value);
  formData.append('region_id', regionsCountainer.value);
  formData.append('image', userFile);
  formData.append('city_id', citiesCountainer.value);
  formData.append('agent_id', agentsCountainer.value);

  fetch("https://api.real-estate-manager.redberryinternship.ge/api/real-estates", {
    method: "POST",
    headers: {
       Authorization:`Bearer ${token}`,
       accept:"application/json",
    },
    body: formData,
  }).then((response) => response.json()).then((res) => console.log(res));
});
//
//
const getAgentData = async function () {
  /*agentsCountainer.innerHTML = "";*/
  const token ="9d109274-ed65-48e6-a843-284dc8f78e83";
  
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
  datas.map((data) => {
    const html = `
    <option value="${data.id}">${data.name} ${data.surname}</option>
    `;
    agentsCountainer.insertAdjacentHTML("afterbegin", html);
  });
};
getAgentData();