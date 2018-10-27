function findLocation (x,y) {
  for (var i = 0; i < places.length; i++) {
    if (places[i].lokasi[0] == x &&
        places[i].lokasi[1] == y) {
      return i;
    }
  }
  return -1;
}

function showLocation (data) {
  let ix = findLocation(data.latlng.lat, data.latlng.lng);
  if (ix >= 0) {
    img.src = places[ix].gambar;
    par.textContent = places[ix].review;
  }
}

let gmb = document.getElementById('gmb');
let rev = document.getElementById('review');
let img = document.createElement('img');
let par = document.createElement('p');
gmb.appendChild(img);
rev.appendChild(par);

(async function () {
  const url = 'places.json';
  try {
    let res = await fetch(url);
    let data = await res.json();
    localStorage.setItem('places', JSON.stringify(data.places));
  } catch (err) {
    console.log(err);
  }
}( )); // <--- IIFE

let places = JSON.parse(localStorage.getItem('places'));
for (var p of places) {
  var marker = L.marker(p.lokasi)
                .bindPopup(p.sponsor)
                .addTo(mymap);
  marker.on('click', showLocation);
}
