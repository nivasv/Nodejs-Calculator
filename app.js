var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');

var app = express();

// configure app

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use middleware
app.use(bodyParser());
app.use(cookieParser());

//mysql connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'rootpass',
	database: 'test'
});

connection.connect();

//define routes

app.get('/', function (req,res){
	res.send('hello express');
});

app.get('/login',function (req,res){
	res.render('vlogin');
	// render login form
});

app.post('/login', function (req,res){
// verify credentials and issue cookie
var username = req.body.username;
var password = req.body.password;
var querybuilder = 'select * from usercredential where username="' + username + '" and password="'+ password + '"';
connection.query(querybuilder, function(err,result){
if(!err)
{
	//console.log(result.length);
	

	if(result.length ==1)
	{
		if(req.cookies.username)
		{
		if(req.cookies.username == username)
		{
			res.send('Welcome ' + result[0].firstname);
		}
		else
		{
			res.clearCookie('username');
			res.cookie('username',username, {maxAge:900000});
			res.send('Welcome ' + result[0].firstname);
		}
		}
		else
		{
			res.cookie('username',username, {maxAge:900000});
			res.send('Welcome ' + result[0].firstname);
		}
		
		
	

	}
	else
	{
		res.send('There seems to be an issue with the username/password combination that you entered');
	}


}
else
{
	console.log(error);
	res.send('There seems to be an issue with the username/password combination that you entered')
}
});
});

app.get('/logout',function (req,res){
	res.render('vlogout');


});

app.post('/logout', function (req,res){
	if(req.cookies.username)
	{
		res.clearCookie('username');
	res.send("You have been successfully logged out");
}
else
{
	res.send('You are not currently logged in');
}
// verify session and kill cookie
});

app.get('/add',function (req,res){
	res.render('vadd');
	// render login form
});

app.post('/add', function (req,res){
console.log(req.cookies.username);
if(req.cookies.username)
{
var number1 = parseInt(req.body.num1);
var number2 = parseInt(req.body.num2);
var intflag = 0;
if (isNaN(number1)) {
    console.log('num1 is not number');
    intflag = 1;
}
if (isNaN(number2)) {
    console.log('num2 is not number');
    intflag = 1;
}
if(intflag == 0)
{
	var result = number1 + number2;
	res.send('result:' + result);
}
else
{
	res.send('The numbers you entered are not valid');
}
}
else
{
	res.send('You must be logged in to access this function');
}
});

app.get('/divide',function (req,res){
	res.render('vdivide');
	// render login form
});

app.post('/divide', function (req,res){
if(req.cookies.username)
{
var number1 = parseInt(req.body.num1);
var number2 = parseInt(req.body.num2);
var intflag = 0;
if (isNaN(number1)) {
    console.log('num1 is not number');
    intflag = 1;
}
if (isNaN(number2)) {
    console.log('num2 is not number');
    intflag = 1;
}
if(intflag == 0)
{
	if(number2 != 0)
	{
	var result = number1 / number2;
	res.send('result:' + result);
	}
	else
	{
		res.send('The numbers you entered are not valid');
	}
}
else
{
	res.send('The numbers you entered are not valid');
}
}
else
{
	res.send('You must be logged in to access this function');
}
});

app.get('/multiply',function (req,res){
	res.render('vmultiply');
	// render login form
});

app.post('/multiply', function (req,res){
if(req.cookies.username)
{
var number1 = parseInt(req.body.num1);
var number2 = parseInt(req.body.num2);
var intflag = 0;
if (isNaN(number1)) {
    console.log('num1 is not number');
    intflag = 1;
}
if (isNaN(number2)) {
    console.log('num2 is not number');
    intflag = 1;
}
if(intflag == 0)
{
	var result = number1 * number2;
	res.send('result:' + result);
}
else
{
	res.send('The numbers you entered are not valid');
}
}
else
{
	res.send('You must be logged in to access this function');
}
});

app.listen(3000);
