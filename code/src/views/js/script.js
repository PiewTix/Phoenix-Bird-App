let datalist = document.getElementById("vogels")

fetch("/vogels").then(response=>response.json()).then((data)=>addDatalist(data))

function addDatalist(data){

    for(let el of data){
        let option = document.createElement("option")
        option.value= el.nederlandse_naam
        datalist.appendChild(option)
    }
}
