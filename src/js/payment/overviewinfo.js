let overviewul = document.querySelector(".overview__productinfo");
let storagearray = Array.from(localStorage.getItem("cart"))
console.log(localStorage.getItem("cart").length);
function overviewload(){
    overviewul.innerHTML = ""
}