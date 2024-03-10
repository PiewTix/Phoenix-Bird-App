/*
deze functie zorgt er voor dat je geen datum in de toekomst
kan aanduiden op de pagina als je moet ingeven wanneer je de vogel hebt gespot
 */
function dateLimit() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementById("inputDate").setAttribute('max', today);

}

dateLimit()

/*
vogelnaam opvragen vanuit de url
dit wordt gebruikt wanneer je wordt verwezen vanuit de
infoPage wanneer de gebruiker klikt op de "spotting toevoegen" knop.
Dit zorgt er voor dat de vogel in kwestie hier automatisch correct wordt ingevuld

 */
let urlParams = new URLSearchParams(window.location.search);
let defaultVogel = urlParams.get('vogel');

let input = document.getElementById("inputSearch2")
input.addEventListener('input', validateForm);
if (defaultVogel != null) {
    console.log(defaultVogel)
    input.value = defaultVogel.toString();
    const event = new Event('input')
    input.dispatchEvent(event)
}
input.onkeyup = () => {
    input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1)

}

// deze functie valideert de vogelnaam
// Het gedrag van deze functie is niet gelijklopend met dat van "validateSearch", dus werd er een aparte functie voor gemaakt
function validateForm(event) {

    event.preventDefault()

    let found = false

    fetch("/vogels").then(response => response.json()).then((data) => {
        for (let i = 0; i < data.length; i++) {

            if (input.value == data[i].nederlandse_naam) {
                found = true
            }
        }
        return found

    }).then(found => verwerk(found))

    function verwerk(found) {

        if (found) {
            //borderkleur wordt groen als de vogelnaam correct is
            input.style.borderColor = "#198754"
        } else {
            //borderkleur wordt rood als de vogelnaam een fout bevat
            input.style.borderColor = "red"

        }
    }
}

// eventhandler opzetten voor de submit knop
let submit = document.getElementById("submit")
submit.addEventListener("click", validateSubmit);

// DOM structuur elementen ophalen
let inputDate = document.getElementById("inputDate");
let error = document.getElementById("error")
let success = document.getElementById("success")
let successContainer = document.getElementById("success-message")


// de velden moeten eerst gevalideerd worden voordat de spotting op de server mag toegevoegd worden

function validateSubmit() {
    successContainer.setAttribute("hidden", '')
    let lat = document.getElementById("inputLat");
    let long = document.getElementById("inputLong");

    let username = document.getElementById("inputUsername");

    // alle input fields checken

    if (input.style.borderColor != "rgb(25, 135, 84)") {

        error.innerText = "Verkeerde vogelnaam"

    } else if (lat.value == "" || long.value == "") {
        error.innerText = "Geen coördinaten opgegeven"
    } else if (!inputDate.value) {
        error.innerText = "Geen datum ingegeven"
    }

    // hier: alle velden zijn geldig
    else {

        error.innerText = ""

        let vogel = input.value;

        let spotting = {
            "locatie_breedte": 0,
            "locatie_lengte": 0,
            "date_string": "2023-05-04",
            "nederlandse_naam": vogel

        }

        spotting.locatie_breedte = parseFloat(lat.value);
        spotting.locatie_lengte = parseFloat(long.value);

        spotting.date_string = inputDate.value

        if (username.value != "") {
            spotting.gebruiker = username.value
        }


        // voeg toe op de server
        addSpotting(spotting)

    }
}

// de functie diie een POST req maakt naar de server om de spotting toe te voegen op de site
function addSpotting(spotting) {

    fetch('/spottings', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(spotting)
    }).then(() => {
        successContainer.removeAttribute("hidden");
        success.innerText = "Uw spotting is succesvol toegevoegd."
    }).catch(() => console.log("error with POST"))

}