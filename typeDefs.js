import { gql } from "apollo-server-express";

const typeDefs = gql`

type Query {
    users : [User]
    user ( _id : ID! ) : User
    courses : [Course]
    course ( _id : ID! ) : Course
    orderitem : [OrderItem]
    orderitemById ( _id : ID! ) : OrderItem
}

type User {
    _id : ID!
    name : String!
    email : String!
    password : String!
    isAdmin : Boolean!
}

type Course {
    _id : ID!
    name : String!
    quantity : Int!
    category : String!
    img : String!
    description : String!
    totalsell : Int!
    rating : Float! 
    price : Int!
}

scalar Date

type OrderItem {
    _id : ID!
    userid : String!
    orderitem : [Course]
    paymentMethod : String!
    itemprice : Int!
    totalPrice : Float!
    isPaid : Boolean!
    paidAt : Date
    isSelled : Boolean!
    sellAt : Date
}

type SignIn {
    _id : ID!
    name : String!
    email : String!
    password : String!
    isAdmin : Boolean!
    token : String!
}

type SignUp {
    _id : ID!
    name : String!
    email : String!
    password : String!
    isAdmin : Boolean!
    token : String!
}

type MakeAdmin {
    email : String!
}

type DeleteAdmin {
    email : String!
}

type Mutation {
    signup ( signUpUser : signUpUser! ) : SignUp
    deluser ( _id : ID! ) : User
    updateUser ( UpdateUser : UpdateUser! ) : User
    signin ( SignInUser : SignInUser! ) : SignIn
    makeadmin ( Admin : makeAdmin! ) : MakeAdmin
    deleteadmin ( Admin : deleteAdmin! ) : DeleteAdmin
    admindeletebyid ( _id : ID! ) : User
    createcourse ( createCourse : createCourse! ) : Course
    delcourse ( _id : ID! ) : Course
    updateCourse ( UpdateCourse : UpdateCourse! ) : Course
    delorder ( _id : ID! ) : OrderItem
    UpdateOrderIsPaid ( UpdateOrderIsPaid : UpdateOrderIsPaid! ) : OrderItem
    UpdateOrderIsSelled ( UpdateOrderIsSelled : UpdateOrderIsSelled! ) : OrderItem
}

input signUpUser {
    name : String!
    email : String!
    password : String!
}

input SignInUser {
    email : String!
    password : String!
}

input UpdateUser {
    _id : ID!
    name : String!
    email : String!
    password : String!
    isAdmin : Boolean!
}

input makeAdmin {
    email : String!
}

input deleteAdmin {
    email : String!
}

input createCourse {
    name : String!
    quantity : Int!
    category : String!
    img : String!
    description : String!
    totalsell : Int!
    rating : Float! 
    price : Int!
}

input UpdateCourse {
    _id : ID!
    name : String!
    quantity : Int!
    category : String!
    img : String!
    description : String!
    totalsell : Int!
    rating : Float! 
    price : Int!
}

input UpdateOrderIsPaid {
    _id : ID!
    isPaid : Boolean!
    paidAt : Date
}

input UpdateOrderIsSelled {
    _id : ID!
    isSelled : Boolean!
    sellAt : Date
}

`

export default typeDefs;



