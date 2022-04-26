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
    },
    {
        name: "Leith Walk Post Office",
        address: "207A Leith Walk, Edinburgh EH6 8NX, Storbritannien",
        latLng: { lat: 55.9725383069101, lng: -3.172094058287501 }
    },
    {
        name: "Milton Road West Post Office",
        address: "4 Milton Rd W, Edinburgh EH15 1LF, Storbritannien",
        latLng: { lat: 55.946305031605306, lng: -3.11853571402009}
    },
    {
        name: "Gorgie Road Post Office",
        address: "236 Gorgie Rd, Edinburgh EH11 2PL, Storbritannien",
        latLng: { lat: 55.93934046949441, lng: -3.2332420420175847 }
    },
    {
        name: "Forrest Road Post Office",
        address: "33 Forrest Rd, Edinburgh EH1 2QP, Storbritannien",
        latLng: { lat: 55.94755463838819, lng: -3.1904618237894637 }
    },
    {
        name: "Nuketown Post Office",
        address: "11-13 Clerk St, Newington, Edinburgh EH8 9LH, Storbritannien",
        latLng: { lat: 55.944670869582325, lng: -3.1817070944380577 }
    },
    {
        name: "Warriston Post Office",
        address: "2 Brandon Terrace, Edinburgh EH3 5EA, Storbritannien",
        latLng: { lat: 55.9641072521708, lng: -3.1997604132503144 }
    },
    {
        name: "John's Basement",
        address: "Here lives our beloved tech support scammer John - in his moms basement.",
        latLng: { lat: 23.903609600832677, lng: 77.16260033692865}
    },

]

// Initialize and add the map
function initMap() {
    // The location of Uluru
    const currentLocation = { lat: 55.95160640094934, lng: -3.182985084430791 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13, //13
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
    }, 2500);
  }
  
  window.initMap = initMap;