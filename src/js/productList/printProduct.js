export function printProduct(data) {
    const NEW_ITEM = document.createElement("article");
    NEW_ITEM.dataset.id = data.id;
    NEW_ITEM.classList.add("product");
    NEW_ITEM.addEventListener("click", function (event) {
      if (event.target.classList.contains("cartStockContainer__btn")) {
        addProduct(data.id);
      } else if (
        event.target.classList.contains("product__compareBtn") ||
        event.target.classList.contains("compareBtn__icon")
      ) {
      } else {
        window.location.href = `/product_details/?id=${data.id}`;
      }
    });
    NEW_ITEM.innerHTML = `<p class="product__compareBtn"
      >Compare
      <img
        class="compareBtn__icon"
        src="/images/sliders.svg"
        alt="Compare icon"
    /></p>
    <img
      src="${data.images.default}"
      alt="Picture of ${data.name}."
      class="product__img"
    />
    <h2 class="product__heading">${data.brand} ${data.name}</h2>
    <strong class="product__price">£ ${data.price}</strong>
    <div class="product__cartStockContainer">
      <button class="cartStockContainer__btn btn g-button">Add to cart</button>
      <p class="cartStockContainer__availability">
        <span class="availability__icon"></span>
      </p>
    </div>`;
}