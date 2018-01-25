$(document).ready(function() {

    // Firebase
    var dogData = new Firebase("https://nwuproject1.firebaseio.com/");

    //maps
    var geocoder;
    var map;
    var markers = [];

    //autocomplete form Google
    function init() {
        var input = document.getElementById('addr');
        var autocomplete = new google.maps.places.Autocomplete(input);
        // $('#my-modal').modal('show');
    }

    google.maps.event.addDomListener(window, 'load', init);

    // Button to add Dogs
    $("#addDog").on("click", function() {

        $(".form-group").hide();

        // Parses input values and attaches them to a variable      
        var LostFoundInput = $("#dogLostFoundInput").val().trim();
        var BreedInput = $("#dogBreedInput").val().trim();
        var ColorInput = $("#dogColorInput").val().trim();
        var WeightInput = $("#dogWeightInput").val().trim();
        var LocationInput = $("#addr").val().trim();
        var MissingDateInput = $("#dogMissingDateInput").val().trim();
        var MissingTimeInput = $("#dogMissingTimeInput").val().trim();
        var ContactEmail = $("#userContactEmail").val().trim();
        // var commentInput = $("#userComment").val().trim();

        //show map
        $(".showMap").addClass("map");
        // $(".modal-body").hide("form").show(".showMap");

      

        //map logic
        var address = $('#addr').val();

        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                //console.log('geocoder results:');
                //console.dir(results);

                var mapOptions = {
                    zoom: 16,
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    },
                    zoomControl: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL
                    },
                    //streetViewControl: false,
                    center: results[0].geometry.location
                }

                map = new google.maps.Map(document.getElementById('map1'), mapOptions);


                //map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    title: LostFoundInput + " dog",
                    label: LostFoundInput,
                    position: results[0].geometry.location,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    // icon: {
                    //     fillColor: '#6331AE',
                    //     fillOpacity: 1,
                    //     strokeColor: '',
                    //     strokeWeight: 0
                    // },
                });

                markers.push(marker);


                var contentString = '<div id="content">' +
                    '<div id="siteNotice">' +
                    '</div>' +
                    '<h1 id="firstHeading" class="firstHeading">Lost Dog</h1>' +
                    '<div id="bodyContent">' +
                    '<p><b>Lost Dog</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                    'sandstone rock formation in the southern part of the ' +
                    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
                    'south west of the nearest large town, Alice Springs;</p>' +
                    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
                    'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
                    '(last visited June 22, 2009).</p>' +
                    '</div>' +
                    '</div>';
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });

            } else {
                alert('Please try a different address.');
            }
        })

        // Check variable inputs
        // console.log(LostFoundInput);
        // console.log(BreedInput);
        // console.log(ColorInput);
        // console.log(WeightInput);
        // console.log(LocationInput);
        // console.log(MissingDateInput);
        // console.log(MissingTimeInput);
        // console.log(ContactEmail);
        // console.log(commentInput);



        // Creates object from input fields and pushes to firebase
        var newDog = {
            lostFound: LostFoundInput,
            breed: BreedInput,
            color: ColorInput,
            location: LocationInput,
            missingDate: MissingDateInput,
            missingTime: MissingTimeInput,
            contactEmail: ContactEmail
            // comment: commentInput,
            //marker: markers[0]
        }


        // Pushes newDog object to Firebase
        dogData.push(newDog);


        // Resets the input values after data is pushed       
        $("#dogLostFoundInput").val("");
        $("#dogBreedInput").val("");
        $("#dogColorInput").val("");
        $("#dogWeightInput").val("");
        $("#addr").val("");
        $("#dogMissingDateInput").val("");
        $("#dogMissingTimeInput").val("");
        $("#userContactEmail").val("");
        // $("#userComment").val("");

        // Prevents page refresh
        return false;
    });


    //Pushes image upload to Firebase Storage
    // var fileButton = document.getElementById('fileButton');
    // fileButton.addEventListener('change', function(e){
    //     var file = e.target.files[0];
    //     var storageRef = firebase.storage().ref('img/'+file.name);
    //     var task = storageRef.put(file);
    // }); 

});