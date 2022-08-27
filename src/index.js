import { Hero } from "./class.js"; //Class Constructor
import { getHeros } from "./service.js"; //Fetch from Api

//Filter the data and put in an array
async function loadHeros() {
    let heros = [];
    let herosJSON = await getHeros("https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=Spider&limit=21&apikey=0a760010550c89964802de0f5a823b40");
    herosJSON.forEach(hero => {
        if (hero.name == 'Spider-Ham (Larval Earth)' || hero.name == 'Spider-dok' || hero.description == "" || hero.description == " ") { return }
        let newHero = new Hero(hero.name, hero.description, hero.thumbnail.path)
        heros.push(newHero)
    });
    renderHeros(heros)
}

loadHeros() //Call the function

//Render the data into HTML file
function renderHeros(heros) {
    const herosList = document.querySelector(".heros");
    herosList.innerHTML = heros.map(hero => {
        return `<div class="container container-left hero py-5 px-3">
        <img src="${hero.thumbnail}.jpg" class="img-fluid hero-image" alt="A Spiderman Photo">
        <div class="text">
            <p class="display-3 title mt-3 ps-2">${hero.name}</p>
            <p class="h4 mt-1">${hero.description.replace(/ï¿½/gi, "'")}</p>
            </div>
            </div>`
    }).join(" ")
}