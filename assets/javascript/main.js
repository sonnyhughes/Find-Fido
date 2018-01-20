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
        var LocationInput = $("#addr").val().trim();
        var MissingDateInput = $("#dogMissingDateInput").val().trim();
        var MissingTimeInput = $("#dogMissingTimeInput").val().trim();
        var ContactEmail = $("#userContactEmail").val().trim();
        var commentInput = $("#userComment").val().trim();


        // Check variable inputs
        console.log(LostFoundInput);
        console.log(BreedInput);
        console.log(ColorInput);
        console.log(WeightInput);
        console.log(LocationInput);
        console.log(MissingDateInput);
        console.log(MissingTimeInput);
        console.log(ContactEmail);
        console.log(commentInput);


        // Creates object from input fields and pushes to firebase
        var newDog = {
            lostFound:  LostFoundInput,
            breed: BreedInput,
            color: ColorInput,
            location: LocationInput,
            missingDate: MissingDateInput,
            missingTime: MissingTimeInput,
            contactEmail: ContactEmail,
            comment: commentInput
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
        $("#userComment").val("");

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
        var firebaseComment = childSnapshot.val().commentInput;


        // Append dog info to table on page
        $("#dogTable > tbody").append("<tr><td>" + firebaseLostFound + "</td><td>" + firebaseBreed + "</td><td>" + firebaseColor + "</td><td>" + firebaseLocation + "</td><td>" + firebaseMissingDate + "</td><td>" + firebaseMissingTime + "</td><td>" + firebaseContactEmail + "</td><td>" + firebaseComment + "</td></tr>");

    });
});




