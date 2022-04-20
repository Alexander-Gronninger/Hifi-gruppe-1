//const API_URL = `https://hifi-jsonserver.herokuapp.com/products`; //Benjamins server
const API_URL = `http://localhost:3000/products`; //lokal json server

const tableElement = document.querySelector("specs__table");

let productIDs = JSON.parse(localStorage.getItem("compareIDs"));

getProductsToCompare();
async function getProductsToCompare() {
  for (let i = 0; i < productIDs.length; i++) {
    let response = await await fetch(API_URL + `?id_like=${productIDs[i]}`);
    console.log(response);
  }
}
