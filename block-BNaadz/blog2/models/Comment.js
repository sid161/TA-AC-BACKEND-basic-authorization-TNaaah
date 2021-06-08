var express = require('express');
var mongoose = require('mongoose');
const { schema } = require('./Article');

var Schema = mongoose.Schema

var commentSchema = new Schema({
    name: {type:String,required:true},
    title:{type:String,required:true},
    articleId:{type:Schema.Types.ObjectId,ref:"Article"},
    like:[{type:Schema.Types.ObjectId, ref:"User"}],

},{timestamps:true});

var Comment = mongoose.model('Comment',commentSchema);


module.exports = Comment;