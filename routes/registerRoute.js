/**
 * Created by j.frank on 2017/3/20 0020.
 */
var express = require('express');
var router = express.Router();
var mysqlConnect = require('./database/mysqlConnect');
var sqlQuery = require('./database/sqlQuery');
var userService = require("./../service/UserService");

var connection = mysqlConnect.getMysqlConnection("127.0.0.1", "root", "root", "low");//建立数据库链接
connection.connect();

router.use("/",function(request, response, next){
    console.log("register:");
    console.log("name:"+request.body.userName);
    console.log("password:"+request.body.userPasd);
    var data = new Array();
    //data.id = new Date().getTime()+Math.ceil(Math.random()*100);
    data.name = request.body.userName;
    data.password = request.body.userPasd;
    console.log(sqlQuery("low_user",data));
    /*connection.query(sqlQuery("low_user",data),function(error, rows, fields){
        if(error){
            console.log("注册失败!错误:"+error);
            response.end(error);
            throw error;
        }

        response.end("注册成功!影响行数+"+rows);
    });*/
    userService(data);
    connection.end();//关闭数据链接
});

//connection.end();//关闭数据链接

module.exports = router;