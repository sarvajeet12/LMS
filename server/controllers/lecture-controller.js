const courseModel = require("../models/course-model");
const lectureModel = require("../models/lecture-model");
const cloudinary = require("../utils/upload-media")


// ------------------------------------ Create Lecture -------------------------------------
const createLecture = async (req, resp) => {
    try {

        const courseId = req.params.id;

        const { lectureTitle } = req.body;

        // console.log("course id and lecture title", courseId + lectureTitle)

        if (!courseId || !lectureTitle) {
            resp.send(404), json({
                success: false,
                message: "Lecture title is required"
            })
        }

        const lecture = await lectureModel.create({ lectureTitle });

        const course = await courseModel.findById(courseId);

        if (course) {
            course.lectures.push(lecture._id);
            await course.save();
        }

        resp.status(201).json({
            success: true,
            message: "Lecture created successfully",
            response: lecture
        })



    } catch (error) {
        console.log("Error occur while creating lecture", error);
        resp.status(500).json({
            success: false,
            message: "Failed to create lecture",
            response: error.message
        })
    }
}


// ---------------------------------------- Fetch All Lecture of Course ----------------------------------
const fetchCourseAllLecture = async (req, resp) => {
    try {

        const courseId = req.params.id;

        const course = await courseModel.findById(courseId).populate("lectures");

        // console.log("lectures", course);

        if (!course) {
            return resp.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        resp.status(200).json({
            success: true,
            response: course.lectures
        })


    } catch (error) {
        console.log("Error occur while fetching lecture", error);
        resp.status(500).json({
            success: false,
            message: "Failed to fetch lectures",
            response: error.message
        })
    }
}


// ---------------------------------------- Edit Lecture --------------------------------------
const editLecture = async (req, resp) => {
    try {

        const { lectureTitle, videoInfo, isToggled } = req.body;
        // console.log(req.body);

        const { courseId, lectureId } = req.params


        const lecture = await lectureModel.findById(lectureId);

        if (!lecture) {
            return resp.status(404).json({
                success: false,
                message: "Lecture not found!"
            })
        }

        // Update Lecture Models With Values
        if (lectureTitle) {
            lecture.lectureTitle = lectureTitle;
        }

        if (videoInfo?.videoUrl) {
            lecture.videoUrl = videoInfo.videoUrl;
        }
        if (videoInfo?.publicId) {
            lecture.publicId = videoInfo.publicId;
        }


        lecture.isPreviewFree = isToggled;


        await lecture.save();



        // Ensure lecture is present , if not then add it in course
        const course = await courseModel.findById(courseId);

        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id);
            await course.save();
        };

        resp.status(200).json({
            success: true,
            response: lecture,
            message: "Lecture Edit Successfully"
        })


    } catch (error) {
        console.log("Error occur while edit lecture", error);
        resp.status(500).json({
            success: false,
            message: "Failed to edit lecture",
            response: error.message
        })
    }
}


// --------------------------------- Remove Lecture ---------------------------------------
const removeLecture = async (req, resp) => {
    try {
        const { lectureId } = req.params;

        const lecture = await lectureModel.findByIdAndDelete(lectureId);

        if (!lecture) {
            return resp.status(404).json({
                success: false,
                message: "Lecture not found!"
            });
        }


        // Delete the lecture from cloudinary as well
        if (lecture.publicId) {
            await cloudinary.deleteVideoFromCloudinary(lecture.publicId);
        }

        // Remove the lecture reference from the associated course
        await courseModel.updateOne(
            { lectures: lectureId }, // find the course that contains the lecture
            { $pull: { lectures: lectureId } }, // Remove the lectures id from the lectures array
            { new: true }  // update it
        );

        resp.status(200).json({
            message: "Lecture removed successfully.",
        })
    } catch (error) {
        console.log("Error occur while removing course", error);
        return resp.status(500).json({
            success: false,
            message: "Failed to remove lecture"
        })
    }
}


// -------------------------------------- Get lecture by id ---------------------------------------
const getLectureById = async (req, resp) => {
    try {
        const { lectureId } = req.params;

        const lecture = await lectureModel.findById(lectureId);

        if (!lecture) {
            return resp.status(404).json({
                success: false,
                message: "Lecture not found!"
            });
        }
        resp.status(200).json({
            success: true,
            message: "lecture fetch successfully by id",
            response: lecture
        });


    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            success: false,
            message: "Failed to get lecture by id",
            error: error.message
        })
    }
}

module.exports = { createLecture, fetchCourseAllLecture, editLecture, removeLecture, getLectureById };