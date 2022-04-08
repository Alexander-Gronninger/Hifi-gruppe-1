const API_URL = `http://23.88.41.248:3000/products?_start=0&_end=4`; //"start" & "end" parameters changes the amount of products we fetch
const frontpageProducts__btn = document.getElementsByClassName("frontpageProducts__btn")[0];
const productContainer = document.getElementsByClassName("frontpageProducts__productContainer")[0];

//button-click redirects to product list
frontpageProducts__btn.addEventListener("click", function () {
    window.location.href = "/product_list"
})

//we get all the products with fetch
async function getProducts() {
    let response = await fetch(API_URL);
    let json = await response.json();
    console.log(json);

    json.forEach(function (productData) {
        printFrontPageProducts(productData)
    })
}

//function for printing the products in to our productContainer
function printFrontPageProducts(data) {
    const NEW_ITEM = document.createElement("article");
    NEW_ITEM.classList.add("frontpageProduct");
    NEW_ITEM.addEventListener("click", function (event) {
        window.location.href = `/product_details/?id=${data.id}`
    });
    //all the html code we are gonna generate
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