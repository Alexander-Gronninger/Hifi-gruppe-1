const productLineHTML = `
    <div href="product.html?productId={{PRODUCT_ID}}" title="Gå til produktside for {{PRODUCT_TITLE}}" data-product-id="{{PRODUCT_ID}}">
        <section class="product">
            <!-- product image -->
            <div class="product__image-container">
                <img
                    class="product__image"
                    src="{{PRODUCT_IMG_URL}}"
                    alt="{{PRODUCT_TITLE}}"
                    title="{{PRODUCT_TITLE}}" />
            </div>

            <!-- product details -->
            <div class="product__details">
                <h3 class="product__title">{{PRODUCT_TITLE}}</h3>
                <p class="product__description">{{PRODUCT_SUBTITLE}}</p>
            </div>

            <!-- product counter -->
            <div class="counter">
                <div class="counter__subtract">-</div>
                <div class="counter__amount">{{PRODUCT_AMOUNT}}</div>
                <div class="counter__add">+</div>
            </div>

            <!-- product prices -->
            <div class="product__prices">
                <p class="product__price">{{PRODUCT_PRICE}} kr</p>
            </div>

            <i class="product__remove fas fa-times"></i>
        </section>
    </div>`;

const $productsContainer = document.querySelector(".cart__items");
const cartButton = document.querySelector(".cart__button");
const cartTitle = document.querySelector(".cart__title");
const API_URL = `http://23.88.41.248:3000/products`; //Benjamins server
//const paymentBreadcrumb = document.querySelector(".breadcrumb__payment");

// // Add eventListeners on document since we render and rerender element all the time
// document.addEventListener("click", onSubtractClick);
// document.addEventListener("click", onAddClick);
// document.addEventListener("click", removeProductFromCart);

renderCart();

async function renderCart() {
  const cartRaw = localStorage.getItem("cart");
  const cart = cartRaw ? JSON.parse(cartRaw) : [];

  // console.log(cartRaw);
  // console.log(cart);

  if (cart.length === 0) {
    // Make payment breadcrumb unclickable when cart is empty
    //paymentBreadcrumb.style.pointerEvents = "none";

    // Replace title with cart is empty title
    cartTitle.textContent = "Indkøbskurven er tom";

    // When cart is empty replace go to payment with go to all products button
    cartButton.textContent = "Se alle produkter";
    cartButton.href = "product_list.html";

    $productsContainer.innerHTML = ``;
    return;
  }

  Promise.all(
    cart.map((item) =>
      fetch(`${API_URL}?id_like=${item.id}`).then(function (response) {
        if (response.status !== 200) {
          console.log("næhæh!"); // TODO: bedre brugerbeskeder
          return [];
        }
        return response.json();
      })
    )
  ).then((data) => {
    console.log(data);
  });

  // cart.map((item) => {
  //   // return response = await (await fetch(`${API_URL}?id_like=${700}`)).json();

  //   console.log(item);
  //   console.log(item.id);
  //   console.log(item.color);
  //   console.log(item.quantity);
  // });

  // let response = await (await fetch(`${API_URL}?id_like=${700}`)).json();

  // console.log(response);

  // cart.forEach((item) => {

  //   console.log(response);
  //   console.log(item.id);
  // });

  // Create a dictionary of the products, so we dont have to loop for every cart product
  // const productsDict = window.products.reduce((acc, curr) => {
  //   return {
  //     ...acc,
  //     [curr.id]: curr,
  //   };
  // }, {});

  // Enrich the cart with products data
  // const enrichedCart = cart.map((cartProduct) => {
  //   const product = productsDict[cartProduct.productId];

  //   return {
  //     ...cartProduct,
  //     product,
  //   };
  // });

  // // Create all the HTML to append to productsContainer
  // const productsContainerHTML = enrichedCart.reduce((acc, cartProduct) => {
  //   return (acc += productLineHTML
  //     .replaceAll("{{PRODUCT_ID}}", cartProduct.productId)
  //     .replaceAll("{{PRODUCT_TITLE}}", cartProduct.product.title)
  //     .replaceAll("{{PRODUCT_SUBTITLE}}", cartProduct.product.subtitle)
  //     .replaceAll("{{PRODUCT_IMG_URL}}", cartProduct.product.images[0])
  //     .replaceAll("{{PRODUCT_AMOUNT}}", cartProduct.amount)
  //     .replaceAll(
  //       "{{PRODUCT_PRICE}}",
  //       cartProduct.product.price * cartProduct.amount
  //     ));
  // }, "");

  // // Append the new HTML
  // $productsContainer.innerHTML = productsContainerHTML.trim();
}

// function onSubtractClick(e) {
//   // Check if we clicked on a subtract button
//   if (!e.target || !e.target.classList.contains("counter__subtract")) {
//     return;
//   }

//   // Get the productId
//   const productId = +e.target
//     .closest("[data-product-id]")
//     .getAttribute("data-product-id");

//   // Get raw cart data from localstorage
//   const cartRaw = localStorage.getItem("cart");

//   // Parse the raw data if it exists or just default to empty array
//   const cart = cartRaw ? JSON.parse(cartRaw) : [];

//   // Get the index of the product in cart, of the product we clicked on
//   const cartProductIndex = cart.findIndex(
//     (cartProduct) => cartProduct.productId === productId
//   );

//   // Get the product
//   const cartProduct = cart[cartProductIndex];

//   // Subtract amount if it doesn't reach zero, else remove the product entirely
//   const newCart =
//     cartProduct.amount - 1 > 0
//       ? Object.assign(cart.slice(), {
//           [cartProductIndex]: {
//             ...cartProduct,
//             amount: cartProduct.amount - 1,
//           },
//         })
//       : cart.filter((cartProduct) => cartProduct.productId !== productId);

//   // Save new cart to localStorage
//   localStorage.setItem("cart", JSON.stringify(newCart));

//   // Rerender the cart
//   renderCart();
// }

// function onAddClick(e) {
//   // Check if we clicked on a subtract button
//   if (!e.target || !e.target.classList.contains("counter__add")) {
//     return;
//   }

//   // Get the productId
//   const productId = +e.target
//     .closest("[data-product-id]")
//     .getAttribute("data-product-id");

//   // Get raw cart data from localstorage
//   const cartRaw = localStorage.getItem("cart");

//   // Parse the raw data if it exists or just default to empty array
//   const cart = cartRaw ? JSON.parse(cartRaw) : [];

//   // Get the index of the product in cart, of the product we clicked on
//   const cartProductIndex = cart.findIndex(
//     (cartProduct) => cartProduct.productId === productId
//   );

//   // Get the product
//   const cartProduct = cart[cartProductIndex];

//   // Add 1 to the product amount
//   const newCart = Object.assign(cart.slice(), {
//     [cartProductIndex]: {
//       ...cartProduct,
//       amount: cartProduct.amount + 1,
//     },
//   });

//   // Save new cart to localStorage
//   localStorage.setItem("cart", JSON.stringify(newCart));

//   // Rerender cart
//   renderCart();
// }

// function removeProductFromCart(e) {
//   // Check if we clicked on a x button
//   if (!e.target || !e.target.classList.contains("product__remove")) {
//     return;
//   }

//   const productId = +e.target
//     .closest("[data-product-id]")
//     .getAttribute("data-product-id");

//   // Get raw cart data from localstorage
//   const cartRaw = localStorage.getItem("cart");

//   // Parse the raw data if it exists or just default to empty array
//   const cart = cartRaw ? JSON.parse(cartRaw) : [];

//   // Remove the product from cart array
//   const newCart = cart.filter(
//     (cartProduct) => cartProduct.productId !== productId
//   );

//   // Save new cart to localStorage
//   localStorage.setItem("cart", JSON.stringify(newCart));

//   // Rerender cart
//   renderCart();
// }

// // Initial render of the cart
// renderCart();
