
let x;
let y;

let marker;

function addMarker(lng, lat){
    if(marker !== undefined){
        marker.remove();
    }
    x = lng;
    y = lat;
    marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);

}

mapboxgl.accessToken = 'pk.eyJ1IjoiamVkbmJlcmciLCJhIjoiY2xlempqdzVrMGZtYjNyczJmemhqanRpMSJ9.VrRft4jMv_hvnPSaWIu4Ng';
const map = new mapboxgl.Map({
    container: 'map', // container ID
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [3.34, 51.05], // starting position [lng, lat] gecentreerd in Belgie
    zoom: 9 // starting zoom


});

let inputLat = document.getElementById("inputLat");
let inputLong = document.getElementById("inputLong");

let lat;
let long;

map.on('click', function(e) {
    // cooridnaten opvragen vanuit een clickevent
    var coordinates = e.lngLat;



    //market toevoegen op de coordinaten waarop de gebruiker heeft geclickt
    addMarker(coordinates.lng,coordinates.lat)

    lat = coordinates.lat;
    long = coordinates.lng;

    inputLat.value = lat
    inputLong.value = long

});

map.addControl(new mapboxgl.NavigationControl());