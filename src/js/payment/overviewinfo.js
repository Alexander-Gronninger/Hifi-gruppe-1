
let overviewUl = document.querySelector(".overview__productinfo");
let cartItems = JSON.parse(localStorage.getItem("cart"))
let totalPriceOfItems = 0
let vatForItems = 0
let deliveryFee = 4

    for(let i = 0; i < cartItems.length; i++){
    let totalItemPrice = Number(cartItems[i].price * cartItems[i].quantity)
    totalPriceOfItems = totalItemPrice + totalPriceOfItems
    overviewUl.innerHTML += `
    <li class="productinfo__name">${cartItems[i].name} x${cartItems[i].quantity}</li>
    <li class="productinfo__price">£${totalItemPrice}</li>
    
    `}
    vatForItems = totalPriceOfItems * 0.25
    overviewUl.innerHTML += `
    <li class="productinfo__total">Price <span class="total__bold">£${totalPriceOfItems}</span></li>
    <hr class="productinfo__line">
    <li class="productinfo__delprice">Delivery price</li>
    <li class="productinfo__price">£4.00</li>
    <li class="productinfo__vat">VAT</li>
    <li class="productinfo__price">£${vatForItems}</li>
    <li class="productinfo__total">Total price <span class="total__bold">£${totalPriceOfItems + vatForItems + deliveryFee}</span></li>`