const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    contactNumber: {
        type: String,
        trim: true
    },
    about: {
        type: String,
        trim: true
    },
    experience: {
        type: String,
    },
    profession: {
        type: String,
    },

});

module.exports = mongoose.model("Profile", profileSchema);