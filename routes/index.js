var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'epokalodowcowa'
});
connection.connect();
connection.query('USE clinic');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {"valid": req.query.valid});
});


//localhost:3000/panel
router.get('/panel', function(req, res, next) {
  res.render('panel', {"valid": req.query.valid});
});

router.get('/addUser', function(req, res, next) {
  var post = [req.query.idLekarza, req.query.login, req.query.Specjalizacja];
  var query = connection.query('insert into lekarz values(?,?,?,?)', post, function (error, results, fields) {
    if (error) throw error;
    res.redirect('/panel?valid=1');
  });
});

//http:localhost:3000/checkIfUsernameExists?login=admin&password=password
router.get('/checkIfUsernameExists', function(req, res, next) {
  var post = [req.query.idLekarza, req.query.Haslo ];
  var query = connection.query('select count(*) as c from lekarz where idLekarza=? and Haslo=?', post, function (error, results, fields) {
    if (error) throw error;
    if(results[0].c == 0){
        res.redirect('/');  
    }
    if(results[0].c == 1){
        res.redirect('panel?idLekarza=' + req.query.idLekarza);  
    }
     
  });
});


//http://localhost:3000/delete?id=admin&userToDelete=AndrzejTomczynski
// router.all('/delete', function(req, res, next) {
//   var post = [req.query.userToDelete];
//   var query = connection.query('delete from lekarz where login=?', post, function (error, results, fields) {
//     if (error) throw error;
//     if(req.query.login == undefined) res.redirect('/'); //in case of deleting own account
//     else res.redirect('/listofdoctors?login='+req.query.login);  //case: admin delete somebody
//   });
// });


// router.get('/listofdoctors', function(req, res, next) {

// 	if(req.query.userToSearch != undefined){
//   		var values = [];
  
//   		var post  = {login: req.query.userToSearch};
//   		connection.query('SELECT * FROM lekarz where ?', post, function(err, rows, fields) {
//             var person = {
//               'login':rows[0].login
//             };
//             	values.push(person);
//       		res.render('listofusers', {"values": values, "login": req.query.login});
//   		});
// 	}
// 	else{
//   		var values = [];
//   		connection.query('SELECT * FROM lekarz', function(err, rows, fields) {
//         	for (var i in rows) {
//           		var person = {
//             		'login':rows[i].login,
//             		'Specjalizacja':rows[i].email
//           		};
//           		values.push(person);
//       		}

//       		res.render('listofusers', {"values": values, "login": req.query.login});
//   		});
// 	}
  
// });

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
