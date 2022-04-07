let productContainers = "";
let storageIDButtons = "";
let productID = "";

const compareContainer = document.querySelector(".compare");

async function loadElements() {
  productContainers = Array.from(
    document.querySelectorAll(".compare__selectedProduct")
  );

  storageIDButtons = Array.from(
    document.querySelectorAll(".product__compareBtn")
  );

  for (let i = 0; i < storageIDButtons.length; i++) {
    storageIDButtons[i].addEventListener("click", addProduct);
  }
}

const API_URL = `http://23.88.41.248:3000/products`; //Benjamins server

export default loadElements;

document.addEventListener("DOMContentLoaded", addProduct);
async function addProduct(event) {
  if (event.type === "click") {
    if (event.target.parentElement.classList.contains("product__compareBtn")) {
      productID = event.target.parentElement.parentElement.dataset.id;
    } else {
      productID = event.target.parentElement.dataset.id;
    }
  }

  let response = await (await fetch(API_URL + `?id_like=${productID}`)).json();

  productContainers = Array.from(
    document.querySelectorAll(".compare__selectedProduct")
  );
  let storageIDs = JSON.parse(localStorage.getItem("storageIDs")) || [];
  if (productContainers.length < 3 || storageIDs.length < 3) {
    //console.log("productCotainer under 3");
    //console.log("ID=" + productID);
    if (storageIDs.length != productContainers.length) {
      //console.log("current containers and storage don't match up");
      //console.log("ID=" + productID);
      if (storageIDs.length > 0) {
        //console.log("storageIDs over 0");
        //console.log("ID=" + productID);
        for (let i = 0; i < storageIDs.length; i++) {
          productID = storageIDs[i].id;
          response = await (
            await fetch(API_URL + `?id_like=${productID}`)
          ).json();
          //console.log("adding compare products from storage");
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
          const elementRemoveBtns = Array.from(
            document.querySelectorAll(".selectedProduct__removeBtn")
          );
          elementRemoveBtns[elementRemoveBtns.length - 1].dataset.id = productID;
        }
      }
    }
    if (
      storageIDs.some(
        (storageID) => storageID.id == productID || storageID.length == 3
      )
    ) {
      //console.log("match found");
      //console.log("ID=" + productID);
    } else if (productID != "") {
      //console.log("match not found");
      //console.log("ID=" + productID);
      //console.log("adding new compare product");
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
      storageIDs = [
        ...storageIDs,
        {
          id: productID,
        },
      ];
      const elementRemoveBtns = Array.from(
        document.querySelectorAll(".selectedProduct__removeBtn")
      );
      elementRemoveBtns[elementRemoveBtns.length - 1].dataset.id = productID;
    }
    if (productID != "") {
      localStorage.setItem("storageIDs", JSON.stringify(storageIDs));
    }
  }
  //console.log("compare UI full")
}
