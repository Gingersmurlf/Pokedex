const grid = document.getElementById("grid")
const target = document.getElementById("observer")

let next = 1
let offset = 0

fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`)
    .then((svar) => svar.json())
    .then(data => handleData(data))

async function getPokemon(url) {
    return fetch(url)
        .then((svar) => svar.json())
}



function handleData(data) {

    // Collect promises for all pokemons
    const promises = data.results.map((pokemon) => getPokemon(pokemon.url));

    Promise.all(promises).then((allData) => {
        let html = "";
        allData.forEach((data) => {
            html += /*html*/ `
            <a href="info.html?id=${data.id}">
            <div class="container">
                <img src="${data.sprites.other["official-artwork"].front_shiny ?? data.sprites.other["official-artwork"].front_default ?? "/download.jfif"}">
                <h2>${data.name}</h2>
                <h3>${data.types.map(den => den.type.name).join(", ")}</h3>
                <h4>ID: ${data.id}</h4>
            </div>
            
            </a>
            `;
        });
        grid.insertAdjacentHTML("beforeend", html);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            offset += 20;

            fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
                .then((svar) => svar.json())
                .then(data => handleData(data))
        }
    })
}, { threshold: 0.5 });

observer.observe(target)