const db = require("../models");

// Methods for usersController
module.exports = {
    findAll: function (req, res) {
        // res.send("test");
        // console.log("test");
        db.Users
            .find(req.query)
            .sort({ last_name: "desc" })
            .then(dbModel => res.json(dbModel))
            // .then(res.send("test"))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Users
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    register: function (req, res) {
        db.Users
            .register(
                req.params.first_name,
                req.params.middle_name,
                req.params.last_name,
                req.params.user_pic,
                req.params.email,
                req.params.username,
                req.params.password,
                req.params.birthdate,
                req.params.age,
                req.params.created_date,
                req.params.last_modified_date
            )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}