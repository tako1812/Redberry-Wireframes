"use strict";
const previousPage = document.querySelector('.arrow-icon');



/*////////////////////////////////////////*/
//  on previous page
//

const openPrevious = document.location.href="../index.html";
previousPage.addEventListener('click', openPrevious);

openPrevious.addEventListener('click', function() {
    document.location.href="../index.html";
});