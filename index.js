const form = document.getElementById("form");
const signupDisplay = document.getElementById("signupDisplay");
const successDisplay = document.getElementById("successDisplay");
const email = document.getElementById("email");
const error = document.getElementById("error");
const submittedEmail = document.getElementById("submittedEmail");
const dismissBtn = document.getElementById("dismissBtn");

// Regular expression for email validation as per HTML specification
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Check if the email is valid
const isValidEmail = () => {
  const validity = email.value.length !== 0 && emailRegExp.test(email.value);
  return validity;
};

// Update email input class based on validity
const setEmailClass = (isValid) => {
  email.className = isValid ? "valid" : "error_state";
};

// Update error message and visibility
const updateError = (isValidInput) => {
  if (isValidInput) {
    error.textContent = "";
    error.classList.add("d-none");
  } else {
    error.textContent = "Valid email required";
    error.classList.remove("d-none");
  }
};

// Initialize email validity on page load
const initializeValidation = () => {
  const emailInput = isValidEmail();
  setEmailClass(emailInput);
};

// Handle input event to update email validity
const handleInput = () => {
  const emailInput = isValidEmail();
  setEmailClass(emailInput);
  updateError(emailInput);
};

function handleSubmit(e) {
  e.preventDefault(); // prevent the default browser behaviour

  const emailInput = isValidEmail();
  setEmailClass(emailInput);
  updateError(emailInput);

  if (emailInput) {
    const formData = new FormData(e.target);
    const { email } = Object.fromEntries(formData);
    submittedEmail.textContent = email;
    signupDisplay.classList.add("d-none");
    successDisplay.classList.remove("d-none");

    form.reset();
  }
}

function toggleDisplay() {
  signupDisplay.classList.toggle("d-none");
  successDisplay.classList.toggle("d-none");
}

// Event listeners
// window.addEventListener("load", initializeValidation);
// This defines what happens when the user types in the field
email.addEventListener("input", handleInput);
// This defines what happens when the user tries to submit the data
form.addEventListener("submit", handleSubmit);
// This defines what happens when the dismis button on the success page is clicked.
dismissBtn.addEventListener("click", toggleDisplay);
