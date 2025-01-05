require('dotenv').config();
const express = require("express");
const { MongoConnect } = require("./connection");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/user");
const {checkForAuthentication} = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 8000;

// connect mongo
MongoConnect(process.env.MONGO_URL)
.then(()=>console.log("Mongo Connected"))
.catch(err => console.error("MongoDB connection error:", err));

// view Engine
const cors = require("cors");
app.use(cors({ origin: "https://rbac-client-zeta.vercel.app" })); // Replace with your frontend URL

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// routes  
app.use("/user", userRouter);

app.listen(PORT,()=>console.log(`server Started at: ${PORT}`));
