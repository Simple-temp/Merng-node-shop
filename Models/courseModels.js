import mongoose from "mongoose";

const CourseSchema = (
    {
        name : { type: String , require : true },
        quantity : { type : Number , require : true },
        category : { type: String , require : true },
        img : { type : String , require : true },
        description : { type : String , require : true },
        totalsell : { type : Number , require : true },
        rating : { type : Number , require : true },
        price : { type : Number , require : true },
    }
)

mongoose.model("Course", CourseSchema)