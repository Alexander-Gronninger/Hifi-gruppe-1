var form = document.getElementsByClassName("contactForm")[0];
var success = true

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    success = true

    var formElements = Array.from(event.submitter.form.elements);

    formElements.forEach(validateInput);

    if (success) {
        form.reset();
        form.querySelector(".successMessage").style.display = "inline";
    }
}

function validateInput(element) {
    if (element.toString().includes("HTMLButtonElement")) {
        return
    }
    if (element.type === "text") {
        hideError(element);
        if (element.value.length < 1) {
            showError(element);
        }
    }
    if (element.type === "email") {
        hideError(element);
        if (element.value.length < 1
            || !element.value.includes(".")
            || !element.value.includes("@")) {
            showError(element);
        }
    }
}


function showError(element) {
    form.querySelector(`#${element.id} + .errorMessage`).style.display = "inline";
}

function hideError(element) {
    form.querySelector(`#${element.id} + .errorMessage`).style.display = "none";
}