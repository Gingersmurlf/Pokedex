const url = new URL(window.location.href)
const params = new URLSearchParams(url.search)
let id = Number.parseInt(params.get("id"))
const wrapper = document.getElementById("wrapper")

fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((svar) => svar.json())
    .then(data => handleData(data));


function tilbage(id) {
    if (id === 1) {
        return 1 
    } 
    return id-1
}

function frem(id) {
    if (id >= 10277) {
        return 10277 
    } 
    return id+1
}

function handleData(data) {
    console.log(data);
    let first

    first = /*html */
        `
        <header class="header">
            <div class="div1">
                <a href="index.html"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg></a>
                <h1 class="h1">${data.name}</h1>
                <h2 class="h2">${data.id}</h2>
            </div>
            <div class="div2">
                <a href="info.html?id=${tilbage(id)}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                </a>
                <img src="${data.sprites.other["official-artwork"].front_default}">
                <a href="info.html?id=${frem(id)}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg></a>
            </div>
        </header>
        <main class="main">
            <section class="info">
                <ul id="types">${data.types.map((type, i) =>{ 
                    return /*html*/`
                        <li class="type type-${type.type.name}">${type.type.name}</li>
                    `
                }).join("")}
                </ul>
                
            </section>
        </main>
        `

    wrapper.insertAdjacentHTML("beforeend", first)

}