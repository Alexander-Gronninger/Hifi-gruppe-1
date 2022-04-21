import navigation from "./components/navigation.js";
import counter from "./components/counter.js";

function subpage() {
  const element = document.createElement("div");

  element.innerHTML = `
    <h2>SUBPAGE MOTHAFUCKA</h2>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum porro qui, velit ab saepe impedit in repellendus ratione animi itaque eos tempora officia molestias sint enim ipsum suscipit rerum illum?</p>   
    `;

  return element;
}
document.body.appendChild(navigation());
document.body.appendChild(subpage());
document.body.appendChild(counter());
