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

    // clicking arrows back goes back to form
    $(".previous").on("click", function(){
          //show map
          $("#myModal").modal('show');
          $(".modal2").modal('hide');
          $('body').removeClass('modal-open');               
    });

    // Button to add Dogs
    $("#addDog").on("click", function() {
        
            // hide form modal and show map modal
            $("#myModal").modal('hide');
            $(".modal2").modal('show');
            $(".showMap").addClass("map");

            // Parses input values and attaches them to a variable      
            var LostFoundInput = $("#dogLostFoundInput").val().trim();
            var BreedInput = $("#dogBreedInput").val().trim();
            var ColorInput = $("#dogColorInput").val().trim();
            var WeightInput = $("#dogWeightInput").val().trim();
            var LocationInput = $("#addr").val().trim();
            var MissingDateInput = $("#dogMissingDateInput").val().trim();
            var MissingTimeInput = $("#dogMissingTimeInput").val().trim();
            var ContactEmail = $("#userContactEmail").val().trim();

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
                    });

                    markers.push(marker);


                    var contentString = '<div id="content">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">Lost Dog</h1>'
                        ;
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

            // Creates object from input fields and pushes to firebase
            var newDog = {
                lostFound: LostFoundInput,
                breed: BreedInput,
                color: ColorInput,
                location: LocationInput,
                missingDate: MissingDateInput,
                missingTime: MissingTimeInput,
                contactEmail: ContactEmail,
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

            // Prevents page refresh
            return false;
            
            })

    });