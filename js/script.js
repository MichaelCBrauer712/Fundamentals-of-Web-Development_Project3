// Original JavaScript for every page of the site.

// Restricted Google Maps key: works only on this site and only for the Maps JavaScript API.
var MAPS_KEY = "AIzaSyC4EAdRRC-fydah1HykZHSkTfKDZcTjopk";

var map;
var pins = [];

// Shows today's date in the footer of every page.
function showToday() {
  var today = document.getElementById("today");

  if (today === null) {
    return;
  }

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  today.textContent = "Today is " + new Date().toLocaleDateString("en-US", options) + ".";
}

// Updates the pin counter text on the map page.
function updatePinCount() {
  document.getElementById("pin-count").textContent = "Pins dropped: " + pins.length;
}

// Removes every pin the visitor has dropped.
function clearPins() {
  for (var i = 0; i < pins.length; i++) {
    pins[i].setMap(null);
  }

  pins = [];
  updatePinCount();
}

// Google Maps calls this function once the map library has loaded.
function initMap() {
  var naples = { lat: 26.142, lng: -81.7948 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: naples,
    zoom: 12,
    mapTypeControl: false
  });

  // Feature 1: a marker with an information window.
  var marker = new google.maps.Marker({
    position: naples,
    map: map,
    title: "Naples, Florida"
  });

  var infoWindow = new google.maps.InfoWindow({
    content: "<strong>Naples, Florida</strong><br>Home base for the volleyball and soccer pages."
  });

  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });

  // Feature 2: buttons that switch between the map and satellite views.
  document.getElementById("view-map").addEventListener("click", function () {
    map.setMapTypeId("roadmap");
  });

  document.getElementById("view-satellite").addEventListener("click", function () {
    map.setMapTypeId("hybrid");
  });

  // Feature 3: click the map to drop pins, with a counter and a clear button.
  map.addListener("click", function (event) {
    var pin = new google.maps.Marker({
      position: event.latLng,
      map: map
    });

    pins.push(pin);
    updatePinCount();
  });

  document.getElementById("clear-pins").addEventListener("click", clearPins);
}

// Loads the Google Maps library only on pages that have a map.
function loadMap() {
  if (document.getElementById("map") === null) {
    return;
  }

  var script = document.createElement("script");
  script.src = "https://maps.googleapis.com/maps/api/js?key=" + MAPS_KEY + "&callback=initMap";
  script.async = true;
  document.head.appendChild(script);
}

showToday();
loadMap();
