$(document).ready(function(){
// Firebase
    var dogData = new Firebase("https://nwuproject1.firebaseio.com/");
// Event function 
    dogData.on("child_added", function(childSnapshot, prevChildKey){

       // console.log(childSnapshot.val());

        // assign firebase variables to snapshots.     
        var firebaseLostFound = childSnapshot.val().lostFound;
        var firebaseBreed = childSnapshot.val().breed;
        var firebaseColor = childSnapshot.val().color;
        var firebaseLocation = childSnapshot.val().location;
        var firebaseMissingDate = childSnapshot.val().missingDate;
        var firebaseMissingTime = childSnapshot.val().missingTime;
        var firebaseContactEmail = childSnapshot.val().contactEmail;
        var firebaseComment = childSnapshot.val().commentInput;


        // Append dog info to table on page
        $("#dogTable > tbody").append("<tr><td>" + firebaseLostFound + "</td><td>" + firebaseBreed + "</td><td>" + firebaseColor + "</td><td>" + firebaseLocation + "</td><td>" + firebaseMissingDate + "</td><td>" + firebaseMissingTime + "</td><td>" + firebaseContactEmail + "</td><td>" + firebaseComment + "</td></tr>");

    });
});

function myFunction() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("dogTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map2'), {
    center: { lat: 41.8781, lng: -87.6298 },
    zoom: 12
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      // infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}


// markers.push(marker);

// for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(map);
// }


// markers.push(marker);

// for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(map);
// }