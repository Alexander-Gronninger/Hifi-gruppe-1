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

//eventlisteners til fremtidigt gallery
//arrowLeft.aaddEventListener("click" nextimg)
//arrowRight.aaddEventListener("click", previmg)

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");

console.log(id);

getProduct();

async function getProduct() {
  let response = await (await fetch(API_URL + `?id_like=${id}`)).json();
  console.log(response);
  productTitle.innerHTML = response[0].brand + " " + response[0].name;
  productImage.src = response[0].images.default;
  productImage.alt = response[0].brand + " " + response[0].name;
  productType.innerHTML = response[0].category;
  //productDescription.innerHTML = response[0].description;
  productPrice.innerHTML = "£ " + response[0].price;

  //doesnt work, may require a rework of the database so we can see how many images there are
  if (response[0].images.length < 3) {
    arrowRight.style.display = "none";
    arrowLeft.style.display = "none";
    galleryDots.style.display = "none";
  }

  for (let i = 0; i < response[0].colors.length; i++) {
    if (response[0].colors.length > 0) {
      if (i == 0) {
        const galleryDot = `
      <div class="gallery__dot gallery__dot--current"></div>`;
        galleryDots.innerHTML += galleryDot;
      } else {
        const galleryDot = `
      <div class="gallery__dot"></div>`;
        galleryDots.innerHTML += galleryDot;
      }
    }
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
}
