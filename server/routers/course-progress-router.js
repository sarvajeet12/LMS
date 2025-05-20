const express = require("express");
const router = express.Router();


// Controllers
const courseProgressController = require("../controllers/course-progress-controller")


// Middlewares
const authMiddleware = require("../middlewares/auth-middleware");



// Get course progress
router
    .route("/:courseId")
    .get(authMiddleware, courseProgressController.getCourseProgress)


// Update Lecture Progress
router
    .route("/:courseId/lecture/:lectureId/view")
    .post(authMiddleware, courseProgressController.updateLectureProgress)


// Mark as complete
router
    .route("/:courseId/complete")
    .post(authMiddleware, courseProgressController.markAsComplete)


// Mark as incomplete
router
    .route("/:courseId/incomplete")
    .post(authMiddleware, courseProgressController.markAsInComplete)



module.exports = router; 
