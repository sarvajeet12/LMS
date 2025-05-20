// Require
require("dotenv").config();
const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const connectDB = require("./configs/db-config");
const fileUpload = require("express-fileupload");


// Cors Policy
const corsOption = {
    // origin: "http://localhost:5173",
    origin: "https://lms-client-33e7.onrender.com",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
};


// Express fileupload
const fileUploadOption = {
    useTempFiles: true,
    tempFileDir: "/tmp",
}


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption))
app.use(fileUpload(fileUploadOption))



// Routers path
const userRouter = require("./routers/user-router");
const courseRouter = require("./routers/course-router");
const uploadVideoRouter = require("./routers/media-router");
const coursePurchase = require("./routers/course-purchase-router");
const courseProgress = require("./routers/course-progress-router");



// Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/media", uploadVideoRouter);
app.use("/api/v1/purchase", coursePurchase);
app.use("/api/v1/progress", courseProgress);



// If database connected successfully THEN run "app.listen" Start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})