const inputFields = document.querySelectorAll(".form__input");

let regexname = /^[a-z ,.'-]+$/i;
let regexmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let regexzip = /^([0-9]{4}|[0-9]{6})$/;
let regexnumber = /^\d{3,15}$/;

for (let i = 0; i < inputFields.length; i++) {
  inputFields[i].addEventListener("blur", validate);
}

function validate(e) {
  if (this.id == "form__name") {
    if (!regexname.test(this.value)) {
      e.preventDefault();
      this.style.border = "2px solid red";
      //alert("Please enter your name");
    } else {
      this.style.border = "none";
    }
  }
  if (this.id == "form__city") {
    if (this.value == null || this.value == "") {
      e.preventDefault();
      this.style.border = "2px solid red";
      //alert("Please enter your city");
    } else {
      this.style.border = "none";
    }
  }
  if (this.id == "form__postalcode") {
    if (!regexzip.test(this.value)) {
      e.preventDefault();
      this.style.border = "2px solid red";
      //alert("Please enter your ZIP");
    } else {
      this.style.border = "none";
    }
  }
  if (this.id == "form__address") {
    if (this.value == null || this.value == "") {
      e.preventDefault();
      this.style.border = "2px solid red";
      //alert("Please enter your name");
    } else {
      this.style.border = "none";
    }
  }
  if (this.id == "form__useremail") {
    if (!regexmail.test(this.value)) {
      e.preventDefault();
      this.style.border = "2px solid red";
      //alert("Please enter your email");
    } else {
      this.style.border = "none";
    }
  }
  if (this.id == "form__phonenr") {
    if (!regexnumber.test(this.value)) {
      e.preventDefault();
      this.style.border = "2px solid red";
      //alert("Please enter your phone number");
    } else {
      this.style.border = "none";
    }
  }
}
