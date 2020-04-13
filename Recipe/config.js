
// this code was taken from this website as an attempt to fix our disconnection issue
// https://github.com/mysqljs/mysql/issues/431

var mysql = require('mysql');
var client = {'host' : 'mymysql.senecacollege.ca', 'user' : 'prj666_201a06','password' : 'rfLG@8559','database' : 'prj666_201a06'}

var connection = mysql.createConnection(client);
handleDisconnect(connection);

connection.connect(function(err){
	if(!err) {
		console.log("Database is connected now");
	} else {
		console.log("Error while connecting with database");
	}
});

module.exports = connection; 

function handleDisconnect(client) {
  client.on('error', function (error) {
    if (!error.fatal) return;
    if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

    console.error('> Re-connecting lost MySQL connection: ' + error.stack);

    connection = mysql.createConnection(client.config);
    handleDisconnect(connection);
    connection.connect();
  });
};
//____________________________________
