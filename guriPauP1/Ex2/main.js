const fetchUrl = "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/bibliotecas-bibliobuses-y-puntos-de-servicio-movil-geolocalizados/records?refine=tipo%3ABiblioteca";

class LibraryMap {
    libraries = [];
    totalLibraries = 0;
    limit = 20;
    currentOffset = 0;

    constructor(defaultLat, defaultLong, defaultZoom, librariesPerPage, listContainerId, mapContainerId, currentPageTextId, pageCountTextId) {
        this.defaultPosition = new google.maps.LatLng(defaultLat, defaultLong);
        this.defaultZoom = defaultZoom;
        let options = {
            zoom: this.defaultZoom,
            center: this.defaultPosition,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById(mapContainerId), options);

        this.limit = librariesPerPage;
        this.listContainer = document.getElementById(listContainerId);
        this.currentPageText = document.getElementById(currentPageTextId);
        this.pageCountText = document.getElementById(pageCountTextId);
    }

    loadLibraries(offset) {
        fetch(fetchUrl + "&limit=" + this.limit + "&offset=" + offset)
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

                // update total libraries
                this.totalLibraries = data.total_count;

                // add new markers
                data.results.forEach(library => {
                    let libraryInstance = new Library(library.latitud, library.longitud, library.nombre_entidad, library.localidad);
                    this.libraries.push(libraryInstance);

                    libraryInstance.addMarker(this.map);
                    this.listContainer.appendChild(libraryInstance.listItem);
                });

                // recenter map
                this.recenter();

                // update page texts
                if (!this.currentPageText || !this.pageCountText) { return; }
                this.currentPageText.innerHTML = this.currentPage;
                this.pageCountText.innerHTML = this.pageCount;
            })
            .catch(err => { console.error(err); })
    }

    showPage(pageOffset) {
        let newOffset = this.currentOffset + pageOffset * this.limit;
        if (newOffset < 0 || (this.pageCount > 0 && this.currentPage + pageOffset > this.pageCount)) { return; }

        this.currentOffset = newOffset;
        this.loadLibraries(this.currentOffset);
    }

    get currentPage() {
        return this.currentOffset / this.limit + 1;
    }

    get pageCount() {
        return Math.ceil(this.totalLibraries / this.limit);
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
    let map = new LibraryMap(41.26806496916349, -4.52565861666173, 8, 20, "list", "map", "current-page", "page-count");
    map.showPage(0);

    let prevButton = document.getElementById("prev");
    let nextButton = document.getElementById("next");

    prevButton.addEventListener("click", () => {
        map.showPage(-1);
    });
    nextButton.addEventListener("click", () => {
        map.showPage(1);
    });
})