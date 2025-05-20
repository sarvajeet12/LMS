const mongoose = require("mongoose");
const sendEmail = require("../utils/send-mail");
const otpTemplate = require("../templates/email-verification-template");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,   //5min
    }
});


const sendVerificationEmail = async (email, otp) => {
    try {
        await sendEmail(email, "Otp Verification", otpTemplate(otp));


    } catch (error) {
        console.log("Error occur while sending mail", error);
        throw error;
    }
}


otpSchema.pre("save", function (next) {
    sendVerificationEmail(this.email, this.otp);
    next();
})




module.exports = mongoose.model("Otp", otpSchema);