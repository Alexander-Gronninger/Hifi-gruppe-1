// assign counter__amount to the element that displays amount
// assign counter__minus to the element that subtracts
// assign counter__plus to the element that adds
// works dynamically, so long as you have an equal amount of all elements, regardless of the HTML order

const counter = Array.from(document.querySelectorAll(".counter__amount"));
const minusBtn = Array.from(document.querySelectorAll(".counter__minus"));
const plusBtn = Array.from(document.querySelectorAll(".counter__plus"));

minusBtn.forEach(function (Btn) {
  Btn.addEventListener("click", counterFunction);
});
plusBtn.forEach(function (Btn) {
  Btn.addEventListener("click", counterFunction);
});

// adds or subtracts to the counter, based on which number element it is
async function counterFunction() {
  if (this.classList.contains("counter__minus")) {
    if (counter[minusBtn.indexOf(this)].innerHTML > "1") {
      let value = Number(counter[minusBtn.indexOf(this)].innerHTML) - 1;
      counter[minusBtn.indexOf(this)].innerHTML = value;
    }
  } else {
    let value = Number(counter[plusBtn.indexOf(this)].innerHTML) + 1;

    counter[plusBtn.indexOf(this)].innerHTML = value;
  }
}
