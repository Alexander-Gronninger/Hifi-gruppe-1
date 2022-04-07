const API_URL = `http://23.88.41.248:3000/products?_start=0&_end=4`;
const frontpageProducts__btn = document.getElementsByClassName("frontpageProducts__btn")[0];
const productContainer = document.getElementsByClassName("frontpageProducts__productContainer")[0];
frontpageProducts__btn.addEventListener("click", function () {
    window.location.href = "/product_list"
})

async function getProducts() {
    let response = await fetch(API_URL);
    let json = await response.json();
    console.log(json);

    json.forEach(function (productData) {
        printFrontPageProducts(productData)
    })
}

function printFrontPageProducts(data) {
    const NEW_ITEM = document.createElement("article");
    NEW_ITEM.classList.add("frontpageProduct");
    NEW_ITEM.addEventListener("click", function (event) {
        console.log(event.target);
        if (event.target.classList.contains("cartStockContainer__btn")) {
            addProduct(data.id)
        } else {
            window.location.href = `/product_details/?id=${data.id}`
        }
    });
    NEW_ITEM.innerHTML = `
    <img
      src="${data.images.default}"
      alt="Picture of ${data.name}."
      class="product__img"
    />
    <h2 class="product__heading">${data.brand} ${data.name}</h2>
    <strong class="product__price">£ ${data.price}</strong>
      <button class="frontpageProducts__productBtn btn g-button">Read more</button>`;
    productContainer.appendChild(NEW_ITEM);
}

getProducts()