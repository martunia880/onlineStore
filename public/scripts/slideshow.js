let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
	showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
	showSlides((slideIndex = n));
}

setInterval(() => {
	plusSlides(1);
}, 2500);

function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName('slide');
	// let dots = document.getElementsByClassName('dot');
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}
	// for (i = 0; i < dots.length; i++) {
	// 	dots[i].className = dots[i].classList.remove('active');
	// }
	slides[slideIndex - 1].style.display = 'block';
	// dots[slideIndex - 1].classList.add('active');
}
