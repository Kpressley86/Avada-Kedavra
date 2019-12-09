$(document).ready(function() {
  // Get references to page elements
  var $exampleText = $("#example-text");
  var $exampleDescription = $("#example-description");
  var $submitBtn = $("#submit");
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

  //   [{ name: "1337 H4x0r", type: "TRIPPLE IPA", abv: "10.0%", location: "Colorado", cost: "$9.00" },
  //   { name: "Admiral Abyss", type: "Chocolate Stout", abv: "7.0%", location: "Colorado", cost: "$6.00" },
  //   { name: "Alpha Twins", type: "Double IPA", abv: "8.25%", location: "Colorado", cost: "$7.00" },
  //   { name: "Haole Bartender", type: "Sour", abv: "6.0%", location: "Ccolorado", cost: "$5.00" },
  //   { name: "Fresh Haze", type: "IPA", abv: "6.5%", location: "Oregon", cost: "$5.00" },
  //   { name: "Mirror pond", type: "Pale Ale", abv: "5.0%", location: "Oregon", cost: "$5.00" },
  //   { name: "Black Butte", type: "Porter", abv: "5.2%", location: "Oregon", cost: "$5.00" },
  //   { name: "Obsidian", type: "Stout", abv: "6.4%", location: "Oregon", cost: "$5.00" },
  //   { name: "Oatis", type: "Stout", abv: "7.0%", location: "Oregon", cost: "$6.00" },
  //   { name: "Dawn of the Red", type: "Red IPA", abv: "7.0%", location: "Oregon", cost: "$6.00" },
  //   { name: "Pacific Rain", type: "Pale Ale", abv: "5.4%", location: "Oregon", cost: "$5.00" },
  //   { name: "RPM", type: "IPA", abv: "6.5%", location: "Oregon", cost: "$6.00" },
  //   { name: "Skunk Ape", type: "IRA", abv: "6.0%", location: "Oregon", cost: "$5.00" },
  //   { name: "Armored Fist", type: "IDA", abv: "9.0%", location: "Oregon", cost: "$7.00" },
  //   { name: "Moon Juice", type: "IPA", abv: "7.3%", location: "Arizona", cost: "$6.00" },
  //   { name: "Juicy Jack", type: "Hazy IPA", abv: "6.5%", location: "Arizona", cost: "$5.00" },
  //   { name: "1920", type: "Lager", abv: "4.7%", location: "Arizona", cost: "$4.00" },
  //   { name: "Coors Light", type: "Light Beer", abv: "4.2%", location: "Colorado", cost: "$4.00" },
  //   { name: "Bud Light", type: "Light Beer", abv: "5.0%", location: "USA", cost: "$4.00" },
  //   { name: "Nebula", type: "Stout", abv: "6.0%", location: "Oregon", cost: "$5.00" },
  //   { name: "Blocktoberfest", type: "Marzen", abv: "5.5%", location: "Oregon", cost: "$5.00" },
  //   { name: "Dark Matter", type: "Chocolate Porter", abv: "5.0%", location: "Oregon", cost: "$5.00" },
  //   { name: "Drive Me To Firenze", type: "Pilsner", abv: "4.7%", location: "Oregon", cost: "$5.00" },
  //   { name: "Imagine", type: "Imperial Stout", abv: "13.5%", location: "Oregon", cost: "$9.00" },
  //   { name: "Oud Bruin", type: "Brown Ale", abv: "6.5%", location: "Oregon", cost: "$6.00" },
  //   { name: "Specular Relfections", type: "Belgian Double", abv: "6.5%", location: "Oregon", cost: "$6.00" },
  //   { name: "Summer Amusement", type: "Saison", abv: "4.5%", location: "Oregon", cost: "$4.00" },
  //   { name: "Wandelpad", type: "Blonde", abv: "6.3%", location: "Oregon", cost: "$5.50" },
  //   { name: "Crush", type: "Sour", abv: "5.0%", location: "Oregon", cost: "$5.00" },
  //   { name: "Apocalypse", type: "IPA", abv: "6.8%", location: "Oregon", cost: "$6.50" }
  // ],

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
  }
  writeTable();
});
