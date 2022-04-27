//styles
import "../styles/modules/index/companyinfo.scss";
import "../styles/modules/index/frontpageProducts.scss";
import "../styles/modules/productList/product__img.scss";

import header from "./partials/header.js";
import livechat from "./partials/livechat.js";
import footer from "./partials/footer.js";

function index() {
  let element = document.createElement("div");

  // HTML
  element.appendChild(header());
  element.innerHTML += `
  <section class="hero">
    <video style="width: 100%" class="hero__video" autoplay muted loop src="/images/hero_video.mp4"
      type="video/mp4"></video>
  </section>
  <div class="wrapper">
    <section class="frontpageProducts">
      <div class="frontpageProducts__headingContainer">
        <h1 class="frontpageProducts__heading">
          popular products
        </h1>
        <button class="g-button frontpageProducts__btn">See all products</button>
      </div>
      <div class="frontpageProducts__productContainer"></div>
    </section>
    <section class="companyinfo">
      <article class="companyinfo__about">
        <h3 class="about__title">What we do</h3>
        <p class="about__text">
          We look forward to customising a system to meet your needs.
        </p>
        <p class="about__text">
          We don’t favour one manufacturer over another – the only thing we
          do favour is making sure our customers get the right product that
          suits their needs and listening preferences. We will ask many
          questions in order to ensure that what you buy from us is tailored
          to you and you alone.
        </p>
        <p class="about__text">
          If you are looking for a product not found in our demonstration
          showrooms or our online site, don’t fret as we have access to
          hundreds of brands.
        </p>
        <p class="about__text">
          One of our biggest pleasures of working in this industry is to see
          the smile on our customers’ faces when they finally hear and see
          the system of their dreams.
        </p>
      </article>
      <article class="companyinfo__openingHours">
        <h3 class="openingHours__title">Opening Hours</h3>
        <h4 class="openingHours__city">Edinburgh</h4>
        <address class="openingHours__address">
          2 Joppa Rd,Edinburgh, EH15 2EU
        </address>
        <ul>
          <li class="openingHours__text">
            Monday to Friday: 10:00am - 5:30pm
          </li>
          <li class="openingHours__text">Saturday: 10:00am - 5:30pm</li>
          <li class="openingHours__text">Sunday: Closed</li>
        </ul>
        <h4 class="openingHours__city">Falkirk</h4>
        <address class="openingHours__address">
          44 Cow Wynd, Falkirk, Central Region, FK1 1PU
        </address>
        <ul>
          <li class="openingHours__text">
            Monday to Friday: 10:00am - 5:30pm
          </li>
          <li class="openingHours__text">Saturday - By appointment only</li>
          <li class="openingHours__text">Sunday: Closed</li>
        </ul>
      </article>
    </section>
  </div>`;
  element.appendChild(livechat());
  element.appendChild(footer());

  // JAVASCRIPT
  const API_URL = `https://hifi-jsonserver.herokuapp.com/products?_start=0&_end=4`; //"start" & "end" parameters changes the amount of products we fetch
  let frontpageProducts__btn = element.getElementsByClassName(
    "frontpageProducts__btn"
  )[0];
  let productContainer = element.getElementsByClassName(
    "frontpageProducts__productContainer"
  )[0];

  //button-click redirects to product list
  frontpageProducts__btn.addEventListener("click", function () {
    window.location.href = "/product_list";
  });

  //we get all the products with fetch
  async function getProducts() {
    let response = await fetch(API_URL);
    let json = await response.json();
    console.log(json);

    json.forEach(function (productData) {
      printFrontPageProducts(productData);
    });
  }

  //function for printing the products in to our productContainer
  function printFrontPageProducts(data) {
    const NEW_ITEM = document.createElement("article");
    NEW_ITEM.classList.add("frontpageProduct");
    NEW_ITEM.addEventListener("click", function (event) {
      window.location.href = `/product_details/?id=${data.id}`;
    });
    //all the html code we are gonna generate
    NEW_ITEM.innerHTML = `
    <img
      src="${data.images.default}"
      alt="Picture of ${data.name}."
      class="product__img"
    />
    <h2 class="frontpageProduct__heading">${data.brand} ${data.name}</h2>
    <strong class="frontpageProduct__price">£ ${data.price}</strong>
      <button class="frontpageProduct__productBtn g-button">Read more</button>`;
    productContainer.appendChild(NEW_ITEM);
  }

  getProducts();

  return element;
}

document.body.appendChild(index());
