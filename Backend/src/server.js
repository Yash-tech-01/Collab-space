import express from "express";
import {ENV} from "./config/env.js";
import { connectDB } from "./config/db.js";
import {clerkMiddleware} from "@clerk/express"; 
import { inngest, functions } from "./config/inngest.js";
import { serve } from "inngest/express";
 

const app = express();

app.use(express.json()); // express midddleware use for parsing JSON bodies
app.use(clerkMiddleware()); // req.auth is avaliable and also checks wether user is authenticated or not

app.use("/api/inngest",serve({ client: inngest, functions: [functions] }));

app.get("/", (req,res)=>{
    res.send("this is your response");
});

// console.log(ENV.MONGO_URI);


// app.listen(ENV.PORT, (req, res)=>{ 
//     console.log(`Server is listening on ${ENV.PORT}`);
//     connectDB();
// })


const startServer = async() => {
    try{
        await connectDB();
        if(ENV.NODE_ENV !== "production"){
            app.listen(ENV.PORT, ()=>{
                console.log("Server started on port", ENV.PORT);
            });
        }
    }
    catch(error){
        console.error("Error starting server: ", error);
        process.exit(1);
    }
};

startServer();

export default app;


