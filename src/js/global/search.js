const API_URL = `https://hifi-jsonserver.herokuapp.com/products`;

const queries = new URLSearchParams(window.location.search)
let searchParams = queries.get("search")
console.log(searchParams);
const productMainGrid__element =
  document.getElementsByClassName("productMain__grid")[0];
  
  
  
  async function getProducts() {
      let response = await fetch(API_URL);
      let json = await response.json();
      let searchValue = searchParams.toLowerCase()
      let filtered = json.filter(product => product.name.toLowerCase().includes(searchValue) || product.brand.toLowerCase().includes(searchValue) ||  product.category.toLowerCase().includes(searchValue))
    console.log(filtered);
    printProduct(filtered)
}

if (searchParams){
getProducts()
}










