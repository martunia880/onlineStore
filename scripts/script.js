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

