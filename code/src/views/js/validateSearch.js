/*
Deze functie valideert de vogelnaam die in de zoekbalk in de navbar wordt ingetypt
*/
export function validate() {

    let form = document.getElementById("search")


    form.addEventListener('submit', validateForm)
    let input = document.getElementById("inputSearch");

    function validateForm(event) {

        event.preventDefault()

        let vogels = []
        let found = false

        fetch("/vogels").then(response => response.json()).then((data) => {
            for (let i = 0; i < data.length; i++) {

                if (input.value === data[i].nederlandse_naam) {

                    found = true

                }
            }
            return found

        }).then(found => verwerk(found))

        function verwerk(found) {

            if (found) {
                location.href = `/info?vogel=${input.value}`
            } else {


                input.style.borderColor = "red"

            }
        }

    }

}


