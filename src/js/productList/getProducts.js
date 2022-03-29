const API_URL = `http://23.88.41.248:3000/products`;
const productMainGrid__element =
  document.getElementsByClassName("productMain__grid")[0];

export let localDatabase;

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
  NEW_ITEM.addEventListener("click", function () {
    window.location.href = `/product_details.html?id=${data.id}`;
  });
  NEW_ITEM.innerHTML = `<a class="product__compareBtn" href=""
    >Compare
    <img
      class="compareBtn__icon"
      src="images/sliders.svg"
      alt="Compare icon"
  /></a>
  <img
    src="${data.images.default}"
    alt="Picture of ${data.name}."
    class="product__img"
  />
  <h2 class="product__heading">${data.brand} ${data.name}</h2>
  <strong class="product__price">£ ${data.price}.00</strong>
  <div class="product__cartStockContainer">
    <button class="cartStockContainer__btn btn">Add to cart</button>
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