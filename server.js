// SafeBook Config
// import { url_dev } from './routes/config';
const config = require ('./routes/config')
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
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) return res.send(200);
    else return next()
  })
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Routes
app.use(routes);

// Connect to Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/safebook", { useNewUrlParser: true })
mongoose.connect(process.env.MONGODB_URI || config.url_dev, { useNewUrlParser: true })

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});