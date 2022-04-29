function breadcrumb() {
  let element = document.createElement("div");
  element.classList.add("breadcrumb");
  element.innerHTML = `
    <div class="breadcrumb__line"></div>
    <div class="@@activeCart breadcrumb__item breadcrumb__cart">
      <i class="fa-solid fa-cart-shopping"></i>
    </div>
    <div class="@@activePayment breadcrumb__item breadcrumb__payment">
      <i class="fa-solid fa-credit-card"></i>
    </div>
    <div class="@@activeInvoice breadcrumb__item breadcrumb__invoice">
      <i class="fa-solid fa-receipt"></i>
    </div>
    `;
  return element;
}

export default breadcrumb;
