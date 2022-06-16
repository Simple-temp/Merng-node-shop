import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import { generateToken, isAuth } from "../Utils.js";

const User = mongoose.model("User")

const userRoutes = express.Router()

userRoutes.post("/signup", async (req, res) => {

    const { formData } = req.body

    const newuser = new User({
        name: formData.name,
        email: formData.email,
        password: bcrypt.hashSync(formData.password),
    })
    console.log(newuser)
    const user = await newuser.save()

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
    })
})

userRoutes.post("/signin", async(req, res) =>{

    const { formData } = req.body

    const user = await User.findOne ({ email : formData.email })

    if(user){
        if(bcrypt.compareSync(formData.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
            return
        }
    }
    res.status(401).send({ message: "Invalid email or password" })

})

userRoutes.put("/updateprofile",isAuth, async (req, res)=>{

    const { formData } = req.body
    console.log(req.user._id)

    const user = await User.findById (req.user._id)
    if(user){
        user.name = formData.name || user.name
        user.email = formData.email || user.email
        if(formData.password){
            user.password = bcrypt.hashSync(formData.password, 8)
        }
        console.log(user)
        const updateUser = await user.save()
        res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser)
        })
    }else {
        res.status(404).send({ message: "User not found" })
    }

})

export default userRoutes;