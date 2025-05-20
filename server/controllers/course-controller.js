const courseModel = require("../models/course-model");
const userModel = require("../models/user-model");
const uploadToCloudinary = require("../utils/upload-media");




// ---------------------------------------------- Create Course ---------------------------------------------
const createCourse = async (req, resp) => {
    try {
        const { courseTitle, category } = req.body;
        // console.log("course value", courseTitle + category)

        if (!courseTitle || !category) {
            return resp.status(400).json({
                success: false,
                message: "Course title is required and category must be provided."
            })
        }

        const course = await courseModel.create({
            courseTitle,
            category,
            creator: req.id
        })

        resp.status(201).json({
            response: course,
            message: "Course Created Successfully"
        })


    } catch (error) {
        console.error("Error occur while creating course:", error);
    }
}




// ------------------------------------------------- Get create courses ----------------------------------------
const getCreatorCourse = async (req, resp) => {
    try {

        const userId = req.id;
        const courses = await courseModel.find({ creator: userId });

        if (!courses) {
            return resp.status(404).json({ success: false, message: "Course not found" });
        }

        resp.status(201).json({
            success: true,
            response: courses
        })

    } catch (error) {
        console.log("Error occur while get creator courses:", error);

        resp.status(500).json(
            { success: false, message: "Failed to fetch course" }
        )
    }
}



//-------------------------------------------- Edit Create Course -------------------------------------------------
const editCourse = async (req, resp) => {
    try {
        const courseId = req.params.id;

        const { thumbnail } = req.files;

        const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;


        let course = await courseModel.findById(courseId);
        if (!course) {
            return resp.status(404).json({
                success: false,
                message: "Course not found!"
            })
        }

        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split("/").pop().split('.')[0];

                await uploadToCloudinary.deleteMediaFromCloudinary(process.env.FOLDER_NAME + "/" + publicId); // function call
            }

            // upload a thumbnail on cloudinary
            courseThumbnail = await uploadToCloudinary.uploadMedia(thumbnail, process.env.FOLDER_NAME);

            // console.log("result thumbnail", courseThumbnail)
        }


        const updateData = {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
            courseThumbnail: courseThumbnail?.secure_url
        };

        course = await courseModel.findByIdAndUpdate(courseId, updateData, { new: true });

        return resp.status(200).json({
            success: true,
            response: course,
            message: "Course updated successfully."
        })

    } catch (error) {
        console.log("Error occur while edit course :", error);
        return resp.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message
        })
    }
}


// -----------------------------------------  Get particular creator course -------------------------------------
const getCourseById = async (req, resp) => {

    try {
        const courseId = req.params.id;

        const course = await courseModel.findById(courseId);

        if (!course) {
            return resp.status(404).json({
                success: false,
                message: "Course not found!"
            })
        }

        resp.status(200).json({
            success: true,
            response: course
        })


    } catch (error) {
        console.log("Error occur while edit course :", error);
        return resp.status(500).json({
            success: false,
            message: "Failed to get details of particular course",
            error: error.message
        })
    }
}

// ---------------------------------- Publish or Unpublish Logic ---------------------------------------
const togglePublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const { publish } = req.query; // true, false

        const course = await courseModel.findById(courseId);

        // If not present
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found!"
            });
        }


        // Publish status based on the query parameter
        course.isPublished = publish === "true";
        await course.save();

        const statusMessage = course.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({
            success: true,
            message: `Course is ${statusMessage}`
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update status",
            error: error.message
        })
    }
}


// ------------------------------- Get Published Course -------------------------------------------
const getPublishedCourse = async (_, resp) => {
    try {
        const courses = await courseModel.find({ isPublished: true })
            .populate({ path: "creator", populate: { path: "additionalDetails" } });

        if (!courses) {
            return resp.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        resp.status(200).json({
            success: true,
            response: courses,
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            success: false,
            message: "Failed to get published courses",
            error: error.message
        })
    }
}




// ------------------------------------- Filter Courses -------------------------------------------------
const filterCourses = async (req, resp) => {
    try {

        const { searchTerm, sortOrder, categoryFilter } = req.query;


        // Get all published course
        let filteredCourses = await courseModel.find({
            isPublished: true
        }).populate({ path: "creator", populate: { path: "additionalDetails" } });

        // Filter by search term (only if searchTerm is provided)
        if (searchTerm && searchTerm.trim() !== "") {
            filteredCourses = filteredCourses.filter((course) =>
                course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (categoryFilter) {
            filteredCourses = filteredCourses.filter(
                (course) => course.category.toLowerCase() === categoryFilter.toLowerCase()
            );
        }

        // Sort by price
        if (sortOrder === "lowToHigh") {
            filteredCourses.sort((a, b) => a.coursePrice - b.coursePrice);
        } else if (sortOrder === "highToLow") {
            filteredCourses.sort((a, b) => b.coursePrice - a.coursePrice);
        }

        resp.status(200).json({ success: true, result: filteredCourses });


    } catch (error) {
        console.log("Error occur while filtering course", error);
        return resp.status(500).json({
            success: false,
            message: "Failed to filter courses",
            error: error.message
        })
    }
}



// ------------------------------------------ Recommendation Logic -----------------------------------
const getRecommendedCourses = async (req, resp) => {
    try {

        const { courseId } = req.params;

        const course = await courseModel.findById(courseId);
        if (!course) {
            return resp.status(404).json({
                success: false,
                message: "Course not found!"
            })
        }

        // Get the category of the current course
        const category = course.category;

        const recommendedCourses = await courseModel.find({
            isPublished: true,
            _id: { $ne: courseId }, // Exclude the current course
            category: category // Filter by category
        }).populate({ path: "creator", populate: { path: "additionalDetails" } });

        resp.status(200).json({
            success: true,
            message: "Recommended courses fetched successfully",
            response: recommendedCourses
        })

    } catch (error) {
        console.log("Error occur while getting recommended courses", error);
        return resp.status(500).json({
            success: false,
            message: "Failed to get recommended courses",
            error: error.message
        })

    }
}


module.exports = {
    createCourse,
    getCreatorCourse,
    editCourse,
    getCourseById,
    togglePublishCourse,
    getPublishedCourse,
    filterCourses,
    getRecommendedCourses
};