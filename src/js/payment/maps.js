const postalOffices = [
    {
        name: "Edinburgh City Post Office",
        address: "Princes Mall, 3 Princes St, Edinburgh EH1 1BQ",
        latLng: { lat: 55.95275972764824, lng: -3.1912248304986996}
    },
    {
        name: "St Marys St Post Office",
        address: "46 St Mary's St, Edinburgh EH1 1SX",
        latLng: { lat: 55.95160640094934, lng: -3.182985084430791 }
    }
]

let userCords = navigator.geolocation.getCurrentPosition(getPos);

function getPos(position) {
    console.log("Latitude: " + position.coords.latitude +
    " </br> Longitude: " + position.coords.longitude);
}

// Initialize and add the map
function initMap() {
    // The location of Uluru
    const currentLocation = { lat: 55.95160640094934, lng: -3.182985084430791 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: currentLocation,
    });
    //adding markers
    postalOffices.forEach((postOffice, index) => {
        const marker = new google.maps.Marker({
            position: postOffice.latLng,
            map: map,
          });
    })
    setTimeout(() => {
        let areas = document.querySelectorAll('#map > div > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) > div')
        console.log(areas)

        areas.forEach((marker, index) =>{
            let officeBox = document.createElement("div")
            officeBox.classList.add("officeBox")
            officeBox.innerHTML = `
                <strong>${postalOffices[index].name}</strong>
                <p>${postalOffices[index].address}</p>
                <button>Select</button>
            `;
            officeBox.style.visibility = "hidden";


            marker.appendChild(officeBox)
            marker.style.overflow = "visible";

            marker.addEventListener("mouseover", function(){
                document.querySelectorAll(".officeBox").forEach(function(box){
                    box.style.visibility = "hidden"
                })
                officeBox.style.visibility = "visible";
            })
        })


        const map = document.getElementById("map")
        console.log(map)
        map.addEventListener("mousedown", function(){
            document.querySelectorAll(".officeBox").forEach(function(box){
                box.style.visibility = "hidden"
            })
        })
    }, 500);
  }
  
  window.initMap = initMap;