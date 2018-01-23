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

//localhost:3000/listofappointments
router.get('/listofappointments', function(req, res, next) {
  res.render('listofappointments');
});

//localhost:3000/listofdoctors
router.get('/listofdoctors', function(req, res, next) {
  res.render('listofdoctors');
});

//localhost:3000/listofpatients
router.get('/listofpatients', function(req, res, next) {
  res.render('listofpatients');
});

//localhost:3000/listofreceipts
router.get('/listofreceipts', function(req, res, next) {
  res.render('listofreceipts');
});

//localhost:3000/listofreferrals
router.get('/listofreferrals', function(req, res, next) {
  res.render('listofreferrals');
});


module.exports = router;
