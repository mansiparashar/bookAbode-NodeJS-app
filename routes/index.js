var express = require("express");
var router = express.Router();
var passport=require("passport");
var User    =require("../models/user");

//root route
router.get("/",function(req,res)
{
	res.render("main");
});

//register form route
router.get("/register",function(req,res){
	res.render("register");
});

router.post("/register",function(req,res){
	var newUser = new User({username : req.body.username});
	User.register(newUser, req.body.password , function(err,user){
		if(err){console.log(err);
		res.render("register");}
			passport.authenticate("local")(req,res, function (){
				res.redirect("/camp");
			});		
	});
});

//login logic

router.get("/login",function(req,res){
	res.render("login");
});

// login form route
router.post("/login",passport.authenticate("local",
{
	successRedirect : "/camp",
	failureRedirect : "/login"
}),function(req,res){

});

//logout route

router.get("/logout",function(req,res){
	req.logout();
	//req.flash("success","You are Logged-out");
	res.redirect("/camp");
});

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	//req.flash("error","Please LogIn first");
	res.redirect("/login");
}

module.exports=router;