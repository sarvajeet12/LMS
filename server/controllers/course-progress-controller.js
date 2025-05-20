const courseProgressModel = require("../models/course-progress-model");
const courseModel = require("../models/course-model");


// --------------------------------------- GET COURSE PROGRESS -----------------------------------------
const getCourseProgress = async (req, resp) => {
    try {

        // Getting courseId and userId
        const { courseId } = req.params;
        const userId = req.id;

        // Step 1: Fetch the user course progress
        let courseProgress = await courseProgressModel.findOne({
            courseId, userId
        }).populate("courseId");

        // console.log("courseProgress: ", courseProgress);

        const courseDetails = await courseModel.findById(courseId).populate("lectures");

        if (!courseDetails) {
            return resp.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        // Step 2: If no progress found, return course details with an empty progress
        if (!courseProgress) {
            return resp.status(200).json({
                data: {
                    courseDetails,
                    progress: [],
                    completed: false
                }
            })
        }


        // Step 3: Return the user's course progress along with course details
        resp.status(200).json({
            data: {
                courseDetails,
                progress: courseProgress.lectureProgress,
                completed: courseProgress.completed
            }
        })



    } catch (error) {
        console.log("Error occur while getting course progress : ", error)
        return resp.status(500).json({
            success: false,
            message: "Failed to get course progress",
            error: error.message
        })
    }
}


// ---------------------------------- UPDATE LECTURE PROGRESS ----------------------------------------
const updateLectureProgress = async (req, resp) => {
    try {

        // Getting courseId, lectureId and userId
        const { courseId, lectureId } = req.params;
        const userId = req.id


        // Fetch or create course progress
        let courseProgress = await courseProgressModel.findOne({ courseId, userId });

        if (!courseProgress) {
            // If no progress exist, create a new record

            courseProgress = new courseProgressModel({
                userId, courseId, completed: false, lectureProgress: []
            })
        }

        // Find the lecture progress in the course progress
        const lectureIndex = courseProgress.lectureProgress.findIndex(
            (lecture) => lecture.lectureId === lectureId
        )
        // console.log("lecture index", lectureIndex);

        if (lectureIndex !== -1) {
            // if lecture already exist, update its status
            courseProgress.lectureProgress[lectureIndex].viewed = true;
        } else {
            // Add new lecture progress
            courseProgress.lectureProgress.push({
                lectureId, viewed: true
            })
        }


        // If all lecture is complete
        const lectureProgressLength = courseProgress.lectureProgress.filter((lectureProg) => lectureProg.viewed).length;

        const course = await courseModel.findById(courseId);

        if (course.lectures.length === lectureProgressLength) {
            courseProgress.completed = true;
        }

        await courseProgress.save();

        return resp.status(200).json({
            success: true,
            message: "Lecture progress updated successfully",
            courseProgress: courseProgress
        })
    } catch (error) {
        console.log("Error occur while update lecture progress : ", error)
        return resp.status(500).json({
            success: false,
            message: "Failed to get update lecture progress",
            error: error.message
        })
    }
}


// ------------------------------------------------ MARK AS COMPLETE -----------------------------------------------
const markAsComplete = async (req, resp) => {
    try {

        const { courseId } = req.params;
        const userId = req.id;

        const courseProgress = await courseProgressModel.findOne({ courseId, userId })
        if (!courseProgress) {
            return resp.status(404).json({
                success: false,
                message: "Course progress not found"
            })
        }

        courseProgress.lectureProgress.map((lectureProgress) => (lectureProgress.viewed = true));

        courseProgress.completed = true;

        await courseProgress.save();

        return resp.status(200).json({
            success: true,
            message: "Course marked as complete.",
            courseProgress: courseProgress
        })

    } catch (error) {
        console.log("Error occur while mark as complete : ", error)
        return resp.status(500).json({
            success: false,
            message: "Failed to mark as complete",
            error: error.message
        })
    }
}



// ------------------------------------------------ MARK AS INCOMPLETE -----------------------------------------------
const markAsInComplete = async (req, resp) => {
    try {

        const { courseId } = req.params;
        const userId = req.id;

        const courseProgress = await courseProgressModel.findOne({ courseId, userId })
        if (!courseProgress) {
            return resp.status(404).json({
                success: false,
                message: "Course progress not found"
            })
        }

        courseProgress.lectureProgress.map((lectureProgress) => (lectureProgress.viewed = false));

        courseProgress.completed = false;

        await courseProgress.save();

        return resp.status(200).json({
            success: true,
            message: "Course marked as incomplete.",
            courseProgress: courseProgress
        })

    } catch (error) {
        console.log("Error occur while mark as incomplete : ", error)
        return resp.status(500).json({
            success: false,
            message: "Failed to mark as incomplete",
            error: error.message
        })
    }
}


module.exports = { getCourseProgress, updateLectureProgress, markAsComplete, markAsInComplete };