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
