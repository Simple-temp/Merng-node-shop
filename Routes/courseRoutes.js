import express from "express"
import mongoose from "mongoose"

const Course = mongoose.model("Course")

const courseRoutes = express.Router()

courseRoutes.post("/", async (req, res)=>{

    console.log(req.body)

    const newCourse = new Course ({
        name : req.body.name,
        quantity : req.body.quantity || 1,
        category : req.body.category, 
        img : req.body.img ,
        description : req.body.description,
        totalsell : req.body.totalsell ,
        rating : req.body.rating ,
        price : req.body.price, 
    })

    const course = newCourse.save()
    
    res.send({
        _id : course._id,
        name : course.name,
        quantity : course.quantity || 1,
        category : course.category, 
        img : course.img ,
        description : course.description,
        totalsell : course.totalsell ,
        rating : course.rating ,
        price : course.price, 
    })

})

courseRoutes.put("/updatecourse/:id", async (req, res)=>{

    console.log(req.params.id)

    const course = await Course.findById (req.params.id)

    if(course){
        course.name = req.body.name || course.name
        course.category = req.body.category || course.category
        course.img = req.body.img || course.img
        course.description = req.body.description || course.description
        course.rating = req.body.rating || course.rating
        course.price = req.body.price || course.price

        console.log(course)
        const updatecourse = await course.save()

        res.send({ message: "course Update",  course: updatecourse})
    }else{
        res.status(404).send({ message : "course not update" })
    }

})

export default courseRoutes;