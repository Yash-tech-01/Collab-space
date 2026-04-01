import express from "express";
import {ENV} from "./config/env.js";
import { connectDB } from "./config/db.js";

 

const app = express();

app.get("/", (req,res)=>{
    res.send("this is your response");
});

// console.log(ENV.MONGO_URI);

app.listen(ENV.PORT, (req, res)=>{ 
    console.log(`Server is listening on ${ENV.PORT}`);
    connectDB();
})
