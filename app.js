import express from "express";

import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config}  from "dotenv"
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middlewares/error.js";


config({
    path:"./data/config.env"
})

export const app=express();
// using middleware to use json data




app.use(express.json());
app.use(cookieParser());
// always put above the router

//using routes

app.use("/api/v1/users",userRouter);// /users prefix add ho gaya hai
app.use("/api/v1/task",taskRouter);

app.get("/",(req,res)=>{
    res.send("nice working");
});
//using error method
app.use(errorMiddleware);


