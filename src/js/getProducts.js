const API_URL = ``;
const productMainGrid__element = document.getElementsByClassName("productMain__grid")[0]


const getFromAPI = (function(){
    function getProducts(){
        fetch("/api/products")
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return {
        getProducts
    }
})()

getFromAPI.getProducts()

export default getProducts