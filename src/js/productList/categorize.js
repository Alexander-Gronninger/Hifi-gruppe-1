import { localDatabase } from "./getProducts.js"
import { printProduct } from "./getProducts.js"


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

let activeValues;
export default function selectedCategories() {
    let productContainers = document.querySelectorAll(".product")
    //productContainers.forEach(productContainer => productContainer.remove())
    activeValues = {
        brand: ["Creek", "Exp", "Pro-Ject"],
        category: ["CD Player", "DVD Player", "Preamps"],
        colors: ["silver", "yellow"],
        price: []
    };

    Array.from(categorizerItems).forEach(function (dataCategory) {
        if (dataCategory.children[0].classList.contains("dropdown__checkboxChecked")) {
            activeValues[dataCategory.dataset.category].push(dataCategory.dataset.value)
        }
    })
}

//product.brand.includes(activeValues.brand) &&

function filterr() {
    selectedCategories()
    console.log("det filterered")
    let filtered = localDatabase.filter(product =>
        activeValues.brand.includes(product.brand) &&
        activeValues.category.includes(product.category) &&
        product.colors.every(color => activeValues.colors.indexOf(color) !== -1))

    console.log(filtered)
}

setTimeout(() => {
    filterr()
}, 500);


//updating the products
function updateProducts(check) {
    console.log(check)
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










        // console.log(item)
        // Array.from(categorizerItems).forEach(function (element) {
        //     console.log(element.dataset.category)
        // })