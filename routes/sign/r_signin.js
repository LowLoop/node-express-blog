/**
 * Created by j.frank on 2017/4/11 0011.
 */
var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var checkNotLogin = require('../../middlewares/check').checkNotLogin;
var co = require('co');

var userService = require('../../service/UserService');

/*//登陆
router.get('/',checkNotLogin, function(req, res, next) {
    res.send(req.flash());
});*/
router.post('/',checkNotLogin, co.wrap(function* (req, res, next) {
    var userName = req.body.inUserName;
    var userPasd = req.body.inUserPasd;
    try {
        var user_info = yield userService.getUserByName(userName,null);
        //console.log(user_info.get({"plain":true}));
        console.log(user_info);
        if(user_info != null){
            if(sha1(userPasd) == user_info.loginPasd){
                req.flash("info","登陆成功!");
                delete user_info.loginPasd;
                req.session.user = user_info;
                return res.redirect("/");
            }
            req.flash("error","密码错误!");
            return res.redirect("/");
        }else{
            req.flash("error","该用户不存在");
            return res.redirect("/");
        }
    } catch (e) {
        console.error(`错误: ${e}`);
    }

    next();

}));

router.post('/vueSignin',checkNotLogin, co.wrap(function* (req, res, next) {
    var userName = req.body.inUserName;
    var userPasd = req.body.inUserPasd;
    try {
        var user_info = yield userService.getUserByName(userName,null);
        //console.log(user_info.get({"plain":true}));
        console.log(user_info);
        if(user_info != null){
            if(sha1(userPasd) == user_info.loginPasd){
                delete user_info.loginPasd;
                req.session.user = user_info;
                var myUser = {};
                myUser.id = user_info.id;
                myUser.name = user_info.loginName;
                myUser.headPortrait = user_info.headPortrait;
                return res.json({myUser:myUser,state:"success",code:1,msg:"登录成功!"});
            }

            return res.json({state:"error",code:0,msg:"密码错误!"});
        }else{
            //return res.json(JSON.stringify({state:"error",code:0,msg:"该用户不存在!"}));
            return res.json({state:"error",code:0,msg:"该用户不存在!"});
        }
    } catch (e) {
        console.error(`错误: ${e}`);
    }

}));

module.exports = router;