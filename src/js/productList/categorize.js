import { localDatabase } from "./getProducts.js"
import { printProduct } from "./getProducts.js"


//declaring variables
let activeValues;
let categorizerItems = document.getElementsByClassName('categoryItem')

let minValue = document.getElementById("minValue")
let maxValue = document.getElementById("maxValue")
let lowerRange = document.getElementById("lower")
let upperRange = document.getElementById("upper")
let priceSliders = document.querySelectorAll(".price-field input")

priceSliders.forEach(function (slider) {
    slider.addEventListener("change", getSelectedSortings)
})
minValue.addEventListener("change", getSelectedSortings)
maxValue.addEventListener("change", getSelectedSortings)


Array.from(categorizerItems).forEach(function (item) {
    item.addEventListener("click", async function () {
        item.children[0].classList.toggle("dropdown__checkboxChecked");
        getSelectedSortings()
    })

})


function getSelectedSortings() {
    activeValues = {
        brand: [],
        category: [],
        colors: [],
        price: []
    };
    Array.from(categorizerItems).forEach(function (dataCategory) {
        if (dataCategory.children[0].classList.contains("dropdown__checkboxChecked")) {
            activeValues[dataCategory.dataset.category].push(dataCategory.dataset.value)
        }
    })
    activeValues["price"].push(minValue.value)
    activeValues["price"].push(maxValue.value)

    filter()
}


function filter() {
    let productContainers = document.querySelectorAll(".product")
    productContainers.forEach(productContainer => productContainer.remove())

    //filterting the products
    let filtered = localDatabase.filter(product =>
        (activeValues.brand.length > 0 ? activeValues.brand.includes(product.brand.toLowerCase()) : product.brand) &&
        (activeValues.category.length > 0 ? activeValues.category.includes(product.category.toLowerCase()) : product.category) &&
        (activeValues.colors.length > 0 ? activeValues.colors.some(color => product.colors.includes(color)) : product.colors) &&
        (product.price > activeValues.price[0] - 1 && product.price < activeValues.price[1] + 1))


    filtered.forEach(function (product) {
        printProduct(product)
    })
}

setTimeout(() => {
    let highestProductPrice = 0;
    localDatabase.forEach(function (product) {
        if (product.price > highestProductPrice) {
            highestProductPrice = product.price;
        }
    })
    maxValue.value = highestProductPrice;
    maxValue.max = highestProductPrice;
    upperRange.value = highestProductPrice;
    upperRange.max = highestProductPrice;
    lowerRange.max = highestProductPrice;
}, 750);