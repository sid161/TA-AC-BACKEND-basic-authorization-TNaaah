var User = require('../models/User');
var Article = require('../models/Article');
var Comment = require('../models/Comment');

module.exports = {
    loggedInUser: (req,res,next) => {
        if(req.session && req.session.userId){
            next()
        } else {
            res.redirect('/userslogin');
        }
    },

    userInfo: (req,res,next) => {
        var userId = req.session && req.session.userId;
        if(userId){
            User.findById(userId,"name email",(err,user) => {
                if(err) return next(err)
                req.user = user;
                res.locals.user = user;
                next();
                
             })
             } else{
                    req.user = null;
                    res.locals.user = null;
                    next();
                }
            },
        }
    