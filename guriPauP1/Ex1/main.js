const fetchUrl = "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/bibliotecas-bibliobuses-y-puntos-de-servicio-movil-geolocalizados/records?refine=tipo%3ABiblioteca";

class LibraryMap {
    libraries = [];

    constructor(defaultLat, defaultLong, deafultZoom, listContainerId, mapContainerId) {
        this.defaultPosition = new google.maps.LatLng(defaultLat, defaultLong);
        this.defaultZoom = deafultZoom;
        let options = {
            zoom: this.defaultZoom,
            center: this.defaultPosition,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById(mapContainerId), options);

        this.listContainer = document.getElementById(listContainerId);
    }

    loadLibraries(limit, offset) {
        fetch(fetchUrl + "&limit=" + limit + "&offset=" + offset)
            .then(response => response.json())
            .then(data => {
                // clear existing markers
                if (this.libraries.length > 0) {
                    this.libraries.forEach(library => {
                        library.marker.setMap(null)
                    });
                    this.libraries = [];
                }
                this.listContainer.innerHTML = "";

                // add new markers
                data.results.forEach(library => {
                    let libraryInstance = new Library(library.latitud, library.longitud, library.nombre_entidad, library.localidad);
                    this.libraries.push(libraryInstance);

                    libraryInstance.addMarker(this.map);
                    this.listContainer.appendChild(libraryInstance.listItem);
                });

                // recenter map
                this.recenter();
            })
            .catch(err => { console.error(err); })
    }

    recenter() {

        if (this.libraries.length <= 0) {
            this.map.setCenter(this.defaultPosition, this.defaultZoom);
            return;
        }

        var bounds = new google.maps.LatLngBounds();
        this.libraries.forEach(library => {
            bounds.extend(library.marker.position);
        });

        this.map.fitBounds(bounds);
    }
}

class Library {
    constructor(lat, long, name, city) {
        this.lat = lat;
        this.long = long;
        this.name = name;
        this.city = city;
    }

    addMarker(parentMap) {
        let position = new google.maps.LatLng(this.lat, this.long);
        let marker = new google.maps.Marker({
            position: position,
            map: parentMap,
            title: this.name,
            icon: Library.icon,
            id: this.id
        });

        this._marker = marker;
        return marker;
    }

    get marker() {
        return this._marker;
    }

    get listItem() {
        let article = document.createElement("article");
        let nameElement = document.createElement("h3");
        nameElement.innerHTML = this.name;
        nameElement.classList.add("name");
        let cityElement = document.createElement("p");
        cityElement.innerHTML = this.city;
        cityElement.classList.add("city");

        article.appendChild(nameElement);
        article.appendChild(cityElement);
        return article;
    }

    static get icon() {
        return {
            url: "./img/library.png",
            scaledSize: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 15)
        }
    }
}

// instantiate and setup map
window.addEventListener('load', () => {
    let map = new LibraryMap(41.26806496916349, -4.52565861666173, 8, "list", "map");
    map.loadLibraries(20, 0);
})