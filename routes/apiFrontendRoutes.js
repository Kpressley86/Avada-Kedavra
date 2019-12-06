
var resData = require("../public/data/resData");

module.exports = function (app) {
    // When the user completes the reservation form 
    app.post("/api/reservations", function (req, res) {
        if (resData.length < 5) {
            resData.push(req.body);
            res.json(true);
        }
        else {
            // if the selected day is full, add the user to the waiting list 

        }
    })
};