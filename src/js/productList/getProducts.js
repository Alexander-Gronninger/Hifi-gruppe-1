const API_URL = `http://23.88.41.248:3000/products`;
const productMainGrid__element =
  document.getElementsByClassName("productMain__grid")[0];

async function getProducts() {
  let response = await fetch(API_URL);
  let json = await response.json();
  console.log(json);
  localDatabase = json;

  json.forEach(function (productData) {
    printProduct(productData)
  })
}


export function printProduct(data) {
  const NEW_ITEM = document.createElement("article");
  NEW_ITEM.classList.add("product");
  NEW_ITEM.addEventListener("click", function (event) {
    console.log(event.target);
    if (event.target.classList.contains("cartStockContainer__btn")) {
      addProduct(data.id)
    } else {
      window.location.href = `/product_details/?id=${data.id}`
    }
  });
  NEW_ITEM.innerHTML = `<a class="product__compareBtn" href=""
    >Compare
    <img
      class="compareBtn__icon"
      src="/images/sliders.svg"
      alt="Compare icon"
  /></a>
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

  productMainGrid__element.appendChild(NEW_ITEM);
}

export default getProducts;
export let localDatabase;



function addProduct(id) {
  let localStorageCart = JSON.parse(localStorage.getItem("cart"));
  if (!localStorageCart) {
    //if the localstorage (cart) doesnt exist, create it with the selected product
    const singleProduct = localDatabase.find(product => product.id == id);
    const product = [{ id: id, quantity: 1, color: singleProduct.colors[0], price: singleProduct.price }]
    localStorage.setItem("cart", JSON.stringify(product))
  } else {
    const singleProductThroughCart = localStorageCart.find(product => product.id == id);
    if (!singleProductThroughCart) {
      //if the localstorage exists but the product doesnt, then add it
      const singleProduct = localDatabase.find(product => product.id == id);
      const product = { id: id, quantity: 1, color: singleProduct.colors[0], price: singleProduct.price }
      localStorageCart.push(product)
      localStorage.setItem("cart", JSON.stringify(localStorageCart))
    } else {
      //if the localstorage exists and the product is there, then add one to the quantity
      localStorageCart[localStorageCart.indexOf(singleProductThroughCart)].quantity = (singleProductThroughCart.quantity + 1);
      localStorage.setItem("cart", JSON.stringify(localStorageCart))
    }
  }
}