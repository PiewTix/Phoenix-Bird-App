const {Observable, ignoreElements} = rxjs;
import {Dbscan} from "/Algoritmen/DBSCAN.js";

import {ConvexHull} from "/Algoritmen/ConvexHull.js";
import {ColorMap} from "./ColorMap.js"



let convex
let subscriber;
let subscriber2;
let subscriber3;

/*
De eerste observable dient om de verschillende clusters door te sturen vanuit DBSCAN.js
 */

let obs = new Observable((observer2) => {

    subscriber = observer2;

});

/*
De tweede observable dient om alle randpunten van de clusters door te sturen, nadat het convexhull
algoritme is toegepast op de clusterpunten
Deze punten zullen dus verwerkt worden op de mapbox
 */

let obs2 = new Observable((observer) => {

    subscriber2 = observer;
    convex = new ConvexHull(subscriber2);

});


/*
De derde observable dient om de noisepunten op te sturen vanuit het DBSCAN algortime
De noisepunten en clusters kunnen zeker niet allebei op dezelfde observable worden opgestuurd!
Nood aan een aparte dataflow
 */


let obs3 = new Observable((observer3) => {

    subscriber3 = observer3;

});


let clusterCount = [];

let index = 0; //indexering voor de verschillende clusters


let color = new ColorMap()


// Deze functie maakt een nieuwe polygon aan adhv de punten die worden meegegeven
// De punten zijn verwerkt door de 2 algoritmes (dbscan en convexhull)

function addCluster(data) {


    let name = "layer" + index
    data = formatCluster(data);
    map.addSource(name, {
        type: 'geojson',
        data: data
    });

    console.log("nieuwe polygon gemaakt" + index);

    map.addLayer({
        'id': name,
        'type': 'fill',
        'source': name,
        'layout': {},
        'paint': {
            'fill-color': color.Cluster,
            'fill-opacity': 0.5
        },
        'minzoom': 5
    });

    // clickEvent voor elke polygon
    // Er kan opgevraagd worden uit hoeveel punten elke cluster bestaat
    map.on('click', name, function(idx) {
        return function(e) {

            var popup = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<p> Aantal spottings: ' + clusterCount[idx] + '</p>')
                .addTo(map);
        }
    }(index));

    index++
}


//De 3de observable verzameld alle noisepunten
//Die punten worden naar deze functie opgestuurd, waarbij er punten worden toegevoegd op de map

function addNoise(data){
    let borderColor = 'white'

    let name = "layer" + index
    data = formatNoise(data);
    map.addSource(name, {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: data
    });

    map.addLayer({
        'id': name,
        'type': 'circle',
        'source': name,
        'paint': {
            'circle-radius': 2,
            'circle-stroke-width': 1,
            'circle-color': color.Noise,
            'circle-stroke-color': borderColor
        }
    });

    index++
}

/* Deze functie formatteerd de data die vanuit het convexHull algoritme wordt verkregn naar
een GeoJSON formaat

 */
function formatCluster(data){

    clusterCount.push(data.pop())

    let obj = {
        'type': 'Feature',
        'geometry': {
            'type': 'Polygon',

            'coordinates': [[]]
        }
    }


    for(let i =0; i <data.length; i++){
        let cor = [];


        cor[0] = data[i].y;
        cor[1] = data[i].x;

        obj.geometry.coordinates[0].push(cor);
    }

    return obj

}
// Deze functie formatteert de noise punten, verkregen door dbscan algoritme, naar een juiste GeoJSON formaat
function formatNoise(data){
    let obj = {
        "type": "FeatureCollection",
        "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
        "features": []
    }

    for(let i =0; i <data.length; i++){
        let point = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [0, 0]
            },
            "properties": {
                "name": "Dinagat Islands"
            }
        }

        point.geometry.coordinates[0] = data[i].y;
        point.geometry.coordinates[1] = data[i].x;

        obj.features.push(point);
    }

    return obj
}




// Aanmaken van de MapBox

mapboxgl.accessToken = 'pk.eyJ1IjoiamVkbmJlcmciLCJhIjoiY2xlempqdzVrMGZtYjNyczJmemhqanRpMSJ9.VrRft4jMv_hvnPSaWIu4Ng';
const map = new mapboxgl.Map({
    container: 'kaart', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/dark-v11', // style URL streets-v12
    projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    zoom: 7, // starting zoom
    center: [

        3.4385915381034877,51.10120033837721
    ] // // starting center in [lng, lat], inzoomen op een centrale plek in Belgie
});

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

map.on('load', () => {


    let loader = document.getElementById("kaartLoader");

    if(loader){

    loader.remove();
    }

    // vogel opvragen vanuit de url
    let urlParams = new URLSearchParams(window.location.search);
    let vogel = urlParams.get('vogel');


    // Alle spotcoordinaten opvragen voor de vogel
    fetch(`/spottings/${vogel}`).then(data=>data.json()).then(points=>{makeClusters(points)});


    let epsilon = 0.06 //epsilon waarde voor dbscan
    let minPts  = 8 //minimum aantal punten voor dbscan


    //De coordinaten van alle spottings doorgeven aan de DBSCAN klasse
    function makeClusters(points){


            let DBSCAN =  new Dbscan(points, epsilon,minPts, subscriber, subscriber3);
            //uitvoeren algoritme
            DBSCAN.dbscan()
    }


    // subscriben op de observable waarop de clusters worden doorgestuurd
    // Data komt binnen telkens wanneer er een nieuwe cluster is gevormd,
    // niet op het einde na het vormen van alle mogelijke clusters

    obs.subscribe((data) => {
        console.log(data)
        // Deze data opvangen en opsturen naar een nieuwe ConvexHull klasse
        convex = new ConvexHull(subscriber2);
        convex.CreateConvexHull(data)
    });

    // subscriben op de observable waarop de punten worden gestuurd na het uitvoeren van het
    // convexhull algoritme
    //Deze data wordt op zijn beurt opgestuurd naar de functie addCluster, die de cluster zal weergeven op de map
    obs2.subscribe((data) => addCluster(data));


    // subscriben op de observable waarop de noisepunten worden opgestuurd.
    // Deze punten worden opgestuurd naar AddNoise, die de punten zal weergeven op de map
    obs3.subscribe(data => addNoise(data));
});

//fullscreen optie toevoegen

map.addControl(new mapboxgl.FullscreenControl({container: document.getElementById("kaart")}));
map.addControl(new mapboxgl.NavigationControl());
