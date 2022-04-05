//const API_URL = `http://23.88.41.248:3000`; //Benjamins server
const API_URL = `http://localhost:3000`; //lokal json server

const customerName = document.querySelector(".customerInfo__name");
const customerAddress = document.querySelector(".customerInfo__address");
const customerCountry = document.querySelector(".customerInfo__country");
const customerPhone = document.querySelector(".customerInfo__phone");
const customerEmail = document.querySelector(".customerInfo__email");
const orderNumber = document.querySelector(".orderInfo__numberData");
const orderDate = document.querySelector(".orderInfo__dateData");
const orderCurrency = document.querySelector(".orderInfo__currencyData");
const subPrice = document.querySelector(".total__subtotalPrice");
const vatPrice = document.querySelector(".total__vatPrice");
const deliveryPrice = document.querySelector(".total__deliveryPrice");
const totalPrice = document.querySelector(".total__totalPrice");

let searchParams = new URLSearchParams(window.location.search);
let orderID = searchParams.get("id");

getOrder();
async function getOrder() {
  let orderResponse = await (
    await fetch(API_URL + `/orders/?id_like=${orderID}`)
  ).json();
  let customerResponse = await (
    await fetch(API_URL + `/customers/?id_like=${orderResponse[0].customerId}`)
  ).json();
  console.log(orderResponse);
  console.log(customerResponse);
  customerName.innerHTML = customerResponse[0].username;
  customerAddress.innerHTML =
    customerResponse[0].address.apartment +
    " " +
    customerResponse[0].address.number +
    " " +
    customerResponse[0].address.street +
    " " +
    customerResponse[0].address.city +
    " " +
    customerResponse[0].address.zip_code;
  customerCountry.innerHTML = customerResponse[0].address.country;
  customerPhone.innerHTML = customerResponse[0].phone;
  customerEmail.innerHTML = customerResponse[0].email;
  orderNumber.innerHTML = orderResponse[0].order_number;
  orderDate.innerHTML = orderResponse[0].orderDate;
  orderCurrency.innerHTML = orderResponse[0].currency;
  subPrice.innerHTML = ""
  vatPrice.innerHTML = ""
  deliveryPrice.innerHTML = ""
  totalPrice.innerHTML = ""
}
