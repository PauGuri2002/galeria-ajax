const key = "85b0f5e9c40241aeaaad41c8899ddc66";
const genres = "indie";
const page_size = 30;
const order = "-metacritic";
const list = document.getElementById('list');
const details = document.getElementById('details');
var currentPage = 1;

window.addEventListener('load', populateList);

function populateList() {
    list.innerHTML = "";

    fetch("https://api.rawg.io/api/games?key=" + key + "&genres=" + genres + "&page_size=" + page_size + "&page=" + currentPage + "&ordering=" + order)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(game => {
                let score = game.metacritic;
                let color = score < 50 ? "red" : score < 75 ? "orange" : "green";
                list.innerHTML += `<li onclick="populateDetails(${game.id})">${game.name} <strong style="background-color: ${color}; color: white;">&nbsp;${score}&nbsp;</strong></li>`;
            });
        })
}

function populateDetails(id) {
    details.innerHTML = "";

    fetch("https://api.rawg.io/api/games/" + id + "?key=" + key)
        .then(response => response.json())
        .then(data => {
            details.innerHTML += `<h1>${data.name}</h1>`;
            details.innerHTML += `<img src="${data.background_image}" alt="Cover art for ${data.name}">`;
            details.innerHTML += `<p>${data.description}</p>`;
            details.innerHTML += `<p>Released: ${data.released}</p>`;
            details.innerHTML += `<p>Metacritic score: ${data.metacritic}</p>`;
            details.innerHTML += `<p>Developed by: ${data.developers.map(developer => developer.name).join(", ")}</p>`;
            details.innerHTML += `<p>Platforms: ${data.platforms.map(platform => platform.platform.name).join(", ")}</p>`;
        })
}

function changePage(offset) {
    let newPage = currentPage += offset;
    if (newPage >= 1) {
        currentPage = newPage;
        populateList();
    }
}