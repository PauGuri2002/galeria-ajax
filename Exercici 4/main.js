const fetchUrls = {
    all: "https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/benzineres/llista.php",
    alwaysOpen: "https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/benzineres/llista24hs.php",
    details: "https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/benzineres/benzinera.php"
}

class GasStationMap {
    gasStations = [];

    constructor(startLat, startLong, zoom, mapContainerId, detailsContainerId) {
        let position = new google.maps.LatLng(startLat, startLong);
        let options = {
            zoom: zoom,
            center: position,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById(mapContainerId), options);
    }

    loadStations(fetchUrl) {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                data.benzineres.forEach(station => {
                    let stationInstance = new GasStation(station.id, station.lat, station.lon, station.nom);
                    this.gasStations.push(stationInstance);
                    let marker = stationInstance.addMarker(this.map);

                    marker.addListener('click', () => {
                        let gasStation = this.getGasStationById(station.id);
                        this.renderDetails(gasStation);
                    });
                });
            })
            .catch(err => { console.error(err); })
    }

    getGasStationById(id) {
        return this.gasStations.find(station => station.id === id);
    }

    renderDetails(gasStation) {
        // TODO: Render gas station details
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

window.addEventListener('load', () => {
    let map = new GasStationMap(41.558976707885435317955675107, 2.0238975952806974206832272891, 13, "map-container", "details-container");
    map.loadStations(fetchUrls.all);
})