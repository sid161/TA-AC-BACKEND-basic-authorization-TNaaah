var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/logout',(req,res,next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/');
})

module.exports = router;
