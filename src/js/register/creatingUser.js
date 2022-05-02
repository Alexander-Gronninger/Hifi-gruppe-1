const API_URL = "https://hifi-jsonserver.herokuapp.com/customers";
//const API_URL = "http://23.88.41.248:3000/customers"; //only for testing

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
    if (form.name.value.length <= 0) {
        showError(form.name, "You need to input your first name.")
        return
    } else {
        delStar(form.name)
    }

    // Validate surname
    if (form.surname.value.length <= 0) {
        showError(form.surname, "You need to input your surname.")
        return
    } else {
        delStar(form.surname)
    }

    // Validate phone
    if (form.phone.value.length == 0) {
        showError(form.phone, "Please input your phone number.")
        return
    } else {
        delStar(form.phone)
    }

    // Validate mail
    if (form.email.value.length <= 0) {
        showError(form.email, "You need to input your email.")
        return
    } else if (!form.email.value.match(regXpEmail)) {
        showError(form.email, "That's not an correct email...")
        return
    } else if (userExists(form.email.value, null)["email"] == true) { // This is true if email exists
        showError(form.email, "That email address is already in use.")
    } else {
        delStar(form.email)
    }

    // Validate password
    if (form.password.value.length == 0) {
        showError(form.password, "Write a password, please :)")
        return
    } else if (!form.password.value.length > 7) {
        showError(form.password, "Your password needs at least 8 characters.")
        return
    } else {
        delStar(form.password)
    }

    // Validate confirm password
    if (form.confirmPassword.value.length == 0) {
        showError(form.confirmPassword, "Confirm your password, please :)")
        return
    } else if (form.password.value != form.confirmPassword.value) {
        showError(form.confirmPassword, "Your passwords don't match...!")
        return
    } else {
        delStar(form.confirmPassword)
    }

    // Validate checkbox (agree)
    if (form.checkboxAgree.checked != true) {
        form.checkboxAgree.closest("label").style.color = "red";
        return
    }


    //createUser({...form}) // spread operator
    createUser({
        firstName: form.name.value,
        lastName: form.surname.value,
        phone: form.phone.value,
        email: form.email.value,
        password: form.password.value,
        newsletter: form.checkboxNewsletter.checked
    })
})

// Shows the correct error msg
function showError(element, txt) {
    element.focus()
    element.nextElementSibling.style.display = "block";
    element.nextElementSibling.textContent = txt;
}

function delStar(element) {
    element.previousElementSibling.children[0].style.display = "none";
}

// Hides all error messages
function delErrors() {
    const errorMsgElements = form.querySelectorAll(".registerForm__field p")
    errorMsgElements.forEach((msg) => msg.style.display = "none")
}



// -------------------------- POSTS DATA TO JSON-SERVER ----------------------------

// This creates a new customer with the given data
function createUser(data) {

    // The userdata object going to be pushed to database with given info from data parametre
    const userinfo = {
        name: `${data.firstName} ${data.lastName}`,
        password: data.password,
        address: {
            street: "",
            number: "",
            apartment: "",
            zip_code: "",
            city: "",
            country: ""
        },
        phone: data.phone,
        email: data.email,
        wantsNewsletter: data.newsletter

    }


    // Posts the userinfo object to database
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(userinfo),
    }).then((response) => {
        console.log(response)
        if (response.status == (201 || 200)) {
            return response.json()
        } else {
            const formTitle = document.querySelector("#formTitle")
            formTitle.textContent = "Our servers are down, try again later og chat with John in the meantime."
            formTitle.style.color = "red";
            formTitle.scrollIntoView({ block: "center" })
        }
    }).then(data => {
        setCookie("userToken", data.id, 365)
        window.location.href = "/profile"
    })

}

// This sets an cookie
function setCookie(cookieName, data, expireDays) {
    const d = new Date();
    d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    document.cookie = `${cookieName}=${data};expires=${d};path=/`;
}

// function deleteShit() {
//     // Posts the userinfo object to database
//     fetch("https://hifi-jsonserver.herokuapp.com/customers/1", {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json; charset=UTF-8",
//         }
//     })
// }
// deleteShit()