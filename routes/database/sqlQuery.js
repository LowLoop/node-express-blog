/**
 * Created by j.frank on 2017/3/21 0021.
 */
module.exports = function(table,data){
    return "insert into "+table+"(id,login_name,login_password) values('','"+data.name+"','"+data.password+"')";
}