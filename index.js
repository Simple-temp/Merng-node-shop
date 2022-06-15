import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, 
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageDisabled
} from "apollo-server-core";
import mongoose from "mongoose";
import typeDefs from "./typeDefs.js";
import dotenv from "dotenv"
import express from 'express';
import http from 'http';
dotenv.config()

const port = process.env.PORT || 4000
const app = express();
const httpServer = http.createServer(app);

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(()=>{
    console.log("conntected to db")
})
.catch((err)=>{
    console.log(err)
})



// mongoose shcema
import "./Models/userModels.js";
import "./Models/courseModels.js";
import "./Models/orderModels.js";
import resolvers from "./resolvers.js";
import seedRouter from "./Routes/sedRoutes.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins : [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV !== "production" 
        ? ApolloServerPluginLandingPageGraphQLPlayground() 
        : ApolloServerPluginLandingPageDisabled()
    ]
});

await server.start();
server.applyMiddleware({ 
    app,
    path : "/graphql"
 });

app.get("/",(req, res)=>{
    res.send("Its work")
})

app.use("/api/seed", seedRouter)

app.use((err, req, res, next)=>{
    res.status(500).send({ message : err.message })
})

httpServer.listen({ port}, ()=>{
    console.log(`🚀  Server ready at ${server.graphqlPath}`);
})
