const key = "85b0f5e9c40241aeaaad41c8899ddc66";
const genres = "indie";
const game_page_size = 30;
const dev_page_size = 10;
const order = "-metacritic";
const game_list = document.getElementById('game-list');
const dev_list = document.getElementById('dev-list');
const bottom_container = document.getElementById('bottom-container');
const details = document.getElementById('details');
var game_page = 1;
var dev_page = 1;

window.addEventListener('load', populateGameList);
window.addEventListener('load', populateDevList);

function populateGameList() {
    game_list.innerHTML = "";
    details.innerHTML = "";

    fetch("https://api.rawg.io/api/games?key=" + key + "&genres=" + genres + "&page_size=" + game_page_size + "&page=" + game_page + "&ordering=" + order)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(game => {
                let score = game.metacritic;
                let color = score < 50 ? "red" : score < 75 ? "orange" : "green";

                let div = document.createElement('div');
                div.addEventListener('click', populateDetails);
                div.classList.add('game');
                div.dataset.id = game.id;
                div.innerHTML = `<p>${game.name}</p><div style="background-color: ${color};">&nbsp;${score}&nbsp;</div>`;
                game_list.appendChild(div);
            });
        })
        .catch(err => console.log(err));
}

var isPopulating = false;
function populateDevList() {
    if (isPopulating) {
        return;
    }
    isPopulating = true;
    bottom_container.removeEventListener('scroll', checkScroll);

    fetch("https://api.rawg.io/api/developers?key=" + key + "&page_size=" + dev_page_size + "&page=" + dev_page)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(dev => {
                let div = document.createElement('div');
                div.classList.add('dev');
                div.style.backgroundImage = `url(${dev.image_background})`;

                let dev_overlay = document.createElement('div');
                dev_overlay.classList.add('dev-overlay');

                let dev_name = document.createElement('p');
                dev_name.classList.add('dev-name');
                dev_name.innerHTML = dev.name;

                div.appendChild(dev_overlay);
                div.appendChild(dev_name);
                dev_list.appendChild(div);
            });

            bottom_container.addEventListener('scroll', checkScroll);
            dev_page++;
            isPopulating = false;
        })
}

function populateDetails(event) {
    let element = event.currentTarget;
    let id = element.dataset.id;

    let selected = document.querySelector(".selected");
    if (selected) {
        selected.classList.remove("selected");
    }
    element.classList.add("selected");

    details.innerHTML = "";
    fetch("https://api.rawg.io/api/games/" + id + "?key=" + key)
        .then(response => response.json())
        .then(data => {

            // BANNER
            let banner = document.createElement('div');
            banner.classList.add('banner');
            banner.style.backgroundImage = `url(${data.background_image})`;

            let banner_overlay = document.createElement('div');
            banner_overlay.classList.add('banner-overlay');

            let banner_name = document.createElement('h2');
            banner_name.classList.add('name');
            banner_name.innerHTML = data.name;

            let banner_developer = document.createElement('p');
            banner_developer.classList.add('developer');
            banner_developer.innerHTML = data.developers.map(developer => developer.name).join(", ");

            let metacritic = document.createElement('div');
            metacritic.classList.add('metacritic');
            metacritic.innerHTML = data.metacritic;

            banner.appendChild(banner_overlay);
            banner.appendChild(banner_name);
            banner.appendChild(banner_developer);
            banner.appendChild(metacritic);
            details.appendChild(banner);

            // RATING
            let rating = document.createElement('div');
            rating.classList.add('rating');

            let stars = document.createElement('span');
            stars.classList.add('stars');
            for (let i = 1; i <= 5; i++) {
                stars.innerHTML += i <= Math.round(data.rating) ? "★" : "☆";
            }

            let rating_count = document.createElement('span');
            rating_count.classList.add('rating-count');
            rating_count.innerHTML = " · " + data.ratings_count + " ratings";

            rating.appendChild(stars);
            rating.appendChild(rating_count);
            details.appendChild(rating);

            // DESCRIPTION
            let description = document.createElement('div');
            description.classList.add('description');
            description.innerHTML = data.description;
            details.appendChild(description);
        })
}

function checkScroll(event) {
    let element = event.currentTarget;
    if (element.scrollWidth - element.scrollLeft === element.clientWidth) {
        populateDevList();
    }
}

function changePage(offset) {
    let new_page = game_page + offset;
    if (new_page >= 1) {
        game_page = new_page;
        populateGameList();
    }
}