
let overviewul = document.querySelector(".overview__productinfo");
let cartitems = JSON.parse(localStorage.getItem("cart"))
let totalpriceofitems = 0
let vatforitems = 0
let deliveryfee = 4
console.log(cartitems);

    for(let i = 0; i < cartitems.length; i++){
    let totalitemprice = Number(cartitems[i].price * cartitems[i].quantity)
    totalpriceofitems = totalitemprice + totalpriceofitems
    overviewul.innerHTML += `
    <li class="productinfo__name">${cartitems[i].name}
    <li class="productinfo__price">£${totalitemprice}
    
    `}
    vatforitems = totalpriceofitems * 0.25
    overviewul.innerHTML += `
    <li class="productinfo__total">Price <span class="total__bold">£${totalpriceofitems}</span></li>
    <hr class="productinfo__line">
    <li class="productinfo__delprice">Delivery price</li>
    <li class="productinfo__price">£4.00</li>
    <li class="productinfo__vat">VAT</li>
    <li class="productinfo__price">£${vatforitems}</li>
    <li class="productinfo__total">Total price <span class="total__bold">£${totalpriceofitems + vatforitems + deliveryfee}</span></li>`