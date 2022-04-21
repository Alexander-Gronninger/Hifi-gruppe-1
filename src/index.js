import "./styles.scss";
import hifi_logo from "./images/logo.png";

function component() {
  let element = document.createElement("div");
  element.innerHTML = `<p>
    Hello Webpack!</p>
    <img src="${hifi_logo}" alt="logo">
    `;
  element.classList.add("styles.css");

  return element;
}

document.body.appendChild(component());
