const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// var bcrypt = require( 'bcrypt-nodejs' );

const PostsSchema = new Schema({
    post: String,
    username_posted: String,
    username_page: String,
    created_date: { type: Date, default: Date.now }
});

var Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;