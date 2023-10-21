const fetchUrls = {
    all: "https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/benzineres/llista.php",
    alwaysOpen: "https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/benzineres/llista24hs.php",
    details: "https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/benzineres/benzinera.php"
}
const toggleCooldown = 200;

class GasStationMap {
    gasStations = [];

    constructor(startLat, startLong, zoom, listContainerId, mapContainerId, detailsContainerId) {
        let position = new google.maps.LatLng(startLat, startLong);
        let options = {
            zoom: zoom,
            center: position,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById(mapContainerId), options);

        this.listContainer = document.getElementById(listContainerId);
        this.detailsContainer = document.getElementById(detailsContainerId);
    }

    loadStations(fetchUrl) {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                // clear existing markers
                this.gasStations.forEach(station => {
                    station.marker.setMap(null)
                });
                this.gasStations = [];
                this.listContainer.innerHTML = "";

                // hide details container
                this.detailsContainer.classList.remove("visible");

                // add new markers
                data.benzineres.forEach(station => {
                    let stationInstance = new GasStation(station.id, station.lat, station.lon, station.nom);
                    this.gasStations.push(stationInstance);
                    let marker = stationInstance.addMarker(this.map);

                    marker.addListener('click', () => {
                        let gasStation = this.getGasStationById(station.id);
                        this.renderDetails(gasStation);
                    });

                    let listItem = document.createElement("li");
                    listItem.innerHTML = station.nom;
                    listItem.addEventListener('click', () => {
                        let gasStation = this.getGasStationById(station.id);
                        this.renderDetails(gasStation);
                    });
                    this.listContainer.appendChild(listItem);
                });
            })
            .catch(err => { console.error(err); })
    }

    getGasStationById(id) {
        return this.gasStations.find(station => station.id === id);
    }

    renderDetails(gasStation) {
        this.map.panTo(gasStation.marker.getPosition());
        this.map.setZoom(16);

        gasStation.getDetails(details => {
            this.detailsContainer.innerHTML = "";

            let h2 = document.createElement("h2");
            h2.innerHTML = gasStation.name;
            this.detailsContainer.appendChild(h2);

            let address = document.createElement("div");
            address.classList.add("address");
            address.innerHTML = details.adreca;
            this.detailsContainer.appendChild(address);

            let timetable = document.createElement("div");
            timetable.classList.add("timetable");
            timetable.innerHTML = details.horari;
            this.detailsContainer.appendChild(timetable);

            let contact = document.createElement("div");
            contact.classList.add("contact");
            let contactDetails = [];
            if (details.email.length > 0) contactDetails.push("Email: " + details.email);
            if (details.telefon.length > 0) contactDetails.push("Telèfon: " + details.telefon);
            contact.innerHTML = contactDetails.join("<br />");
            this.detailsContainer.appendChild(contact);

            this.detailsContainer.classList.add("visible");
        });
    }
}

class GasStation {
    constructor(id, lat, long, name) {
        this.id = id;
        this.lat = lat;
        this.long = long;
        this.name = name;
    }

    addMarker(parentMap) {
        let position = new google.maps.LatLng(this.lat, this.long);
        let marker = new google.maps.Marker({
            position: position,
            map: parentMap,
            title: this.name,
            icon: GasStation.icon,
            id: this.id
        });

        this._marker = marker;
        return marker;
    }

    get marker() {
        return this._marker;
    }

    getDetails(callback) {
        let details = {};
        fetch(fetchUrls.details + "?benzinera=" + this.id)
            .then(response => response.json())
            .then(data => {
                details = data.benzinera;
                delete details.id;
                callback(details);
            })
            .catch(err => { console.error(err); })
    }

    static get icon() {
        return {
            url: "./img/gas_station.png",
            scaledSize: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 15)
        }
    }
}

// instantiate and setup map

let isToggling = false;
window.addEventListener('load', () => {
    let map = new GasStationMap(41.558976707885435317955675107, 2.0238975952806974206832272891, 13, "list", "map", "details-container");
    map.loadStations(fetchUrls.all);

    let gasStationToggle = document.querySelector(".toggle");
    gasStationToggle.addEventListener('click', () => {
        if (isToggling) return;
        isToggling = true;

        gasStationToggle.classList.toggle("on");
        let fetchUrl = gasStationToggle.classList.contains("on") ? fetchUrls.alwaysOpen : fetchUrls.all;
        map.loadStations(fetchUrl);

        setTimeout(() => { isToggling = false; }, toggleCooldown);
    })
})