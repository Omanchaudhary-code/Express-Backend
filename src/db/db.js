import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async() =>{

    try {

        const dbInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("MONGO_DB connected Successfully with connection instance of:",dbInstance.connection.host);
        
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

export default connectDB;