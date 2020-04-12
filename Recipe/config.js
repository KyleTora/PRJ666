/*

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
*/


//var http = require('http');
var mysql = require('mysql');

var mysqlConfig = {'host': 'mymysql.senecacollege.ca', 'user': 'prj666_201a06', 'database': 'prj666_201a06'};
var mysqlClient = mysql.createConnection(mysqlConfig); // This is the global MySQL client
handleDisconnect(mysqlClient);

// var server = http.createServer(function (req, res) {
//   req.resume(); // Discard any request body

//   mysqlClient.query('SELECT * FROM `test`;', function (error, rows) {
//     if (error) {
//       console.error(error.stack);
//       res.statusCode = 500;
//       res.end();
//       return;
//     }
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end(JSON.stringify(rows, null, 2));
//   });
// });

// server.listen(3000, function () {
//   console.log('HTTP server listening on port 3000');
// });

function handleDisconnect(client) {
  client.on('error', function (error) {
    if (!error.fatal) return;
    if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

    console.error('> Re-connecting lost MySQL connection: ' + error.stack);

    mysqlClient = mysql.createConnection(client.config);
    handleDisconnect(mysqlClient);
    mysqlClient.connect();
  });
};