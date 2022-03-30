
//declaring variables
let categorizerItems = document.getElementsByClassName('categoryItem')
const sliders = document.querySelectorAll(".price-field input")
let minValue = document.querySelector("#minValue")
let maxValue = document.querySelector("#maxValue")

//adding eventlisteners
minValue.addEventListener("change", updateProductsWithPrice)
maxValue.addEventListener("change", updateProductsWithPrice)
sliders.forEach(function (slider) {
    slider.addEventListener("change", updateProductsWithPrice)
})


//adding the checkmark through toggle method
Array.from(categorizerItems).forEach(function (item) {
    item.addEventListener("click", function () {
        item.children[0].classList.toggle("dropdown__checkboxChecked");
        if (item.children[0].classList.contains("dropdown__checkboxChecked")) {
            console.log(item.dataset.category);
            console.log(item.dataset.value);
        }
        updateProducts(item)
    })

})


//updating the products
function updateProducts(check) {
    console.log("UPDATING PRODUCTS")
    let productContainers = document.querySelectorAll(".product")
    productContainers.forEach(productContainer => productContainer.remove())
    localDatabase.forEach(function (product) {
        for (const allColors of product.colors.values()) {
            if (check.dataset.value.toLowerCase() === product.category.toLowerCase() ||
                check.dataset.value.toLowerCase() === allColors.toLowerCase() ||
                check.dataset.value.toLowerCase() === product.brand.toLowerCase()) {
                printProduct(product)
            }
        }
    })

}

function updateProductsWithPrice() {
    console.log("UPDATING PRODUCTS")
    let productContainers = document.querySelectorAll(".product")
    productContainers.forEach(productContainer => productContainer.remove())
    localDatabase.forEach(function (product) {
        if (product.price > minValue.value - 1 && product.price < maxValue.value - 1) {
            printProduct(product)
        }
    })
}



import { localDatabase } from "./getProducts.js"
import { printProduct } from "./getProducts.js"










        // console.log(item)
        // Array.from(categorizerItems).forEach(function (element) {
        //     console.log(element.dataset.category)
        // })