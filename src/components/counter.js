function counter() {
  let count = 0;

  function setCount(value) {
    count = value;
    document.querySelector(".counter__value").textContent = count;
  }

  function handleMinus() {
    setCount(count - 1);
  }
  function handlePlus() {
    setCount(count + 1);
  }

  const element = document.createElement("div");
  element.classList.add("counter");

  element.innerHTML = `
    <button class="counter__minus">-</button>
    <span class="counter__value">0</span>
    <button class="counter__plus">+</button>
    `;

  element
    .querySelector(".counter__minus")
    .addEventListener("click", handleMinus);
  element.querySelector(".counter__plus").addEventListener("click", handlePlus);

  return element;
}

export default counter;
