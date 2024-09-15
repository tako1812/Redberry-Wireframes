'use strict'


const filtersContainer = document.querySelector('.filters-container');
const filteredCountainer = document.querySelector('.filtered-item');

//  Filter functionality
filtersContainer.addEventListener('click', function(e) {
   const clicked = e.target.closest('.btn-filter');
   document.querySelector(`.filter-content-${clicked.dataset.filter}`).classList.toggle('hidden');    
   //1. toggle tu remove   2. roca erti gaxsnii maqvs da meore filtrs vaklikeb
})


// get user inputs
const filterDetailContainer =document.querySelector('.categories-box');

filterDetailContainer.addEventListener('click', function(e) {
    let region=[];
    document.querySelectorAll('[type="checkbox"]').forEach(item => {
        if(item.checked === true) {
            region.push(item.value);
        }
    })
    
   /* const html = `
    <div class="filtered-area">
        <p>${region[0]}</p>
        <ion-icon  class="close-icon" name="close-outline"></ion-icon>
    </div>
    `
    filteredCountainer.textContent=''
    filteredCountainer.insertAdjacentHTML('afterbegin', html);*/
    
})
const minPriceInput = document.querySelector('.min-price-input'); 
const maxPriceInput = document.querySelector('.max-price-input'); 

document.querySelectorAll('.price-categorie').forEach(item => {
    item.addEventListener('click', function(e) {
        const clicked = e.target.closest('.price-categorie');
        console.log(clicked.textContent);

        minPriceInput.value = `${clicked.textContent}`
        if (minPriceInput.value <= `${clicked.textContent}`) {
            maxPriceInput.value = `${clicked.textContent}`;
        }   
    })
})

const minAreaInput = document.querySelector('.min-area-input'); 
const maxAreaInput = document.querySelector('.max-area-input'); 
document.querySelectorAll('.area-categorie').forEach(item => {
    item.addEventListener('click', function(e) {
        const clicked = e.target.closest('.area-categorie');
        console.log(clicked.textContent);

        minAreaInput.value = `${clicked.textContent}`
        if (minAreaInput.value <= `${clicked.textContent}`) {
            maxAreaInput.value = `${clicked.textContent}`;
        }   
    })
})





filterDetailContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.btn-choose');
     
      /*********************/
        let region=[];
        document.querySelectorAll('[type="checkbox"]').forEach(item => {
            if(item.checked === true) {
                region.push(item.value);
            }
        })
        let html = `
        <p>${region[0]}</p>
        <ion-icon   class="close-icon" name="close-outline"></ion-icon>
        `
      /*********************** */

    document.querySelectorAll('.price-categorie').forEach(item => {
        item.addEventListener('click', function(e) {
            const clicked = e.target.closest('.price-categorie');
            const minPrice = `${clicked.textContent}`;
            if (minPrice <= `${clicked.textContent}`) {
                minPriceInput.value = `${clicked.textContent}`;
            } else {
                maxPriceInput.value = `${clicked.textContent}`;
            }
            
                html = `
            <p>${minPrice} - ${minPrice}</p>
            <ion-icon   class="close-icon" name="close-outline"></ion-icon>
            `;

        })
        
        

    })
     


    

        filteredCountainer.textContent=''
        filteredCountainer.insertAdjacentHTML('afterbegin', html);
    




})


