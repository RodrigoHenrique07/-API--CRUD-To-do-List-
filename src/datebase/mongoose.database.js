const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.6ehm4pb.mongodb.net/`
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error(`Could not connect to MongoDB: ${error.message}`);
  }
};

module.exports = connectToDatabase;
