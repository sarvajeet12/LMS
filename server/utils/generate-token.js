const jwt = require("jsonwebtoken");

const generateToken = (resp, user, message) => {

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });

    return resp
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            // sameSite: "strict",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: true, // Ensure it's sent only over HTTPS
        }).json({
            success: true,
            message: message,
            response: user,
            token: token
        });
};



module.exports = generateToken;