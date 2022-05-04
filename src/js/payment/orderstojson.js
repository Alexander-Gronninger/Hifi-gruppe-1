//const API_URL = `https://hifi-jsonserver.herokuapp.com`; //Benjamins server
const API_URL = `http://localhost:3000`; //lokal json server

let formElement = document.querySelector(".paymentform__form");

formElement.addEventListener("submit", gatherinfo);

async function gatherinfo(event) {
  event.preventDefault();

  // we get the cookie(getCookie seems to not work), splitting it to an array on =, and selects user number
  let userIDCookie = document.cookie.split("=");
  let userID = userIDCookie[1];

  let ordersFetch = await (await fetch(API_URL + `/orders/`)).json();
  let orderID = Number(ordersFetch.length) + 1;

  let current = new Date();
  let cDate =
    current.getFullYear() +
    "-" +
    (current.getMonth() + 1) +
    "-" +
    current.getDate();

  let orderdata = {
    id: orderID,
    orderDate: cDate,
    currency: "GDP",
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

  // WIP inserting billingAddress to customers address info
  /*   if (userID) {
    let fetchtest = fetch(
      "https://hifi-jsonserver.herokuapp.com/customers?id_like=" + userID
    );
    let customerdata = {
      billingAddress: {
        zipcode: event.target.form__postalcode.value,
        city: event.target.form__city.value,
        address: event.target.form__address.value,
      },
    };
    fetch("https://hifi-jsonserver.herokuapp.com/customers?id_like=" + userID, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(customerdata),
    });
  } */

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(orderdata),
  });

  //window.location.href = "/../invoice?id=" + orderID;
}
