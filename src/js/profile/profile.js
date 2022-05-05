const API_URL = "https://hifi-jsonserver.herokuapp.com/customers";
const userID = getCookie("userToken");

const $userFullName = document.querySelector(".profile__name");
const $userPhone = document.querySelector(".profile__phone");
const $userMail = document.querySelector(".profile__mail");
const $userAddress = document.querySelector(".profile__address");

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
  fetch(`${API_URL}/${userID}`)
    .then(function (response) {
      if (response.status !== 200) {
        return [];
      }
      return response.json();
    })
    .then((data) => {
      $userFullName.textContent = data.name;
      $userPhone.textContent = data.phone;
      $userMail.textContent = data.email;

      if (data.address["street"] === "") {
        $userAddress.textContent = "Empty";
      } else {
        // $userAddress.innerHTML = `
        //     ${data.address["street"]} ${data.address["number"]}
        //     <br>${data.address["zip_code"]} ${data.address["city"]}
        //     <br>${data.address[""]}
        //     `;
      }
    });
}

getProfile();
