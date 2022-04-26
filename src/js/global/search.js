import { printProduct } from "../productList/getProducts.js";

const API_URL = `https://hifi-jsonserver.herokuapp.com/products`;

const queries = new URLSearchParams(window.location.search)
let searchParams = queries.get("search")


const productMainGrid__element = document.getElementsByClassName("productMain__grid")[0];
const searchField = document.querySelector('.tools__input')



async function getProducts() {
  let response = await fetch(API_URL);
  let json = await response.json();
  let searchValue = searchParams.toLowerCase()

  console.log(json)

  let filtered = json.filter(product => (product.brand + " " + product.name).toLowerCase().includes(searchValue) || product.category.toLowerCase().includes(searchValue))
  console.log(filtered);

  if (filtered.length > 0){
    filtered.forEach(product => printProduct(product))
    changeTitle(`Showing results for '${searchParams}'`)
  } else {
    changeTitle(`There are no results for "${searchParams}"`)
  }
}

function changeTitle(txt){
  document.querySelector('#page__title').textContent = txt;
}

if (searchParams) {
  getProducts()
  searchField.value = searchParams;
}






