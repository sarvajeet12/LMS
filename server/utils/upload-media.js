const cloudinary = require("cloudinary").v2;
require("dotenv").config();



// Config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY,
});


// Upload media to the cloudinary
const uploadMedia = async (file, folder) => {
    try {
        const options = { folder };

        options.resource_type = "auto"


        const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, options);
        return uploadResponse;

    } catch (error) {
        console.log("Error occur while uploading media: ", error);
    }
};



// Delete Pic from cloudinary when update/edit or remove
const deleteMediaFromCloudinary = async (publicId) => {
    try {
        const deleteImage = await cloudinary.uploader.destroy(publicId);
        // console.log("delete image : ", deleteImage)
    } catch (error) {
        console.log("Error occur while deleting image: ", error);
    }
};



// Delete Video from cloudinary when update/edit or remove
const deleteVideoFromCloudinary = async (publicId) => {
    try {
        const deleteVideo = await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
        // console.log("delete video", deleteVideo);
    } catch (error) {
        console.log("Error occur while deleting video", error);

    }
}



module.exports = { uploadMedia, deleteMediaFromCloudinary, deleteVideoFromCloudinary };