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

const API_URL = `https://hifi-jsonserver.herokuapp.com/products`; //Benjamins server

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
  let storageIDs = JSON.parse(localStorage.getItem("compareIDs")) || [];
  // if there are less than 3 items currently in comparison UI, we can add a new item
  if (productContainers.length < 3 || storageIDs.length < 3) {
    // if the amount of items in the HTML is not the same as the amount of items in localStorage
    if (storageIDs.length != productContainers.length) {
      // if there are localStorage items
      if (storageIDs.length > 0) {
        //removing infobox if we have 3 items
        const infoBox = document.querySelector(".compare__infoBox");
        if (storageIDs.length == 3){
          infoBox.style.display = "none"
        }
        // we show the UI, its hidden by default
        compareContainer.style.display = "grid";
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
              <i class="selectedProduct__removeBtn fa-solid fa-xmark"></i>
              <p class="selectedProduct__name">${
                response[0].brand + " " + response[0].name
              }</p>
              <p class="selectedProduct__price">&pound; ${response[0].price}</p>
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
      // we show the UI, its hidden by default
      compareContainer.style.display = "grid";

      compareContainer.innerHTML += `
      <div class="compare__selectedProduct">
        <img class="selectedProduct__image" src="${
          response[0].images.default
        }" alt="${response[0].brand + " " + response[0].name}" />
        <i class="selectedProduct__removeBtn fa-solid fa-xmark"></i>
        <p class="selectedProduct__name">${
          response[0].brand + " " + response[0].name
        }</p>
        <p class="selectedProduct__price">&pound; ${response[0].price}</p>
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

      // hiding the infobox
      const infoBox = document.querySelector(".compare__infoBox");
      if (productContainers.length == 2) {
        infoBox.style.display = "none";
      }
    }
  }
  // if ID has been set, add it to localStorage
  if (productID != "") {
    localStorage.setItem("compareIDs", JSON.stringify(storageIDs));
  }

  // arraying all x buttons so we can put eevntListeners on them
  const elementRemoveBtns = Array.from(
    document.querySelectorAll(".selectedProduct__removeBtn")
  );

  for (let i = 0; i < elementRemoveBtns.length; i++) {
    elementRemoveBtns[i].addEventListener("click", removeItem);
  }
}

async function removeItem(event) {
  // showing the infobox
  const infoBox = document.querySelector(".compare__infoBox");
  infoBox.style.display = "grid";

  // we need array of buttons so we can tell which one was clicked
  const elementRemoveBtns = Array.from(
    document.querySelectorAll(".selectedProduct__removeBtn")
  );

  if (elementRemoveBtns.length == 1) {
    compareContainer.style.display = "none";
  }
  // we get local storage IDs
  let storageIDs = JSON.parse(localStorage.getItem("compareIDs")) || [];

  // we set i to the index of the clicked item in the element array
  let i = elementRemoveBtns.indexOf(event.target);
  // we remove equivalent entry from storage array
  console.log(i)
  console.log(storageIDs)
  storageIDs.splice(i, 1);

  // we set localStorage to the updated array
  localStorage.setItem("compareIDs", JSON.stringify(storageIDs));
  // we remove the product comparison that was clicked on
  event.target.parentElement.remove();
}
