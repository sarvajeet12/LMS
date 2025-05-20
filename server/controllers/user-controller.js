const userModel = require("../models/user-model");
const otpModel = require("../models/otp-model");
const profileModel = require("../models/profile-model")
const otpGenerator = require("otp-generator")
const generateToken = require("../utils/generate-token");
const cloudinary = require("../utils/upload-media");


// --------------------------------------- sending otp ----------------------------------

const sendOTP = async (req, resp) => {

    try {

        const { email, role } = req.body;
        // console.log("email and role", req.body)

        // Check with this email , admin exists or not
        const user = await userModel.findOne({ email: email });
        // console.log("send otp", user);

        if (role === "admin") {
            if (!user) {
                return resp.status(401).json({
                    success: false,
                    message: "You are not admin"
                })
            }
        }

        if (user) {
            if (user.role !== role) {
                return resp.status(401).json({
                    success: false,
                    message: `User already exists with this email of ${user.role} role`
                })
            }
        }


        // If not then return invalid credential

        // generate otp
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });


        // check otp is unique or not
        const checkOtp = await otpModel.findOne({ otp: otp });


        // checking for unique otp
        while (checkOtp) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });

            checkOtp = await otp.findOne({ otp: otp })
        }


        //crate payload and create an entry for otp in db
        const otpPayload = { email, otp };
        const otpBody = await otpModel.create(otpPayload);


        // response 
        resp.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            response: otpBody
        })

    } catch (error) {
        console.log("Something went wrong while send otp: ", error);
        return resp.status(500).json({
            success: false,
            message: "Something went wrong while send otp",
            error: error.message
        });

    }


}


//------------------------------------ user login ---------------------------------------- 

const userLogin = async (req, resp) => {
    try {

        const { email, otp, role } = req.body;
        // console.log("otp", req.body);


        const user = await userModel.findOne({ email: email });


        // Check otp is correct or not
        const recentOtp = await otpModel.findOne({ email: email }).sort({ createdAt: -1 });



        // if otp not found and matched 
        if (recentOtp === null) {
            return resp.status(404).json({
                success: false,
                message: "Invalid otp"  // in otp collection no otp found with this email
            })
        } else if (otp != recentOtp.otp) {
            return resp.status(401).json({
                success: false,
                message: "Invalid Otp!!"
            })
        }


        if (!user) {

            // additional details
            let additionalDetails = null;

            if (role === "instructor") {
                additionalDetails = await profileModel.create({
                    firstName: null,
                    lastName: null,
                    gender: null,
                    dateOfBirth: null,
                    about: null,
                    contactNumber: null,
                    profession: null,
                    experience: null

                });
            } else {
                additionalDetails = await profileModel.create({
                    firstName: null,
                    lastName: null,
                    gender: null,
                    dateOfBirth: null,
                    about: null,
                    contactNumber: null,
                });
            }


            //Get initial character to profile image
            let initial = '';
            if (email.charAt(0) === 'H' || email.charAt(0) === 'h' || email.charAt(0) === 'S' || email.charAt(0) === 's') {
                initial = email.charAt(0).toUpperCase();
            } else {
                initial = email.charAt(0).toLowerCase();
            }

            // user created and entry in db
            const userCreated = await userModel.create({
                email: email,
                role: role,
                photoUrl: `https://api.dicebear.com/5.x/initials/svg?seed=${initial}`,
                additionalDetails: additionalDetails._id
            })


            generateToken(resp, userCreated, `Welcome back ${userCreated.email}`);

        } else {
            generateToken(resp, user, `Welcome back ${user.email}`);

        }
    } catch (error) {
        console.log("Something went wrong while login user: ", error);
        return resp.status(500).json({
            success: false,
            message: "Something went wrong while login",
            error: error.message
        });
    }
}

// --------------------------------------------- logout ----------------------------------
const userLogout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout",
            error: error.message
        })
    }
}


// --------------------------------------- get user profile data ----------------------------
const getUserProfile = async (req, resp) => {
    try {
        const userId = req.id;

        const user = await userModel.findById(userId).populate("additionalDetails");

        if (!user) {
            return resp.status(404).json({
                message: "Profile not found",
                success: false
            })
        }

        resp.status(200).json({
            success: true,
            response: user
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            success: false,
            message: "Failed to load user",
            error: error.message
        })
    }
}


// ------------------------------------ Update user profile ------------------------
const updateUserProfile = async (req, resp) => {

    try {
        const { firstName, lastName, gender, about, contactNumber, profession, experience } = req.body;
        // console.log("update user profile ", req.body)

        const userId = req.id;

        const user = await userModel.findById(userId).populate("additionalDetails");
        if (!user) {
            return resp.status(404).json({
                message: "User not found",
                success: false
            })
        }

        const profile = await profileModel.findById(user.additionalDetails._id);
        if (!profile) {
            return resp.status(404).json({
                message: "Profile not found",
                success: false
            })
        }


        // update profile

        if (user.role === "instructor") {
            profile.profession = profession;
            profile.experience = experience;
        }

        profile.firstName = firstName;
        profile.lastName = lastName
        profile.gender = gender
        profile.about = about
        profile.contactNumber = contactNumber
        await profile.save();

        resp.status(200).json({
            success: true,
            response: profile
        })


    } catch (error) {
        console.log("Error occurred while updating user profile: ", error);
        resp.status(500).json({
            success: false,
            message: "Failed to load user",
            error: error.message
        })
    }
}


// ------------------------------------ Student Enrolled Courses ---------------------------
const getEnrolledCourses = async (req, resp) => {
    try {
        const userId = req.id;

        const user = await userModel.findById(userId).populate({
            path: "enrolledCourses", populate: {
                path: "creator",
                populate: { path: "additionalDetails" }
            }
        });


        if (!user) {
            return resp.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // console.log("user.enrolledCourses", user.enrolledCourses);

        resp.status(200).json({
            success: true,
            response: user.enrolledCourses
        })

    } catch (error) {
        console.log("Error occurred while get enrolled courses: ", error);
        resp.status(500).json({
            success: false,
            message: "Failed to get enrolled courses",
            error: error.message
        })
    }
}


// -------------------------------- Update Profile Image ------------------------------------------
const updateProfileImage = async (req, resp) => {
    try {

        // Logged In User
        const userId = req.id;

        // Get Profile Image
        const { profileImage } = req.files;

        // Finding User In DB
        const user = await userModel.findById(userId)

        // If yours Not Present
        if (!user) {
            return resp.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (profileImage) {

            if (profileImage.mimetype !== "image/jpeg") {
                return resp.status(400).json({
                    success: false,
                    message: "Image formate invalid"
                });
            }

            const getSeedValue = user.photoUrl.split("/").pop().split("?").pop().split("=")[0]

            if (getSeedValue === "seed") {
                const uploadedImage = await cloudinary.uploadMedia(profileImage, process.env.FOLDER_NAME);

                user.photoUrl = uploadedImage.secure_url;
                await user.save();
            } else {

                const publicId = user.photoUrl.split("/").pop().split('.')[0];

                await cloudinary.deleteMediaFromCloudinary(process.env.FOLDER_NAME + "/" + publicId); // function call

                // upload a thumbnail on cloudinary
                const uploadedImage = await cloudinary.uploadMedia(profileImage, process.env.FOLDER_NAME);
                user.photoUrl = uploadedImage.secure_url;
                await user.save();
            }
        }

        resp.status(201).json({
            success: true,
            message: "Profile image updated successfully"
        })


    } catch (error) {
        console.log("Error occurred while update profile image: ", error);
        resp.status(500).json({
            success: false,
            message: "Failed to update profile image",
            error: error.message
        })
    }
}


// ------------------------------------------- Get All Register Instructor --------------------------------
const getAllInstructor = async (req, resp) => {
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
        console.log("Error occur while get all instructors in user controller", error);
        return resp.status(500).json({
            success: false,
            message: "Failed to all instructors",
        });
    }
}

// ------------------------------------------- Get Instructor By Id --------------------------------
const getInstructorById = async (req, resp) => {
    try {

        const { instructorId } = req.params;

        // Fetch instructors from the database
        const instructors = await userModel.find({ _id: instructorId }).populate({ path: "additionalDetails" })


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
            message: "Failed to get instructors by id",
        });
    }
}




module.exports = { sendOTP, userLogin, userLogout, getUserProfile, updateUserProfile, getEnrolledCourses, updateProfileImage, getAllInstructor, getInstructorById, getInstructorById };


// const user = await userModel.findById(userId).select("-password").populate("enrolledCourses");
