var mongoose 	=require("mongoose");
var bookSchema=new mongoose.Schema({
	book: String,
	cover: String,
	description: String,
	author: String,
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports=mongoose.model("book",bookSchema);