import express from "express";
import {ENV} from "./config/env.js";
 

const app = express();

app.get("/", (req,res)=>{
    res.send("this is your response");
});

console.log("mongo uri:", ENV.MONGO_URI);


app.listen(ENV.PORT, (req, res)=>{ 
    console.log(`Server is listening on ${ENV.PORT}`);
})

