class Game {
    constructor(id, callback) {
        fetch("https://api.rawg.io/api/games/" + id + "?key=" + key)
            .then(response => response.json())
            .then(data => {
                this.id = data.id;
                this.name = data.name;
                this.developers = data.developers;
                this.score = data.metacritic;
                this.image = data.background_image;
                this.rating = data.rating;
                this.ratings_count = data.ratings_count;
                this.description = data.description;
                callback();
            })
            .catch(err => console.error("Could not fetch data for game with id " + id + ": " + err));
    }

    get cardElement() {
        let color = this.score < 50 ? "red" : this.score < 75 ? "orange" : "green";

        let div = document.createElement('div');
        div.innerHTML = `<p>${this.name}</p><div style="background-color: ${color};">&nbsp;${this.score}&nbsp;</div>`;
        return div;
    }

    get detailsElement() {
        let details = document.createElement('div');

        // BANNER
        let banner = document.createElement('div');
        banner.classList.add('banner');
        banner.style.backgroundImage = `url(${this.image})`;

        let banner_overlay = document.createElement('div');
        banner_overlay.classList.add('banner-overlay');

        let banner_name = document.createElement('h2');
        banner_name.classList.add('name');
        banner_name.innerHTML = this.name;

        let banner_developer = document.createElement('p');
        banner_developer.classList.add('developer');
        banner_developer.innerHTML = this.developers.map(developer => developer.name).join(", ");

        let metacritic = document.createElement('div');
        metacritic.classList.add('metacritic');
        metacritic.innerHTML = this.score;

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
            stars.innerHTML += i <= Math.round(this.rating) ? "★" : "☆";
        }

        let rating_count = document.createElement('span');
        rating_count.classList.add('rating-count');
        rating_count.innerHTML = " · " + this.ratings_count + " ratings";

        rating.appendChild(stars);
        rating.appendChild(rating_count);
        details.appendChild(rating);

        // DESCRIPTION
        let description = document.createElement('div');
        description.classList.add('description');
        description.innerHTML = this.description;
        details.appendChild(description);

        return details;
    }
}

class GameList {
    constructor(key, count, genre, order, listContainer, detailsContainer, callback) {
        this.listContainer = listContainer;
        this.detailsContainer = detailsContainer;

        let readyGames = 0;

        fetch("https://api.rawg.io/api/games?key=" + key + "&genres=" + genre + "&page_size=" + count + "&ordering=" + order)
            .then(response => response.json())
            .then(data => {
                this.games = [];
                data.results.forEach(game => {
                    this.games.push(new Game(game.id, () => {
                        readyGames++;
                        if (readyGames == data.results.length) {
                            callback();
                        }
                    }));
                });
            });
    }

    render() {
        this.listContainer.innerHTML = "";

        this.games.forEach(game => {
            let element = game.cardElement;
            element.id = game.id;
            element.classList.add('game');
            element.addEventListener('click', (event) => {
                this.detailsContainer.innerHTML = "";
                let details = this.gameById(event.target.id).detailsElement;
                details.id = 'details';
                this.detailsContainer.appendChild(details);
            });
            this.listContainer.appendChild(element);
        });
    }

    gameById(id) {
        return this.games.find(game => game.id == id);
    }
}

/* ----------------------------- */

const key = "85b0f5e9c40241aeaaad41c8899ddc66";
const genres = "indie";
const page_size = 30;
const order = "-metacritic";
const game_list = document.getElementById('game-list');
const details = document.getElementById('details-container');

window.addEventListener('load', () => {
    let gameList = new GameList(key, page_size, genres, order, game_list, details, () => gameList.render());
});