// https://hifi-jsonserver.herokuapp.com/customers

const API_URL = "https://hifi-jsonserver.herokuapp.com/orders";
const userID = getCookie("userToken");

// const $userFullName = document.querySelector(".profile__name");
// const $userPhone = document.querySelector(".profile__phone");
// const $userMail = document.querySelector(".profile__mail");
// const $userAddress = document.querySelector(".profile__address");
const $orderContainer = document.querySelector(".orders");
console.log($orderContainer);

function getCookie(cookieName) {
  let result = undefined;
  cookieArray = document.cookie.split("; ");

  cookieArray.forEach((element) => {
    if (element.includes(cookieName)) {
      result = element.split("=")[1];
    }
  });

  return result;
}

async function getProfile() {
  fetch(`${API_URL}?costumerID_like=${userID}`)
    .then(function (response) {
      if (response.status !== 200) {
        return [];
      }
      return response.json();
    })
    .then((orders) => {
      orders.map((order) => {
        let totalPrice = 0;
        order["products"][0].map((item) => {
          totalPrice += item.quantity * item.price;
        });
        console.log("date: ", order.id);

        const test = document.createElement("div");
        test.classList.add("orders__item");

        test.innerHTML = `
          <div>
              <p class="orders__titles">
                  Ordernumber: <span class="orders__orderNumber">${order.id}</span>
              </p>
              <p class="orders__titles">
                  Date: <span class="orders__orderDate">${order.date}</span>
              </p>
              <p class="orders__titles">
                  Total: <span class="orders__orderTotalPrice">£ ${totalPrice}</span>
              </p>
              <p class="orders__titles">
                  Items: <span class="orders__orderItems">${order["products"][0].length}</span>
              </p>
          </div>
          <a href="/invoice/?id=${order.id}" class="orders__open">
            <i class="fa-solid fa-file-lines"></i>
          </a>`;

        $orderContainer.appendChild(test);
      });
    });
}

getProfile();
