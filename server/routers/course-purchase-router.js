const express = require("express");
const router = express.Router();


// Controllers
const coursePurchaseControllers = require("../controllers/course-purchase-controller")


// Middlewares
const authMiddleware = require("../middlewares/auth-middleware");



// Capture Payment
router
    .route("/capture-payment")
    .post(authMiddleware, coursePurchaseControllers.capturePayment)


// Verified Payment
router
    .route("/verified-payment")
    .post(coursePurchaseControllers.verifySignature)



// Course Details with payment status
router
    .route("/course/:courseId/details-with-status")
    .get(authMiddleware, coursePurchaseControllers.getCourseDetailWithPurchaseStatus)


// Get all purchased courses
router
    .route("/courses")
    .get(authMiddleware, coursePurchaseControllers.getAllPurchasedCourse)


// Get Course of Instructor By Id
router
    .route("/instructor-courses")
    .get(authMiddleware, coursePurchaseControllers.getCourseOfInstructorById)


// Get Course of Instructor By Id
router
    .route("/instructors")
    .get(authMiddleware, coursePurchaseControllers.getAllRegisterInstructor)

// Get Course of Instructor By Id By Params
router
    .route("/instructor/:instructorId")
    .get(authMiddleware, coursePurchaseControllers.getCourseOfInstructorByIdByParams)


module.exports = router; 
