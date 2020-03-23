var express = require("express");
var router = express.Router();
var book = require("../models/book");

//index route
router.get("/camp",function(req,res){
	//get from db
	book.find({},function(err,books){
		if(err){
			console.log(err);
		}
		else{
			res.render("camp/index",{camp:books});
		}
		
	});
});

//give a new recommendation
//CREATE
router.post("/camp",isLoggedIn,function(req,res){
	//get data and add to array
	//redirect back to camp get 
	var bname=req.body.book;
	var cname=req.body.cover;
	var aname=req.body.author;
	var dname=req.body.description;
	var newBook={book: bname,cover:cname,author: aname,description: dname};
	//save to db
	book.create(newBook,function(err,book){
			 if(err){console.log(err);}
			else{res.redirect("/camp");}
				 
			 });
});


//new
router.get("/camp/new",isLoggedIn,function(req,res){
	
	res.render("camp/new");
});


//show route
router.get("/camp/:id",function(req,res){
	//find id of book
	book.findById(req.params.id).populate("comments").exec(function(err,foundbook){
		if(err){
			console.log(err);
		}
		else{
			res.render("camp/show",{camp: foundbook});
		}
		});

});
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	//sreq.flash("error","Please LogIn first");
	res.redirect("/login");
}

module.exports=router;