const inputFields = document.querySelectorAll(".form__input");
const labelStars = document.getElementsByClassName("form__star");

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
      labelStars[0].style.display = "inline-block";
    } else {
      this.style.border = "none";
      labelStars[0].style.display = "none";
    }
  }
  if (this.id == "form__city") {
    if (this.value == null || this.value == "") {
      e.preventDefault();
      this.style.border = "2px solid red";
      labelStars[1].style.display = "inline-block";
    } else {
      this.style.border = "none";
      labelStars[1].style.display = "none";
    }
  }
  if (this.id == "form__postalcode") {
    if (!regexzip.test(this.value)) {
      e.preventDefault();
      this.style.border = "2px solid red";
      labelStars[2].style.display = "inline-block";
    } else {
      this.style.border = "none";
      labelStars[2].style.display = "none";
    }
  }
  if (this.id == "form__address") {
    if (this.value == null || this.value == "") {
      e.preventDefault();
      this.style.border = "2px solid red";
      labelStars[3].style.display = "inline-block";
    } else {
      this.style.border = "none";
      labelStars[3].style.display = "none";
    }
  }
  if (this.id == "form__useremail") {
    if (!regexmail.test(this.value)) {
      e.preventDefault();
      this.style.border = "2px solid red";
      labelStars[4].style.display = "inline-block";
    } else {
      this.style.border = "none";
      labelStars[4].style.display = "none";
    }
  }
  if (this.id == "form__phonenr") {
    if (!regexnumber.test(this.value)) {
      e.preventDefault();
      this.style.border = "2px solid red";
      labelStars[5].style.display = "inline-block";
    } else {
      this.style.border = "none";
      labelStars[5].style.display = "none";
    }
  }
}