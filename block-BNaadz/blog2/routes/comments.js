var express = require('express');
const User = require('../models/User');
var router = express.Router();
var Comment = require('../models/Comment');

router.get('/:commentId/edit', (req,res,next) => {
    var commentId = req.params.commentId;
    Comment.findById(commentId,(err,comment) => {
        if(err) return next(err)
        res.render('editComment.ejs',{comment});
    })
})

router.post('/:id',(req,res,next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id,req.body,(err,comment) => {
        if(err) return next(err)
        res.redirect('/articles/'+ comment.articleId);
    })
})

router.get("/:id/delete",(req,res,next) => {
    var id = req.params.id;
    Comment.findByIdAndDelete(id,{$pull: {comments:comment.id }},(err,comment) => {
        if(err) return next(err)
        res.redirect('/articles'+ comment.articleId);
    })
})



module.exports = router;