var path = require("path");

module.exports = function(app) {

  //When the user vists the home.html page
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/home.html"));
  });

  //when the user visits the reserve page for a day
  app.get("/Reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/Reserve.html"));
  });

  // If no matching route is found default to 404 page
  app.get("404", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/404.html"));
  });
};
