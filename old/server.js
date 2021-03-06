const http = require('http');
const path = require('path');
const fs = require('fs');
const hostname = '10.102.112.179';
const port = 10034;
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
var nodemailer = require('nodemailer');

//set our email
var transporter = nodemailer.createTransport({
        service: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth:{
                user: 'prj666_201a06@myseneca.ca',
                pass: 'GFss7@2*g(6&',
        },
        tls:{
                rejectUnauthorized: false
        }

});
transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

var connection = require('./js/config');
var recipe;
connection.query("SELECT * FROM Recipe", function (err,result,fields){
        if(err) throw err;
        //console.log(result[0].recipe_name);
        recipe = {1: result[0].recipe_name, 2: result[0].ingredients, 3: result[0].servings, 4: result[0].description};
});
var app = express();
//app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.set('view engine', 'ejs');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.get("/", (req, res) => {
        res.sendFile(__dirname + "/index.html");
});

app.get("/signup", (req, res) => {
        res.sendFile(__dirname + "/signUp.html");
});

app.get("/signin", (req, res) => {
        res.sendFile(__dirname + "/signIn.html");
});


app.post('/signinCheck', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM User WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/signupCheck', function(request, response) {
        var email = request.body.email;
	var username = request.body.username;
        var password = request.body.password;
        var password2 = request.body.password2;

	if ((email && username && password && password2) && (password == password2)) {
                connection.query("INSERT INTO User (username, password, email) VALUES(?, ?, ?)", [username, password, email], function(error, results, fields){
                        if (error) {
                                response.send('Incorrect Username and/or Password!');
			} else {
				request.session.loggedin = true;
                                request.session.username = username;
                                var mailOptions = {
                                      //  from: 'prj666_201a06@myseneca.ca',
                                        to: email,
                                        subject: 'This is a confirmation email',
                                        text: 'Email has been successfully made'
                                };
                                transporter.sendMail(mailOptions, function(error, info){
                                        if(error){
                                                console.log(error);
                                        }else{
                                                console.log('Email sent: ' + info.response);
                                        }
                                })
                                
				response.redirect('/');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


  app.get("/resetPass", (req, res) => {
        res.sendFile(__dirname + "/resetPassword.html");
  });

  app.get("/editProfile", (req, res) => {
          if(req.session && req.ression.user){
                res.locals.user = user;
                res.render(__dirname + "/profilePage.html");
          }else{
                  req.session.reset();
                  res.redirect('/signIn.html');
          }
        //res.sendFile(__dirname + "/profilePage.html");
  });

  app.get("/recipePage", function(req, res){
    
        
        res.render('recipePage', {
                recipe_name : recipe[1],
                ingredients: recipe[2], 
                servings: recipe[3], 
                description: recipe[4]
        });
        //res.render(__dirname + "/recipePage.html");
  });


  /*
  if(req.url === "/signup"){
        fs.readFile("signUp.html", function (error, pgResp){
                if(error){
                        res.writeHead(404);
                        res.write('404 page');
                }else{
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(pgResp);
                }
                res.end();

        });
   }else if(req.url === "/signin"){
        fs.readFile("signIn.html", function (error, pgResp){
                if(error){
                        res.writeHead(404);
                        res.write('404 page');
                }else{
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(pgResp);		
		}
                res.end();

        });
  }else if(req.url === "/forgotPassword"){
        fs.readFile("forgotPass.html", function (error, pgResp){
                if(error){
                        res.writeHead(404);
                        res.write('404 page');
                }else{
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(pgResp);
                }
                res.end();

        });
  
    }else if(req.url === "/editProfile"){
        fs.readFile("userEditProfile.php", function (error, pgResp){
                if(error){
                        res.writeHead(404);
                        res.write('404 page');
                }else{
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(pgResp);
                }
                res.end();

        });
  }else if(req.url === "/recipePage"){
        fs.readFile("recipePage.html", function (error, pgResp){
                if(error){
                        res.writeHead(404);
                        res.write('404 page');
                }else{
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(pgResp);
                }
                res.end();

        });
}
*/

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.on('error', (err) => {
	console.log(err.message);
});
