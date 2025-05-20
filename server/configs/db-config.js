//Database configuration [connect database to backend]

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Database connected successfully!");
    } catch (error) {
        console.log("database connection failed");
        console.error(error)
        process.exit(0); // or 1
    }
}

module.exports = connectDB;