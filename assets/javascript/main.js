$(document).ready(function(){
    
    // Firebase
    var dogData = new Firebase("https://nwuproject1.firebaseio.com/");

    // Button to add Dogs
    $("#addDog").on("click", function(){

        // Parses input values and attaches them to a variable
        
        var LostFoundInput = $("#dogLostFoundInput").val().trim();
        var BreedInput = $("#dogBreedInput").val().trim();
        var ColorInput = $("#dogColorInput").val().trim();
        var WeightInput = $("#dogWeightInput").val().trim();
        var LocationInput = $("#dogLocationInput").val().trim();
        var MissingDateInput = $("#dogMissingDateInput").val().trim();
        var MissingTimeInput = $("#dogMissingTimeInput").val().trim();
        var ContactEmail = $("#userContactEmail").val().trim();

        // var dogName = $("#dogNameInput").val().trim();
        // var lineName = $("#lineNumberInput").val().trim();
        // var destination = $("#addr").val().trim();
        // var dogTimeInput = moment($("#dogTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;

        // Check variable inputs
        console.log(LostFoundInput);
        console.log(BreedInput);
        console.log(ColorInput);
        console.log(WeightInput);
        console.log(LocationInput);
        console.log(MissingDateInput);
        console.log(MissingTimeInput);
        console.log(ContactEmail);

        // console.log(dogName);
        // console.log(lineName);
        // console.log(destination);
        // console.log(dogTimeInput);

        // Creates object from input fields and pushes to firebase
        var newDog = {
            lostFound:  LostFoundInput,
            breed: BreedInput,
            color: ColorInput,
            location: LocationInput,
            missingDate: MissingDateInput,
            missingTime: MissingTimeInput,
            contactEmail: ContactEmail,
        }


        // var newDog = {
        //     name:  dogName,
        //     line: lineName,
        //     destination: destination,
        //     dogTime: dogTimeInput,
        // }

        dogData.push(newDog);

        // Resets the input values after data is pushed
        
        $("#dogLostFoundInput").val("");
        $("#dogBreedInput").val("");
        $("#dogColorInput").val("");
        $("#dogWeightInput").val("");
        $("#dogLocationInput").val("");
        $("#dogMissingDateInput").val("");
        $("#dogMissingTimeInput").val("");
        $("#userContactEmail").val("");

        // $("#dogNameInput").val("");
        // $("#lineNumberInput").val("");
        // $("#addr").val("");
        // $("#dogTimeInput").val("");

        // Prevents page refresh
        return false;
    });


    // Event function 
    dogData.on("child_added", function(childSnapshot, prevChildKey){

        console.log(childSnapshot.val());

        // assign firebase variables to snapshots.
        
        var firebaseLostFound = childSnapshot.val().lostFound;
        var firebaseBreed = childSnapshot.val().breed;
        var firebaseColor = childSnapshot.val().color;
        var firebaseLocation = childSnapshot.val().location;
        var firebaseMissingDate = childSnapshot.val().missingDate;
        var firebaseMissingTime = childSnapshot.val().missingTime;
        var firebaseContactEmail = childSnapshot.val().contactEmail;


        // var firebaseName = childSnapshot.val().name;
        // var firebaseLine = childSnapshot.val().line;
        // var firebaseDestination = childSnapshot.val().destination;
        // var firebaseDogTimeInput = childSnapshot.val().dogTime;
        // var firebaseFrequency = childSnapshot.val().frequency;
        
        // var diffTime = moment().diff(moment.unix(firebaseDogTimeInput), "minutes");
        // var timeRemainder = moment().diff(moment.unix(firebaseDogTimeInput), "minutes") % firebaseFrequency ;
        // var minutes = firebaseFrequency - timeRemainder;

        // var nextDogArrival = moment().add(minutes, "m").format("hh:mm A"); 
        
        // Test for correct times and info
        // console.log(minutes);
        // console.log(nextDogArrival);
        // console.log(moment().format("hh:mm A"));
        // console.log(nextDogArrival);
        // console.log(moment().format("X"));

        // Append dog info to table on page

        $("#dogTable > tbody").append("<tr><td>" + firebaseLostFound + "</td><td>" + firebaseBreed + "</td><td>" + firebaseColor + "</td><td>" + firebaseLocation + "</td><td>" + firebaseMissingDate + "</td><td>" + firebaseMissingTime + "</td><td>" + firebaseContactEmail + "</td></tr>");


        // $("#dogTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextDogArrival + "</td><td>" + minutes + "</td></tr>");

    });
});




