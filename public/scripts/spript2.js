const signup = document.querySelector('.signup-switch');
const login = document.querySelector('.login-switch');

const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');

function showRegister() {
	loginForm.classList.toggle('hide');
	registerForm.classList.toggle('hide');
}
function showLogin() {}

signup.addEventListener('click', showRegister);
login.addEventListener('click', showRegister);
