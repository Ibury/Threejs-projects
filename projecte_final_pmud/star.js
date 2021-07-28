var express = require('express')
var http = require('http')
var https = require('https')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var mysql = require('mysql');
var path = require('path');
var cors = require('cors');
var bcrypt = require('bcryptjs');
const saltRounds =10;
app.use(express.urlencoded({extended: true}));
var url="";
var appId="";


db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Toor1234$',
	database: 'universe',
})

const listconstellation = (req, res) => {
	let sql = `SELECT * FROM constellation`;
	db.query(sql, function(err, data, fields) {
	  if (err) throw err;
	  res.json({
		status: 200,
		data,
		message: "Constellation lists retrieved successfully"
	  })
	})
  };

  const liststar = (req, res) => {
	let sql = `SELECT * FROM star`;
	db.query(sql, function(err, data, fields) {
	  if (err) throw err;
	  res.json({
		status: 200,
		data,
		message: "Star list retrieved successfully"
	  })
	})
  };

  const listplanet = (req, res) => {
	let sql = `SELECT * FROM planet`;
	db.query(sql, function(err, data, fields) {
	  if (err) throw err;
	  res.json({
		status: 200,
		data,
		message: "Planet lists retrieved successfully"
	  })
	})
  };

  const listmoon = (req, res) => {
	let sql = `SELECT * FROM moon`;
	db.query(sql, function(err, data, fields) {
	  if (err) throw err;
	  res.json({
		status: 200,
		data,
		message: "Moon lists retrieved successfully"
	  })
	})
  };

  const listlocalitzacio = (req, res) => {
	let sql = `SELECT * FROM localitzacio`;
	db.query(sql, function(err, data, fields) {
	  if (err) throw err;
	  res.json({
		status: 200,
		data,
		message: "localitzacio retrieved successfully"
	  })
	})
  };

const createconstellation =  (req, res) => {
	//let sqlcompr = `SELECT * FROM constellation WHERE name = ? LIMIT 1`;
	let sql = `INSERT INTO constellation(name, coordinates, size) VALUES (?)`;
	let values = [
		req.body.name,
		req.body.coordinates,
		req.body.size	
	];
	/*db.query(sqlcompr, req.body.name, function(err, data, fields){
		console.log(data);
		if(data.length===0){
			res.status(404);
			res.send("Name exists");	
		}else{*/
		try{	
			db.query(sql, [values], function(err, data, fields){
				if (err) throw err;
				res.json({
					status: 200,
					message: "New constellation added successfully"
				})
			})	
		} catch (error){
			console.log("error");
		}
	
}

const createstar = (req,res) => {
	let sqlcompr = `SELECT * FROM star WHERE name = ? LIMIT 1`;
	let sql = `INSERT INTO star(name, size, composition, age) VALUES (?)`;
	let values = [
		req.body.name	
	];
	db.query(sqlcompr, req.body.name, function(err, data, fields){
		if(data){
			res.status(404);
			res.send("Name exists");	
		}else{
			db.query(sql, [values], function(err, data, fields){
				if (err) throw err;
				res.json({
					status: 200,
					message: "New star added successfully"
				})
			})	
		}
	})
}

const createplanet = (req,res) => {
	let sqlcompr = `SELECT * FROM planet WHERE name = ? LIMIT 1`;
	let sql = `INSERT INTO planet(name, size, type, age, rings) VALUES (?)`;
	let values = [
		req.body.name	
	];
	db.query(sqlcompr, req.body.name, function(err, data, fields){
		if(data.length){
			res.status(404);
			res.send("Name exists");	
		}else{
			db.query(sql, [values], function(err, data, fields){
				if (err) throw err;
				res.json({
					status: 200,
					message: "New planet added successfully"
				})
			})	
		}
	})
}

const createmoon = (req,res) => {
	let sqlcompr = `SELECT * FROM moon WHERE name = ? LIMIT 1`;
	let sql = `INSERT INTO moon(name, size, type) VALUES (?)`;
	let values = [
		req.body.name	
	];
	db.query(sqlcompr, req.body.name, function(err, data, fields){
		if(data.length){
			res.status(404);
			res.send("Name exists");	
		}else{
			db.query(sql, [values], function(err, data, fields){
				if (err) throw err;
				res.json({
					status: 200,
					message: "New moon added successfully"
				})
			})	
		}
	})
}

const updatedades = (req,res) => {

}

  const logController = (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Headers', 'GET, OPTION, PUT, POST, PATCH, DELETE');
	console.log("******************************************");
    console.log('req.method = ' + req.method);
    console.log('req.URL = ' + req.originalUrl);
    console.log('req.body = ' + JSON.stringify(req.body));
    console.log("******************************************");
    next();
  };
  app.options('*',                                   cors());
  app.use('*',                  	          logController);
  app.get('/constellation',		          listconstellation);
  app.get('/star',				                   liststar);
  app.get('/planet',		          	         listplanet);
  app.get('/moon',		          				   listmoon);
  app.post('/newconstellation', 	        createconstellation);
  app.put('/newstar',   				         createstar);
  app.put('/newplanet',                        createplanet);
  app.put('/newmoon',                            createmoon);
  app.get('/localitzacio/:id',             listlocalitzacio);
  //app.put('/update/constellation/:id',     updatedadesconst);
  //app.put('/update/star/:id',               updatedadesstar);
  //app.put('/update/planet/:id',           updatedadesplanet);
  //app.put('/update/noom/:id',               updatedadesmoon);
  //app.delete('/delete/:id',                     deletedades);

app.all('*', function(req, res) {
	res.json({
	code: 404,
	message: 'Method not found' });
});

http.createServer(app).listen(8001, () => {
  console.log('Server started at http://localhost:8001');
});
