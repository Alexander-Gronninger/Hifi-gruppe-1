// variables for various DOM elements, need to be global but have to declare in async function as they are JS generated
let productContainers = "";
let compareButtonElements = "";
let productID = "";

const compareContainer = document.querySelector(".compare");

// loadElements is run from productList/getProducts.js every time the product list is loaded / updated
async function loadElements() {
  productContainers = Array.from(
    document.querySelectorAll(".compare__selectedProduct")
  );

  compareButtonElements = Array.from(
    document.querySelectorAll(".product__compareBtn")
  );

  // eventListener for all the compare buttons
  for (let i = 0; i < compareButtonElements.length; i++) {
    compareButtonElements[i].addEventListener("click", addProduct);
  }
}

const API_URL = `http://23.88.41.248:3000/products`; //Benjamins server

// exporting function for use in getProducts.js
export default loadElements;

// function is run when the page is loaded, so we get any items from storage into the UI, for cross page compatibility
document.addEventListener("DOMContentLoaded", addProduct);
async function addProduct(event) {
  // only run if its a click event, needed as function is run once on DOMContentLoaded
  if (event.type === "click") {
    // there are two click events possible, with one or two parent steps to the element which contains productID
    if (event.target.parentElement.classList.contains("product__compareBtn")) {
      productID = event.target.parentElement.parentElement.dataset.id;
    } else {
      productID = event.target.parentElement.dataset.id;
    }
  }

  let response = await (await fetch(API_URL + `?id_like=${productID}`)).json();

  // array of all product comparison containers, so we can index them
  productContainers = Array.from(
    document.querySelectorAll(".compare__selectedProduct")
  );
  // fetching localStorage list of compared items, OR making empty array
  let storageIDs = JSON.parse(localStorage.getItem("storageIDs")) || [];
  // if there are less than 3 items currently in comparison UI, we can add a new item
  if (productContainers.length < 3 || storageIDs.length < 3) {
    // if the amount of items in the HTML is not the same as the amount of items in localStorage
    if (storageIDs.length != productContainers.length) {
      // if there are localStorage items
      if (storageIDs.length > 0) {
        // for each localStorage item
        for (let i = 0; i < storageIDs.length; i++) {
          // localStorage only contains product IDs
          productID = storageIDs[i].id;
          // we fetch for each ID in storage
          response = await (
            await fetch(API_URL + `?id_like=${productID}`)
          ).json();
          // and add it to the compare UI
          compareContainer.innerHTML += `
            <div class="compare__selectedProduct">
              <img class="selectedProduct__image" src="${
                response[0].images.default
              }" alt="${response[0].brand + " " + response[0].name}" />
              <i class="selectedProduct__removeBtn fa-solid fa-x"></i>
              <p class="selectedProduct__name">${
                response[0].brand + " " + response[0].name
              }</p>
              <p class="selectedProduct__price">${response[0].price}</p>
            </div>`;
          // we add dataset to the remove buttons, so we can identify which product is being removed
          // this is needed down the road to remove it from localStorage as well as the UI
          const elementRemoveBtns = Array.from(
            document.querySelectorAll(".selectedProduct__removeBtn")
          );
          // arrays start a 0, but .length doesn't account for that
          elementRemoveBtns[elementRemoveBtns.length - 1].dataset.id =
            productID;
        }
      }
    }
    // if the clicked product is already in the comparison UI, then do nothing
    if (
      storageIDs.some(
        (storageID) => storageID.id == productID || storageID.length == 3
      )
    ) {
      // else if productID has an actual value, we can add it
    } else if (productID != "") {
      compareContainer.innerHTML += `
      <div class="compare__selectedProduct">
        <img class="selectedProduct__image" src="${
          response[0].images.default
        }" alt="${response[0].brand + " " + response[0].name}" />
        <i class="selectedProduct__removeBtn fa-solid fa-x"></i>
        <p class="selectedProduct__name">${
          response[0].brand + " " + response[0].name
        }</p>
        <p class="selectedProduct__price">${response[0].price}</p>
      </div>`;
      // we create productID array for localStorage
      storageIDs = [
        ...storageIDs,
        {
          id: productID,
        },
      ];
      // we add the productID of the added product to the remove button
      const elementRemoveBtns = Array.from(
        document.querySelectorAll(".selectedProduct__removeBtn")
      );
      // arrays start a 0, but .length doesn't account for that
      elementRemoveBtns[elementRemoveBtns.length - 1].dataset.id = productID;
    }
    // if ID has been set, add it to localStorage
    if (productID != "") {
      localStorage.setItem("storageIDs", JSON.stringify(storageIDs));
    }
  }
  const elementRemoveBtns = Array.from(
    document.querySelectorAll(".selectedProduct__removeBtn")
  );

  for (let i = 0; i < elementRemoveBtns.length; i++) {
    elementRemoveBtns[i].addEventListener("click", removeItem);
  }
}

async function removeItem(event) {
  const elementRemoveBtns = Array.from(
    document.querySelectorAll(".selectedProduct__removeBtn")
  );
  let storageIDs = JSON.parse(localStorage.getItem("storageIDs")) || [];

  let i = elementRemoveBtns.indexOf(event.target);
  storageIDs.splice(i, 1);

  localStorage.setItem("storageIDs", JSON.stringify(storageIDs));
  event.target.parentElement.remove();
}
