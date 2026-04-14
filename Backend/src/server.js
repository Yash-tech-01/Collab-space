import "../instrument.mjs";     // Sentry documentation file for monitoring errors
import express from "express";
import {ENV} from "./config/env.js";
import { connectDB } from "./config/db.js";
import {clerkMiddleware} from "@clerk/express"; 
import { inngest, functions } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";

import * as Sentry from "@sentry/node";

const app = express();


app.use(express.json()); // express midddleware use for parsing JSON bodies
app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use(clerkMiddleware()); // req.auth is avaliable and also checks wether user is authenticated or not


app.get("/debug-sentry", (req, res)=>{
    throw new Error("My first Sentry error!");
});


app.get("/", (req,res)=>{
    res.send("this is your response");
});

app.use("/api/inngest",serve({ client: inngest, functions}));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);



// app.listen(ENV.PORT, (req, res)=>{ 
//     console.log(`Server is listening on ${ENV.PORT}`);
//     connectDB();
// })



// Use this starting function so that it can properly work with vercel
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


