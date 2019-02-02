const db = require("../models");

// Methods for postsController
module.exports = {
    findByUserNamePage: function (req, res) {
        db.Posts
            // .find(req.params.id.first_name)
            // console.log("test")
            .find({ username_page: req.params.username })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    findAll: function (req, res) {
        // res.send("test");
        // console.log("test");
        db.Posts
            .find(req.query)
            .sort({ created_date: "desc" })
            .then(dbModel => res.json(dbModel))
        // .then(res.send("test"))

    }
};