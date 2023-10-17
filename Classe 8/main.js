class WeatherMap {
    constructor(startLat, startLong, zoom, containerId) {
        let position = new google.maps.LatLng(startLat, startLong);
        let options = {
            zoom: zoom,
            center: position,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById(containerId), options);
        let marker = new google.maps.Marker({
            position: position,
            map: this.map,
            title: "Barcelona",
        });
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
        switch (weatherKey) {
            case "lluvia":
                return "https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/meteo/imagenes/lluvia.png";
            case "nieve":
                return "https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/meteo/imagenes/nieve.png";
            case "nublado":
                return "https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/meteo/imagenes/nublado.png"
            case "soleado":
                return "https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/meteo/imagenes/soleado.png";
            case "tormentas":
                return "https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/meteo/imagenes/tormentas.png";
            default:
                return "https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/meteo/imagenes/soleado.spng";
        }
    }
}

window.addEventListener('load', () => {
    let weatherMap = new WeatherMap(41.3870154, 2.1700471, 8, "map-container");
    weatherMap.loadWeatherData("https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/meteo/meteodata.php");
})