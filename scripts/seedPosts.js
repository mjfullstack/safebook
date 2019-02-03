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
    },

    {
        post: "Heidi is awesome.",
        username_posted: "billy",
        username_page: "heidi",
        created_date: new Date(Date.now())
    },
    {
        post: "Elton is awesome.",
        username_posted: "heidi",
        username_page: "elton",
        created_date: new Date(Date.now())
    },
    {
        post: "Billy is awesome.",
        username_posted: "elton",
        username_page: "billy",
        created_date: new Date(Date.now())
    },
    {
        post: "Howdy is awesome.",
        username_posted: "matt",
        username_page: "howdy",
        created_date: new Date(Date.now())
    },

    {
        post: "Matt is awesome.",
        username_posted: "howdy",
        username_page: "matt",
        created_date: new Date(Date.now())
    },
    {
        post: "Happy is VERY awesome.",
        username_posted: "mjohnson",
        username_page: "happy",
        created_date: new Date(Date.now())
    },

    {
        post: "Michael is awesome.",
        username_posted: "heidi",
        username_page: "mjohnson",
        created_date: new Date(Date.now())
    },
    {
        post: "Michael is awesome.",
        username_posted: "happy",
        username_page: "mjohnson",
        created_date: new Date(Date.now())
    },
    {
        post: "Billy is awesome.",
        username_posted: "times",
        username_page: "billy",
        created_date: new Date(Date.now())
    },
    {
        post: "Dolly is awesome.",
        username_posted: "matt",
        username_page: "dolly",
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
