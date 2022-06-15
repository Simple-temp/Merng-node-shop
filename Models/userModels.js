import mongoose from "mongoose";

const UserSchema = (
    {
        name : { type: String , require : true },
        email : { type : String , require : true, unique : true },
        password : { type: String , require : true },
        isAdmin : { type : Boolean , default : false, },
    }
)

mongoose.model("User", UserSchema)
