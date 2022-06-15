import mongoose from "mongoose";

const OrderSchema = (
    {
        userid : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        orderitem : [
            {
                name : { type: String , require : true },
                quantity : { type : Number , require : true },
                category : { type: String , require : true },
                img : { type : String , require : true },
                description : { type : String , require : true },
                totalsell : { type : Number , require : true },
                rating : { type : Number , require : true },
                price : { type : Number , require : true },
                course_id : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : "Course",
                    required : true,
                },
            }
        ],
        paymentMethod : { type: String , require : true },
        itemprice : { type : Number , require : true, },
        totalPrice : { type: Number , require : true },
        isPaid : { type : Boolean, default: false },
        paidAt : { type : Date },
        isSelled : { type : Boolean, default: false },
        sellAt : { type : Date },
    }
)

mongoose.model("Order", OrderSchema)
