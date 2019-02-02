const mongoose = require("mongoose");
const db = require("../models");

// Empties User collection and seeds DB 

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/safebook", { useNewUrlParser: true }
);

const postsSeed = [
    {
        post: "Mike is awesome.",
        username_posted: "sericson",
        username_page: "sericson",
        created_date: new Date(Date.now())
    },
    {
        post: "Ed is awesome.",
        username_posted: "sericson",
        username_page: "mjohnson",
        created_date: new Date(Date.now())
    }
];

db.Posts
    .remove({})
    .then(() => db.Posts.collection.insertMany(postsSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
