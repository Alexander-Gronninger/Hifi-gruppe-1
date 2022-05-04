//const API_URL = `https://hifi-jsonserver.herokuapp.com`; //Benjamins server
const API_URL = `http://localhost:3000`; //lokal json server

// getting all the elements
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

// fetching order numer from URL
let searchParams = new URLSearchParams(window.location.search);
let orderID = searchParams.get("id");

// getting the order information
getOrder();
async function getOrder() {
  // fetching order info
  let orderResponse = await (
    await fetch(API_URL + `/orders/?id_like=${orderID}`)
  ).json();
  // fetching customer info
  let customerResponse = await (
    await fetch(API_URL + `/customers/?id_like=${orderResponse[0].customerId}`)
  ).json();

  // inserting information into HTML
  customerNameElement.innerHTML = customerResponse[0].username;
  customerAddressElement.innerHTML =
    customerResponse[0].billingaddress.address +
    " " +
    customerResponse[0].billingaddress.city +
    " " +
    customerResponse[0].billingaddress.zip_code;
  customerCountryElement.innerHTML = "ERROR";
  customerPhoneElement.innerHTML = customerResponse[0].phone;
  customerEmailElement.innerHTML = customerResponse[0].email;
  orderNumberElement.innerHTML = orderResponse[0].order_number;
  orderDateElement.innerHTML = orderResponse[0].orderDate;
  orderCurrencyElement.innerHTML = orderResponse[0].currency;

  // table content needs to be inside tbody element
  const invoiceSummeryElement = document.querySelector(
    ".invoice__summery tbody"
  );

  // putting in table heading
  invoiceSummeryElement.innerHTML += `
<tr class="summery__titles">
  <th class="titles__desc">ITEM DESCRIPTION</th>
  <th>PRICE</th>
  <th>QUANTITY</th>
  <th>TOTAL</th>
</tr>`;

  // inserting information
  let subPrice = 0;
  for (let i = 0; i < orderResponse[0].products.length; i++) {
    productPrice =
      orderResponse[0].products[i].productPrice *
      orderResponse[0].products[i].productAmount;
    subPrice = productPrice + subPrice;

    invoiceSummeryElement.innerHTML += `
    <tr class="summery__item">
      <td class="item__productName">${
        orderResponse[0].products[i].productName
      } - ${orderResponse[0].products[i].color}</td>
      <td class="item__productPrice">&pound; ${
        orderResponse[0].products[i].productPrice
      }</td>
      <td class="item__productAmount">${
        orderResponse[0].products[i].productAmount
      }</td>
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
