const editBtns = document.querySelectorAll('.edit-button');
const saveBtns = document.querySelectorAll('.save-button');
const editForms = document.querySelectorAll('.account-form');
const accountEdit = document.querySelectorAll('.account-edit-background');
const accountEditCloseBtns = document.querySelectorAll('.close-button');
//inputs id
const namee = document.getElementById("account-name");
const phone = document.getElementById("account-phone");
const birthDate = document.getElementById("account-birthdate");
const email = document.getElementById("account-email");
const lastPassword = document.getElementById("account-last-password");
const newPassword = document.getElementById("account-new-password");
const newPassword2 = document.getElementById("account-new-password2");
const country = document.getElementById("account-country");
const postcode = document.getElementById("account-postcode");
const city = document.getElementById("account-city");
const street = document.getElementById("account-street");
const houseNumber = document.getElementById("account-housenumber");
const flatNumber = document.getElementById("account-flatnumber");

const nameElement = document.getElementById("account-name-el");
const phoneElement = document.getElementById("account-phone-el");
const birthDateElement = document.getElementById("account-birthday-el");
const emailElement = document.getElementById("account-email-el");
const lastPasswordElement = document.getElementById("account-last-password-el");
const countryElement = document.getElementById("account-country-el");
const postcodeElement = document.getElementById("account-postcode-el");
const cityElement = document.getElementById("account-city-el");
const streetElement = document.getElementById("account-street-el");
const houseNumberElement = document.getElementById("account-housenumber-el");
const flatNumberElement = document.getElementById("account-flatnumber-el");

function handleFormButtonClick(event) {
    event.preventDefault();
    const formName = event.target.getAttribute('data-form');
    editForms.forEach(form => {
      const formDisplayName = form.getAttribute('data-form-name');
      if (formDisplayName === formName) {
        form.parentElement.classList.remove("display-none");
      } else  {
        form.parentElement.classList.add('display-none');
        }
    });
}
const closeEdit = (e) => {
    e.preventDefault();
    accountEdit.forEach(display => {
      display.classList.add('display-none');
    })
    editForms.forEach(form => {
      form.reset();
    })
}
const saveEdit = (e) => {
  e.preventDefault();
  i=0;
  const inputs = [namee,phone,birthDate,email,lastPassword,country,postcode,city,street,houseNumber,flatNumber];
  const inputsElement = [nameElement,phoneElement,birthDateElement,emailElement,lastPasswordElement,countryElement,postcodeElement,cityElement,streetElement,houseNumberElement,flatNumberElement];
  inputs.forEach(input => {
    if (input!="") {
      input.innerText=inputsElement[i];
      i++;
    }
  })

  closeEdit(e);
}

editBtns.forEach(button => {
    button.addEventListener('click', handleFormButtonClick);
  });
accountEditCloseBtns.forEach(button => {
    button.addEventListener('click', closeEdit);
  });
saveBtns.forEach(button => {
    button.addEventListener('click', saveEdit);
  });