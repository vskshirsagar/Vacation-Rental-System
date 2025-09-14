if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express= require("express");
const app=express();
const mongoose= require("mongoose");
 const Listing=require("./models/listing.js");
const path=require("path");
const methodOverriding=require("method-override");
const ejsMate= require("ejs-mate");
const MONGO_url= "mongodb://127.0.0.1:27017/wanderlust";

const wrapAsync=require("./utils/wrapAsync.js");
const Review=require("./models/review.js");
const flash=require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User= require("./models/user.js");
const {validateReview} = require("./middleware.js");
const listingRouter = require("./routes/listing.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const reviewRouter = require("./routes/review.js");

//const dbUrl = process.env.ATLASDB_URL;
main()
.then(()=>{
    console.log("connection start");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_url);
}

async function main(){
    await mongoose.connect(MONGO_url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverriding("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
     expires: Date.now() + 7*24*60*60*1000,
     maxAge:  7*24*60*60*1000,
     httpOnly: true,
    },
};

// app.get("/",(req,res)=>{
//     res.send("i am root");
// })

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser = req.user;
    next();
})
// app.get("/demouser",async(req,res)=>{
//     let fakeuser= new User({
//         email: "student@gmail.com",
//         username: "delta-student"
//     });
//     let registredUser= await User.register(fakeuser,"helloworld");
//     res.send(registredUser);
// })

app.use("/listing", listingRouter);
app.use("/", userRouter);
app.use("/listing/:id/reviews", reviewRouter);




app.use( (req, res, next) => {
  const err = new Error("Page Not Found");
  err.statusCode = 404;
  next(err);
});

app.use((err,req,res,next)=>{
    let {statusCode=500, message="something went wrong!"} = err;
  res.status(statusCode).render("error.ejs",{message});
    //  res.status(statusCode).send(message);
})

app.listen("8080" ,()=>{
    console.log("port is working");
})