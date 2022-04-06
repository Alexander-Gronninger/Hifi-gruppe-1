//const API_URL = `http://23.88.41.248:3000`; //Benjamins server
const API_URL = `http://localhost:3000`; //lokal json server

const customerNameElement = document.querySelector(".customerInfo__name");
const customerAddressElement = document.querySelector(".customerInfo__address");
const customerCountryElement = document.querySelector(".customerInfo__country");
const customerPhoneElement = document.querySelector(".customerInfo__phone");
const customerEmailElement = document.querySelector(".customerInfo__email");
const orderNumberElement = document.querySelector(".orderInfo__numberData");
const orderDateElement = document.querySelector(".orderInfo__dateData");
const orderCurrencyElement = document.querySelector(".orderInfo__currencyData");
const subPriceElement = document.querySelector(".total__subtotalPrice");
const vatPriceElement = document.querySelector(".total__vatPrice");
const deliveryPriceElement = document.querySelector(".total__deliveryPrice");
const totalPriceElement = document.querySelector(".total__totalPrice");

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
  customerNameElement.innerHTML = customerResponse[0].username;
  customerAddressElement.innerHTML =
    customerResponse[0].address.apartment +
    " " +
    customerResponse[0].address.number +
    " " +
    customerResponse[0].address.street +
    " " +
    customerResponse[0].address.city +
    " " +
    customerResponse[0].address.zip_code;
  customerCountryElement.innerHTML = customerResponse[0].address.country;
  customerPhoneElement.innerHTML = customerResponse[0].phone;
  customerEmailElement.innerHTML = customerResponse[0].email;
  orderNumberElement.innerHTML = orderResponse[0].order_number;
  orderDateElement.innerHTML = orderResponse[0].orderDate;
  orderCurrencyElement.innerHTML = orderResponse[0].currency;

  const invoiceSummeryElement = document.querySelector(".invoice__summery tbody");

  invoiceSummeryElement.innerHTML += `
<tr class="summery__titles">
  <th class="titles__desc">ITEM DESCRIPTION</th>
  <th>PRICE</th>
  <th>QUANTITY</th>
  <th>TOTAL</th>
</tr>`;

  let subPrice = 0;
  for (let i = 0; i < orderResponse[0].products.length; i++) {
    productPrice =
      orderResponse[0].products[i].productPrice *
      orderResponse[0].products[i].productAmount;
    subPrice = productPrice + subPrice;

    invoiceSummeryElement.innerHTML += `
    <tr class="summery__item">
      <td class="item__productName">${orderResponse[0].products[i].productName} - ${
      orderResponse[0].products[i].color
    }</td>
      <td class="item__productPrice">&pound; ${
        orderResponse[0].products[i].productPrice
      }</td>
      <td class="item__productAmount">${orderResponse[0].products[i].productAmount}</td>
      <td class="item__productTotal">&pound; ${
        orderResponse[0].products[i].productAmount *
        orderResponse[0].products[i].productPrice
      }</td>
    </tr>`;
  }
  let vatPrice = subPrice * 0.2;
  let totalPrice = subPrice + vatPrice + orderResponse[0].deliveryPrice;
  subPriceElement.innerHTML = "&pound; " + subPrice;
  vatPriceElement.innerHTML = "&pound; " + vatPrice;
  deliveryPriceElement.innerHTML =
    "&pound; &nbsp;" + orderResponse[0].deliveryPrice;
  totalPriceElement.innerHTML = "&pound; " + totalPrice;
}