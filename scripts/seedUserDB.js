const mongoose = require("mongoose");
const db = require("../models");

// Empties User collection and seeds DB 

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/safebook", { useNewUrlParser: true }
);

const userSeed = [
    {
        first_name: "Shaun Ericson",
        middle_name: "Duane",
        last_name: "Ericson",
        email: "shaun.ericson@outlook.com",
        username: "sericson",
        password: "12345",
        token: null,
        logged_in_status: false,
        user_id: null,
        user_pic: null,
        birthdate: "1982-04-24",
        age: 36,
        phone_number: null,
        pictures: [],
        created_date: new Date(Date.now()),
        last_modified_date: new Date(Date.now())
        // posts: {
        //     post: "test",
        //     username_posted: "sericson",
        //     created_date: new Date(Date.now())
        // }
    },
    {
        first_name: "Michael",
        middle_name: "Wayne",
        last_name: "Johnson",
        email: "michael.johnson@outlook.com",
        username: "mjohnson",
        password: "12345",
        token: null,
        logged_in_status: false,
        user_id: null,
        user_pic: null,
        birthdate: "1962-09-05",
        age: 56,
        phone_number: null,
        created_date: new Date(Date.now()),
        last_modified_date: new Date(Date.now())
    }
];

db.Users
    .remove({})
    .then(() => db.Users.collection.insertMany(userSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
