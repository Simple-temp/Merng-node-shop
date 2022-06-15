import express from "express";
import mongoose from "mongoose";
import { Course } from "../fakeData.js";

const course = mongoose.model("Course")

const seedRouter = express.Router()

seedRouter.get("/", async( req, res )=>{
    await course.remove({})
    const createCourse = await course.insertMany(Course)
    res.send({ createCourse })
})

export default seedRouter;