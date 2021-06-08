var express = require('express');
const User = require('../models/User');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',(req,res) => {
  res.render('userRegister');
})

router.post('/register',(req,res,next) => {
  User.create(req.body,(err,user) => {
    if (err){
      if(err.name === "MongoError"){
        req.flash('error',"This email is already used")
        return res.redirect('/users/register');
      }
      if(err.name === "ValidationError"){
        console.log(err.name,err.message,"from validation")
        req.flash('error',err.message);
        return res.redirect('/users/register');
      }
    }
    res.redirect('/users/register');
  })
})

router.get('/login', (req,res) => {
  res.render('userLogin');
})

router.post('/login',(req,res,next) => {
  var {email, password} = req.body
  if(!email || !password){
    req.flash("error", "Email/password required")
    return res.redirect('/users/login')
  }
  User.findOne({email}, (err,user) => {
    if(err) return next(err)
    if(!user){
      req.flash("error","User not found")
      return res.redirect('/users/login');
    }
    user.verifyPassword(password,(err,result) => {
      if(err) return next(err)
      if(!result){
        req.flash("error","password not matched")
        return res.redirect('/users/login');
      }
      req.session.userId = user.id   // session created when user logged in 
      res.redirect('/articles');
    })
  })

})

router.get('/logout',(req,res,next) => {
  req.session.destroy();
  req.clearCookie();
  res.redirect('/users/login');
})






module.exports = router;
