//const API_URL = "https://hifi-jsonserver.herokuapp.com/customers";
const API_URL = "http://23.88.41.248:3000/customers"; //only for testing

// Fetches the current customers, so we get quick access to data
let database;
fetch(API_URL)
    .then(res => res.json())
    .then(data => database = data)

// -------------------------- CHECK IF USER EXISTS ----------------------------

// Checks if an user exists and returns object with true/false value
// as the value of the correct key.
function userExists(email, phone) {
    return {
        email: (database.find(data => data.email == email) ? true : false),
        phone: (database.find(data => data.phone == phone) ? true : false)
    };
}

// -------------------------- VALIDATE FORM ----------------------------

// Declaring variables
const fields = document.querySelectorAll(".registerForm__field")
const form = document.querySelector(".registerForm")
const submitBtn = document.querySelector(".registerForm button")
const regXpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// On submit - validate form
submitBtn.addEventListener("click", (event) => {
    event.preventDefault()
    delErrors() // Deletes all errors

    // Validate name
    // if (form.name.value.length <= 0) {
    //     showError(form.name.nextElementSibling, "You need to input your first name.")
    //     return
    // }

    // Validate surname
    // if (form.surname.value.length <= 0) {
    //     showError(form.name.nextElementSibling, "You need to input your surname.")
    //     return
    // }

    // Validate mail
    if (form.email.value.length <= 0) {
        showError(form.email.nextElementSibling, "You need to input your email.")
        return
    } else if (!form.email.value.match(regXpEmail)) {
        showError(form.email.nextElementSibling, "That's not an correct email...")
        return
    } else {
        // If email exists
        if (userExists(form.email.value, null)["email"] == true) // This is true if email exists
            showError(form.email.nextElementSibling, "That email address is already in use.")
    }


})

// Shows the correct error msg
function showError(element, txt) {
    element.style.display = "block";
    element.textContent = txt;
}

// Hides all error messages
function delErrors() {
    const errorMsgElements = form.querySelectorAll(".registerForm__field p")
    errorMsgElements.forEach((msg) => msg.style.display = "none")
}



// -------------------------- POSTS DATA TO JSON-SERVER ----------------------------

// This creates a new customer with the given data
function createUser() {

    const userinfo = {
        username: "benjamin",
        password: "adgangskode",
        address: {
            street: "Pulsen",
            number: "8",
            apartment: "-",
            zip_code: "4000",
            city: "Roskilde",
            country: "Denmark"
        },
        phone: "88888888",
        email: "dinfarsmail@gmail.com"

    }
    console.log(userinfo);
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(userinfo),
    }).then(response => console.log(response));
}