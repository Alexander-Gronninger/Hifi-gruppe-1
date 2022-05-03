let formElement = document.querySelector(".paymentform__form");

formElement.addEventListener("submit", gatherinfo);

function gatherinfo(event) {
  event.preventDefault();

  // we get the cookie(getCookie seems to not work), splitting it to an array on =, and selects user number
  let userIDCookie = document.cookie.split("=");
  let userID = userIDCookie[1];

  let orderdata = {
    costumerName: event.target.form__name.value,
    costumerCity: event.target.form__city.value,
    costumerZip: event.target.form__postalcode.value,
    billingAddress: {
      zipcode: event.target.form__postalcode.value,
      city: event.target.form__city.value,
      address: event.target.form__address.value,
    },
    costumerEmail: event.target.form__useremail.value,
    costumerPhone: event.target.form__phonenr.value,
    customerID: userID,
    products: [JSON.parse(localStorage.getItem("cart"))],
  };

  if (userID) {
    let fetchtest = fetch("http://localhost:3000/customers?id_like=" + userID);
    let customerdata = {
      billingAddress: {
        zipcode: event.target.form__postalcode.value,
        city: event.target.form__city.value,
        address: event.target.form__address.value,
      },
    };
    fetch("http://localhost:3000/customers?id_like=" + userID, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(customerdata),
    });
    console.log(fetchtest);
  }

  fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(orderdata),
  });
}
