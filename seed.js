var mongoose 	= require("mongoose");
var book 		= require("./models/book");
var Comment   	= require("./models/comment");
 
var data = [
    {
        book: "The Stranger", 
        author:"Albert Camus",
		cover: "https://images-na.ssl-images-amazon.com/images/I/81GODMeckmL.jpg",
        description: "Through the story of an ordinary man unwittingly drawn into a senseless murder on an Algerian beach, Camus explored what he termed the nakedness of man faced with the absurd First published in English in 1946; now in a new translation by Matthew Ward."
    },
	    {
        book: "The Hunger Games", 
        author:"Suzanne Collins",
		cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1447303603l/2767052.jpg",
		description:"Could you survive on your own, in the wild, with everyone out to make sure you don't live to see the morning? In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV. Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she is forced to represent her district in the Games. But Katniss has been close to dead before - and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weigh survival against humanity and life against love."
	},
	    {
        book: "Kafka on the shore", 
        author:"Haruki Murakami",
		cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1429638085l/4929.jpg",
        description: "Kafka on the Shore, a tour de force of metaphysical reality, is powered by two remarkable characters: a teenage boy, Kafka Tamura, who runs away from home either to escape a gruesome oedipal prophecy or to search for his long-missing mother and sister; and an aging simpleton called Nakata, who never recovered from a wartime affliction and now is drawn toward Kafka for reasons that, like the most basic activities of daily life, he cannot fathom. Their odyssey, as mysterious to them as it is to us, is enriched throughout by vivid accomplices and mesmerizing events. "
    }

]
 
function seedDB(){
   //Remove all campgrounds
        book.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed books!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                book.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This book has an inriguing storyline , but is a little slow paced",
                                author: "Ria",
								rating: "4.0"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    
}
module.exports = seedDB;