// import { User, Course, OrderItem } from "./fakeData.js";
// import {randomBytes} from "crypto"
import bcrypt from "bcryptjs"
import mongoose from "mongoose";
import { generateToken } from "./Utils.js";

const User = mongoose.model("User")
const Course = mongoose.model("Course")
const Order = mongoose.model("Order")

const resolvers = {
    Query: {
        users: async () => await User.find({}),//User
        user: async (_, { _id }) => await User.findById({ _id }),//User.find((userById) => userById._id == _id),
        courses: async () => await Course.find({}),//Course,
        course: async (_, { _id }) => await Course.findById({ _id }),//Course.find((courseById) => courseById._id == _id),
        orderitem: async () => await Order.find({}),//OrderItem,
        orderitemById: async (_, { _id }) => await Order.findById({ _id }) //OrderItem.find((orderById) => orderById._id == _id),
    },
    Mutation: {
//============================================================User rresolver=========================================================//        
        signup: async (_, { signUpUser }) => {//=====It's a valid code (Not in use) but I use rest api for check with apollo-express=server 

            const user = await User.findOne({ email: signUpUser.email })

            if (user) {
                throw new Error(" This user already exits ")
            }

            const hashPassword = await bcrypt.hash(signUpUser.password, 12)

            const newuser = new User({
                _id: signUpUser._id,
                name: signUpUser.name,
                email: signUpUser.email,
                password: hashPassword,
                isAdmin: signUpUser.isAdmin,
                token: generateToken(signUpUser)
            })

            return await newuser.save()


        },
        signin: async (_, { SignInUser }) => {//=====It's a valid code (Not in use) but I use rest api for check with apollo-express=server 

            const user = await User.findOne({ email: SignInUser.email })

            if (!user) {
                throw new Error(" This email dosen't exits ")
            }

            const doMatch = await bcrypt.compare(SignInUser.password, user.password)

            if (!doMatch) {
                throw new Error("email or password invalid")
            }

            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            }

        },
        updateUser: async (_, { UpdateUser }) => {//=====It's a valid code (Not in use) but I use rest api for check with apollo-express=server 
            const user = await User.findById({ _id: UpdateUser._id })

            if (user) {
                user.name = UpdateUser.name || user.name
                user.email = UpdateUser.email || user.email
                if (UpdateUser.password) {
                    user.password = bcrypt.hashSync(UpdateUser.password, 12) || user.password
                }

                return await user.save()
            }

        },
        deluser: async (_, { _id }) => {
            const delUser = await User.findById({ _id })

            return await delUser.deleteOne()
        },
        makeadmin : async (_,{Admin}) => {
            const user = await User.findOne ({ email : Admin.email })
            if(user){
                user.isAdmin = true
            }
            return await user.save()
        },
        deleteadmin : async (_,{Admin}) => {
            const user = await User.findOne ({ email : Admin.email })
            if(user){
                user.isAdmin = false
            }
            console.log(user)
            return await user.save()
        },
        admindeletebyid : async (_,{_id}) => {
            const user = await User.findById ({ _id })
            if(user){
                user.isAdmin = false
            }
            console.log(user)
            return await user.save()
        },
//============================================================Course rresolver=========================================================//
        createcourse: async (_, { createCourse }) => {//=====It's a valid code (Not in use) but I use rest api for check with apollo-express=server 

                const newcourse = new Course({
                    ...createCourse
                })

                console.log(newcourse)

                return await newcourse.save()

        },
        delcourse: async (_, { _id }) => {

            const delCourse = await Course.findById({ _id })

            return await delCourse.deleteOne()
        },
        updateCourse: async (_, { UpdateCourse }) => {//=====It's a valid code (Not in use) but I use rest api for check with apollo-express=server 

            const course = await Course.findById({ _id: UpdateCourse._id })

            if (course) {
                course.name = UpdateCourse.name || course.name
                course.quantity = UpdateCourse.quantity || course.quantity
                course.category = UpdateCourse.category || course.category
                course.img = UpdateCourse.img || course.img
                course.description = UpdateCourse.description || course.description
                course.totalsell = UpdateCourse.totalsell || course.totalsell
                course.rating = UpdateCourse.rating || course.rating
                course.price = UpdateCourse.price || course.price

                return await course.save()
            }

        },
//============================================================Order rresolver=========================================================//
        delorder: async (_, { _id }) => {
            const delOrder = await Order.findById({ _id })

            return await delOrder.deleteOne()
        },
        UpdateOrderIsPaid: async (_, { UpdateOrderIsPaid }) => {

        },
        UpdateOrderIsSelled: async (_, { UpdateOrderIsSelled }) => {

        },

    }
}

export default resolvers;

