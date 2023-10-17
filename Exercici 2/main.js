const key = "85b0f5e9c40241aeaaad41c8899ddc66";

const gameList = {
    data: {},
    genres: "indie",
    page_size: 20,
    order: "-metacritic",

    populate: function (callback) {
        fetch("https://api.rawg.io/api/games?key=" + key + "&genres=" + this.genres + "&page_size=" + this.page_size + "&ordering=" + this.order)
            .then(response => response.json())
            .then(data => {
                this.data = data;
                callback();
            })
            .catch(err => console.error(err));
    },

    render: function (containerId) {
        if (!this.data) {
            console.error("No data to render, must call populate() first");
        }
        let container = document.getElementById(containerId);
        this.data.results.forEach(game => {
            let score = game.metacritic;
            let color = score < 50 ? "red" : score < 75 ? "orange" : "green";

            let div = document.createElement('div');
            div.classList.add('game');
            div.dataset.id = game.id;
            div.innerHTML = `<p>${game.name}</p><div style="background-color: ${color};">&nbsp;${score}&nbsp;</div>`;
            container.appendChild(div);
        });
    }
}

const devList = {
    data: {},
    page_size: 10,

    populate: function (callback) {
        fetch("https://api.rawg.io/api/developers?key=" + key + "&page_size=" + this.page_size)
            .then(response => response.json())
            .then(data => {
                this.data = data;
                callback();
            })
            .catch(err => console.error(err));
    },

    render: function (containerId) {
        if (!this.data) {
            console.error("No data to render, must call populate() first");
        }
        let container = document.getElementById(containerId);
        this.data.results.forEach(dev => {
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
            container.appendChild(div);
        });
    }
}

window.addEventListener('load', gameList.populate(() => gameList.render("game-list")));
window.addEventListener('load', devList.populate(() => devList.render("dev-list")));