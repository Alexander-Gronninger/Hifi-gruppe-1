//styles
import "../styles/modules/contact/contact.scss";

//js
import header from "./partials/header.js";
import livechat from "./partials/livechat.js";
import footer from "./partials/footer.js";

function contact() {
  let element = document.createElement("div");
  element.className = "wrapper";

  // HTML
  element.appendChild(header());
  element.innerHTML += `
    <h1 id="page__title">Get in touch with us</h1>
    <main class="g-whiteBackground">
      <form class="contact__form">
        <div class="contact__input">
          <label class="input__label" for="name"
            >Full name <span style="color: red">*</span>
          </label>
          <input
            class="input__inputField g-inputField"
            type="text"
            id="name"
            name="name"
          />
          <span class="input__errorMessage">Insert Name!</span>
        </div>
        <div class="contact__input">
          <label class="input__label" for="email"
            >Email <span style="color: red">*</span>
          </label>
          <input
            class="input__inputField g-inputField"
            type="email"
            name="email"
            id="email"
          />
          <span class="input__errorMessage">Incorrect Email!</span>
        </div>

        <div class="contact__input">
          <label class="input__label" for="subject"
            >Subject <span style="color: red">*</span>
          </label>
          <input
            class="input__inputField g-inputField"
            type="text"
            name="subject"
            id="subject"
          />
          <span class="input__errorMessage">Declare Subject!</span>
        </div>
        <div class="contact__input">
          <label class="input__label" for="message"
            >Message <span style="color: red">*</span>
          </label>
          <textarea
            class="g-inputField"
            name="message"
            type="text"
            id="message"
            cols="30"
            rows="10"
            style="resize: none"
          ></textarea>
          <span class="input__errorMessage">Insert Message!</span>
        </div>
        <div class="contact__submit">
          <span class="submit__successMessage"
            >Your message has been sent</span
          >
          <button type="submit" class="contact__submitButton g-button">
            Submit
          </button>
        </div>
      </form>
    </main>
    <p class="contact__text">
      Visit our sister companies
      <a href="#" class="contact__link">Home Sound</a> and
      <a href="#" class="contact__link">The Movie Rooms</a> part of the Hi-Fi
      Corner Group.
    </p>`;
  element.appendChild(livechat());
  element.appendChild(footer());

  //JS
  var form = element.querySelector(".contact__form")[0];
  const stars = element.querySelectorAll(".required");
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
    var textarea = element.querySelector(".message");

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

  return element;
}

document.body.appendChild(contact());
