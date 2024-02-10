document.getElementById("sentButton").addEventListener("click", function () {
  var name = document.getElementById("name").value;
  var company = document.getElementById("company").value;
  var email = document.getElementById("email").value;
  var number = document.getElementById("nummber").value;
  var selectedType = document.getElementById("selectetItem").innerText;
  var isValidForm = true;

  if (name === "" || name.trim() === "") {
    showErrorMessage("name", "Ве молиме внесете го вашето име и презиме.");
    isValidForm = false;
  } else {
    hideErrorMessage("name");
    document.getElementById("name").classList.remove("is-invalid");
    document.getElementById("name").classList.add("is-valid");
  }

  if (company === "" || company.trim() === "") {
    showErrorMessage("company", "Ве молиме внесете име на вашата компанија.");
    isValidForm = false;
  } else {
    hideErrorMessage("company");
  }

  if (email === "" || email.trim() === "") {
    showErrorMessage(
      "email",
      "Ве молиме внесете контакт имејл на вашата компанија."
    );
    isValidForm = false;
  } else if (!isValidEmail(email)) {
    showErrorMessage("email", "Ве молиме внесете валидна адреса на е-пошта.");
    isValidForm = false;
  } else {
    hideErrorMessage("email");
    document.getElementById("email").classList.remove("is-invalid");
    document.getElementById("email").classList.add("is-valid");
  }
  

  if (number === "" || number.trim() === "") {
    showErrorMessage(
      "nummber",
      "Ве молиме внесете контакт телефон на вашата компанија."
    );
    isValidForm = false;
  } else if (!isValidPhoneNumber(number)) {
    showErrorMessage("nummber", "Ве молиме внесете валиден телефонски број.");
    isValidForm = false;
  } else {
    hideErrorMessage("nummber");
  }

  if (selectedType === "Изберете тип на студент") {
    showErrorMessage("dropdownButton", "Ве молиме изберете тип на студент.");
    isValidForm = false;
  } else {
    hideErrorMessage("dropdownButton");
  }

 
  if (isValidForm) {
    showSuccessMessage("Податоците се успешно испратени!");
  } else {
    hideSuccessMessage();
  }
});

function showErrorMessage(inputId, message) {
  var errorElement = document.createElement("p");
  errorElement.className = "text-danger";
  errorElement.innerText = message;

  var inputElement = document.getElementById(inputId);
  var parentElement = inputElement.parentElement;
  parentElement.appendChild(errorElement);

  inputElement.classList.remove("is-valid");
  inputElement.classList.add("is-invalid");
}

function hideErrorMessage(inputId) {
  var inputElement = document.getElementById(inputId);
  var parentElement = inputElement.parentElement;
  var errorElement = parentElement.querySelector(".text-danger");
  if (errorElement) {
    parentElement.removeChild(errorElement);
    inputElement.classList.remove("is-invalid");
    inputElement.classList.add("is-valid");
  }
}

function showSuccessMessage(message) {
  var successElement = document.getElementById("success-message");
  successElement.innerText = message;
  successElement.style.display = "block";
}

function hideSuccessMessage() {
  var successElement = document.getElementById("success-message");
  successElement.innerText = "";
  successElement.style.display = "none";
}

function isValidEmail(email) {
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(number) {
  var phoneRegex = /^\d{10}$/;
  return phoneRegex.test(number);
}

const item1 = document.getElementById("item1");
const item2 = document.getElementById("item2");
const item3 = document.getElementById("item3");
const item4 = document.getElementById("item4");
const select = document.getElementById("selectetItem");

item1.addEventListener("click", function () {
  select.innerText = item1.innerText;
});

item2.addEventListener("click", function () {
  select.innerText = item2.innerText;
});

item3.addEventListener("click", function () {
  select.innerText = item3.innerText;
});

item4.addEventListener("click", function () {
  select.innerText = item4.innerText;
});
