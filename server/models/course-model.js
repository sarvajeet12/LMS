const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true
    },
    subTitle: {
        type: String
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    courseLevel: {
        type: String,
        enum: ["Beginner", "Medium", "Advance"]
    },
    coursePrice: {
        type: Number
    },
    courseThumbnail: {
        type: String
    },
    enrolledStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture"
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]

}, { timestamps: true })

module.exports = mongoose.model("Course", courseSchema);