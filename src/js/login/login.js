// Array deconstructing for quick-access in form validate
// Input fields & submit
const [email, psw, btn] = document.querySelector(".login__form");

// Checks if userToken exists
const allCookies = document.cookie.split("; ");
const cookieData = [];
allCookies.forEach((cookie) => {
  cookieData.push({
    name: cookie.split("=")[0],
    value: cookie.split("=")[1],
  });
});
const userToken = cookieData.find((cookie) => cookie.name == "userToken");

// If it exists
if (userToken) {
  // Check DB for that user
  fetch(`https://hifi-jsonserver.herokuapp.com/customers/${userToken.value}`)
    .then((res) => {
      // If user still exists return user
      if (res.status === 200 || res.status === 201) {
        return res.json();
      } else {
        // Else clear cookies and return eror
        alert("problems with getting your saved userinfo");
        // Removes all cookies (stackOverflow)
        document.cookie.split(";").forEach(function (c) {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });
        return false;
      }
    })
    .then((data) => {
      // If returned data is userinfo, go to profile else register
      data
        ? (window.location.href = "/profile")
        : (window.location.href = "/register");
    });
}

// Form validation
const emailRegxp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

btn.onclick = (event) => {
  event.preventDefault();

  delErrors();

  // Email
  if (!email.value.length > 0) {
    error(email, "Please provide an email address...");
    return;
  } else if (!emailRegxp.test(email.value)) {
    error(email, "Please provide a proper email address...");
    return;
  } else {
    email.previousElementSibling.children[0].style.display = "none";
    password.focus();
  }

  // Password
  if (password.value.length === 0) {
    error(password, "Please provide a password...");
    return;
  } else {
    password.previousElementSibling.children[0].style.display = "none";
  }

  // Fetches data from email address
  fetch(`https://hifi-jsonserver.herokuapp.com/customers?email=${email.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 1) {
        console.log(data);
        if (data[0].password === password.value) {
          setCookie("userToken", data[0].id, 365);
          window.location.href = "/profile";
        } else {
          error(password, "Wrong password for that email address...");
          return;
        }
      } else {
        error(
          email,
          "The provided email address isn't found in our systems..."
        );
        return;
      }
    });
};

// Toggles all error messages off
function delErrors() {
  document
    .querySelectorAll(".login__error")
    .forEach((error) => (error.style.display = "none"));
}

// Toggles single error message on & changing text
function error(element, txt) {
  const errorElement = element.nextElementSibling;
  errorElement.style.display = "block";
  errorElement.textContent = txt;
}

// Sets the userToken cookie
function setCookie(cookieName, data, expireDays) {
  const d = new Date();
  d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
  document.cookie = `${cookieName}=${data};expires=${d};path=/`;
}
