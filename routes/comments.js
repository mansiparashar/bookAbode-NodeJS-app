var express = require("express");
var router = express.Router();
var book=require("../models/book");
var Comment =require("../models/comment");


//new
router.get("/camp/:id/comments/new",isLoggedIn,function(req,res){
	book.findById(req.params.id,function(err,camp){
		if(err){
			console.log(err);
		}
		else{
			//console.log(camp);
	        res.render("comments/new",{camp : camp});
		}
});
});

//create
router.post("/camp/:id/comments",function(req,res){
	//lookup book using id
	book.findById(req.params.id,function(err,camp){
		if(err){
			console.log(err);
			res.redirect("/camp");
		}
		else{
			
			Comment.create(req.body.comment,function(err,comment){
			if(err){console.log(err);}
			else
			{
			//add username and is to comment
			 
			 comment.author.id=req.user._id;
			 comment.author.username=req.user.username;
			 comment.save();
			 camp.comments.push(comment);
			 camp.save();
			 res.redirect("/camp/"+camp._id);
			}
		});
		}
		});


});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	//req.flash("error","Please LogIn first");
	res.redirect("/login");
}

module.exports=router;