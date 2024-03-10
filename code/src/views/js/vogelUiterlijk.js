//elements

let colorsRow = document.getElementById("kleurenRowId");
let patternsRow = document.getElementById("patronenRowId");
let buttonZoekVogels = document.getElementById("zoekVogelButtonId");

//arrays with different values
let bodyPartsColor = ["hoofd", "snavel", "rug", "vleugel"]; //databank
let bodyPartsPatterns = ["borst", "buik"] //

//mogelijks voor elk lichaamsdeel een array
let colors = ["--none--"]; //zou uit databank moeten gehaald worden ?
let patterns = ["--none--", "testPattern1", "testPattern2"]; //databank

//eventlisteners
buttonZoekVogels.addEventListener("click", function () {
    showBirds();
})

//map voor de verschillende dropdowns (id) in op te slaan en het corresponderende waarde
let map = new Map();

const response = await fetch("/uiterlijk");
var data = await response.json();
for (let kleur of data) {
    colors.push(kleur);
}
//console.log(data);

//functie oproepen voor dropdowns te maken
addKeuzeLijsten(colorsRow, bodyPartsColor, colors, "kleur");
addKeuzeLijsten(patternsRow, bodyPartsPatterns, patterns, "patroon");

//functie om de vogels die overeenkomen met de kenemerken te tonen
function showBirds() {
    console.log("button pressed");
    //tijudelijk voor te tonen welke kenmerken geselecteerd zijn
    let tekst = "";
    for (let key of map.keys()) {
        console.log(key);
        let option = document.getElementById(key);
        tekst += key + ": " + option.options[option.selectedIndex].text + " ; ";
    }
    let tekstResultaat = document.getElementById("tijdelijkTekstId");
    tekstResultaat.textContent = tekst;
}

//functie om map values aan te passen met het gekozen

//functie om verschillende dropdowns te maken voor een vogel in te zoeken
//wss nog een map om alle dropdowns in te steken voor het resultaat terug op te halen
function addKeuzeLijsten(parentElement, availableBodyParts, options, idType) {
    for (let bodypart of availableBodyParts) {
        //parent element
        let div1 = document.createElement("div");
        //child elements
        let h3 = document.createElement("h3");
        let image = document.createElement("img");
        let div2 = document.createElement("div");
        //child elements of div
        let select = document.createElement("select");
        select.setAttribute("name", "selectBox");

        //set attributes for the different elements
        h3.textContent = bodypart;
        image.setAttribute("src", "images/placeholder.jpg")
        div1.setAttribute("class", "col");
        image.setAttribute("width", 200);
        image.setAttribute("height", 200);

        //id zetten voor select en in een map steken voor later de waardes op te halen
        select.setAttribute("id", h3.textContent + "_" + idType)

        let key = h3.textContent + "_" + idType
        map.set(key, "");
        console.log(key);

        //appendchilds
        //child elements of select
        for (let color of options) {
            //actually chosable values
            let option = document.createElement("option");
            option.textContent = color
            select.appendChild(option);
        }

        div2.appendChild(select);
        div1.appendChild(h3);
        div1.appendChild(image);
        div1.appendChild(div2)

        //add to element in html
        parentElement.appendChild(div1);
    }
}
