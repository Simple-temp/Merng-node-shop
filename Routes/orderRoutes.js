import mongoose from "mongoose";
import express from "express"
import { isAuth } from "../Utils.js";


const Order = mongoose.model("Order")

const orderRoutes = express.Router()

orderRoutes.post("/", isAuth ,async(req, res)=>{

    const newOrder = new Order({
        userid: req.user._id,
        orderitem : req.body.orderitem.map( x => ({ ...x, course_id:x._id }) ),
        paymentMethod: req.body.paymentMethod,
        itemprice: req.body.itemprice,
        totalPrice: req.body.totalPrice,
        paidAt : new Date(),
        sellAt : new Date(),
    })
    console.log(newOrder)
    const order = await newOrder.save()

    res.status(201).send({ message : "New order created", order })

})

orderRoutes.get("/author", isAuth, async(req, res)=>{

    console.log(req.user._id)

    const orders = await Order.find({ userid: req.user._id })
    if(orders){
        res.send(orders)
    }else{
        res.status(404).send({ message : "orders not found" })
    }

})

orderRoutes.get("/:id", isAuth, async(req, res)=>{

    console.log(req.params.id)

    const orders = await Order.findById ({ _id: req.params.id })
    
    if(orders){
        res.send(orders)
    }else{
        res.status(404).send({ message : "orders not found" })
    }

})

export default orderRoutes;