class WeatherMap {
    constructor(startLat, startLong, zoom, containerId) {
        let position = new google.maps.LatLng(startLat, startLong);
        let options = {
            zoom: zoom,
            center: position,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById(containerId), options);
    }

    loadWeatherData(fetchUrl) {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                data.ciutats.forEach(element => {
                    this.addMarker(element.latitud, element.longitud, element.prediccio);
                });
            });
    }

    addMarker(lat, long, weather) {
        let position = new google.maps.LatLng(lat, long);
        let marker = new google.maps.Marker({
            position: position,
            map: this.map,
            title: weather,
            icon: this.getIcon(weather)
        });
    }

    getIcon(weatherKey) {
        return "https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/meteo/imagenes/" + weatherKey + ".png";
    }
}

window.addEventListener('load', () => {
    let weatherMap = new WeatherMap(41.3870154, 2.1700471, 8, "map-container");
    weatherMap.loadWeatherData("https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/meteo/meteodata.php");
})