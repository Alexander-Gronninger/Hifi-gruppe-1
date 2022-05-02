let formElement = document.querySelector(".paymentform__form");

formElement.addEventListener("submit", gatherinfo);
console.log(document.cookie);

let userID = getCookie("userToken");
console.log(userID.matches(/(d+)/));

function gatherinfo(event) {
  event.preventDefault();
  console.log(event.target);

  let orderdata = {
    costumerName: event.target.form__name.value,
    costumerCity: event.target.form__city.value,
    costumerZip: event.target.form__postalcode.value,
    costumerAddress: event.target.form__address.value,
    costumerEmail: event.target.form__useremail.value,
    costumerPhone: event.target.form__phonenr.value,
    customerID: userID,
    products: [JSON.parse(localStorage.getItem("cart"))],
  };
  console.log(orderdata);
  fetch("https://hifi-jsonserver.herokuapp.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(orderdata),
  }).then((response) => console.log(response));
}
