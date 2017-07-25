/**
 * Created by j.frank on 2017/4/6 0006.
 */
var Sequelize = require('sequelize');
module.exports =  new Sequelize("low","low","root123",{
    host:"127.0.0.1",
    port:"3306",
    dialect:"mysql",
    pool:{
        max:10,
        min:0,
        idle:10000
    }
});