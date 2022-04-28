var form = document.getElementsByClassName("contact__form")[0];
const stars = document.querySelectorAll(".required");
var success = true;

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  success = true;

  var formElements = Array.from(event.submitter.form.elements);

  formElements.forEach(validateInput);

  if (success) {
    form.reset();
    form.querySelector(".submit__successMessage").style.display = "inline";
    form.querySelector(".submit__successMessage").style.marginRight = "100px";
  }
}

function validateInput(element) {
  var textarea = document.getElementById("message");

  if (element.toString().includes("HTMLButtonElement")) {
    return;
  }

  if (element.type === "text") {
    element.closest("div").querySelector("span").style.display = "none";
    hideError(element);
    if (element.value.length < 1) {
      element.closest("div").querySelector("span").style.display =
        "inline-block";
      showError(element);
    }
  }

  if (element.type === "email") {
    element.closest("div").querySelector("span").style.display = "none";
    hideError(element);
    if (
      element.value.length < 1 ||
      !element.value.includes(".") ||
      !element.value.includes("@")
    ) {
      showError(element);
      element.closest("div").querySelector("span").style.display =
        "inline-block";
    }
  }

  if (element.name === "message") {
    element.closest("div").querySelector("span").style.display = "none";
    hideError(element);
    if (element.value.length < 1) {
      showError(element);
      element.closest("div").querySelector("span").style.display =
        "inline-block";
    }
  }
}

function showError(element) {
  success = false;
  form.querySelector(`#${element.id} + .input__errorMessage`).style.display =
    "inline";
}

function hideError(element) {
  form.querySelector(`#${element.id} + .input__errorMessage`).style.display =
    "none";
}
