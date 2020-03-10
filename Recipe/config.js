var mysql = require('mysql');

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
