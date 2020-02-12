var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride=require("method-override");
//App config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
//mongoose/model/config
var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type: Date,default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);
//Routes config
app.get("/",function(req,res){
	res.redirect("/blogs");
});
//INDEX Route
app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log("Error!");
		}else{
			res.render("index",{blogs:blogs});
		}
	});
});
//NEW route
app.get("/blogs/new",function(req,res){
	res.render("new");
});


//CREATE Route
app.post("/blogs",function(req,res){
	Blog.create(req.body.blog,function(err,newBlog){
		if(err){
			res.render("new");}
		else{
			res.redirect("/blogs");
		}	
	});
});


//SHOW route
app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("show",{blog:foundBlog});
		}
	});
});

//EDIT route
app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("edit",{blog: foundBlog})
		}
	});
});

//UPDATE ROUTE
app.put("/blogs/:id",function(req,res){
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

//DELETE route
app.delete("/blogs/:id",function(req,res){
	//destroy blog
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
		}
	});
});





app.listen(3000 || port.env.IP,function(){
	console.log("Server has started");
});