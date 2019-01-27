const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    first_name: { type: String, required: true },
    middle_name: { type: String, default: null },
    last_name: { type: String, required: true },
    user_pic: { type: String, default: null},
    birthdate: { type: String, default: null},
    age: { type: Number, default: null},
    created_date: { type: Date, default: Date.now },
    last_modified_date: { type: Date, default: Date.now }
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;