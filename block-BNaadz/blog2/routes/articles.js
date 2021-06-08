var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
var Comment = require('../models/Comment');
var User = require('../models/User');
var auth = require('../middlewares/auth');


router.get("/",(req,res,next) => {
    Article.find({}, (err,articles) => {
        if(err) return next (err)
        res.render('articles.ejs', {articles});

    })
})



router.get('/new',auth.loggedInUser,(req,res) => {

     res.render('createArticle.ejs',{user:"sid"});
})

router.get('/:id',(req,res,next) => {
    var id = req.params.id;
    Article.findById(id).populate('comments').populate('author','name email').exec((err,article) => {
        if(err) return next(err)
        console.log(article);
        res.render('singleArticle',{article} );
    })

})




router.use(auth.loggedInUser); // middleware for cheking logged in user



router.post('/',(req,res,next) => {
    req.body.author = req.body._id;
    console.log(req.session);
    Article.create({...req.body,author:req.session.userId},(err,article) => {
        console.log(err,article);
        if(err) return next(err)
        res.redirect('/articles');
    })
})


router.get("/:id/edit", (req,res,next) => {
    var id = req.params.id;
    Article.findById(id,(err,article) => {
        if (err) return next (err)
        res.redirect('updateArticle',{article});
    })
})

router.post('/:id',(req,res,next) => {
    var id = req.params.id;
    Article.findByIdAndUpdate(id,req.body,(err,updatedArticle) => {
        if(err) return next(err)
        res.redirect('/articles/' + id);
    })
})

router.get("/:id/delete", (req,res,next) => {
    var id = req.params.id;
    Article.findByIdAndDelete(id,(err,article) => {
        if(err) return next(err)
        res.redirect('/articles/' + id);
    })
})

router.get('/:id/likes',(req,res,next) => {
    var id = req.params.id;
    Article.findByIdAndUpdate(id, {$inc : {likes:1}}, (err,article) => {
        if(err) return next(err)
        res.redirect('/articles' + id);
    })
})

router.post('/:articleId/comments', (req,res,next) => {
    var articleId = req.params.articleId;
    req.body.articleId = articleId;
    Comment.create(articleId,(err,comment) => {
        if(err) next (err)
    Article.findByIdAndUpdate(articleId,{$push: {comments: comment.id}},(err,article) => {
        if(err) return next (err)
        res.redirect('/articles/' + articleId);
    }
     )

    })
})

module.exports = router;
