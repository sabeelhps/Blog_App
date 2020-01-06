var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");  

mongoose.connect("mongodb://localhost/blog_app",{useNewUrlParser:true,useUnifiedTopology:true});
// app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


var blogSchema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    Created:{type:Date,default:Date.now}
});



var Blog=mongoose.model("Blog",blogSchema); 



app.get("/",function(req,res){

    res.redirect("/blogs");
});

app.get("/blogs",function(req,res){

    Blog.find({},function(err,blogs){
        if(err){
            console.log("ERROR!!");
        }else{
            res.render("index.ejs",{blogs:blogs});
        }
    });    
});

app.get("/blogs/new",function(req,res){

    res.render("new.ejs");
});

app.post("/blogs",function(req,res){

    Blog.create(req.body.blog,function(err,newBlog){

        if(err){
            res.render("new.ejs");
        }
        else{
            res.redirect("/blogs");
        }
    });


});

app.get("/blogs/:id",function(req,res){

    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show.ejs",{blog:foundBlog});
        }

    });
   
});


app.listen(2000,function(){

    console.log("Blog server is running at port  2000...");
});