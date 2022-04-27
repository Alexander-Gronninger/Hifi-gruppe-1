//styles
import "../styles/modules/productList/addToCart__button.scss";
import "../styles/modules/productList/availability__icon.scss";
import "../styles/modules/productList/cartStockContainer__availability.scss";
import "../styles/modules/productList/categorizer.scss";
import "../styles/modules/productList/product__compare.scss";
import "../styles/modules/productList/product__img.scss";
import "../styles/modules/productList/product.scss";
import "../styles/modules/productList/productCard__txt.scss";
import "../styles/modules/productList/productMain__primaryHeading.scss";

//js
import header from "./partials/header.js";
import livechat from "./partials/livechat.js";
import footer from "./partials/footer.js";
import compareUI from "./partials/compareUI.js";

function productList() {
  let element = document.createElement("div");

  //HTML
  element.appendChild(header());
  element.innerHTML += `
  <main class="wrapper productMain">
    <h1 class="productMain__primaryHeading global__title">PRODUCTS</h1>
    <section class="productMain__grid">
      <article class="categorizer">
        <h2 class="categorizer__primaryHeading">Sort by</h2>
        <div class="dropdown">
          <div class="dropdown__text">
            <h2>Brand</h2>
            <img src="/images/arrow-down.svg" alt="Dropdown Arrow Icon" />
          </div>
          <ul class="dropdown__content">
            <li
              data-value="creek"
              data-category="brand"
              class="content__list categoryItem"
            >
              Creek
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="exp"
              data-category="brand"
              class="content__list categoryItem"
            >
              EXP
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="exposure"
              data-category="brand"
              class="content__list categoryItem"
            >
              Exposure
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="parasound"
              data-category="brand"
              class="content__list categoryItem"
            >
              Parasound
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="manley"
              data-category="brand"
              class="content__list categoryItem"
            >
              Manley
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="pro-ject"
              data-category="brand"
              class="content__list categoryItem"
            >
              Pro-Ject
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="boesendorfer"
              data-category="brand"
              class="content__list categoryItem"
            >
              Boesendorfer
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="epos"
              data-category="brand"
              class="content__list categoryItem"
            >
              Epos
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="harbeth"
              data-category="brand"
              class="content__list categoryItem"
            >
              Harbeth
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="jolida"
              data-category="brand"
              class="content__list categoryItem"
            >
              Jolida
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <div class="dropdown__text">
            <h2>Category</h2>
            <img src="/images/arrow-down.svg" alt="Dropdown Arrow Icon" />
          </div>
          <ul class="dropdown__content">
            <li
              data-value="cd player"
              data-category="category"
              class="content__list categoryItem"
            >
              CD Players
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="dvd player"
              data-category="category"
              class="content__list categoryItem"
            >
              DVD Players
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="power amplifier"
              data-category="category"
              class="content__list categoryItem"
            >
              Power Amplifiers
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="preamp"
              data-category="category"
              class="content__list categoryItem"
            >
              Preamps
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="speaker"
              data-category="category"
              class="content__list categoryItem"
            >
              Speakers
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="integrated amplifier"
              data-category="category"
              class="content__list categoryItem"
            >
              Integrated Amplifiers
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="turntable"
              data-category="category"
              class="content__list categoryItem"
            >
              Turntables
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="tube amplifier"
              data-category="category"
              class="content__list categoryItem"
            >
              Tube Amplifiers
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
          </ul>
        </div>

        <div class="dropdown">
          <div class="dropdown__text">
            <h2>Color</h2>
            <img src="/images/arrow-down.svg" alt="Dropdown Arrow Icon" />
          </div>
          <ul class="dropdown__content">
            <li
              data-value="silver"
              data-category="colors"
              class="content__list categoryItem"
            >
              Silver
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="blue"
              data-category="colors"
              class="content__list categoryItem"
            >
              Blue
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="black"
              data-category="colors"
              class="content__list categoryItem"
            >
              Black
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="grey"
              data-category="colors"
              class="content__list categoryItem"
            >
              Grey
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="wood"
              data-category="colors"
              class="content__list categoryItem"
            >
              Wood
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="yellow"
              data-category="colors"
              class="content__list categoryItem"
            >
              Yellow
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
            <li
              data-value="red"
              data-category="colors"
              class="content__list categoryItem"
            >
              Red
              <div class="dropdown__checkbox">
                <img class="checkbox__img" src="/images/check.svg" alt="" />
              </div>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <div class="dropdown__text">
            <h2>Price</h2>
            <img src="/images/arrow-down.svg" alt="Dropdown Arrow Icon" />
          </div>
          <ul class="dropdown__content">
            <li class="content__list content__range">
              <div class="price-field">
                <input type="range" min="1" max="2000" value="1" id="lower" />
                <input
                  type="range"
                  min="1"
                  max="2000"
                  value="2000"
                  id="upper"
                />
              </div>
              <div class="rangeContainer">
                <div class="rangeContainer__input">
                  <label for="minValue">£</label>
                  <input type="number" id="minValue" />
                </div>
                <div class="rangeContainer__input">
                  <label for="maxValue">£</label>
                  <input type="number" id="maxValue" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </article>
    </section>
    ${compareUI()}
    </main>`;
  element.appendChild(livechat());
  element.appendChild(footer());

  //JAVASCRIPT
  //declaring variables
  let localDatabase;
  let activeValues;
  let categorizerItems = element.querySelector(".categoryItem");

  let minValue = element.querySelector("#minValue");
  let maxValue = element.querySelector("#maxValue");
  let lowerRange = element.querySelector("#lower");
  let upperRange = element.querySelector("#upper");
  let priceSliders = element.querySelectorAll(".price-field input");

  priceSliders.forEach(function (slider) {
    slider.addEventListener("change", getSelectedSortings);
  });
  minValue.addEventListener("change", getSelectedSortings);
  maxValue.addEventListener("change", getSelectedSortings);

  Array.from(categorizerItems).forEach(function (item) {
    item.addEventListener("click", async function () {
      item.children[0].classList.toggle("dropdown__checkboxChecked");
      getSelectedSortings();
    });
  });

  function getSelectedSortings() {
    activeValues = {
      brand: [],
      category: [],
      colors: [],
      price: [],
    };
    Array.from(categorizerItems).forEach(function (dataCategory) {
      if (
        dataCategory.children[0].classList.contains("dropdown__checkboxChecked")
      ) {
        activeValues[dataCategory.dataset.category].push(
          dataCategory.dataset.value
        );
      }
    });
    activeValues["price"].push(minValue.value);
    activeValues["price"].push(maxValue.value);

    filter();
  }

  function filter() {
    console.log(activeValues);
    let productContainers = element.querySelectorAll(".product");
    productContainers.forEach((productContainer) => productContainer.remove());

    //filterting the products
    let filtered = localDatabase.filter(
      (product) =>
        (activeValues.brand.length > 0
          ? activeValues.brand.includes(product.brand.toLowerCase())
          : product.brand) &&
        (activeValues.category.length > 0
          ? activeValues.category.includes(product.category.toLowerCase())
          : product.category) &&
        (activeValues.colors.length > 0
          ? activeValues.colors.some((color) => product.colors.includes(color))
          : product.colors) &&
        product.price > activeValues.price[0] - 1 &&
        product.price < activeValues.price[1] + 1
    );

    filtered.forEach(function (product) {
      printProduct(product);
    });
  }

  document.body.onload = function () {
    let param = new URLSearchParams(window.location.search);
    let category = param.get("category");
    if (category) {
      Array.from(categorizerItems).forEach(function (dataCategory) {
        if (dataCategory.dataset.value == category.replace("+", " ")) {
          setTimeout(() => {
            console.log(dataCategory.dataset.value);
            dataCategory.parentElement.style.maxHeight =
              dataCategory.parentElement.scrollHeight + "px";
            dataCategory.closest("div").querySelector("img").style.transform =
              "rotateX(180deg)";
            dataCategory.children[0].classList.toggle(
              "dropdown__checkboxChecked"
            );
            activeValues = {
              brand: [],
              category: [dataCategory.dataset.value],
              colors: [],
              price: ["1", "799"],
            };
            filter();
          }, 400);
        }
      });
    }
  };

  setTimeout(() => {
    let highestProductPrice = 0;
    localDatabase.forEach(function (product) {
      if (product.price > highestProductPrice) {
        highestProductPrice = product.price;
      }
    });
    maxValue.value = highestProductPrice;
    maxValue.max = highestProductPrice;
    upperRange.value = highestProductPrice;
    upperRange.max = highestProductPrice;
    lowerRange.max = highestProductPrice;
  }, 700);

  const dropdownElements = element.querySelectorAll(".dropdown");
  for (let i = 0; i < dropdownElements.length; i++) {
    dropdownElements[i]
      .querySelector(".dropdown__text")
      .addEventListener("click", function () {
        const dropdownContent = this.nextElementSibling;
        if (
          dropdownContent.style.maxHeight !=
          dropdownContent.scrollHeight + "px"
        ) {
          dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
          this.querySelector("img").style.transform = "rotateX(180deg)";
        } else {
          dropdownContent.style.maxHeight = "0";
          this.querySelector("img").style.transform = "rotateX(0deg)";
        }
      });
  }
  const API_URL = `https://hifi-jsonserver.herokuapp.com/products`;
  const productMainGrid__element = element.querySelector(".productMain__grid");

  async function getProducts() {
    let response = await fetch(API_URL);
    let json = await response.json();
    localDatabase = json;

    json.forEach(function (productData) {
      printProduct(productData);
    });
  }

  function printProduct(data) {
    const NEW_ITEM = document.createElement("article");
    NEW_ITEM.dataset.id = data.id;
    NEW_ITEM.classList.add("product");
    NEW_ITEM.addEventListener("click", function (event) {
      if (event.target.classList.contains("cartStockContainer__btn")) {
        addProduct(data.id);
      } else if (
        event.target.classList.contains("product__compareBtn") ||
        event.target.classList.contains("compareBtn__icon")
      ) {
      } else {
        window.location.href = `/product_details/?id=${data.id}`;
      }
    });
    NEW_ITEM.innerHTML = `<p class="product__compareBtn"
    >Compare
    <img
      class="compareBtn__icon"
      src="/images/sliders.svg"
      alt="Compare icon"
  /></p>
  <img
    src="${data.images.default}"
    alt="Picture of ${data.name}."
    class="product__img"
  />
  <h2 class="product__heading">${data.brand} ${data.name}</h2>
  <strong class="product__price">£ ${data.price}</strong>
  <div class="product__cartStockContainer">
    <button class="cartStockContainer__btn btn g-button">Add to cart</button>
    <p class="cartStockContainer__availability">
      <span class="availability__icon"></span>
    </p>
  </div>`;

    // let stockText = NEW_ITEM.querySelector(".");
    let stockIcons = NEW_ITEM.querySelector(".availability__icon");
    if (data.stock < 2) {
      stockIcons.style.backgroundColor = "red";
      stockIcons.parentElement.innerHTML += "Out of stock";
    } else if (data.stock < 20) {
      stockIcons.style.backgroundColor = "orange";
      stockIcons.parentElement.innerHTML += "Few In Stock";
    } else {
      stockIcons.style.backgroundColor = "green";
      stockIcons.parentElement.innerHTML += "In Stock";
    }

    console.log(NEW_ITEM);
    productMainGrid__element.appendChild(NEW_ITEM);
  }

  function addProduct(id) {
    let localStorageCart = JSON.parse(localStorage.getItem("cart"));
    if (!localStorageCart) {
      //if the localstorage (cart) doesnt exist, create it with the selected product
      const singleProduct = localDatabase.find((product) => product.id == id);
      let productName = singleProduct.name + " " + singleProduct.brand;
      const product = [
        {
          id: id,
          quantity: 1,
          color: singleProduct.colors[0],
          price: singleProduct.price,
          name: productName,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(product));
    } else {
      const singleProductThroughCart = localStorageCart.find(
        (product) => product.id == id
      );
      if (!singleProductThroughCart) {
        //if the localstorage exists but the product doesnt, then add it
        const singleProduct = localDatabase.find((product) => product.id == id);
        let productName = singleProduct.name + " " + singleProduct.brand;
        const product = {
          id: id,
          quantity: 1,
          color: singleProduct.colors[0],
          price: singleProduct.price,
          name: productName,
        };
        localStorageCart.push(product);
        localStorage.setItem("cart", JSON.stringify(localStorageCart));
      } else {
        //if the localstorage exists and the product is there, then add one to the quantity
        localStorageCart[
          localStorageCart.indexOf(singleProductThroughCart)
        ].quantity = singleProductThroughCart.quantity + 1;
        localStorage.setItem("cart", JSON.stringify(localStorageCart));
      }
    }
  }
  var lowerSlider = element.querySelector("#lower");
  var upperSlider = element.querySelector("#upper");

  element.querySelector("#maxValue").value = upperSlider.value;
  element.querySelector("#minValue").value = lowerSlider.value;

  var lowerVal = parseInt(lowerSlider.value);
  var upperVal = parseInt(upperSlider.value);

  upperSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);
    if (upperVal < lowerVal + 100) {
      element.querySelector("#minValue").value = parseInt(this.value);
      lowerSlider.value = upperVal - 100;
      if (lowerVal == lowerSlider.min) {
        upperSlider.value = 100;
      }
    }
    element.querySelector("#maxValue").value = this.value;
  };

  lowerSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);
    if (lowerVal > upperVal - 100) {
      element.querySelector("#maxValue").value = parseInt(this.value);
      upperSlider.value = lowerVal + 100;
      if (upperVal == upperSlider.max) {
        lowerSlider.value = parseInt(upperSlider.max) - 100;
      }
    }
    element.querySelector("#minValue").value = this.value;
  };
  function printProduct(data) {
    const NEW_ITEM = document.createElement("article");
    NEW_ITEM.dataset.id = data.id;
    NEW_ITEM.classList.add("product");
    NEW_ITEM.addEventListener("click", function (event) {
      if (event.target.classList.contains("cartStockContainer__btn")) {
        addProduct(data.id);
      } else if (
        event.target.classList.contains("product__compareBtn") ||
        event.target.classList.contains("compareBtn__icon")
      ) {
      } else {
        window.location.href = `/product_details/?id=${data.id}`;
      }
    });
    NEW_ITEM.innerHTML = `<p class="product__compareBtn"
        >Compare
        <img
          class="compareBtn__icon"
          src="/images/sliders.svg"
          alt="Compare icon"
      /></p>
      <img
        src="${data.images.default}"
        alt="Picture of ${data.name}."
        class="product__img"
      />
      <h2 class="product__heading">${data.brand} ${data.name}</h2>
      <strong class="product__price">£ ${data.price}</strong>
      <div class="product__cartStockContainer">
        <button class="cartStockContainer__btn btn g-button">Add to cart</button>
        <p class="cartStockContainer__availability">
          <span class="availability__icon"></span>
        </p>
      </div>`;
  }
  getProducts();

  return element;
}

document.body.appendChild(productList());
