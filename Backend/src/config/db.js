import mongoose from "mongoose";
import {ENV} from "./env.js";

export const connectDB = async()=>{                 // db.js constains function for database connection
    try{
        const conn = await mongoose.connect(ENV.MONGO_URI);

        console.log("MongoDB connected succesfully:", conn.connection.host);
    }
    catch(error){
        console.log("Error connecting to MONGODB", error);
        process.exit(1);  // status code 1 indicates error, 0 indicates success
    }
};