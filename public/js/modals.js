const openModalButtons = document.querySelectorAll('.open-modal-btn');
const modal = document.getElementById('modal');
const modalData = document.getElementById('modal-data');

openModalButtons.forEach(function(button){
    button.addEventListener('click', function(){

        // Adding Dynamic data for each popups
        console.log("button pressed");


        modal.style.display = 'block';
    })
})