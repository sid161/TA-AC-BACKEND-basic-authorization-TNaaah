var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema

var articleSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    comments:[{type:Schema.Types.ObjectId,ref:"Comment"}],
    slug:String,
    author:{type:String,required:true},
    authorId:{type:Schema.Types.ObjectId,ref:"User"}
   
},{timestamps:true});

var Article = mongoose.model('Article',articleSchema)
module.exports = Article;


// title:
//     description: 
//     likes: 
//     comments: 
 //   author:
//     slug: 
//     authorId: 