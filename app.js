// access map
const map = L.map('map').setView([0,0], 1);

// create tilelayer

const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const tile_url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tile_url, {attribution});

tiles.addTo(map);

// seting icon
const issIcon = L.icon({
    iconUrl: 'ISS.png',
    iconSize: [50, 35],
    iconAnchor: [25, 16],
});

// marker
const marker = L.marker([0,0], { icon : issIcon}).addTo(map);


let api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getISS() {
    
    const response = await fetch(api_url);
    const data = await response.json();
    const {latitude, longitude} = data;

    // updateing marker
    marker.setLatLng([latitude, longitude]);

    document.getElementById("lat").textContent = latitude;
    document.getElementById("lon").textContent = longitude;
}

setInterval( getISS, 2000);