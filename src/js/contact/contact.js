var form = document.getElementsByClassName("contact__form")[0]
var success = true

form.addEventListener("submit", handleSubmit)

function handleSubmit(event) {
    event.preventDefault()
    success = true

    var formElements = Array.from(event.submitter.form.elements)

    formElements.forEach(validateInput)

    if (success) {
        form.reset()
        form.querySelector(".success__message").style.display = "inline"
        form.querySelector(".success__message").style.marginRight = "100px";
    }
}

function validateInput(element) {
    if(element.toString().includes("HTMLButtonElement")) {
        return
    }

    if (element.type === "text") {
        hideError(element)
        if (element.value.length < 1) {
            showError(element)
        }
    }

    if (element.type === "email") {
        hideError(element)
        if (element.value.length < 1
            || !element.value.includes(".")
            || !element.value.includes("@")) {
                showError(element)
        }
    }
}

function showError(element) {
    success = false
    form.querySelector(`#${element.id} + .error__message`)
                .style.display = "inline"
}

function hideError(element) {
    form.querySelector(`#${element.id} + .error__message`)
                .style.display = "none"
}