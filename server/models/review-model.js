const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewDescription: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true,
        min: 1,
        max: 5
    },


}, { timestamps: true });


module.exports = mongoose.model('Review', reviewSchema);