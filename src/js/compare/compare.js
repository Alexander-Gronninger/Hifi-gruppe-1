//const API_URL = `https://hifi-jsonserver.herokuapp.com/products`; //Benjamins server
const API_URL = `http://localhost:3000/products`; //lokal json server

const tableElement = document.querySelector(".specs__table");

let productIDs = JSON.parse(localStorage.getItem("compareIDs"));

getProductsToCompare();
async function getProductsToCompare() {
  let productsArray = [];
  let items = [];
  let specArray = ["category", "price", "colors", "warranty"];
  for (let i = 0; i < productIDs.length; i++) {
    let response = await (
      await fetch(API_URL + `?id_like=${productIDs[i].id}`)
    ).json();
    items = productsArray;
    if (i == 0) {
      productsArray = response;
    } else {
      productsArray = [...items, response[0]];
    }

    let productSpecs = Array.from(Object.keys(response[0].specs));
    for (
      let j = 0;
      j < Array.from(Object.keys(response[0].specs)).length;
      j++
    ) {
      items = specArray;
      if (!items.includes(productSpecs[j])) {
        specArray = [...items, productSpecs[j]];
      }
    }

    //  category, price, colors, warranty, specs,
  }
  console.log(specArray);
  console.log(productsArray);
  console.log(productsArray[0].specs.hdmiOutput);

  tableElement.innerHTML += `
  <tbody>
  <tr class="spectable__row">
    <th class="spectable__key"></th>
    <th class="spectable__value"><img src="${
      productsArray[0].images.default || "EMPTY IMAGE"
    }"alt=""><br>${
    productsArray[0].brand + " " + productsArray[0].name || "EMPTY NAME"
  }</th>
    <th class="spectable__value"><img src="${
      productsArray[1].images.default || "EMPTY IMAGE"
    }" alt=""><br>${
    productsArray[1].brand + " " + productsArray[1].name || "EMPTY NAME"
  }</th>
    <th class="spectable__value"><img src="${
      productsArray[2].images.default || "EMPTY IMAGE"
    }" alt=""><br>${
    productsArray[2].brand + " " + productsArray[2].name || "EMPTY NAME"
  }</th>
</tr>`;
  for (let i = 0; i < specArray.length; i++) {
    if (i == 1) {
      tableElement.innerHTML += `
        <tr class="spectable__row">
          <td class="spectable__key">${specArray[i]}</td>
          <td class="spectable__value">£ ${
            productsArray[0][specArray[i]] || "X"
          }</td>
          <td class="spectable__value">£ ${
            productsArray[1][specArray[i]] || "X"
          }</td>
          <td class="spectable__value">£ ${
            productsArray[2][specArray[i]] || "X"
          }</td>
        </tr>
        `;
    }
    if (i > 3) {
      tableElement.innerHTML += `
      <tr class="spectable__row">
        <td class="spectable__key">${specArray[i]}</td>
        <td class="spectable__value">${
          productsArray[0].specs[specArray[i]] || "X"
        }</td>
        <td class="spectable__value">${
          productsArray[1].specs[specArray[i]] || "X"
        }</td>
        <td class="spectable__value">${
          productsArray[2].specs[specArray[i]] || "X"
        }</td>
      </tr>
      `;
    } else {
      tableElement.innerHTML += `
    <tr class="spectable__row">
      <td class="spectable__key">${specArray[i]}</td>
      <td class="spectable__value">${productsArray[0][specArray[i]] || "X"}</td>
      <td class="spectable__value">${productsArray[1][specArray[i]] || "X"}</td>
      <td class="spectable__value">${productsArray[2][specArray[i]] || "X"}</td>
    </tr>
    `;
    }
  }
  tableElement.innerHTML += `
</tbody>
`;
}
