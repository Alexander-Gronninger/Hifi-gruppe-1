const API_URL = `https://hifi-jsonserver.herokuapp.com/products`; //Benjamins server
//const API_URL = `http://localhost:3000/products`; //lokal json server

// grabbing the table
const tableElement = document.querySelector(".specs__table");

// grabbing the product IDs being compared
let productIDs = JSON.parse(localStorage.getItem("compareIDs"));

getProductsToCompare();
async function getProductsToCompare() {
  // creating the variables for use within and outside for loops
  let productsArray = [];
  let items = [];
  // these are the default specs we want printed
  let specArray = ["category", "price", "colors", "warranty"];
  // for each product, we fetch product info and put into a variable
  for (let i = 0; i < productIDs.length; i++) {
    let response = await (
      await fetch(API_URL + `?id_like=${productIDs[i].id}`)
    ).json();
    // sets items to productsArray, needed for when we have run through the loop more than once
    items = productsArray;
    // first loop we have no other data already present, so we set it to response
    if (i == 0) {
      productsArray = response;
      // otherwise if we have a product already, we need to add the next product
    } else {
      productsArray = [...items, response[0]];
    }

    // making a list of all specs for all the products selected
    let productSpecs = Array.from(Object.keys(response[0].specs));
    for (
      let j = 0;
      j < Array.from(Object.keys(response[0].specs)).length;
      j++
    ) {
        // sets items to specArray, so we have what already is present
      items = specArray;
      // if the current spec isn't already present
      if (!items.includes(productSpecs[j])) {
          // we add it
        specArray = [...items, productSpecs[j]];
      }
    }
  }

  // putting the elements in with the right data, if the data can't be found mark it with an X
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
// we know the second spec is always price, and it needs special treatment for the pound sign
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
    // for everything above fourth spec on list, our data location is different
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
    }
    // if we're on the first 0-3 entries
    else {
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
  // adds the end of tbody
  tableElement.innerHTML += `
</tbody>
`;
}
