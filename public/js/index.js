$(document).ready(function () {
  // Get references to page elements
  var $exampleText = $("#example-text");
  var $exampleDescription = $("#example-description");
  var $exampleList = $("#example-list");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveExample: function (example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/examples",
        data: JSON.stringify(example)
      });
    },
    getExamples: function () {
      return $.ajax({
        url: "api/examples",
        type: "GET"
      });
    },
    deleteExample: function (id) {
      return $.ajax({
        url: "api/examples/" + id,
        type: "DELETE"
      });
    }
  };

  // refreshExamples gets new examples from the db and repopulates the list
  var refreshExamples = function () {
    API.getExamples().then(function (data) {
      var $examples = data.map(function (example) {
        var $a = $("<a>")
          .text(example.text)
          .attr("href", "/example/" + example.id);

        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": example.id
          })
          .append($a);

        var $button = $("<button>")
          .addClass("btn btn-danger float-right delete")
          .text("ｘ");

        $li.append($button);

        return $li;
      });

      $exampleList.empty();
      $exampleList.append($examples);
    });
  };

  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function (event) {
    event.preventDefault();

    var example = {
      text: $exampleText.val().trim(),
      description: $exampleDescription.val().trim()
    };

    if (!(example.text && example.description)) {
      alert("You must enter an example text and description!");
      return;
    }

    API.saveExample(example).then(function () {
      refreshExamples();
    });

    $exampleText.val("");
    $exampleDescription.val("");
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteExample(idToDelete).then(function () {
      refreshExamples();
    });
  };

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $exampleList.on("click", ".delete", handleDeleteBtnClick);

  // Array for beers //
  var beer1 = [
    "Codename: Superfan", "IPA", "6.5%", "Colorado", "$5.00",
    "Intergalactic Juice Hunter", "Double IPA", "8.0%", "Colorado", "$6.00",
    "Jetman Jimmy", "Golden Ale", "4.5%", "Colorado", "$4.50",
    "NOOB", "Pale Ale", "6.0%", "Colorado", "$5.00",
    "Vincent Van Couch", "Sour", "4.8%", "Colorado", "$5.00"];

  let beer2 = [
    "1337 H4x0r", "TRIPPLE IPA", "10.0%", "Colorado", "$9.00",
    "Admiral Abyss", "Chocolate Stout", "7.0%", "Colorado", "$6.00",
    "Alpha Twins", "Double IPA", "8.25%", "Colorado", "$7.00",
    "Haole Bartender", "Sour", "6.0%", "Ccolorado", "$5.00",
    "Fresh Haze", "IPA", "6.5%", "Oregon", "$5.00"];

  let beer3 = [
    "Mirror pond", "Pale Ale", "5.0%", "Oregon", "$5.00",
    "Black Butte", "Porter", "5.2%", "Oregon", "$5.00",
    "Obsidian", "Stout", "6.4%", "Oregon", "$5.00",
    "Oatis", "Stout", "7.0%", "Oregon", "$6.00",
    "Dawn of the Red", "Red IPA", "7.0%", "Oregon", "$6.00"];

  let beer4 = [
    "Pacific Rain", "Pale Ale", "5.4%", "Oregon", "$5.00",
    "RPM", "IPA", "6.5%", "Oregon", "$6.00",
    "Skunk Ape", "IRA", "6.0%", "Oregon", "$5.00",
    "Armored Fist", "IDA", "9.0%", "Oregon", "$7.00",
    "Moon Juice", "IPA", "7.3%", "Arizona", "$6.00"];

  let beer5 = [
    "Juicy Jack", "Hazy IPA", "6.5%", "Arizona", "$5.00",
    "1920", "Lager", "4.7%", "Arizona", "$4.00",
    "Coors Light", "Light Beer", "4.2%", "Colorado", "$4.00",
    "Bud Light", "Light Beer", "5.0%", "USA", "$4.00",
    "Nebula", "Stout", "6.0%", "Oregon", "$5.00"];

  let beer6 = [
    "Blocktoberfest", "Marzen", "5.5%", "Oregon", "$5.00",
    "Dark Matter", "Chocolate Porter", "5.0%", "Oregon", "$5.00",
    "Drive Me To Firenze", "Pilsner", "4.7%", "Oregon", "$5.00",
    "Imagine", "Imperial Stout", "13.5%", "Oregon", "$9.00",
    "Oud Bruin", "Brown Ale", "6.5%", "Oregon", "$6.00"];

  let beer7 = [
    "Specular Relfections", "Belgian Double", "6.5%", "Oregon", "$6.00",
    "Summer Amusement", "Saison", "4.5%", "Oregon", "$4.00",
    "Wandelpad", "Blonde", "6.3%", "Oregon", "$5.50",
    "Crush", "Sour", "5.0%", "Oregon", "$5.00",
    "Apocalypse", "IPA", "6.8%", "Oregon", "$6.50"];

  var count = 0;
  var totalCells = 5;

  function writeTable() {
    // cache <tbody> element:
    var tbody = $("#sun");
    for (var i = 0; i < beer1.length / 5; i++) {
      // create an <tr> element, append it to the <tbody> and cache it as a variable:
      var tr = $("<tr/>").appendTo(tbody);
      for (var j = 0; j < totalCells; j++) {
        // append <td> elements to previously created <tr> element:
        tr.append("<td>" + beer1[count] + "</td>");
        count++;
      }
    }
    // reset the count:
    count = 0;

    var tbody = $("#mon");
    for (var i = 0; i < beer2.length / 5; i++) {
      // create an <tr> element, append it to the <tbody> and cache it as a variable:
      var tr = $("<tr/>").appendTo(tbody);
      for (var j = 0; j < totalCells; j++) {
        // append <td> elements to previously created <tr> element:
        tr.append("<td>" + beer2[count] + "</td>");
        count++;
      }
    }
    // reset the count:
    count = 0;

    var tbody = $("#tue");
    for (var i = 0; i < beer3.length / 5; i++) {
      // create an <tr> element, append it to the <tbody> and cache it as a variable:
      var tr = $("<tr/>").appendTo(tbody);
      for (var j = 0; j < totalCells; j++) {
        // append <td> elements to previously created <tr> element:
        tr.append("<td>" + beer3[count] + "</td>");
        count++;
      }
    }
    // reset the count:
    count = 0;

    var tbody = $("#wed");
    for (var i = 0; i < beer4.length / 5; i++) {
      // create an <tr> element, append it to the <tbody> and cache it as a variable:
      var tr = $("<tr/>").appendTo(tbody);
      for (var j = 0; j < totalCells; j++) {
        // append <td> elements to previously created <tr> element:
        tr.append("<td>" + beer4[count] + "</td>");
        count++;
      }
    }
    // reset the count:
    count = 0;

    var tbody = $("#thu");
    for (var i = 0; i < beer5.length / 5; i++) {
      // create an <tr> element, append it to the <tbody> and cache it as a variable:
      var tr = $("<tr/>").appendTo(tbody);
      for (var j = 0; j < totalCells; j++) {
        // append <td> elements to previously created <tr> element:
        tr.append("<td>" + beer5[count] + "</td>");
        count++;
      }
    }
    // reset the count:
    count = 0;

    var tbody = $("#fri");
    for (var i = 0; i < beer6.length / 5; i++) {
      // create an <tr> element, append it to the <tbody> and cache it as a variable:
      var tr = $("<tr/>").appendTo(tbody);
      for (var j = 0; j < totalCells; j++) {
        // append <td> elements to previously created <tr> element:
        tr.append("<td>" + beer6[count] + "</td>");
        count++;
      }
    }
    // reset the count:
    count = 0;

    var tbody = $("#sat");
    for (var i = 0; i < beer7.length / 5; i++) {
      // create an <tr> element, append it to the <tbody> and cache it as a variable:
      var tr = $("<tr/>").appendTo(tbody);
      for (var j = 0; j < totalCells; j++) {
        // append <td> elements to previously created <tr> element:
        tr.append("<td>" + beer7[count] + "</td>");
        count++;
      }
    }
    // reset the count:
    count = 0;

  }
  writeTable();

  // Current Time  Function//

  function currentTime() {
    var current = moment().format('hh:mm:s');
    $("#current-time").html(current);
    setTimeout(currentTime, 1000);
  };

  currentTime();


  //------------ RESERVATION FORM -------------- //

  $("#submit").on("click", function (event) {
    event.preventDefault();

    //gathering all required elemants from the user's reservation submittion
    var newBeerReservation = {
      customerDay: $("#day").val().trim(),
      customerFirstName: $("#firstName").val().trim(),
      customerLastName: $("#lastName").val().trim(),
      customerEmailAddress: $("#email").val().trim(),
    };
var email = $("#email").val().trim();
var day = $("#day").val().trim();
var firstName = $("#firstName").val().trim();

    console.log(newBeerReservation);

    //Creating the API calls 
    $.post("/api/reservations", newBeerReservation,
      function (data) {
        if (data) {
          alert("you have been booked. be on the look out for an email");
        }
        else {
          alert("nope. try a different day")
        }

        //clear the user's input after submitting 
        $("#day").val("");
        $("#firstName").val("");
        $("#lastName").val("");
        $("#email").val("");
      });

    // SEND E-MAIL ALERT // 
    Email.send({
      Host: "https://avada-kedavra2.herokuapp.com/",
      Username: `${firstName}`,
      Password: "password",
      To: `${email}`,
      From: "Avada-Kedavra@theScout.com",
      Subject: "Your Reservation at The Scout",
      Body: `You now have a reservation for ${day}`
    }).then(message => alert(message));

  });
});
