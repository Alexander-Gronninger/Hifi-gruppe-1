let navigationMenu = document.querySelector(".navigation__menu");
let menuLinks = document.querySelectorAll(".menu__link");
let burger = document.querySelector(".burger");
let menuIcon = document.querySelector(".menuIcon");
let navShopElement = document.querySelector('#navShopElement');
let categoryDropDown = document.querySelector('.categoryDropDown');

function toggleMenu() {
  if (navigationMenu.classList.contains("showMenu")) {
    navigationMenu.classList.remove("showMenu");
    menuIcon.classList.remove("fa-xmark")

  } else {
    navigationMenu.classList.add("showMenu");;
    menuIcon.classList.add("fa-xmark")
  }
}

burger.addEventListener("click", toggleMenu);

menuLinks.forEach(
  function (menuItem) {
    menuItem.addEventListener("click", toggleMenu);
  }
) 