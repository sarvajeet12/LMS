const courseModel = require("../models/course-model");
const userModel = require("../models/user-model");
const lectureModel = require("../models/lecture-model")
const coursePurchaseModel = require("../models/course-purchase-model")
const razorpayInstance = require("../configs/razorpay-config")
const crypto = require("crypto")
const profileModel = require("../models/profile-model")



// -------------------------------------------- Capture the payment and initiate -----------------------------------

const capturePayment = async (req, resp) => {

    //  Getting UserId and CourseId
    const userId = req.id;
    const { courseId } = req.body;

    // Getting course details
    const course = await courseModel.findById(courseId);

    if (!course) {
        return resp.status(404), json({
            success: false,
            message: "Course not found"
        })
    }


    //Create a new course purchase record
    const amount = course.coursePrice;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseId,
            userId
        }
    }

    try {

        // Initiate the payment using razorpay
        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log("Error occur while payment response : ", error);
                return resp.status(500).json({ success: false, message: "Something went wrong!", error: error.message })
            }

            resp.status(200).json({
                response: order,
                message: "Payment Create Successfully"
            })
        })

    } catch (error) {
        console.log("Error occur while capture payment", error);
        return resp.status(500).json({
            success: false,
            message: "Failed to capture payment"
        })
    }


}



// ------------------------------------------ Verify Payment -----------------------------------------

const verifySignature = async (req, resp) => {

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, courseId, userId, amount } = req.body;

    try {

        // Create Sign
        const sign = razorpayOrderId + "|" + razorpayPaymentId

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");


        // Create isAuthentic
        const isAuthentic = expectedSign === razorpaySignature;

        if (isAuthentic) {

            // Create entry in database
            const coursePurchase = await coursePurchaseModel.create({
                courseId,
                userId,
                amount,
                status: "completed",
                razorpayOrderId,
                razorpayPaymentId,
                razorpaySignature
            })


            // -------------------------------------------- AFTER VERIFY PAYMENT -------------------------------------

            // Find the course and enroll the student in it
            const enrolledCourse = await courseModel.findByIdAndUpdate(
                { _id: courseId },
                { $push: { enrolledStudents: userId } },
                { new: true }
            )
            // console.log("update enrolled course", enrolledCourse)

            // Find the student and add the course to their list enrolled courses
            const enrolledStudent = await userModel.findByIdAndUpdate(
                { _id: userId },
                { $push: { enrolledCourses: courseId } },
                { new: true }
            )
            // console.log("update enrolled student", enrolledStudent)

            // Make all lecture visible by setting 'isPreviewFree' to true
            if (courseId) {
                await lectureModel.updateMany(
                    { _id: { $in: courseId.lectures } },
                    { $set: { isPreviewFree: true } },
                    { new: true }
                )
            }

            // -------------------------------------------- END -------------------------------------

            return resp.status(200).json({
                success: true,
                message: "Payment verified",
                response: coursePurchase
            })
        } else {
            return resp.status(500).json({
                success: false,
                message: "Payment not verified",
            })
        }

    } catch (error) {
        console.log("Error occur while verified payment : ", error)
        return resp.status(500).json({
            success: false,
            message: "Failed to verify payment",
            error: error.message
        })
    }


}


// -------------------------- Get Course Detail With Purchase Status ------------------------------------

const getCourseDetailWithPurchaseStatus = async (req, resp) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;

        const course = await courseModel.findById(courseId)
            .populate({ path: "creator" })
            .populate({ path: "lectures" });


        // Getting Creator Information
        const creatorId = course.creator.additionalDetails;
        const creatorInfo = await profileModel.findById(creatorId)


        const purchased = await coursePurchaseModel.findOne({ userId, courseId });
        // console.log(purchased);

        if (!course) {
            return resp.status(404).json({ message: "course not found!" });
        }

        return resp.status(200).json({
            success: true,
            course: course,
            creatorInfo: creatorInfo,
            purchased: !!purchased, // true if purchased, false otherwise
        });
    } catch (error) {
        console.log("Error occur while get course detail with purchase status", error);
        return resp.status(500).json({
            success: false,
            message: "Failed to get get course detail with purchase status",
        })
    }
};



// ---------------------------------------------- Get all Purchased Course ----------------------------------
const getAllPurchasedCourse = async (_, resp) => {
    try {
        const purchasedCourse = await coursePurchaseModel.find({
            status: "completed",
        }).populate("courseId");

        if (!purchasedCourse) {
            return resp.status(404).json({
                success: false,
                purchasedCourse: [],
            });
        }
        return resp.status(200).json({
            success: true,
            response: purchasedCourse,
        });
    } catch (error) {
        console.log("Error occur while get all purchase course: ", error);
        return resp.status(500).json({
            success: false,
            message: "Failed to get all purchased course"
        })

    }
};


// -------------------------------------- Course of instructor by id ----------------------------------
const getCourseOfInstructorById = async (req, resp) => {
    try {
        // Getting user id
        const userId = req.id;


        // Find purchased courses where the course's creator matches the creatorId
        const purchasedCourse = await coursePurchaseModel.find({
            status: "completed",
        }).populate("courseId");


        // Filter courses by instructor id
        const instructorCourses = purchasedCourse.filter((course) => {
            return course.courseId.creator.toString() === userId.toString();
        });


        if (!instructorCourses) {
            return resp.status(404).json({
                success: false,
                purchasedCourse: [],
            });
        }
        return resp.status(200).json({
            success: true,
            response: instructorCourses,
        });


    } catch (error) {
        console.log("Error occur while get course of instructor by id", error);
        return resp.status(500).json({
            success: false,
            message: "Failed to get course of instructor by id",
        });
    }
}

// ------------------------------------------- Get All Register Instructor --------------------------------
const getAllRegisterInstructor = async (req, resp) => {
    try {

        // Fetch instructors from the database
        const instructors = await userModel.find({ role: "instructor" }).populate({ path: "additionalDetails" })


        // Send a successful response
        return resp.status(200).json({
            success: true,
            message: "Instructors retrieved successfully",
            response: instructors
        });

    } catch (error) {
        console.log("Error occur while get all instructors", error);
        return resp.status(500).json({
            success: false,
            message: "Failed to all instructors",
        });
    }
}


// -------------------------------------- Course of instructor by id ----------------------------------
const getCourseOfInstructorByIdByParams = async (req, resp) => {
    try {
        // Getting user id
        const { instructorId } = req.params;


        // Find purchased courses where the course's creator matches the creatorId
        const purchasedCourse = await coursePurchaseModel.find({
            status: "completed",
        }).populate("courseId");


        // Filter courses by instructor id
        const instructorCourses = purchasedCourse.filter((course) => {
            return course.courseId.creator.toString() === instructorId.toString();
        });


        if (!instructorCourses) {
            return resp.status(404).json({
                success: false,
                purchasedCourse: [],
            });
        }
        return resp.status(200).json({
            success: true,
            response: instructorCourses,
        });


    } catch (error) {
        console.log("Error occur while get course of instructor by id by params", error);
        return resp.status(500).json({
            success: false,
            message: "Failed to get course of instructor by id by params",
        });
    }
}


module.exports = { capturePayment, verifySignature, getCourseDetailWithPurchaseStatus, getAllPurchasedCourse, getCourseOfInstructorById, getAllRegisterInstructor, getCourseOfInstructorByIdByParams };