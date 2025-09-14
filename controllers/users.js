const User= require("../models/user.js");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async(req,res)=>{
    try{
        let {username, email, password}=req.body;
    const newUser= new User({email,username});
    const registreduser=await User.register(newUser, password);
    console.log(registreduser);
    req.login(registreduser , (err) =>{
        if(err){
            return next(err);
        }
        req.flash("success","welcome to wanderlust ");
    res.redirect("/listing");
    })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.RenderLogin = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login =  async(req,res)=>{
    req.flash("success","welcome to wanderlust ");
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out now");
        res.redirect("/listing");
    })
};