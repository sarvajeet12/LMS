const express = require("express");
const router = express.Router();


// Upload media cloudinary path
const uploadToCloudinary = require("../utils/upload-media");


// Router + Controller (Upload Video on cloudinary);

router.route("/upload-video").post(async (req, resp) => {
    try {

        const { videoFile } = req.files;
        // console.log("videoFile", videoFile)

        const response = await uploadToCloudinary.uploadMedia(videoFile, process.env.FOLDER_NAME);

        resp.status(200).json({
            success: true,
            message: "File uploaded successfully",
            response: response
        })

    } catch (error) {
        console.log("Error occur while uploading video:", video);
        resp.status(500).json({
            success: false,
            message: "Failed to upload video",
            error: error.message
        })
    }
})


module.exports = router; 
