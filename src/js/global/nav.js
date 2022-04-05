const navShopElement = document.getElementsByClassName("menu__item")[1]
const categoryDropdown = document.getElementsByClassName("categoryDropdown")[0]

navShopElement.addEventListener("mouseover", function(){
    categoryDropdown.style.display = "grid"
})

categoryDropdown.addEventListener("mouseleave", function(){
    categoryDropdown.style.display = "none"
})