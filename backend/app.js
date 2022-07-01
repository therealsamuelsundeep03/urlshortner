const express = require('express');
const mongo = require('./model/mongodb');
const app = express();
const cors = require('cors');
require('dotenv').config()

const useRouter = require("./routes/url.routes");
const useLoginRouter = require("./routes/login.routes");
const useSigninRouter = require("./routes/signin.routes");

(async()=>{
    // connecting to db
    await mongo.connect();

    // middlewares
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(cors());

    // routes
    app.use("/",useRouter);
    app.use("/login",useLoginRouter);
    app.use("/signin",useSigninRouter);
})()

app.listen(process.env.PORT,(err=>{
    if(err){
        console.log("Error in listening to the server");
    }else{
        console.log(`Server is listening to the port ${process.env.PORT}`);
    }
}))