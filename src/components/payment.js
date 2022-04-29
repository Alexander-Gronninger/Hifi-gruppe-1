//styles
import "../styles/modules/payment/deliveryMethods.scss";
import "../styles/modules/payment/maps.scss";
import "../styles/modules/payment/overview.scss";
import "../styles/modules/payment/paymentform.scss";
import "../styles/modules/payment/paymentMethods.scss";

//js
import header from "./partials/header.js";
import livechat from "./partials/livechat.js";
import footer from "./partials/footer.js";
// not sure how to get this working with webpack
//import maps from "https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly";

function payment() {
  let element = document.createElement("main");

  // HTML
  element.appendChild(header());
  element.innerHTML += `
  <div class="wrapper paymentcontainer">
    <section class="paymentform">
      <h1 class="paymentform__title">Your info</h1>
      <form class="paymentform__form" action="" id="checkout">
        <label for="form__name" class="form__label form__big"
          >Full name<span class="form__star">*</span></label
        >
        <input type="text" id="form__name" class="form__input form__big" />

        <label for="form__city" class="form__label form__medium"
          >City<span class="form__star">*</span></label
        >
        <label for="form__postalcode" class="form__label form__small"
          >Postalcode<span class="form__star">*</span></label
        >

        <input
          type="text"
          id="form__city"
          class="form__input form__medium"
        />
        <input
          type="text"
          id="form__postalcode"
          class="form__input form__small"
        />

        <label for="form__address" class="form__label form__big"
          >Address<span class="form__star">*</span></label
        >
        <input
          type="text"
          id="form__address"
          class="form__input form__big"
        />

        <label for="form__useremail" class="form__label form__big"
          >Email<span class="form__star">*</span></label
        >
        <input
          type="text"
          id="form__useremail"
          class="form__input form__big"
        />

        <label for="form__phonenr" class="form__label form__big"
          >Phone nr.<span class="form__star">*</span></label
        >
        <input
          type="text"
          id="form__phonenr"
          class="form__input form__big"
        />
      </form>
    </section>
    <div class="container__payment">
      <section class="payment__overview">
        <h2 class="overview__title">Payment overview</h2>
        <ul class="overview__productinfo"></ul>
      </section>
      <button
        class="payment__button g-button"
        type="submit"
        form="checkout"
      >
        Checkout
      </button>
    </div>
  </div>`;
  element.appendChild(livechat());
  element.appendChild(footer());

  // JAVASCRIPT
  const inputFields = document.querySelectorAll(".form__input");
  const labelStars = document.getElementsByClassName("form__star");

  console.log(labelStars);

  let regexname = /^[a-z ,.'-]+$/i;
  let regexmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let regexzip = /^([0-9]{4}|[0-9]{6})$/;
  let regexnumber = /^\d{3,15}$/;

  for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].addEventListener("blur", validate);
  }

  function validate(e) {
    if (this.id == "form__name") {
      if (!regexname.test(this.value)) {
        e.preventDefault();
        this.style.border = "2px solid red";
        labelStars[0].style.display = "inline-block";
      } else {
        this.style.border = "none";
        labelStars[0].style.display = "none";
      }
    }
    if (this.id == "form__city") {
      if (this.value == null || this.value == "") {
        e.preventDefault();
        this.style.border = "2px solid red";
        labelStars[1].style.display = "inline-block";
      } else {
        this.style.border = "none";
        labelStars[1].style.display = "none";
      }
    }
    if (this.id == "form__postalcode") {
      if (!regexzip.test(this.value)) {
        e.preventDefault();
        this.style.border = "2px solid red";
        labelStars[2].style.display = "inline-block";
      } else {
        this.style.border = "none";
        labelStars[2].style.display = "none";
      }
    }
    if (this.id == "form__address") {
      if (this.value == null || this.value == "") {
        e.preventDefault();
        this.style.border = "2px solid red";
        labelStars[3].style.display = "inline-block";
      } else {
        this.style.border = "none";
        labelStars[3].style.display = "none";
      }
    }
    if (this.id == "form__useremail") {
      if (!regexmail.test(this.value)) {
        e.preventDefault();
        this.style.border = "2px solid red";
        labelStars[4].style.display = "inline-block";
      } else {
        this.style.border = "none";
        labelStars[4].style.display = "none";
      }
    }
    if (this.id == "form__phonenr") {
      if (!regexnumber.test(this.value)) {
        e.preventDefault();
        this.style.border = "2px solid red";
        labelStars[5].style.display = "inline-block";
      } else {
        this.style.border = "none";
        labelStars[5].style.display = "none";
      }
    }
  }
  let overviewUl = document.querySelector(".overview__productinfo");
  let cartItems = JSON.parse(localStorage.getItem("cart"));
  let totalPriceOfItems = 0;
  let vatForItems = 0;
  let deliveryFee = 4;

  for (let i = 0; i < cartItems.length; i++) {
    let totalItemPrice = Number(cartItems[i].price * cartItems[i].quantity);
    totalPriceOfItems = totalItemPrice + totalPriceOfItems;
    overviewUl.innerHTML += `
    <li class="productinfo__name">${cartItems[i].name} x${cartItems[i].quantity}</li>
    <li class="productinfo__price">£${totalItemPrice}</li>
    
    `;
  }
  vatForItems = totalPriceOfItems * 0.25;
  overviewUl.innerHTML += `
    <li class="productinfo__total">Price <span class="total__bold">£${totalPriceOfItems}</span></li>
    <hr class="productinfo__line">
    <li class="productinfo__delprice">Delivery price</li>
    <li class="productinfo__price">£4.00</li>
    <li class="productinfo__vat">VAT</li>
    <li class="productinfo__price">£${vatForItems}</li>
    <li class="productinfo__total">Total price <span class="total__bold">£${
      totalPriceOfItems + vatForItems + deliveryFee
    }</span></li>`;

  let formElement = document.querySelector(".paymentform__form");

  formElement.addEventListener("submit", gatherinfo);

  function gatherinfo(event) {
    event.preventDefault();
    console.log(event.target);

    let orderdata = {
      costumerName: event.target.form__name.value,
      costumerCity: event.target.form__city.value,
      costumerZip: event.target.form__postalcode.value,
      costumerAddress: event.target.form__address.value,
      costumerEmail: event.target.form__useremail.value,
      costumerPhone: event.target.form__phonenr.value,
      products: [JSON.parse(localStorage.getItem("cart"))],
    };
    console.log(orderdata);
    fetch("https://hifi-jsonserver.herokuapp.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(orderdata),
    }).then((response) => console.log(response));
  }

  maps();

  const postalOffices = [
    {
      name: "Edinburgh City Post Office",
      address: "Princes Mall, 3 Princes St, Edinburgh EH1 1BQ",
      latLng: { lat: 55.95275972764824, lng: -3.1912248304986996 },
    },
    {
      name: "St Marys St Post Office",
      address: "46 St Mary's St, Edinburgh EH1 1SX",
      latLng: { lat: 55.95160640094934, lng: -3.182985084430791 },
    },
    {
      name: "Leith Walk Post Office",
      address: "207A Leith Walk, Edinburgh EH6 8NX, Storbritannien",
      latLng: { lat: 55.9725383069101, lng: -3.172094058287501 },
    },
    {
      name: "Milton Road West Post Office",
      address: "4 Milton Rd W, Edinburgh EH15 1LF, Storbritannien",
      latLng: { lat: 55.946305031605306, lng: -3.11853571402009 },
    },
    {
      name: "Gorgie Road Post Office",
      address: "236 Gorgie Rd, Edinburgh EH11 2PL, Storbritannien",
      latLng: { lat: 55.93934046949441, lng: -3.2332420420175847 },
    },
    {
      name: "Forrest Road Post Office",
      address: "33 Forrest Rd, Edinburgh EH1 2QP, Storbritannien",
      latLng: { lat: 55.94755463838819, lng: -3.1904618237894637 },
    },
    {
      name: "Nuketown Post Office",
      address: "11-13 Clerk St, Newington, Edinburgh EH8 9LH, Storbritannien",
      latLng: { lat: 55.944670869582325, lng: -3.1817070944380577 },
    },
    {
      name: "Warriston Post Office",
      address: "2 Brandon Terrace, Edinburgh EH3 5EA, Storbritannien",
      latLng: { lat: 55.9641072521708, lng: -3.1997604132503144 },
    },
    {
      name: "John's Basement",
      address:
        "Here lives our beloved tech support scammer John - in his moms basement.",
      latLng: { lat: 23.903609600832677, lng: 77.16260033692865 },
    },
  ];

  const nameAddress = document.querySelectorAll(
    ".deliveryCard__textContainerParagraph"
  );

  // Initialize and add the map
  function initMap() {
    // The location of Uluru
    const currentLocation = { lat: 55.95160640094934, lng: -3.182985084430791 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13, //13
      center: currentLocation,
      gestureHandling: "greedy",
    });

    //adding markers
    postalOffices.forEach((postOffice, index) => {
      const marker = new google.maps.Marker({
        position: postOffice.latLng,
        map: map,
      });
    });
    setTimeout(() => {
      let areas = document.querySelectorAll(
        "#map > div > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) > div"
      );

      areas.forEach((marker, index) => {
        //generating the shitty box
        let officeBox = document.createElement("div");
        officeBox.classList.add("officeBox");

        let officeName = document.createElement("strong");
        officeName.textContent = postalOffices[index].name;

        let officeAddress = document.createElement("p");
        officeAddress.textContent = postalOffices[index].address;

        const button = document.createElement("button");
        button.classList.add("map__btn");
        button.textContent = "Select this";

        button.addEventListener("click", () => {
          nameAddress[0].scrollIntoView({ block: "center" });
          changeTxt(postalOffices[index].name, postalOffices[index].address);
        });

        officeBox.appendChild(officeName);
        officeBox.appendChild(officeAddress);
        officeBox.appendChild(button);

        marker.appendChild(officeBox);
        marker.style.overflow = "visible";

        marker.addEventListener("mouseover", function () {
          document.querySelectorAll(".officeBox").forEach(function (box) {
            box.style.visibility = "hidden";
          });
          officeBox.style.visibility = "visible";
        });
      });

      const map = document.getElementById("map");
      console.log(map);
      map.addEventListener("mousedown", function (evt) {
        if (!evt.target.classList.contains("map__btn")) {
          document.querySelectorAll(".officeBox").forEach(function (box) {
            box.style.visibility = "hidden";
          });
        }
      });
    }, 2500);
  }

  function changeTxt(name, address) {
    nameAddress[0].textContent = "Name: " + name;
    nameAddress[1].textContent = "Address: " + address;
  }

  window.initMap = initMap;

  const deliveryBtnss = document.querySelectorAll(".deliveryCard__btn");
  const map = document.getElementById("map");
  map.style.visibility = "hidden";
  map.style.position = "absolute";
  map.style.top = "0";

  deliveryBtnss.forEach((element) => {
    element.addEventListener("click", function () {
      document
        .querySelector(".selectedDeliveryBtn")
        .classList.remove("selectedDeliveryBtn");
      element.classList.add("selectedDeliveryBtn");

      if (element.innerHTML === "Post office") {
        map.style.visibility = "visible";
        map.style.position = "relative";
        map.style.top = "unset";
      } else if (element.innerHTML === "Click-and-collect") {
        map.style.visibility = "hidden;";
        map.style.position = "absolute";
        map.style.top = "-2000px";
        nameAddress[0].innerHTML = `<div class="clickandcollectContainer"><input type="radio" name="clickandcollect"><label class="clickandcollectLabel" for="clickandcollect"><strong>Edinburgh</strong><br>
              2 Joppa Rd,Edinburgh, EH15 2EU <br>
              Monday to Friday: 10:00am - 5:30pm <br>
              Saturday: 10:00am - 5:30pm <br>
              Sunday: Closed</label></div>
              <div class="clickandcollectContainer"><input type="radio" name="clickandcollect"><label class="clickandcollectLabel" for="clickandcollect"><strong>Falkirk</strong><br>
              44 Cow Wynd, Falkirk, Central Region, FK1 1PU <br>
              Monday to Friday: 10:00am - 5:30pm <br>
              Saturday - By appointment only <br>
              Sunday: Closed</label></div>`;
        nameAddress[1].textContent = "";
      } else {
        map.style.visibility = "hidden;";
        map.style.position = "absolute";
        map.style.top = "-2000px";
        nameAddress[0].textContent = "Name: 61 Church St";
        nameAddress[1].textContent = "Address: Berwick-upon-Tweed";
      }
    });
  });

  return element;
}

document.body.appendChild(payment());
