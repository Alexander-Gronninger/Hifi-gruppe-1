const navShopElement = document.getElementsByClassName("menu__item")[1]
const navAboutElement = document.getElementsByClassName("menu__item")[2]
const categoryDropdown = document.getElementsByClassName("categoryDropdown")[0]

navShopElement.addEventListener("mouseover", function () {
    categoryDropdown.style.visibility = "visible"
    categoryDropdown.style.maxHeight = categoryDropdown.scrollHeight + "px"
})

categoryDropdown.addEventListener("mouseleave", function () {
    categoryDropdown.style.visibility = "hidden"
    categoryDropdown.style.maxHeight = "0"
})
navAboutElement.addEventListener("mouseover", function () {
    categoryDropdown.style.visibility = "hidden"
    categoryDropdown.style.maxHeight = "0"
})

console.log(categoryDropdown)
