//DOCUMENT ELEMENTEN
let buttonZoekVogels = document.getElementById("zoekVogelButtonId");
let buttonResetVogels = document.getElementById("resetVogelButtonId");
let mainLayout = document.getElementById("mainLayout");
let resultatenRow = document.getElementById("resultatenRowId");
let resultatenContainerID = document.getElementById("resultaterContainerID");

//BESCHIKBARE ROUTES, ZODAT DE CODE NIET URL'S PROBEERT OP TE VRAGEN DIE NIET BESTAAN
let routes = ["buikkleur", "borstkleur", "hoofdkleur", "snavelkleur", "rugkleur", "vleugeltipkleur", "vleugelkleur", "staartkleur", "buikpatroon", "borstpatroon", "hoofdpatroon", "snavellengte", "rugpatroon", "vleugelpatroon", "staartpatroon", "grootte"];

//PROPERTY MET EEN LICHAAMSDEEL EN ZIJN SPECIFIEKE LICHAAMSDELEN
let bodySections = {
    "Lichaam": ["Grootte"],
    "Hoofd": ["Hoofd", "Snavel"],
    "Bovenlichaam": ["Borst", "Buik", "Rug"],
    "Vleugel": ["Vleugel", "VleugelTip"],
    "Staart": ["Staart"]
};

//BOOLEAN OM GROOTTE TOE TE VOEGEN AANGEZIEN GROOTTE MAAR 1 IETS IS
let grootte = false;
//MAP VOOR DE VESCHILLENDE DROPDOWN ID'S IN OP TE SLAAN, DEZE WORDEN LATER OPGESTUURD NAAR DE DATABANK
let map = new Map();
//ALLE GEKOZEN KENMERKEN WORDEN OPGESLAGEN IN DE PROPERTY KENEMREKN, DEZE WORDT LATER GEBRUIKT VOOR LOCALSTORAGE
let kenmerken = {};
//BOOLEAN DIE VERWISSELT NA ELKE GROTE LICHAAMSDEEL OM TE SWITCHEN TUSSEN ACHTERGRONDKLEUR
let odd = false;

//EVENTLISTENERS
buttonZoekVogels.addEventListener("click", function () {
    showBirds();
})
buttonResetVogels.addEventListener("click", function () {
    resetKenmerken();
});

//pagina initialisatie
init()

function init() {
    makeBasicLayout();
}

//hulpfunctie om rijen aan te maken
function makeRow(id = null){
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    //justify content: elementen in de html centreren
    row.style.justifyContent = "center";
    //divs worden niet gecentreerd met justify content maar wel met textalign
    row.style.textAlign = "center"
    if(id){
        row.setAttribute("id", id);
    }
    return row
}

//hulpfunctie om kollommen aan te maken
function makeCol(id = null){
    let col = document.createElement("div");
    col.setAttribute("class", "col");
    col.style.textAlign = "center";
    if(id){
        col.setAttribute("id", id);
    }
    return col
}

//hulpfunctie om een titel aan te maken:
function makeText(element, textContent, klasse = null){
    let titel = document.createElement(element)
    titel.textContent = textContent
    titel.style.textAlign = "center"
    titel.style.color = "black"
    if(klasse)
        titel.setAttribute("class", klasse)
    return titel
}

//hulpfunctie voor een image element te creeren:
function addImage(src, alt, width, height) {
    let img = document.createElement("img");
    img.setAttribute("src", "images/" + src + ".jpg");
    img.setAttribute("alt", alt);
    img.setAttribute("width", width + "px");
    img.setAttribute("height", height + "px");
    return img;
}

//functie voor verschillende delen aan te maken
function makeBasicLayout() {
    //voor elke wijde bodypart een rij aanmaken met inhoud die door de hulpfuncties worden aangemaakt.
    for (let bodysection of Object.keys(bodySections)) {
        //grouper
        let div = document.createElement("div");
        //main row
        let row = makeRow(bodysection);
        //subtitel
        let subtitel = makeText("h2", bodysection, "subCat")

        //veranderen van kleur
        if (odd)
            div.style.backgroundColor = "#F8F9FA";
        else
            div.style.backgroundColor = "white";
        odd = !odd;

        //cards van specifieke lichaamsdelen toevoegen
        addOptionsLayout(row, bodysection);

        div.appendChild(subtitel);
        div.appendChild(row);

        //dun grijs divider tussen de verschillende lichaamscategorie
        let divider = document.createElement("hr");
        divider.setAttribute("class", "featurette-divider");

        div.appendChild(divider);
        mainLayout.appendChild(div);
    }
    //RESULTATENCONTAINER DE JUISTE KLEUR GEVEN
    if (odd)
        resultatenContainerID.style.backgroundColor = "#F8F9FA";
    else
        resultatenContainerID.style.backgroundColor = "white";
}

//voor elk specifiek lichaamsdeel in bodySection een specifieke titel aanmaken en een afbeelding tonen
//deze functie roept nog een hulpfunctie op voor het aanmaken van de selectboxen
function addOptionsLayout(parentRow, bodySection) {
    //lichaamsDelen is een array met de specifieke lichaamsdelen
    let lichaamsDelen = bodySections[bodySection.toString()];
    for (let specificBodypart of lichaamsDelen) {
        let col = makeCol()
        parentRow.appendChild(col);

        //subtitel met spicificbodypart als value
        let subTitle = makeText("h3", specificBodypart)
        col.appendChild(subTitle);

        //foto
        let img
        if (!grootte) {
            //functie oproepen voor het aanmaken van selectboxen
            img = addImage(specificBodypart, "Foto van een vogel" + specificBodypart, 350, 200);
            col.appendChild(img);
            createSelectBox("Grootte", col, "Vogel", "grootte").then();
            grootte = !grootte;
        } else {
            img = addImage(specificBodypart, "Foto van een vogel" + specificBodypart, 200, 200);
            col.appendChild(img);
        }
        addOptions(col, specificBodypart).then();
    }
}

//voor alle mogelijke types die er zijn een selectbox maken met de verschillende mogelijke kenmerken
async function addOptions(row, specificBodypart) {
    let types = ["kleur", "patroon", "lengte", "grootte"]
    for (let type of types) {
        let bodypartUrl = specificBodypart.toString().toLowerCase() + type;
        if (routes.includes(bodypartUrl))
            //voor een specifiek lichaamsdeel en type createSelectBox oproepen
            await createSelectBox(type, row, specificBodypart, bodypartUrl);
    }
}

//voor een specifiek lichaamsdeel en type een slectbox aanmaken met de verschillende opties
async function createSelectBox(type, col, specificBodypart, bodypartUrl) {
    //juiste naam geven aan key die zal gebruikt worden als map key en voor het id van selectbox
    //dit id zal dan later gebruikt worden om de juiste kenemerken door te geven aan de databank om dan het overeenkomende vogels terug te krijgen.
    let key = specificBodypart.toLowerCase() + "_" + type.toLowerCase();
    //titel voor type kenmerk
    let h5 = document.createElement("h5");
    //selectbox aanmaken
    let select = document.createElement("select");

    //elementen de juiste attributen geven
    col.appendChild(h5)
    h5.textContent = type
    select.setAttribute("name", "selectBox");
    select.style.width = "200px";
    select.style.borderRadius = "15px";
    //select leeg maken
    select.innerHTML = "";

    try {
        //vragen aan databank voor de verschillende opties van het kenmerk
        const response = await fetch(bodypartUrl)
        let opties = await response.json();

        //alle verschillende options toevoegen aan select
        for (let typeOption of opties) {
            let option = document.createElement("option");
            option.textContent = typeOption
            option.style.borderRadius = "15px";
            select.appendChild(option);
        }

        col.appendChild(select);

        //map maken voor de verschillende id's om later values uit te halen
        map.set(key, "");
        kenmerken[key] = "";

        //unieke id geven aan elke select die aangemaakt wordt:
        select.setAttribute("id", key);

    } catch (error) {
        console.log("There was an error " + error);
    }
    //als een selectbox aangemaakt is, dan nog een nagaan of deze al een waarde heeft in localstorage.
    getStorage(key);
}

//functie voor selectbox op het laatst ingegeven waarde te plaatsen indien er eentje is
function getStorage(key) {
    let parsedKenmerken;
    try {
        //localstorage ophalen en verwerken in de verwschillende selects
        parsedKenmerken = JSON.parse(localStorage.getItem("kenmerken"));
        if (parsedKenmerken[key] != null) {
            let storageKenmerk = parsedKenmerken[key];
            let select = document.getElementById(key);
            let length = select.options.length;
            for (let i = 0; i < length; i++) {
                let option = select.options[i];
                if (option.textContent === storageKenmerk) {
                    select.selectedIndex = i;
                    break;
                }
            }
        }

    } catch (error) {
        console.log("Kon niet aan localstorage: " + error)
    }
}

//alle aangeduide kenmerken terug op onbekend zetten en localstorage clearen.
function resetKenmerken() {
    for (let key of Object.keys(kenmerken)) {
        //alle opties op onbekend plaatsen
        let select = document.getElementById(key);
        select.selectedIndex = 0;

        //alle values in de property kenmerken op null
        kenmerken[key] = null;
    }

    //localstorage op default plaatsen
    //2 manieren:

    //localstorage bestaat nog, maar alle waarden zijn null.
    localStorage.setItem("kenmerken", JSON.stringify(kenmerken));

    //localstorage clearen -> hier zal dan een error gecatched moeten worden aangezien localstorage voor de verschillende kenmerken niet meer zal bestaat
    //localStorage.clear();

    //gegeven vogels zeer verwijderen
    resultatenRow.innerHTML = "";
}

//functie om de vogels die overeenkomen met de kenemerken te tonen
function showBirds() {
    //voor elke key/selectbox de juist selected option opslaan in globale var kenemerken.
    for (let key of map.keys()) {
        let option = document.getElementById(key);

        if (option.options[option.selectedIndex].text != "onbekend") {
            kenmerken[key] = option.options[option.selectedIndex].text;
        } else {
            kenmerken[key] = null
        }
    }

    //juiste birds vragen aan databank die overeen komen met de aangeduide kenmerken
    getCorresponginBirds().then(response => {
        getBirds(response);
    });
}

//FUNCTIE VOOR GETVGELSDOORUITERLIJK
async function getCorresponginBirds() {
    //opslaan in localstorage
    localStorage.setItem("kenmerken", JSON.stringify(kenmerken));

    try {
        //posten aan databank welke kenmerken werden aangeduid en de gekregen waarde returnen
        const response = await fetch("/getvogelsdooruiterlijk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(kenmerken)

        }).catch(error => {
            console.log("There was an error trying to post: " + error);
        })
        return await response.json()

    } catch (error) {
        console.log("There was an error trying to post: " + error);
    }
}

//functie voor buttons aan te maken voor de vogels die overeen komen met de kenemerken
function getBirds(birds) {
    //resultatenRow eerst leeg maken
    resultatenRow.innerHTML = "";

    if (birds.length > 0) {
        //INDIEN ER VOGELS ZIJN GEVONDEN, VOOR ELK VOGEL EEN BUTTON AANMAKEN
        for (let bird of birds) {
            //button zelf maken
            let button = document.createElement("button");
            //klassenaam geven die verbonden is met css
            button.setAttribute("class", "lightButton")
            //andere naam geven zodat css apart is van de default button-28
            button.setAttribute("name", "vogelOpties");
            //value is de naam van de vogel
            button.textContent = bird;
            button.style.margin = "5px";
            //eventlistener, indien erop gedrukt wordt, redirecten naar de juiste vogelinfo pagina
            button.addEventListener('click', function () {
                location.href = "info?vogel=" + bird
            });

            resultatenRow.appendChild(button)
        }
    } else {
        //INDIEN ER GEEN VOGELS ZIJN MET DE INGEGEVEN KENMERKEN, DE GEBRUIKER DIT LATEN WETEN DOOR EEN KLEIN TEKSTJE TE TONEN
        let tekst = makeText("h3","We hebben helaas geen data over vogels met de ingegeven kenmerken." )
        tekst.style.marginBottom = "50px";
        resultatenRow.appendChild(tekst);
    }
}