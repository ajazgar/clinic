var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//localhost:3000/panel
router.get('/panel', function(req, res, next) {
  res.render('panel');
});


module.exports = router;
