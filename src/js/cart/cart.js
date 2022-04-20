const $productsContainer = document.querySelector(".cart__items");
const $cartButton = document.querySelector(".cart__button");
const $cartTitle = document.querySelector(".cart__title");
const $cartAmount = document.querySelector(".cart__amount");
const $cartSubTotal = document.querySelector(".cart__totalSubAmount");
const $cartSubTotalContainer = document.querySelector(".cart__subTotal");
const API_URL = `https://hifi-jsonserver.herokuapp.com/products`; //Benjamins server

async function renderCart() {
  // Get raw cart data from localstorage
  const cartRaw = localStorage.getItem("cart");

  // Parse the raw data if it exists or just default to empty array
  const cart = cartRaw ? JSON.parse(cartRaw) : [];

  // If cart is empty
  if (cart.length === 0) {
    // Replace title with cart is empty title
    $cartTitle.textContent = "Your cart is empty";
    $cartTitle.classList.add("cart__empty");

    // When cart is empty replace go to payment with go to see all products button
    $cartButton.textContent = "See all products";
    $cartButton.addEventListener("click", () => {
      window.location.href = "/product_list";
    });

    // Remove sub total
    $cartSubTotalContainer.style.display = "None";

    // Set product container to empty when last product is removed and cart is empty
    $productsContainer.innerHTML = ``;
    return;
  }

  let productsContainerHTML = "";
  let cartAmount = 0;
  let cartSubTotal = 0;

  Promise.all(
    // Fetch localstorage cart items from database
    cart.map((item) =>
      fetch(`${API_URL}?id_like=${item.id}`).then(function (response) {
        if (response.status !== 200) {
          return [];
        }
        return response.json();
      })
    )
  ).then((data) => {
    // Generate product cards
    productsContainerHTML = data.reduce((acc, item) => {
      let amount;
      item = item[0];

      // Get product amount from cart
      cart.forEach((product) => {
        if (item.id == product.id) {
          amount = product.quantity;
        }
      });

      // Count products in cart
      cartAmount += +amount;

      // Count sub total price
      cartSubTotal += item.price * +amount;

      // Return product card
      return (acc += `
        <section class="cart__item" data-product-id="${item.id}">
          <a href="/product_details?id=${
            item.id
          }" class="item__imgContainer" title="Go to ${
        item.brand + " " + item.name
      }">
            <img
              class="item__img"
              src="${item.images.default}"
              alt="${item.brand + " " + item.name}"
              title="${item.brand + " " + item.name}"/>
          </a>
        
          <div class="item__info">
            <a href="/product_details?id=${item.id}" title="Go to ${
        item.brand + " " + item.name
      }">
              <h2 class="item__title">${item.brand + " " + item.name}</h2>
            </a>
            <p class="item__stock">
              ${getStockElement(item.stock)}
            </p>
          </div>
          <div class="counter">
          <div class="counter__minus">
            <i class="fa-solid fa-minus"></i>
          </div>
          <div class="counter__amountContainer">
            <p class="counter__amount">${amount}</p>
          </div>
          <div class="counter__plus">
            <i class="fa-solid fa-plus"></i>
          </div>
        </div>
          <p class="item__price"><span class="price__poundSymbol">£</span> ${
            item.price * +amount
          }.00</p>
          <div class="item__delete">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </section>
        `);
    }, "");

    // Print product cards to page
    $productsContainer.innerHTML = productsContainerHTML.trim();

    // Add eventListeners to minus icon on counter
    $subtractButtons = document.querySelectorAll(".counter__minus");
    $subtractButtons.forEach((button) =>
      button.addEventListener("click", (e) => onSubtractClick(e))
    );

    // Add eventListeners to plus icon on counter
    $addButtons = document.querySelectorAll(".counter__plus");
    $addButtons.forEach((button) =>
      button.addEventListener("click", (e) => onAddClick(e))
    );

    // Add eventListeners to delete icon on card
    $deleteButtons = document.querySelectorAll(".item__delete");
    $deleteButtons.forEach((button) =>
      button.addEventListener("click", (e) => removeProductFromCart(e))
    );

    // Set cart amount
    if (cartAmount > 99) {
      $cartAmount.textContent = "99+";
    } else {
      $cartAmount.textContent = cartAmount;
    }

    // Set sub total price
    $cartSubTotal.innerHTML = `£ ${cartSubTotal}.00`;
  });

  // Get stock state based on product quantity available
  function getStockElement(number) {
    let stockColor;
    let stockText;

    if (number < 2) {
      stockColor = "red";
      stockText = "Out of stock";
    } else if (number < 20) {
      stockColor = "orange";
      stockText = "Few in stock";
    } else {
      stockColor = "green";
      stockText = "In stock";
    }

    // Return stock element
    return `<span class="stock__color" style="background-color: ${stockColor}"></span> ${stockText}`;
  }
}

function onSubtractClick(e) {
  // Get the productId
  const productId = +e.target
    .closest("[data-product-id]")
    .getAttribute("data-product-id");

  // Get raw cart data from localstorage
  const cartRaw = localStorage.getItem("cart");

  // Parse the raw data if it exists or just default to empty array
  const cart = cartRaw ? JSON.parse(cartRaw) : [];

  // Get the index of the product in cart, of the product we clicked on
  const cartProductIndex = cart.findIndex(
    (cartProduct) => +cartProduct.id === productId
  );

  // Get the product
  const cartProduct = cart[cartProductIndex];

  // Subtract amount if it doesn't reach zero, else remove the product entirely
  const newCart =
    cartProduct.quantity - 1 > 0
      ? Object.assign(cart.slice(), {
          [cartProductIndex]: {
            ...cartProduct,
            quantity: (cartProduct.quantity - 1),
          },
        })
      : Object.assign(cart.slice(), {
          [cartProductIndex]: {
            ...cartProduct,
            quantity: cartProduct.quantity,
          },
        });

  // Save new cart to localStorage
  localStorage.setItem("cart", JSON.stringify(newCart));

  // Rerender the cart
  renderCart();
}

function onAddClick(e) {
  // Get the productId
  const productId = +e.target
    .closest("[data-product-id]")
    .getAttribute("data-product-id");

  // Get raw cart data from localstorage
  const cartRaw = localStorage.getItem("cart");

  // Parse the raw data if it exists or just default to empty array
  const cart = cartRaw ? JSON.parse(cartRaw) : [];

  // Get the index of the product in cart, of the product we clicked on
  const cartProductIndex = cart.findIndex(
    (cartProduct) => +cartProduct.id === productId
  );

  // Get the product
  const cartProduct = cart[cartProductIndex];

  // Add 1 to the product amount
  const newCart = Object.assign(cart.slice(), {
    [cartProductIndex]: {
      ...cartProduct,
      quantity: (+cartProduct.quantity + 1),
    },
  });

  // Save new cart to localStorage
  localStorage.setItem("cart", JSON.stringify(newCart));

  // Rerender cart
  renderCart();
}

function removeProductFromCart(e) {
  // Get the productId
  const productId = +e.target
    .closest("[data-product-id]")
    .getAttribute("data-product-id");

  // Get raw cart data from localstorage
  const cartRaw = localStorage.getItem("cart");

  // Parse the raw data if it exists or just default to empty array
  const cart = cartRaw ? JSON.parse(cartRaw) : [];

  // Remove the product from cart array
  const newCart = cart.filter((cartProduct) => +cartProduct.id !== productId);

  // Save new cart to localStorage
  localStorage.setItem("cart", JSON.stringify(newCart));

  // Rerender cart
  renderCart();
}

// Initial render of the cart
renderCart();
