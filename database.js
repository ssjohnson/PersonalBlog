var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'sql5.freesqldatabase.com',
    database: 'sql561108',
    user: 'sql561108',
    password: 'aU9%eQ4!'
});


var query = function query(sql) {
    connection.connect();
    connection.query(sql, function(err, rows, fields) {
        if(err) throw err;
        console.log(rows[0]);
    });
    connection.end();
};

var signUp = function signUp(username, password) {
    //var select = 'SELECT * FROM users';
    //query(select);
    var values = [username, password];
    connection.connect();
    connection.query('INSERT INTO users SET username = ?, password = ?', values, 
                     function(err, results) {
                        if (err) throw err;
                        else console.log(results);
    });
    connection.end();
};

exports.connection = connection;
exports.query = query;
exports.signUp = signUp;