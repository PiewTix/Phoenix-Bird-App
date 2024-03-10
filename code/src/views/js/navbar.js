let nav = document.getElementById("nav")
if (nav != undefined) {
    nav.id = "navbar";
    nav.className = " navbar sticky-top navbar-expand-lg bg-light";
    nav.innerHTML = `
    <div class="container-fluid">
        <a class="navbar-brand" href="/">Phoenix</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/voegSpotting">Spotting toevoegen</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="/herkenVogel" >Vogel herkennen</a>
                </li>

            </ul>
            <form id="search" class="d-flex  needs-validation" role="search" method="get" action="/info">
                
                <input  id="inputSearch" list="vogels" class="form-control me-2" type="search" placeholder="Zoek vogel" aria-label="Search" name="vogel">
                <datalist id="vogels"></datalist>
               
                 
                <button class="btn btn-outline-success" type="submit">Zoek</button>
                </div>
            </form>              
        </div>`

    updateDataList()

    //Maak eerste letter altijd een hoofdletter
    let searchBar = document.getElementById("inputSearch")
    searchBar.onkeyup = () => {
        searchBar.value = searchBar.value.charAt(0).toUpperCase() + searchBar.value.slice(1)
    }
}

function addDataList(data) {
    let vogels = document.getElementById("vogels")
    for (let d of data) {
        let c = document.createElement("option")
        c.setAttribute("value", d.nederlandse_naam)


        vogels.appendChild(c);
    }
}

function updateDataList() {

    fetch("/vogels").then(response => response.json()).then((data) => addDataList(data))
}


//validate search

import { validate } from "./validateSearch.js";

validate()

// active link opzetten-> andere kleur als de link in de menubalk openstaat op de huidige pagina

let url = window.location.href

let page = url.substring(22)

console.log(page)

let links = document.getElementsByClassName("nav-link");

for (let el of links) {

    if (el.getAttribute("href").substring(1) == page) {
        el.classList.add("active")
    }
}