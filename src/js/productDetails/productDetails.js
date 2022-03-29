const API_URL = `http://23.88.41.248:3000/products`; //Benjamins server
//const API_URL = `http://localhost:3000/products`; //lokal json server

const productTitle = document.querySelector(".details__title");
const productImage = document.querySelector(".gallery__image");
const productType = document.querySelector(".details__type");
const productDescription = document.querySelector(".details__description");
const productColors = document.querySelector(".details__colors");
const galleryDots = document.querySelector(".gallery__dots");

const arrowLeft = document.querySelector(".gallery__leftarrow");
const arrowRight = document.querySelector(".gallery__rightarrow");

const productPrice = document.querySelector(".price__amount");

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");

getProduct();

async function getProduct() {
  let response = await (await fetch(API_URL + `?id_like=${id}`)).json();
  productTitle.innerHTML = response[0].brand + " " + response[0].name;
  productImage.src = response[0].images.default;
  productImage.alt = response[0].brand + " " + response[0].name;
  productType.innerHTML = response[0].category;

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! UNCOMMENT ONCE PRODUCTS HAVE ACTUAL DESCRIPTIONS IN DATABASE
  //productDescription.innerHTML = response[0].description;
  productPrice.innerHTML = "£ " + response[0].price;

  //doesnt work, may require a rework of the database so we can see how many images there are
  if (response[0].images.length < 3) {
    arrowRight.style.display = "none";
    arrowLeft.style.display = "none";
    galleryDots.style.display = "none";
  }

  // add color buttons
  for (let i = 0; i < response[0].colors.length; i++) {
    if (i == 0) {
      const colorContainer = `
        <div class="color__container">
          <div class="color__icon color__icon--current"></div>
          <p class="color__text">${response[0].colors[i]}</p>
        </div>`;
      productColors.innerHTML += colorContainer;
    } else {
      const colorContainer = `
      <div class="color__container">
        <div class="color__icon"></div>
        <p class="color__text">${response[0].colors[i]}</p>
      </div>`;
      productColors.innerHTML += colorContainer;
    }
  }

  response[0].colors.forEach((color) => {
    response[0].images[color];
  });

  // in stock
  let stockIcons = document.querySelector(".availability__icon");
  if (response[0].stock < 2) {
    stockIcons.style.backgroundColor = "red";
    stockIcons.parentElement.innerHTML += "No Stock";
  } else if (response[0].stock < 20) {
    stockIcons.style.backgroundColor = "orange";
    stockIcons.parentElement.innerHTML += "Few In Stock";
  } else {
    stockIcons.style.backgroundColor = "green";
    stockIcons.parentElement.innerHTML += "In Stock";
  }

  //event listener on colors
  const colorContainers = document.querySelectorAll(".color__container");
  colorContainers.forEach((test) => {
    test.addEventListener("click", chooseColor);
  });
}

// changing product colors
chooseColor();

async function chooseColor() {
  let response = await (await fetch(API_URL + `?id_like=${id}`)).json();
  let color = "";
  if (this.classList == undefined) {
    color = productColors.children[0].children[1].innerHTML;
  } else {
    color = this.children[1].innerHTML;
  }
  localStorage.setItem("color", color);
  let colorImageList = response[0].images[color];
  galleryDots.innerHTML = "";
  for (let i = 0; i < colorImageList.length; i++) {
    if (i == 0) {
      const galleryDot = `
    <div class="gallery__dot gallery__dot--current imageColor__${color}"></div>`;
      galleryDots.innerHTML += galleryDot;
    } else {
      const galleryDot = `
    <div class="gallery__dot imageColor__${color}"></div>`;
      galleryDots.innerHTML += galleryDot;
    }
  }
  productImage.src = response[0].images[color][0];

  if (this.classList != undefined) {
    document
      .querySelector(".color__icon--current")
      .classList.remove("color__icon--current");
    this.children[0].classList.add("color__icon--current");
  }
}

//Gallery arrows
arrowLeft.addEventListener("click", changeImage);
arrowRight.addEventListener("click", changeImage);

let imgIndex = 0;
async function changeImage() {
  let response = await (await fetch(API_URL + `?id_like=${id}`)).json();
  let color = localStorage.getItem("color");
  if (this.classList.contains("gallery__rightarrow")) {
    if (imgIndex == response[0].images[color].length - 1) {
      imgIndex = 0;
      productImage.src = response[0].images[color][imgIndex];
    } else {
      imgIndex++;
      productImage.src = response[0].images[color][imgIndex];
    }
  } else {
    if (imgIndex == 0) {
      imgIndex = response[0].images[color].length - 1;
      productImage.src = response[0].images[color][imgIndex];
    } else {
      imgIndex--;
      productImage.src = response[0].images[color][imgIndex];
    }
  }
}
