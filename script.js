const grid = document.getElementById("grid")

let next = 1

fetch(`https://pokeapi.co/api/v2/pokemon?limit=1400`)
    .then((svar) => svar.json())
    .then(data => handleData(data))

async function getPokemon(url) {
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
                <img src="${data.sprites.other["official-artwork"].front_default ?? "/download.jfif"}">
                <h2>${data.name}</h2>
                <h3>${data.types.map(den => den.type.name).join(", ")}</h3>
                <h4>ID: ${data.id}</h4>
            </div>
            `;
        });
        grid.insertAdjacentHTML("beforeend", html);
    });
}