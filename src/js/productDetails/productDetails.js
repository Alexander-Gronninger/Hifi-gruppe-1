const API_URL = `https://hifi-jsonserver.herokuapp.com/products`; //Benjamins server
//const API_URL = `http://localhost:3000/products`; //lokal json server

const productTitle = document.querySelector(".details__title");
const productImage = document.querySelector(".gallery__image");
const productType = document.querySelector(".details__type");
const productDescription = document.querySelector(".details__description");
const productColors = document.querySelector(".details__colors");
const galleryDotsContainer = document.querySelector(".gallery__dots");

const arrowLeft = document.querySelector(".gallery__leftarrow");
const arrowRight = document.querySelector(".gallery__rightarrow");

const productPrice = document.querySelector(".price__amount");

const specTable = document.querySelector(".spec__table tbody");

let searchParams = new URLSearchParams(window.location.search);
let productID = searchParams.get("id");

//globally declared variable
let price = "";
let productName = "";

// setting dataset to the compare button, from URL id
document.querySelector(".product__compareBtn").dataset.id = productID;

// get product details from database
getProduct();
async function getProduct() {
  let response = await (await fetch(API_URL + `?id_like=${productID}`)).json();
  productTitle.innerHTML = response[0].brand + " " + response[0].name;
  productImage.src = response[0].images.default;
  productImage.alt = response[0].brand + " " + response[0].name;
  productType.innerHTML = response[0].category;

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! UNCOMMENT ONCE PRODUCTS HAVE ACTUAL DESCRIPTIONS IN DATABASE
  //productDescription.innerHTML = response[0].description;
  productPrice.innerHTML = "£ " + response[0].price;

  // add color buttons

  // run through for each color on product in database
  for (let i = 0; i < response[0].colors.length; i++) {
    // first color needs --current class, as its the default displayed
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
    let colorIconElements = document.querySelectorAll(".color__icon");
    colorIconElements[i].style.backgroundColor = response[0].colors[i];
  }

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

  //event listener on color buttons
  const colorContainers = document.querySelectorAll(".color__container");
  colorContainers.forEach((test) => {
    test.addEventListener("click", chooseColor);
  });

  //change global variable, so we dont have to make another API call when we send price to storage
  price = response[0].price;
  productName = response[0].brand + " " + response[0].name;

  //product specs
  let tableSpecs = `
<tr>
  <td class="table__name">Name</td>
  <td class="table__value">${response[0].name}</td>
</tr>  `;
  specTable.innerHTML += tableSpecs;

  tableSpecs = `
<tr>
  <td class="table__name">Brand</td>
  <td class="table__value">${response[0].brand}</td>
</tr>  `;
  specTable.innerHTML += tableSpecs;

  tableSpecs = `
<tr>
  <td class="table__name">Category</td>
  <td class="table__value">${response[0].category}</td>
</tr>  `;
  specTable.innerHTML += tableSpecs;

  tableSpecs = `
<tr>
  <td class="table__name">Price</td>
  <td class="table__value">${response[0].price}</td>
</tr>  `;
  specTable.innerHTML += tableSpecs;

  tableSpecs = `
<tr>
  <td class="table__name">Warranty</td>
  <td class="table__value">${response[0].warranty}</td>
</tr>  `;
  specTable.innerHTML += tableSpecs;

  for (let i = 0; i < Array.from(Object.keys(response[0].specs)).length; i++) {
    tableSpecs = `
  <tr>
    <td class="table__name">${
      Array.from(Object.keys(response[0].specs))[i]
    }</td>
    <td class="table__value">${
      Array.from(Object.values(response[0].specs))[i]
    }</td>
  </tr>  `;
    specTable.innerHTML += tableSpecs;
  }
  // runs compareUI javascript, as it needs an up to date list of all products listed
  loadElements();
}
import loadElements from "/js/global/compareUI.js";

// changing product colors
chooseColor();
async function chooseColor() {
  let response = await (await fetch(API_URL + `?id_like=${productID}`)).json();
  let color = "";

  // by default 'this' is window, so we need to check for that and set color as the first color button color
  if (this.classList == undefined) {
    color = productColors.children[0].children[1].innerHTML;
  }

  // 'this' isn't class undefined, meaning 'this' can only be one of the color changing buttons, so we grab the color from it
  else {
    color = this.children[1].innerHTML;
  }

  // we need the color later in the gallery, so we'll save it in sessionStorage
  sessionStorage.setItem("color", color);

  // a list of all the image-links for a given color
  let colorImageList = response[0].images[color];

  // removing all gallery dots before adding more
  galleryDotsContainer.innerHTML = "";

  // if we only have one image, then we dont need the arrows
  if (colorImageList.length < 2) {
    arrowRight.style.display = "none";
    arrowLeft.style.display = "none";
  } else {
    arrowRight.style.display = "block";
    arrowLeft.style.display = "block";
  }

  // we add the gallery dots based on the amount of images of the given color
  for (let i = 0; i < colorImageList.length; i++) {
    //first dot has --current, as it's displayed by default
    if (i == 0) {
      const galleryDot = `
    <div class="gallery__dot gallery__dot--current"></div>`;
      galleryDotsContainer.innerHTML += galleryDot;
    }

    // adding the rest without --current
    else {
      const galleryDot = `
    <div class="gallery__dot"></div>`;
      galleryDotsContainer.innerHTML += galleryDot;
    }
  }

  // changing the image to the first image of the selected color
  productImage.src = response[0].images[color][0];

  // if 'this' classlist isnt undefined then we must have clicked one of the color buttons
  if (this.classList != undefined) {
    // so we remove --current from the --current element
    document
      .querySelector(".color__icon--current")
      .classList.remove("color__icon--current");

    // then we add it to the color button that fired the event
    this.children[0].classList.add("color__icon--current");
  }
}

//Gallery arrows
arrowLeft.addEventListener("click", changeImage);
arrowRight.addEventListener("click", changeImage);

let imgIndex = 0;
async function changeImage() {
  let response = await (await fetch(API_URL + `?id_like=${productID}`)).json();

  // we retrieve the color from storage
  let color = sessionStorage.getItem("color");

  // remove --current from the --current element
  document
    .querySelector(".gallery__dot--current")
    .classList.remove("gallery__dot--current");

  // we select all gallery dots
  let galleryDots = document.querySelectorAll(".gallery__dot");

  // we determine which of the arrows were clicked
  if (this.classList.contains("gallery__rightarrow")) {
    // if we're on the last image, we return to the first
    if (imgIndex == response[0].images[color].length - 1) {
      imgIndex = 0;
      productImage.src = response[0].images[color][imgIndex];
      galleryDots[imgIndex].classList.add("gallery__dot--current");
    }
    // otherwise we just add
    else {
      imgIndex++;
      productImage.src = response[0].images[color][imgIndex];
      galleryDots[imgIndex].classList.add("gallery__dot--current");
    }
  }
  // the arrow wasn't 'right' so it can only be 'left'
  else {
    // if we're on the first image, we return to the last
    if (imgIndex == 0) {
      imgIndex = response[0].images[color].length - 1;
      productImage.src = response[0].images[color][imgIndex];
      galleryDots[imgIndex].classList.add("gallery__dot--current");
    }
    // otherwise we just subtract
    else {
      imgIndex--;
      productImage.src = response[0].images[color][imgIndex];
      galleryDots[imgIndex].classList.add("gallery__dot--current");
    }
  }
}

//localStorage - we have yet to make it so multiple items can be added after eachother
// eventlistener on the "add to cart" button
document
  .querySelector(".details__addToCartBtn")
  .addEventListener("click", toStorage);

// async is required due to amount being able to change by javascript
async function toStorage() {
  // we get the amount of a given product
  const productAmountNumber = Number(
    document.querySelector(".counter__amount").innerHTML
  );

  // we fetch the cart, as we need to know it's length
  let items = JSON.parse(localStorage.getItem("cart")) || [];
  // empty variable so we can use it globally
  let updatedItems = [];
  // we check if any items match current product id && color
  if (
    items.some(
      (item) =>
        item.id == productID && item.color == sessionStorage.getItem("color")
    )
  ) {
    // we go through each item to find the one that matches
    updatedItems = items.map((item) => {
      if (
        productID == item.id &&
        item.color == sessionStorage.getItem("color")
      ) {
        // we make our changes to said items
        // '...items' means it'll return all other items unmodified
        return {
          ...item,
          quantity: item.quantity + productAmountNumber,
        };
        // and return the others
      } else return item;
    });
  }

  // if we're not modifying an already existing item
  // ... is spread operator
  if (updatedItems.length < 1) {
    updatedItems = [
      ...items,
      {
        id: productID,
        quantity: productAmountNumber,
        color: sessionStorage.getItem("color"),
        price: price,
        name: productName,
      },
    ];
  }
  localStorage.setItem("cart", JSON.stringify(updatedItems));
  console.log(updatedItems);
}
