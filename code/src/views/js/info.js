let urlParams
let vogel
let afbeelding
let titel
let infoBlok
let kaart
let spotInfo


const placeholderImageId= "images/ImagePlaceHolder.png"

function init()
{
    infoBlok = document.getElementById("BirdInfo")
    urlParams = new URLSearchParams(window.location.search);
    vogel = urlParams.get('vogel');
    afbeelding = document.getElementById("image")
    titel = document.getElementById("vogelTitel")
    kaart = document.getElementById("kaart")
    spotInfo = document.getElementById("spotInfo")
    fetch(`/vogels/${vogel}`).then(response=>response.json()).then(data => {
        if (data.length == 0) {
            toonErrors();
        } else {
            toonBirdInfo(data)
        }
    })
}

function toonBirdInfo(dataArray){
    let data = dataArray[0]
    toonAfbeelding(afbeelding,data.bron);
    //zet titel
    titel.innerHTML = `${data.nederlandse_naam} <br> <h4  class="text-muted">${data.familie} ${data.soort}</h4>`
    // zet info
    zetInfoLijst(data);
    zetSpotInfo(data);
}

function toonErrors()
{
    titel.innerHTML = `Helaas! <br> <h4  class="text-muted">Dit vogeltje is gaan vliegen</h4>`
    infoBlok.innerHTML = `<p class="lead"> Helaas is er geen data beschikbaar over deze vogel. Controleer of de naam correct is geschreven. </p>`
    toonAfbeelding(afbeelding,null);
    spotInfo.innerHTML = `<p style="font-weight: bolder;font-size: 48px" >Nog niemand zag dit vogeltje</p>`
}


function zetInfoLijst(data)
{   let dataNames = ["Naam","Familie","Soort","Grootte","Spanwijdte","Geluid","Manier van vliegen"]
    let dataValues = [data.nederlandse_naam,data.familie,data.soort,data.grootte_min&&data.grootte_max?data.grootte_min+" - "+data.grootte_max+" cm":null ,data.spanwijdte_min&&data.spanwijdte_max?data.spanwijdte_min+" - "+data.spanwijdte_max+" cm":null ,data.geluid?"\""+data.geluid+"\"":null,data.vlieg_manier]
    let str= `<ul class="list-inline"> `
    for(let index in dataValues)
    {
        if(dataValues[index]!=null)
        {
            str +=`<li  class="list-group-item disabled"><p  class="lead" > <span class="infoType">${dataNames[index]}: </span> ${dataValues[index]}</p></li>`
        }
    }
    str+= `</ul>`
    infoBlok.innerHTML =str
}


function zetSpotInfo()
{
    let spotSuffix = " spottingen!"
    spotInfo.innerHTML = `<p style="font-weight: bolder;font-size: 48px" id="aantal"></p>
                <p style="font-weight: lighter;line-height: 25px;font-size: 12px" id="tekst"></p>
                <p style="font-weight: bolder;line-height: 0px;font-size: 24px" id="laatst"> </p>
                <br>
                <input id="button" class=" lightButton" type="button" value="Voeg spotting toe"/>`
    fetch(`/spottings/${vogel}`).then(data=>data.json()).then(data=>{
        if(data.length==1)
            spotSuffix = " spotting!"
        document.getElementById("aantal").innerHTML= data.length + spotSuffix
    })
    getLatestSpotting().then((data)=>{
        if(data!=null)
        {
            document.getElementById("tekst").innerHTML="Laatst gespot op";
            document.getElementById("laatst").innerHTML = data.toString();
        }
    })
    //zorgt dat de knop werkt
    document.getElementById("button").onclick =function () {window.location.href="/voegSpotting?vogel="+vogel.toString()}
}


function toonAfbeelding(afb, bron)
{      let srcString = bron
    if(bron!=null)
        srcString = bron.link
    let str = `<img id="image"  src="${srcString}" src="SomeImage.jpg" onerror="this.onerror=null; this.src='${placeholderImageId}'"  alt="Dit vogeltje is gaan vliegen" class="featurette-image img-fluid mx-auto"  style="width: 500px; hei  ght: 500px;">`
    if(bron!=null)
    {
        str+=` <figcaption class="figure-caption"><a  class="figure-caption" href="${bron.bron}">Bron afbeelding</a></figcaption>`
    }
    afb.innerHTML=str
}

async function getLatestSpotting(){
    let response = await fetch(`/latestdate/${vogel}`)
    let data = await response.json()
    if(data.length!=0)
        return data[0].datum.substring(0, 10);
    else
        return null;
}

init()