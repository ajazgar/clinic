var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'epokalodowcowa'
});
connection.connect();
connection.query('USE clinicDB');

//Home page
router.get('/', function(req, res, next) {
  res.render('index', {"valid": req.query.valid});
});

router.get('/panel', function(req, res, next) {
  res.render('panel', {"valid": req.query.valid});
});


///ADDING
router.get('/addDoctor', function(req, res, next) {
  var post = [req.query.idLekarza, req.query.login, req.query.Haslo, req.query.Specjalizacja];
  var query = connection.query('insert into lekarz values(?,?,?,?)', post, function (error, results, fields) {
    if (error) throw error;
    res.redirect('/listofdoctors?idLekarza='+req.query.idLekarza);
  });
});

router.get('/addPatient', function(req, res, next) {
  var post = [req.query.idPacjenta, req.query.login];
  var query = connection.query('insert into pacjent values(?,?)', post, function (error, results, fields) {
    if (error) throw error;
    res.redirect('/listofpatients?idLekarza='+req.query.idLekarza);
  });
});

router.get('/addAppointment', function(req, res, next) {
  var post = [req.query.idWizyty, req.query.Data, req.query.Domowa, req.query.Platna, req.query.idLekarza, req.query.idPacjenta];
  var query = connection.query('insert into wizyta values(?,?,?,?,?,?)', post, function (error, results, fields) {
    if (error) throw error;
    res.redirect('/listofappointments?idLekarza='+req.query.idLekarza);
  });
});

router.get('/addReceipt', function(req, res, next) {
  var post = [req.query.idRecepty, req.query.idChoroby, req.query.Refundacja, req.query.idPacjenta, req.query.idLekarza];
  var query = connection.query('insert into recepta values(?,?,?,?,?)', post, function (error, results, fields) {
    if (error) throw error;
    res.redirect('/listofreceipts?idLekarza='+req.query.idLekarza);
  });
});

router.get('/addReferral', function(req, res, next) {
  var post = [req.query.idSkierowania, req.query.idPacjenta, req.query.idLekarza];
  var query = connection.query('insert into skierowanie values(?,?,?)', post, function (error, results, fields) {
    if (error) throw error;
    res.redirect('/listofreferrals?idLekarza='+req.query.idLekarza);
  });
});



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



//DELETING
router.all('/deleteDoctor', function(req, res, next) {
  var post = [req.query.doctorToDelete];
  var query = connection.query('delete from lekarz where idLekarza=?', post, function (error, results, fields) {
    if (error) throw error;
    	res.redirect('/listofdoctors?idLekarza=99');     
  });
});

router.all('/deletePatient', function(req, res, next) {
  var post = [req.query.patientToDelete];
  var query = connection.query('delete from pacjent where login=?', post, function (error, results, fields) {
    if (error) throw error;
    	res.redirect('/listofpatients?idLekarza=99'); 
    
  });
});

router.all('/deleteAppointment', function(req, res, next) {
  var post = [req.query.userToDelete];
  var query = connection.query('delete from wizyta where idWizyty=?', post, function (error, results, fields) {
    if (error) throw error;
    	res.redirect('/listofappointments?idLekarza=99'); 
    
  });
});

router.all('/deleteReceipt', function(req, res, next) {
  var post = [req.query.userToDelete];
  var query = connection.query('delete from recepta where idRecepty=?', post, function (error, results, fields) {
    if (error) throw error;
    	res.redirect('/listofreceipts?idLekarza=99'); 
    
  });
});

router.all('/deleteReferral', function(req, res, next) {
  var post = [req.query.userToDelete];
  var query = connection.query('delete from skierowanie where idSkierowania=?', post, function (error, results, fields) {
    if (error) throw error;
    	res.redirect('/listofreferrals?idLekarza=99'); 
    
  });
});

router.get('/listofdoctors', function(req, res, next) {

	if(req.query.userToSearch != undefined){
  		var values = [];
  
  		var post  = {login: req.query.userToSearch};
  		connection.query('SELECT * FROM lekarz where ?', post, function(err, rows, fields) {
            var person = {
              'idLekarza':rows[0].idLekarza,
              'login':rows[0].login,
              'Specjalizacja':rows[0].Specjalizacja
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
              'idPacjenta':rows[0].idPacjenta,
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
            		'login':rows[i].login
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
              'idWizyty':rows[0].idWizyty,
              'Data':rows[0].Data,
              'Domowa':rows[0].Domowa,
              'Platna':rows[0].Platna,
              'idLekarza':rows[0].idLekarza,
              'idPacjenta':rows[0].idPacjenta
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
              'idRecepty':rows[0].idRecepty,
              'idChoroby':rows[0].idChoroby,
              'Refundacja':rows[0].Refundacja,
              'idPacjenta':rows[0].idPacjenta,
              'idLekarza':rows[0].idLekarza
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
            		'idLekarza':rows[i].idLekarza
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
              'idSkierowania':rows[0].idSkierowania,
              'idPacjenta':rows[0].idPacjenta,
              'idLekarza':rows[0].idLekarza
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
            		'idLekarza':rows[i].idLekarza
          		};
          		values.push(person);
      		}

      		res.render('listofreferrals', {"values": values, "idSkierowania": req.query.idSkierowania});
  		});
	}
  
});




module.exports = router;
