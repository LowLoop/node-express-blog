/**
 * Created by j.frank on 2017/3/20 0020.
 */
var mysql = require('mysql');
var getMysqlConnection = function(host,user,pasd,database){
    return mysql.createConnection({
        host: host,
        user: user,
        password: pasd,
        database:database
    });
};

var connectEnd = function(){
    mysql.end();
}

exports.getMysqlConnection = getMysqlConnection;