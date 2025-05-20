const express = require("express");
const router = express.Router();


// Controllers
const userControllers = require("../controllers/user-controller")


// Middlewares
const authMiddleware = require("../middlewares/auth-middleware");

// Send Otp
router
    .route("/send-otp")
    .post(userControllers.sendOTP)



// Login Page  
router
    .route("/login").
    post(userControllers.userLogin);


// Logout
router
    .route("/logout")
    .get(userControllers.userLogout);


// Get logged in user details
router
    .route("/profile")
    .get(authMiddleware, userControllers.getUserProfile);


// Get logged in user details
router
    .route("/update-profile")
    .put(authMiddleware, userControllers.updateUserProfile);


// get enrolled courses
router
    .route("/enrolled-course")
    .get(authMiddleware, userControllers.getEnrolledCourses);


// Update Profile Photo
router
    .route("/update-profile-image")
    .put(authMiddleware, userControllers.updateProfileImage);

// Get All Instructors
router
    .route("/get-all-instructors")
    .get(userControllers.getAllInstructor);

// Get All Instructors
router
    .route("/instructor/:instructorId")
    .get(userControllers.getInstructorById);

module.exports = router; 
