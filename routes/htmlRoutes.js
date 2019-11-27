var db = require("../models");

module.exports = function (app){

  // //This is the index.handlebars file
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // //This is the newMember.handlebars file
  app.get("/newMember", function (req, res) {
    res.render("newMember");
  });

  // //This is the memberLogin.handlebars file
  app.get("/memberLogin", function (req, res) {
    res.render("memberLogin");
  }); 

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
