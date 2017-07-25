/**
 * Created by j.frank on 2017/4/10 0010.
 */
var User = require('../model/User');
var sha1 = require('sha1');

module.exports = {
    getUserById:function(id){
        return User.findOne({
            where:{
                id:id
            }
        });
    },
    getUserByName:function(loginName,attrs){
        if(attrs == null){
            return User.findOne({
                where:{
                    loginName:loginName
                }
            });
        }else {
            return User.findOne({
                attributes:attrs,
                where:{
                    loginName:loginName
                }
            });
        }
    },
    buildUser:function(user){
        return User.build({
            loginName:user.userName,
            loginPasd:sha1(user.userPasd),
            email:user.email
        });
    },
    updateUser:function(kv,userId){
        return User.update(kv,{
            where:{
                id:userId
            }
        });
    }
};

/*module.exports = function(data){
 var user = require('././entity/User');
 return user.sync({force: true}).then(function () {
 // 已创建数据表
 return user.create({
 loginName: data.name,
 loginPasd: data.password
 });
 });
 }*/