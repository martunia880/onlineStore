//const Product = require("../../database/models/product");

function toggleInput() {
	var inputDiv = document.getElementById('input-serch');
	if (inputDiv.style.display === 'none') {
		showInput();
	} else {
		hideInput();
	}
}

window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
      hideInput();
      hideSerchContainerResults();
    }
  });

function showInput() {
	document.getElementById('input-serch').style.display = 'block';
}

function hideInput() {
	document.getElementById('input-serch').style.display = 'none';
}

function hideSerchContainerResults() {
	document.getElementById('results-container').style.display = 'none';
}

function burgerMenuShow(){
    var mobileNav = document.getElementById('bookmarks-container');
    var burgerBtn = document.getElementById('burger-icon');

    mobileNav.classList.toggle('active');
    burgerBtn.classList.toggle('active');

}

function submitForm(event,index) {
  event.preventDefault(); // Zatrzymaj domyślne zachowanie przycisku submit
  var productForm = "productForm" + index;

  var form = document.getElementById(productForm);
  form.submit(); // Wyślij formularz
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
