import validator from 'validator';

let errMsg;

const validateSignUp = (email, password,phone, alert) => {

  // targeting all form fields
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const phoneInput = document.querySelector("#phone");

  if (!validator.isEmail(email)) {
    alert.error("Please enter your valid email");
    emailInput.focus();
    errMsg = false;
  } 
  else if (password === "") {
    alert.error("Please provide your password!");
    passwordInput.focus();
    errMsg = false;
  } else if (password.length < 6) {
    alert.error("Your password must be greater than 5 character");
    passwordInput.focus();
    errMsg = false;
  }else if (phone.length !==10) {
    alert.error("Phone must have 10 digits");
    phoneInput.focus();
    errMsg = false;
  }
  else 
    errMsg = true;
  return errMsg;
};

export default validateSignUp;