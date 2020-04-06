const http = require('http');
const path = require('path');
const fs = require('fs');
// const hostname = '10.102.112.179'; // On VM
const hostname = 'localhost'; // Locally
const port = 10034;
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
var mailer = require('nodemailer');
const cors = require('cors');
var mysql = require('mysql');

let ssl;


try {
        ssl = {
                key: fs.readFileSync(path.join(__dirname, "ssl/prj666-2021.key")).toString(),
                cert: fs.readFileSync(path.join(__dirname, "ssl/prj666-2021.crt")).toString()
        };
} catch (err) {
        console.error("Test SSL is: ", err);
}

/*
//set our email
var transporter = mailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth:{
                user: 'prj666_201a06@myseneca.ca',
                pass: '15NBgf*@g65J' // new password
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
*/
//var connection = require('./config');

var connection = mysql.createConnection({
	host     : 'mymysql.senecacollege.ca',
	user     : 'prj666_201a06',
	password : 'rfLG@8559',
	database : 'prj666_201a06'
});

connection.connect(function(err){
	if(!err) {
		console.log("Database is connected");
	} else {
		console.log("Error while connecting with database");
	}
});

module.exports = connection; 


var app = express();


//app.engine('html', require('ejs').renderFile);
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(cors());

app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
        next();
});

app.use(express.static(path.join(__dirname + '/dist/Recipe')));
app.set('view engine', 'ejs');
app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
}));

app.get("/", (req, res) => {
        res.sendFile(__dirname + "/dist/Recipe/index.html");
});

app.get("/signup", (req, res) => {
        res.sendFile(__dirname + "/signUp.html");
});

app.get("/signin", (req, res) => {
        res.sendFile(__dirname + "/signIn.html");
});

app.post('/signinCheck', function (request, response) {
        var username = request.body.username;
        var password = request.body.password;
        if (username && password) {
                connection.query('SELECT * FROM User WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
                        if (results.length > 0) {
                                request.session.loggedin = true;
                                request.session.username = username;
                                //returning user object
                                response.json(results[0]);
                        } else {
                                response.send('Incorrect Username and/or Password!');
                        }
                });
        } else {
                response.send('Please enter Username and Password!');
        }
});

app.post('/signupCheck', function (request, response) {
        var email = request.body.email;
        var username = request.body.username;
        var password = request.body.password;
        var password2 = request.body.password2;

        if ((email && username && password && password2) && (password == password2)) {
                connection.query("INSERT INTO User (username, password, email) VALUES(?, ?, ?)", [username, password, email], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Username and/or Password!');
                        } else {
                                request.session.loggedin = true;
                                request.session.username = username;
                                response.json(results[0]);

                              /*  var mailOptions = {
                                        //to: "kyletora1@gmail.com",
                                        subject: 'This is a confirmation email',
                                        text: 'Email has been successfully made'
                                };
                                transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                                console.log(error);
                                        } else {
                                                console.log('Email sent: ' + info.response);
                                        }
                                })
*/
                        }
                });
        } else {
                response.send('Please enter Username and Password!');
        }
});

app.post('/checkEmail', function (request, response) {
        var email = request.body.email;
        if (email) {
                connection.query('SELECT * FROM User WHERE email = ?', [email], function (error, results, fields) {
                        if (results.length > 0) {
                                //returning user object
                                response.json(results[0]);
                        } else {
                                response.send(error);
                        }
                });
        } else {
                response.send('Enter an Email Address!');
        }
});

app.post('/resetPass', function (request, response) {
        var password = request.body.password;
        var email = request.body.email;
        if (password) {
                connection.query('UPDATE User SET password = ? WHERE email = ?', [password, email], function (error, results, fields) {
                        if (error) {
                                response.send('error');
                        } else {
                                response.json(results.affectedRows);
                        }
                });
        } else {
                response.send('Enter a password');
        }
});

app.post('/updateBio', function (request, response) {
        var bio = request.body.bio;
        var id = request.body.id;
        if (bio) {
                connection.query('UPDATE User SET bio = ? WHERE user_ID = ?', [bio, id], function (error, results, fields) {
                        if (error) {
                                response.send('error');
                        } else {
                                response.json(results.affectedRows);
                        }
                });
        } else {
                response.send('Enter a password');
        }
});
app.post('/newProfilePic', function (request, response) {
        var image = request.body.image;
        var id = request.body.id;
        if (id && image) {
                connection.query('UPDATE User SET profilePic = ? WHERE user_ID = ?', [image, id], function (error, results, fields) {
                        if (error) {
                                response.send('error');
                        } else {
                                response.json(results.affectedRows);
                        }
                });
        } else {
                response.send('Enter an image');
        }
});
app.post('/loadPic', function (request, response) {
        var id = request.body.user_id;
        if (id) {
                connection.query('SELECT profilePic FROM User WHERE user_ID = ?', [id], function (error, results, fields) {
                        if (error) {
                                response.send('error');
                        } else {
                                response.json(results);
                        }
                });
        } else {
                response.send('Enter an image');
        }
});
app.post('/loadBio', function (request, response) {
        var id = request.body.user_id;
        if (id) {
                connection.query('SELECT bio FROM User WHERE user_ID = ?', [id], function (error, results, fields) {
                        if (error) {
                                response.send('error');
                        } else {
                                response.json(results);
                        }
                });
        } else {
                response.send('Enter a bio');
        }
});
app.post('/newRecipe', function (request, response) {
        var userID = request.body.userID;
        var name = request.body.recipeName;
        var type = request.body.mealType;
        var region = request.body.region;
        var description = request.body.description;
        var cooktime = request.body.cooktime;
        var servings = request.body.servings;
        var chef = request.body.chef;
        var lifestyle = request.body.lifestyle;
        var image = request.body.image;

        if (name && type && region && cooktime && servings && chef) {
                connection.query("INSERT INTO Recipes (userid, recipeName, chef, image, mealType, region, lifestyle, description, cooktime, servings) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [userID, name, chef, image, type, region, lifestyle, description, cooktime, servings], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Recipe Format!');
                        } else {
                                response.json(results.insertId);
                        }
                });
        } else {
                response.send('Please enter Recipe!');
        }
});

app.post('/newFav', function (request, response) {
        var recipeid = request.body.recipeid;
        var userID = request.body.userid;
        var name = request.body.recipeName;
        var description = request.body.description;

        if (recipeid, userID, name, description) {
                connection.query("INSERT INTO FavouriteRecipes (recipe_id, userid, recipeName, description) VALUES(?, ?, ?, ?)", [recipeid, userID, name, description], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Recipe Format!');
                        } else {
                                
                                response.json(results);
                        }
                });
        } else {
                response.send('Please enter Recipe!');
        }
});

app.post('/newPlaylist', function (request, response) {
        var userID = request.body.userID;
        var name = request.body.playlistName;
        var desc = request.body.description;

        if ( userID, name, desc) {
                connection.query("INSERT INTO Playlists (user_id, playlistName, description) VALUES(?, ?, ?)", [userID, name, desc], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Playlist Format!');
                        } else {
                                response.json(results);
                        }
                });
        } else {
                response.send('Please enter Playlist!');
        }
});

app.post('/newIngredients', function(req, res){
        var instructions = req.body.instructions;
        var ingredients = req.body.ingredients;
        var amount = req.body.amount;
        var measure = req.body.measure;
        var recipe = req.body.recipe_id;
        
        if(ingredients && instructions){   
                for(var i = 0; i < instructions.length; i++){                     
                        connection.query("INSERT INTO Instructions(recipe_id, step) VALUES(?,?)", [recipe, instructions[i]],  function (error, results, fields) {
                                if (error) { 
                                        response.send(error);
                                } else {
                                       // response.json(results);
                                }   
                        });
                }
                for(var i = 0; i < ingredients.length; i++){                     
                        connection.query("INSERT INTO Ingredients(ingredient_name, amount, measure, recipe_id) VALUES(?,?,?,?)", [ingredients[i], amount[i], measure[i], recipe],  function (error, results, fields) {
                                if (error) { 
                                        response.send(error);
                                } else {
                                        //response.json(results);
                                }   
                        });
                }
        }else {
                res.send('Please enter Ingredients!');
        }

});

app.post('/deleteRecipe', function (request, response) {
        var id = request.body.id;
     
        if (id > 0) {
                connection.query("DELETE FROM Recipes WHERE recipe_id = ?", [id], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Recipe Format!');
                        } else {
                                response.json(results[0]);
                        }
                });
        } else {
                response.send('Please enter Recipe!');
        }
});

app.post('/deleteFav', function (request, response) {
        var recipeid = request.body.recipeId;
        var userid = request.body.userId;

        if (recipeid > 0 && userid > 0) {
                connection.query("DELETE FROM FavouriteRecipes WHERE recipe_id = ? AND userid = ?", [recipeid, userid], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Favourite Format!');
                        } else {
                                response.json(results[0]);
                        }
                });
        } else {
                response.send('Please enter Recipe!');
        }
});

app.post('/deletePlaylist', function (request, response) {
        var id = request.body.id;

        if (id > 0) {
                connection.query("DELETE FROM Playlists WHERE playlist = ?", [id], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Playlist Format!');
                        } else {
                                response.json(results[0]);
                        }
                });
        } else {
                response.send('Please enter Playlist!');
        }
});

app.post('/deleteOthers', function (request, response) {
        var recipeid = request.body.id;

        if (recipeid > 0 ) {
                connection.query("DELETE FROM Ingredients WHERE recipe_id = ?", [recipeid], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Favourite Format!');
                        } else {
                                response.json(results[0]);
                        }
                });

                connection.query("DELETE FROM Instructions WHERE recipe_id = ?", [recipeid], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Favourite Format!');
                        } else {
                                response.json(results[0]);
                        }
                });
        } else {
                response.send('Please enter Recipe!');
        }
});



app.post('/loadRecipe', function (request, response) {
        var id = request.body.id;
     
        if (id > 0) {
                connection.query("SELECT * FROM Recipes WHERE recipe_id = ?", [id], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Recipe Format!');
                        } else {
                                response.json(results[0]);
                        }
                });
        } else {
                response.send('Please enter Recipe!');
        }
});

app.post('/loadRecipeType', function (request, response) {
        var type = request.body.type;
     
        if (type) {
                connection.query("SELECT * FROM Recipes WHERE mealType = ? or lifestyle = ? or region = ?", [type, type, type], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Recipe Format!');
                        } else {
                                response.json(results);
                        }
                });
        } else {
                response.send('Please enter Recipe!');
        }
});

app.post('/loadUserRecipe', function (request, response) {
        var id = request.body.userID;
     
        if (id > 0) {
                connection.query("SELECT * FROM Recipes WHERE userid = ?", [id], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Recipe Format!');
                        } else {
                                response.json(results);
                        }
                });
        } else {
                response.send('Please enter Recipe!');
        }
});

app.post('/loadFavourite', function (request, response) {
        var id = request.body.userID;
     
        if (id > 0) {
                connection.query("SELECT * FROM FavouriteRecipes WHERE userid = ?", [id], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Recipe Format!');
                        } else {
                                response.json(results);
                        }
                });
        } else {
                response.send('Please enter Recipe!');
        }
});

app.post('/loadPlaylists', function (request, response) {
        var id = request.body.userID;
     
        if (id > 0) {
                connection.query("SELECT * FROM Playlists WHERE user_id = ?", [id], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Playlist Format!');
                        } else {
                                response.json(results);
                        }
                });
        } else {
                response.send('Please enter Playlist!');
        }
});
app.post('/loadUserPlaylist', function (request, response) {
        var id = request.body.id;
        if (id > 0) {
                connection.query("SELECT * FROM Playlists WHERE playlist = ?", [id], function (error, results, fields) {
                        if (error) {
                                response.send('Incorrect Recipe Format!');
                        } else {
                                response.json(results);
                        }
                });
        } else {
                response.send('Please enter Recipe!');
        }
});

app.post('/loadSteps', function (req, res){
        var id = req.body.id;
     
        if (id > 0) {
                connection.query("SELECT step FROM Instructions WHERE recipe_id = ?", [id], function (error, results, fields) {
                        if (error) {
                                res.send('Incorrect Recipe Format!');
                        } else {
                                res.json(results);
                        }
                });
        } else {
                res.send('Please enter Steps!');
        }
});

app.post('/loadIngredients', function (req, res){
        var id = req.body.id;
     
        if (id > 0) {
                connection.query("SELECT * FROM Ingredients WHERE recipe_id = ?", [id], function (error, results, fields) {
                        if (error) {
                                res.send('Incorrect Recipe Format!');
                        } else {
                                res.json(results);
                        }
                });
        } else {
                res.send('Please enter Steps!');
        }
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

app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'Recipe', 'index.html'));
});

// require('http')
//         .createServer(app)
//         .listen(port, () => {
//                 console.log(`Server running at http://${hostname}:${port}/`);
//         });


if (ssl)
        require("https")
                .createServer(ssl, app)
                .listen(port, () => {
                        console.log(`Server running on port ${port} using https`);
                });
else
        require("http")
                .createServer(app)
                .listen(port, () => {
                        console.log(`Server running on port ${port} using http`);
                });

app.on('error', (err) => {
        console.log(err.message);
});

