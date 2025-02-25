import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error in connection:", error);
    process.exit(1);
  }
};
export default connectDB;
