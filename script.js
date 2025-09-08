const grid = document.getElementById("grid")

let next = 1

fetch(`https://pokeapi.co/api/v2/pokemon`)
    .then((svar) => svar.json())
    .then(data => handleData(data))

function getPokemon(url) {
    return fetch(url)
        .then((svar) => svar.json())
}



function handleData(data) {

    // Collect promises for all pokemons
    const promises = data.results.map((pokemon) => getPokemon(pokemon.url));

    Promise.all(promises).then(allData => {
        let html = "";
        allData.forEach(data => {
            html += /*html*/ `
            <div class="container">
                <img src="${data.sprites.other.dream_world.front_default}">
                <h2>${data.name}</h2>
            </div>

            `;
        });
        grid.insertAdjacentHTML("beforeend", html);
    });
}