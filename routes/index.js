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


router.get('/listofdoctors', function(req, res, next) {

	if(req.query.userToSearch != undefined){
  		var values = [];
  
  		var post  = {login: req.query.userToSearch};
  		connection.query('SELECT * FROM lekarz where ?', post, function(err, rows, fields) {
            var person = {
              'login':rows[0].login
            };
            	values.push(person);
      		res.render('listofdoctors', {"values": values, "login": req.query.login});
  		});
	}
	else{
  		var values = [];
  		connection.query('SELECT * FROM lekarz', function(err, rows, fields) {
        	for (var i in rows) {
          		var person = {
          			'idLekarza':rows[i].idLekarza,
            		'login':rows[i].login,
            		'Specjalizacja':rows[i].Specjalizacja
          		};
          		values.push(person);
      		}

      		res.render('listofdoctors', {"values": values, "login": req.query.login});
  		});
	}
  
});

router.get('/listofpatients', function(req, res, next) {

	if(req.query.userToSearch != undefined){
  		var values = [];
  
  		var post  = {login: req.query.userToSearch};
  		connection.query('SELECT * FROM pacjent where ?', post, function(err, rows, fields) {
            var person = {
              'login':rows[0].login
            };
            	values.push(person);
      		res.render('listofpatients', {"values": values, "login": req.query.login});
  		});
	}
	else{
  		var values = [];
  		connection.query('SELECT * FROM pacjent', function(err, rows, fields) {
        	for (var i in rows) {
          		var person = {
          			'idPacjenta':rows[i].idPacjenta,
            		'login':rows[i].login,
            		'nrUbezpieczenia':rows[i].nrUbezpieczenia
          		};
          		values.push(person);
      		}

      		res.render('listofpatients', {"values": values, "login": req.query.login});
  		});
	}
  
});

router.get('/listofappointments', function(req, res, next) {

	if(req.query.userToSearch != undefined){
  		var values = [];
  
  		var post  = {idWizyty: req.query.userToSearch};
  		connection.query('SELECT * FROM wizyta where ?', post, function(err, rows, fields) {
            var person = {
              'idWizyty':rows[0].idWizyty
            };
            	values.push(person);
      		res.render('listofappointments', {"values": values, "idWizyty": req.query.idWizyty});
  		});
	}
	else{
  		var values = [];
  		connection.query('SELECT * FROM wizyta', function(err, rows, fields) {
        	for (var i in rows) {
          		var person = {
            		'idWizyty':rows[i].idWizyty,
            		'Data':rows[i].Data,
            		'Domowa':rows[i].Domowa,
            		'Platna':rows[i].Platna,
            		'idLekarza':rows[i].idLekarza,
            		'idPacjenta':rows[i].idPacjenta
          		};
          		values.push(person);
      		}

      		res.render('listofappointments', {"values": values, "idWizyty": req.query.idWizyty});
  		});
	}
  
});

router.get('/listofreceipts', function(req, res, next) {

	if(req.query.userToSearch != undefined){
  		var values = [];
  
  		var post  = {idRecepty: req.query.userToSearch};
  		connection.query('SELECT * FROM recepta where ?', post, function(err, rows, fields) {
            var person = {
              'idRecepty':rows[0].idRecepty
            };
            	values.push(person);
      		res.render('listofreceipts', {"values": values, "idRecepty": req.query.idRecepty});
  		});
	}
	else{
  		var values = [];
  		connection.query('SELECT * FROM recepta', function(err, rows, fields) {
        	for (var i in rows) {
          		var person = {
            		'idRecepty':rows[i].idRecepty,
            		'idChoroby':rows[i].idChoroby,
            		'Refundacja':rows[i].Refundacja,
            		'idPacjenta':rows[i].idPacjenta,
            		'idLekarza':rows[i].idLekarza,
            		'idWizyty':rows[i].idWizyty
          		};
          		values.push(person);
      		}

      		res.render('listofreceipts', {"values": values, "idRecepty": req.query.idRecepty});
  		});
	}
  
});


router.get('/listofreferrals', function(req, res, next) {

	if(req.query.userToSearch != undefined){
  		var values = [];
  
  		var post  = {idSkierowania: req.query.userToSearch};
  		connection.query('SELECT * FROM skierowanie where ?', post, function(err, rows, fields) {
            var person = {
              'idSkierowania':rows[0].idSkierowania
            };
            	values.push(person);
      		res.render('listofreferrals', {"values": values, "idSkierowania": req.query.idSkierowania});
  		});
	}
	else{
  		var values = [];
  		connection.query('SELECT * FROM skierowanie', function(err, rows, fields) {
        	for (var i in rows) {
          		var person = {
            		'idSkierowania':rows[i].idSkierowania,
            		'idPacjenta':rows[i].idPacjenta,
            		'idLekarza':rows[i].idLekarza,
            		'idWizyty':rows[i].idWizyty
          		};
          		values.push(person);
      		}

      		res.render('listofreferrals', {"values": values, "idSkierowania": req.query.idSkierowania});
  		});
	}
  
});




module.exports = router;
