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
        brand: ["Pro-ject"],
        category: [],
        colors: ["black"],
        price: []
    };

    // allValues = {
    //     brand: [],
    //     category: [],
    //     colors: []
    // };

    // Array.from(categorizerItems).forEach(function (cat) {
    //     allValues[cat.dataset.category].push(cat.dataset.value);
    // })

    // console.log(allValues)

    Array.from(categorizerItems).forEach(function (dataCategory) {
        if (dataCategory.children[0].classList.contains("dropdown__checkboxChecked")) {
            activeValues[dataCategory.dataset.category].push(dataCategory.dataset.value)
        }
    })
}



//product.brand.includes(activeValues.brand) &&

function filterr() {
    selectedCategories()
    console.log(activeValues)


        // let filtered = localDatabase.filter(product =>
        //     activeValues.brand.includes(product.brand) &&
        //     activeValues.category.includes(product.category))

    let filtered;

    //ONLY BRAND
    if (activeValues.brand.length > 0 && !activeValues.category.length > 0 && !activeValues.colors.length > 0) {
        filtered = localDatabase.filter(product => activeValues.brand.includes(product.brand))
    }
    //ONLY CATEGORY
    if (!activeValues.brand.length > 0 && activeValues.category.length > 0 && !activeValues.colors.length > 0) {
        console.log("kun category")
        filtered = localDatabase.filter(product => activeValues.category.includes(product.category))
    }
    //ONLY COLOR
    if (!activeValues.brand.length > 0 && !activeValues.category.length > 0 && activeValues.colors.length > 0) {
        filtered = localDatabase.filter(product => activeValues.colors.includes(product.colors.toString()))
    }

    //BRAND AND CATEGORY
    if (activeValues.brand.length > 0 && activeValues.category.length > 0) {
        filtered = localDatabase.filter(product => activeValues.brand.includes(product.brand))
        filtered = filtered.filter(product => activeValues.category.includes(product.category))
        if (activeValues.colors.length > 0) {
            filtered = filtered.filter(product => activeValues.colors.includes(product.colors.toString()))
        }
    }

    //BRAND AND COLOR
    if (activeValues.brand.length > 0 && activeValues.color.length > 0) {
        console.log("brand og color")
        filtered = localDatabase.filter(product => activeValues.brand.includes(product.brand))
        filtered = filtered.filter(product => activeValues.colors.includes(product.colors.toString()))
    }



    //CATEGORY AND COLOR
    if (activeValues.category.length > 0 && activeValues.color.length > 0) {
        filtered = localDatabase.filter(product => activeValues.category.includes(product.category))
        filtered = filtered.filter(product => activeValues.colors.includes(product.colors.toString()))
    }
    console.log(filtered)
}


setTimeout(() => {
    filterr()
}, 500);


//updating the products
function updateProducts(check) {
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