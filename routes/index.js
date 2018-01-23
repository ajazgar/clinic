var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//localhost:3000/panel
router.get('/panel', function(req, res, next) {
  res.render('panel', {"valid": req.query.valid});
});

//http://localhost:3000/checkIfUsernameExists?login=Admin&password=password
router.get('/checkIfUsernameExists', function(req, res, next) {
  var post = [req.query.id, req.query.password ];
  var query = connection.query('select count(*) as c from lekarz where id=? and password=?', post, function (error, results, fields) {
    if (error) throw error;
    if(results[0].c == 0){
        res.redirect('/index');  
    }
    if(results[0].c == 1){
        res.redirect('panel?id='+req.query.id);  
    }
     
  });
});


router.get('/listofdoctors', function(req, res, next) {

	if(req.query.userToSearch != undefined){
  		var values = [];
  
  		var post  = {id: req.query.userToSearch};
  		connection.query('SELECT * FROM lekarz where ?', post, function(err, rows, fields) {
        	    var person = {
            	  'id':rows[0].id
           		};
            	values.push(person);
      	res.render('listofdoctors', {"values": values, "id": req.query.id});
  		});
	}
	else{
  		var values = [];
  		connection.query('SELECT * FROM lekarz', function(err, rows, fields) {
        	for (var i in rows) {
        	  var person = {
            	'id':rows[i].id,
            	'email':rows[i].email,
            	'date_of_birth':rows[i].date_of_birth
          	};
         	 values.push(person);
      	}

      	res.render('listofdoctors', {"values": values, "id": req.query.id});
  		});
	}
  
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
