//styles
import "../styles/modules/invoice/invoice.scss";

//js
import header from "./partials/header.js";
import livechat from "./partials/livechat.js";
import footer from "./partials/footer.js";
import breadcrumb from "./partials/breadcrumb.js";

function invoice() {
  let element = document.createElement("main");

  // HTML
  element.appendChild(header());
  element.appendChild(breadcrumb());
  element.innerHTML += `<h1 class="invoice__title">Thank you for your order!</h1>
  <article class="invoice">
    <div class="invoice__companySalesInfo">
      <p class="companySalesInfo__name">John Rick</p>
      <address class="companySalesInfo__address">
        34 Bucinghan sSt York YO1 6DW
      </address>
      <address class="companySalesInfo__address">United Kingdom</address>
      <address class="companySalesInfo__address">
        P: + 18 00 123 1234
      </address>
      <address class="companySalesInfo__address">
        M: info@yourdomain.com
      </address>
    </div>
    <div class="invoice__customerInfo">
      <p class="customerInfo__title">DEILVERY ADDRESS</p>
      <p class="customerInfo__name">ERROR</p>
      <address class="customerInfo__address">ERROR</address>
      <address class="customerInfo__country">ERROR</address>
      <address class="customerInfo__phone">ERROR</address>
      <address class="customerInfo__email">ERROR</address>
    </div>
    <div class="invoice__companyInfo">
      <img
        class="companyInfo__image"
        src="/images/logo.png"
        alt="HiFi logo"
      />
      <address class="companyInfo__address">44 Cow Wynd, Falkirk</address>
      <address class="companyInfo__address">
        Central Region, FK1 1PU
      </address>
      <div class="invoice__phone">
        <address class="phone__number">0131 556 7901</address>
        <i class="fa-solid fa-phone phone__icon"></i>
      </div>
      <div class="invoice__email">
        <address class="email__email">sales@hificorner.co.uk</address>
        <i class="fa-solid fa-envelope email__icon"></i>
      </div>
    </div>
    <table class="invoice__orderInfo">
      <tr>
        <th class="orderInfo__title">Invoice</th>
        <th class="orderInfo__title"></th>
      </tr>
      <tr>
        <td class="orderInfo__number">Order number</td>
        <td class="orderInfo__numberData">ERROR</td>
      </tr>
      <tr>
        <td class="orderInfo__date">Date</td>
        <td class="orderInfo__dateData">ERROR</td>
      </tr>
      <tr>
        <td class="orderInfo__currency">Currency</td>
        <td class="orderInfo__currencyData">ERROR</td>
      </tr>
    </table>
    <table class="invoice__summery">
      <tbody></tbody>
    </table>
    <table class="invoice__total">
      <tr>
        <td class="total__name">SUBTOTAL:</td>
        <td class="total__subtotalPrice">ERROR</td>
      </tr>
      <tr>
        <td class="total__name">VAT:</td>
        <td class="total__vatPrice">ERROR</td>
      </tr>
      <tr>
        <td class="total__name">DELIVERY:</td>
        <td class="total__deliveryPrice">ERROR</td>
      </tr>
      <tr>
        <td class="total__whitespace"></td>
        <td class="total__whitespace"></td>
      </tr>
      <tr class="total__total">
        <td class="total__name">TOTAL:</td>
        <td class="total__totalPrice">ERROR</td>
      </tr>
    </table>
    <div class="invoice__contactInfo">
      <p class="contactInfo__text">Address: &nbsp;</p>
      <address class="contactInfo__address">
        44 Cow Wynd, Falkirk, Central Region, FK1 1PU
      </address>
      <p class="contactInfo__text">&nbsp; | Phone: &nbsp;</p>
      <address class="contactInfo__address">0131 556 7901</address>
      <p class="contactInfo__text">&nbsp; | Mail: &nbsp;</p>
      <address class="contactInfo__address">sales@hificorner.co.uk</address>
    </div>
  </article>`;
  element.appendChild(livechat());
  element.appendChild(footer());

  // JAVASCRIPTconst API_URL = `https://hifi-jsonserver.herokuapp.com`; //Benjamins server
  //const API_URL = `http://localhost:3000`; //lokal json server

  // getting all the elements
  const customerNameElement = element.querySelector(".customerInfo__name");
  const customerAddressElement = element.querySelector(
    ".customerInfo__address"
  );
  const customerCountryElement = element.querySelector(
    ".customerInfo__country"
  );
  const customerPhoneElement = element.querySelector(".customerInfo__phone");
  const customerEmailElement = element.querySelector(".customerInfo__email");
  const orderNumberElement = element.querySelector(".orderInfo__numberData");
  const orderDateElement = element.querySelector(".orderInfo__dateData");
  const orderCurrencyElement = element.querySelector(
    ".orderInfo__currencyData"
  );
  const subPriceElement = element.querySelector(".total__subtotalPrice");
  const vatPriceElement = element.querySelector(".total__vatPrice");
  const deliveryPriceElement = element.querySelector(".total__deliveryPrice");
  const totalPriceElement = element.querySelector(".total__totalPrice");

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
      await fetch(
        API_URL + `/customers/?id_like=${orderResponse[0].customerId}`
      )
    ).json();

    // inserting information into HTML
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

  return element;
}

document.body.appendChild(invoice());
