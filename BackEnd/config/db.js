const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect(
        "mongodb+srv://harsh59266:ea0YTb2sO0248v2r@cluster0.duxnli5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log(`MongoDB connected ${conn.connection.host}`);
};

module.exports = connectDB;
