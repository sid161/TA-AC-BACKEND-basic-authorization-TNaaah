var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema

var userSchema = new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,minlength:4,required:true},
    city:String
},{timestamps:true})



userSchema.pre('save', function(next){
    if(this.password && this.isModified('password')){
        bcrypt.hash(this.password,10,(err,hashed) => {
            if(err) return next (err)
            this.password = hashed;
            return next();
        })
    } else{
        next();
    }
})

userSchema.methods.verifyPassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,result) => {
        return cb(err,result);
    })
}


var User = mongoose.model('User',userSchema)
module.exports = User;
