const express = require("express");
const router = express.Router();


// Controllers
const courseController = require("../controllers/course-controller");
const lectureController = require("../controllers/lecture-controller");
const reviewController = require("../controllers/review-controller");



// Middlewares
const authMiddleware = require("../middlewares/auth-middleware");


// ----------------------------------------- Course Routers  ---------------------------------------------

// Course Create
router
    .route("/create")
    .post(authMiddleware, courseController.createCourse)

// Fetch creator created course
router
    .route("/fetch-creator-course")
    .get(authMiddleware, courseController.getCreatorCourse)


// Edit creator created course
router
    .route("/edit/:id")
    .put(authMiddleware, courseController.editCourse)


// Fetch creator particular created course (get course by id)
router
    .route("/get/:id")
    .get(authMiddleware, courseController.getCourseById)


// Search Courses
router.route("/search")
    .get(courseController.filterCourses)


// Recommend Courses

router.route("/recommend/course/:courseId")
    .get(courseController.getRecommendedCourses)

// -------------------------------------------------- Lecture Routers ---------------------------------------------

// Create Lecture
router
    .route("/create-lecture/:id") // Here id is courseId
    .post(authMiddleware, lectureController.createLecture)


// Fetch All Lectures
router
    .route("/fetch-lectures/:id") // Here id is courseId
    .get(authMiddleware, lectureController.fetchCourseAllLecture)


// Edit Lecture
router
    .route("/:courseId/lecture/edit/:lectureId")
    .post(authMiddleware, lectureController.editLecture);


// Get Lecture By Id
router
    .route("/lecture/:lectureId")
    .get(authMiddleware, lectureController.getLectureById);


// Remove Lecture
router
    .route("/lecture/remove/:lectureId")
    .delete(authMiddleware, lectureController.removeLecture);


// Toggle Publish Course
router
    .route("/publish/:courseId")
    .put(authMiddleware, courseController.togglePublishCourse)


// Get All Publish Course
router
    .route("/publish")
    .get(courseController.getPublishedCourse)


// ----------------------------------------- Review Routers  ---------------------------------------------

// Give review
router
    .route("/review")
    .post(authMiddleware, reviewController.reviews)



// Get All Reviews of a Course
router
    .route("/get-review/:courseId")
    .get(reviewController.getReviews)


// Get All Publish Course
router
    .route("/get-all-review")
    .get(reviewController.getAllReviews)

module.exports = router; 
