const reviewModel = require("../models/review-model");
const courseModel = require("../models/course-model");


// -------------------------------------------------- Add a review to a course --------------------------------------------------
const reviews = async (req, resp) => {
    try {

        const { courseId, rating, reviewDescription } = req.body;
        const userId = req.id;

        // Check if the user has already reviewed the course
        const existingReview = await reviewModel.findOne({ courseId, userId });
        if (existingReview) {
            return resp.status(400).json({ success: false, message: "You have already reviewed this course" });
        }

        // Create a new review
        const newReview = await reviewModel.create({
            courseId,
            userId,
            reviewDescription,
            rating
        })

        const course = await courseModel.findById(courseId);
        if (course) {
            course.reviews.push(newReview._id);
            await course.save();
        }

        resp.status(201).json({ success: true, message: "Review added successfully", response: newReview });


    } catch (error) {
        console.error("Error in reviews controller:", error);
        resp.status(500).json({ success: false, message: "Internal server error", response: error.message });
    }
}



// -------------------------------------------------- Get all reviews of a course --------------------------------------------------
const getReviews = async (req, resp) => {
    try {
        const { courseId } = req.params;
        const reviews = await reviewModel.find({ courseId }).populate({ path: "userId", populate: { path: "additionalDetails" } });

        resp.status(200).json({ success: true, message: "Reviews fetched successfully", response: reviews });
    } catch (error) {
        console.error("Error in getReviews controller:", error);
        resp.status(500).json({ success: false, message: "Internal server error", response: error.message });
    }
}


// -------------------------------------------------- Get all reviews --------------------------------------------------
const getAllReviews = async (req, resp) => {
    try {
        const reviews = await reviewModel.find().populate({ path: "userId", populate: { path: "additionalDetails" } })

        if (reviews.length === 0) {
            return resp.status(404).json({ success: false, message: "No reviews found" });
        }

        resp.status(200).json({ success: true, message: "Reviews fetched successfully", response: reviews });
    } catch (error) {
        console.error("Error in getAllReviews controller:", error);
        resp.status(500).json({ success: false, message: "Internal server error", response: error.message });
    }
}

module.exports = { reviews, getReviews, getAllReviews };
