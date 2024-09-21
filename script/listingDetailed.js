"use strict";
const previousPage = document.querySelector('.arrow-icon');
const deleteListingBtn = document.querySelector('.delete-listing-btn');
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const pageId =  localStorage.getItem("page-id");


/*////////////////////////////////////////*/
//  on previous page
//
previousPage.addEventListener('click', function() {
    window.location.href="../index.html";
});
/*////////////////////////////////////////*/
//  modal window
//
const openWindow = function () {
    modalWindow.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };
  //
const closeWindow = function () {
    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
  };
  //
deleteListingBtn.addEventListener("click", openWindow);
overlay.addEventListener("click", closeWindow);
/*////////////////////////////////////////*/
//  slider
//
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelectorAll('.arrow-left');
const btnright = document.querySelectorAll('.arrow-right');
let curSlide = 0;
slides.forEach((s, i) => s.style.transform = `translateX(${20 * i}%)`); 
/*
btnLeft.addEventListener("click", function() {
    curSlide++;
    slides.forEach((s, i) => s.style.transform = `translateX(${20 * (i-curSlide)}%)`); 
})*/

/*////////////////////////////////////////*/
//  create detailed listings
//
const listingDetailedContainer = document.querySelector('.listing-detailed-container');
const createListingDetailed = async function () {
  const token ="9d109274-ed65-48e6-a843-284dc8f78e83";
  
  const res = await fetch(
    `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${pageId}`
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

    const html = `
      <div class="listing-detailed-container container">
          <div class="image-box">
            <div><span class="transaction-tag">იყიდება</span></div>
            <img  class="img-detailed" src="${datas.image}" rel="image of appartment"/>
            <p>გამოქვეყნების თარიღი 08/08/2024</p>
          </div>
          <div class="listing-description">
            <h1 class="listing-price">${datas.price}</h1>
            <div class="description-container">
              <div class="details-container">
                <div class="flex">
                  <ion-icon class="listing-details" name="location"></ion-icon>
                  <p class="listing-details">${datas.city.name}  ${datas.address}</p>
                </div>
                <div class="flex">
                  <ion-icon class="listing-details" name="expand"></ion-icon>
                  <p class="listing-details">ფართობი</p>
                  <p class="listing-details">${datas.area}</p>
                </div>
                <div class="flex">
                  <ion-icon class="listing-details" name="bed"></ion-icon>
                  <p class="listing-details">საძინებელი</p>
                  <p class="listing-details">${datas.bedrooms}</p>
                </div>
                <div class="flex">
                  <ion-icon class="listing-details" name="pin"></ion-icon>
                  <p class="listing-details">საფოსტო ინდექსი</p>
                  <p class="listing-details">${datas.zip_code}</p>
                </div>
              </div>
              <div class="listing-details-text">
                <p>${datas.description}</p>
              </div>
              <div class="agent-container"> 
                <div class="agent-peronalInfo">
                  <img class="agent-image" src="${datas.agent.avatar}">
                  <div>
                    <h3 class="listing-details-name" >${datas.agent.name}${datas.agent.surname}</h3>
                    <p class="listing-details-text">აგენტი</p>
                  </div>
                </div>
                <div class="agent-contactInfo">
                  <div class="flex">
                    <ion-icon name="mail-outline"></ion-icon>
                    <p class="listing-details-text">${datas.agent.email}</p>
                  </div>
                  <div class="flex">
                    <ion-icon name="call-outline"></ion-icon>
                    <p class="listing-details-text">${datas.agent.phone}</p>
                  </div>
                </div>
              </div>
              <button class="btn delete-listing-btn">ლისტინგის წაშლა</button>
            </div>
          </div>
      </div>
    `;
    listingDetailedContainer.innerHTML = html;
};
createListingDetailed();



