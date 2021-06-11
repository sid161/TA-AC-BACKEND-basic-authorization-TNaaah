var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Podcast = require('../models/Podcast');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.fieldname +"." + file.mimetype.split("/")[1])
      }
    })
     
    var upload = multer({ storage: storage })
    
    
    var auth = require("../middlewares/auth")

    router.use(auth.userInfo);

    router.get('/',(req,res,next) => {
        var membership = req.user.category;
        if(membership === "free"){
            Podcast.find({types:membership},(err,podcasts) => {
                if (err) return next(err)
                Podcast.distinct("types",(err,categories) => {
                    if(err) return next(err)
                    res.render('allPodcast',{podcasts,categories})
                })
            })
        } else if(membership === "VIP"){
            Podcast.find({types:{$in: ["free", "vip"]}}, (err,podcasts) => {
                if(err) return next(err)
                Podcast.distinct("types", (err,categories) => {
                    if(err) return next(err)
                    res.render('allPodcast', {podcasts,categories})
                })
            })
        } else{
            Podcast.find({}, (err,podcasts) => {
                if(err) return next(err)
                Podcast.distinct("types",(err,categories) => {
                    if(err) return next(err)
                    res.render('allPodcast', {podcasts,categories})
                })
            })
        }
    })

    router.post('/',upload.single("avatar"),(req,res,next) => {
        Podcast.create({...req.body,filesUrl: req.file.fieldname + "." + req.file.mimetype.split("/")[1]}, (err,podcast) => {
            if(err) return next(err)
            res.redirect('/podcast');
        })

    })

    router.use(auth.loggedInUser);

    router.get("/create", (req,res,next) => {
        const {userId} = req.session;
        console.log(userId);
        User.findById(userId,(err,user) => {
            if(err) return next(err)
            res.render("createPodcast");
        })
    })

    router.get('/:id',(req,res,next) => {
        var id = req.params.id;
        Podcast.findById(id,(err,podcast) => {
            if(err) return next(err)
            res.render('singlePodcast',{podcast});
        })
    })

    router.get('/category/single',(req,res,next) => {
        var type = req.params.category;
        Podcast.find({types: type}).exec((err,podcast) => {
            if(err) return next(err)
            res.render('categorywisePodcast',{podcast});
        })
    })

    router.get('/:id/delete',(req,res,next) => {
        var id = req.params.id;
        Podcast.findByIdAndDelete(id,(err,podcast) => {
            if(err) return next(err)
            res.redirect('/podcast/'+ id)
        })
    })

    module.exports = router;
