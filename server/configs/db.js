import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to the MongoDB");
    });
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("Error connecting to the MongoDB", error);
  }
};
