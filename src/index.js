import navigation from "./components/navigation.js";
import component from "./components/component.js";

function index() {
  let element = document.createElement("div");
  element.classList.add("wrapper");
  element.appendChild(navigation());
  element.appendChild(component());
  element.classList.add("styles.css");

  return element;
}
document.body.appendChild(index());
