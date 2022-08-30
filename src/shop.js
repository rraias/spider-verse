import { Comic } from "./class.js";
import fetchApi from "./service.js";

//Filter the data and put in an array
async function loadComics(url) {
    let comics = [];
    let comicsJSON = await fetchApi(url);
    comicsJSON.forEach(comic => {
        if (comic == comicsJSON[1]) { return }
        let newComic = new Comic(comic.id, comic.title, comic.prices[0].price, comic.thumbnail.path, comic.creators.items);
        comics.push(newComic);
    });
    renderComics(comics)
}

//Render the data into HTML file
function renderComics(comics) {
    let comicList = document.querySelector(".comics");
    comicList.innerHTML = comics.map(comic => {
        if (comic.price == 0) { comic.price = 4.50 };
        return `<div class="card comic"">
        <img src="${comic.thumbnail}.jpg" class="card-img-top w-50 card-img" alt="...">
        <div class="card-body">
            <h5 class="card-title comic-title fw-semibold text-center">${comic.title}</h5>
            <p class="h5 card-text comic-price">R$ ${(comic.price * 5).toFixed([2])}</p>
            <a href="#" class="btn-card btn btn-dark btn-buy">Add to Cart</a>
            <a href="#" class="btn-card btn btn-dark btn-details" data-bs-toggle="modal" data-bs-target="#Modal${comic.id}">Details</a>
            
            <!-- Modal -->
<div class="modal fade" id="Modal${comic.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title display-6" id="exampleModalLabel">Details:</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src="${comic.thumbnail}.jpg" class="card-img-top w-50 mb-2 modal-img" alt="...">
        <p class="h4 modal-id">Id: #${comic.id}</p>
        <p class="h4 modal-title">Title: ${comic.title}</p>
        <p class="h5 mt-1">Creators: <br>${comic.creators.map(creator => `<div class="creator">${creator.role[0].toUpperCase() + creator.role.substring(1)} - ${creator.name}</div>`).join("")}</p>
      </div>
      <div class="modal-footer">
        <a type="button" class="btn btn-dark modal-btn" data-bs-dismiss="modal">Close</a>
      </div>
    </div>
  </div>
</div>
        </div>
    </div>`
    }).join("")

}

//Call the function
loadComics(`https://gateway.marvel.com:443/v1/public/comics?noVariants=true&titleStartsWith=Spider&apikey=0a760010550c89964802de0f5a823b40`);


//Pagination
const idOne = document.getElementById("1");
const idTwo = document.getElementById("2");
const idThree = document.getElementById("3");
const idFour = document.getElementById("4");
const idFive = document.getElementById("5");

//Fetchs + eventListener on each Pagination
idOne.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo(top);
    loadComics(`https://gateway.marvel.com:443/v1/public/comics?noVariants=true&titleStartsWith=Spider&apikey=0a760010550c89964802de0f5a823b40`)
});

idTwo.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo(top);
    loadComics(`https://gateway.marvel.com:443/v1/public/comics?noVariants=true&titleStartsWith=Spider&offset=20&apikey=0a760010550c89964802de0f5a823b40`)
});

idThree.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo(top);
    loadComics(`https://gateway.marvel.com:443/v1/public/comics?noVariants=true&titleStartsWith=Spider&offset=40&apikey=0a760010550c89964802de0f5a823b40`)
});

idFour.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo(top);
    loadComics(`https://gateway.marvel.com:443/v1/public/comics?noVariants=true&titleStartsWith=Spider&offset=60&apikey=0a760010550c89964802de0f5a823b40`)
});

idFive.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo(top);
    loadComics(`https://gateway.marvel.com:443/v1/public/comics?noVariants=true&titleStartsWith=Spider&offset=80&apikey=0a760010550c89964802de0f5a823b40`)
});


//Functions to add to cart

//Selectors
const comics = document.querySelector(".comics");
const cart = document.querySelector(".cart");
const price = document.querySelector(".price");
const clearBtn = document.querySelector(".btn-clear");


//Event Listener
comics.addEventListener("click", addToCart);

//Functions

//Call the function for the first time
const comicArray = JSON.parse(localStorage.getItem("comics")) || [];
populateCart(comicArray, cart);

//Add a specific comic in localStorage and in cart
function addToCart(e) {
    if (e.target.classList.contains("btn-buy")) {
        let comicImage = e.target.parentNode.parentNode.querySelector(".card-img").src;
        let comicTitle = e.target.parentNode.querySelector(".card-title").innerText;
        let comicPrice = e.target.parentNode.querySelector(".comic-price").innerText;
        let storageComic = new Comic("", comicTitle, comicPrice, comicImage);
        comicArray.push(storageComic);
        populateCart(comicArray, cart);
        localStorage.setItem("comics", JSON.stringify(comicArray));
        let alert = document.querySelector(".alert");
        alert.style.opacity = 1
        setTimeout(() => {
            alert.style.opacity = 0
        }, 1500);
    }
}

//Function to put the items in the cart
function populateCart(comics, cart) {
    cart.innerHTML = comics.map(comic => {
        return `<li class="dropdown-item cart-item mt-1 my-3" href="#">
    <img src="${comic.thumbnail}" class="card-img-top w-25 cart-img me-2" alt="...">
    <p class="mt-1 cart-text fw-semibold">${comic.title} <br> ${comic.price}</p></li>`
    }).join("");
    totalPrice(comicArray)
}

//Function to add the price

function totalPrice(comics) {
    const priceArray = comics.map(comic => {
        return parseFloat(comic.price.replace('R$ ', ""))
    });
    price.innerHTML = `Total: R$${priceArray.reduce((previous, current) => previous + current, 0).toFixed(2)}`
}

//Function to clear the cart

clearBtn.addEventListener("click", clearCart)

//Cleart the cart and the LocalStorage
function clearCart() {
    localStorage.removeItem("comics");
    cart.innerHTML = "";
    price.innerHTML = "Total:";
    comicArray.splice(0, comicArray.length);
}