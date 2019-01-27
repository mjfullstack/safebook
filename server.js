// SafeBook

// Express
const express = require("express");

// Mongo
const mongoose = require("mongoose");

// Routes
const routes = require("./routes")

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Routes
app.use(routes);

// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/safebook", { useNewUrlParser: true })

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});