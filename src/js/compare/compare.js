const API_URL = `https://hifi-jsonserver.herokuapp.com/products`; //Benjamins server
//const API_URL = `http://localhost:3000/products`; //lokal json server

// grabbing the table
const tableElement = document.querySelector(".specs__table tbody");

// grabbing the product IDs being compared
let productIDs = JSON.parse(localStorage.getItem("compareIDs"));

getProductsToCompare();
async function getProductsToCompare() {
  // creating the variables for use within and outside for loops
  let productsArray = [];
  // these are the default specs we want printed
  let defaultSpecs = ["category", "price", "colors", "warranty"];
  let specArray = defaultSpecs;
  // for each product, we fetch product info and put into a variable
  for (let i = 0; i < productIDs.length; i++) {
    let response = await (
      await fetch(API_URL + `?id_like=${productIDs[i].id}`)
    ).json();
    // constructing productsArray from each product, ...response is same as response[0], but more modern
    productsArray = [...productsArray, ...response];

    // making a list of all specs for all the products selected
    let productSpecs = Array.from(Object.keys(response[0].specs));
    // spreading both arrays, it doesn't create duplicates because new Set
    specArray = [...new Set([...specArray, ...productSpecs])];
  }

  // putting the elements in with the right data, if the data can't be found mark it with
  // ? is optional chaining, only in front of a . (chaining)
  tableElement.innerHTML += `
  <tbody>
  <tr class="spectable__row">
    <th class="spectable__key"></th>
    <th class="spectable__value"><img src="${
      (productsArray[0] && productsArray[0].images.default) || "EMPTY IMAGE"
    }"alt="${
    (productsArray[0] && productsArray[0].images.default) || "EMPTY IMAGE"
  }"><br>${
    (productsArray[0] &&
      productsArray[0].brand + " " + productsArray[0]?.name) ||
    "EMPTY NAME"
  }</th>
    <th class="spectable__value"><img src="${
      (productsArray[1] && productsArray[1].images.default) || "EMPTY IMAGE"
    }" alt="${
    (productsArray[1] &&
      productsArray[1].brand + " " + productsArray[1]?.name) ||
    "EMPTY IMAGE"
  }"><br>${
    (productsArray[1] &&
      productsArray[1].brand + " " + productsArray[1]?.name) ||
    "EMPTY NAME"
  }</th>
    <th class="spectable__value"><img src="${
      (productsArray[2] && productsArray[2].images.default) || "EMPTY IMAGE"
    }" alt="${
    (productsArray[2] && productsArray[2].images.default) || "EMPTY IMAGE"
  }"><br>${
    (productsArray[2] &&
      productsArray[2].brand + " " + productsArray[2].name) ||
    "EMPTY NAME"
  }</th>
</tr>`;
  console.log(specArray);
  console.log(productsArray);
  // we know the second spec is always price, and it needs special treatment for the pound sign
  // productsArray[2] && productsArray[2].... if productArray[2] then productsArray[2] - logical and
  specArray.forEach(function (spec) {
    if (spec == "price") {
      tableElement.innerHTML += `
        <tr class="spectable__row">
          <td class="spectable__key">${spec}</td>
          <td class="spectable__value">${
            (productsArray[0] &&
              Number(productsArray[0][spec]).toLocaleString("en-UK", {
                style: "currency",
                currency: "GBP",
              })) ||
            "0.00"
          }</td>
          <td class="spectable__value">${
            (productsArray[1] && productsArray[1][spec]) || "0.00"
          }</td>
          <td class="spectable__value">${
            (productsArray[2] && productsArray[2][spec]) || "0.00"
          }</td>
        </tr>
        `;
    }
    // for everything above fourth spec on list, our data location is different
    if (!defaultSpecs.includes(spec)) {
      tableElement.innerHTML += `
      <tr class="spectable__row">
        <td class="spectable__key">${spec}</td>
        <td class="spectable__value">${
          productsArray[0]?.specs[spec] || "&ndash;"
        }</td>
        <td class="spectable__value">${
          productsArray[1]?.specs[spec] || "&ndash;"
        }</td>
        <td class="spectable__value">${
          productsArray[2]?.specs[spec] || "&ndash;"
        }</td>
      </tr>
      `;
    }
    if (defaultSpecs.includes(spec) && spec != "price") {
      tableElement.innerHTML += `
      <tr class="spectable__row">
        <td class="spectable__key">${spec}</td>
        <td class="spectable__value">${
          (productsArray[0] && productsArray[0][spec]) || "&ndash;"
        }</td>
        <td class="spectable__value">${
          (productsArray[1] && productsArray[1][spec]) || "&ndash;"
        }</td>
        <td class="spectable__value">${
          (productsArray[2] && productsArray[2][spec]) || "&ndash;"
        }</td>
      </tr>
      `;
    }
  });
  // adds the end of tbody
  tableElement.innerHTML += `
</tbody>
`;
}
