/**
 * Created by j.frank on 2017/4/11 0011.
 */
var express = require('express');
var router = express.Router();

var checkNotLogin = require('../../middlewares/check').checkNotLogin;
var co = require('co');

var userService = require('../../service/UserService')

//注册
/*router.get('/',checkNotLogin, function(req, res, next) {
    //res.send(req.flash());
});*/

router.post('/',checkNotLogin, co.wrap(function* (req, res, next) {
    var userName = req.body.userName;
    var userPasd = req.body.userPasd;
    var email = req.body.email;

    var userObj = {};
    userObj.userName = userName;
    userObj.userPasd = userPasd;
    userObj.email = email;

    try{
        var user_info = yield userService.getUserByName(userName,['loginName']);

        if(user_info == null){
            var user = userService.buildUser(userObj);
            var user = yield user.save();

            req.session.user = user;
            req.flash('info', '注册成功');
            return res.redirect('/');
        }else{
            req.flash('error', '注册失败,账号已存在!');
            return res.redirect('/');
        }

    } catch (e) {
        console.error(`错误: ${e}`);
    }

    //res.forward('/');
    next();
}));


router.post('/vueSignup',checkNotLogin, co.wrap(function* (req, res, next) {
    var userName = req.body.userName;
    var userPasd = req.body.userPasd;
    var email = req.body.email;

    var userObj = {};
    userObj.userName = userName;
    userObj.userPasd = userPasd;
    userObj.email = email;

    try{
        var user_info = yield userService.getUserByName(userName,['loginName']);

        if(user_info == null){
            var user = userService.buildUser(userObj);
            var user = yield user.save();

            req.session.user = user;

            var myUser = {};
            myUser.id = user.id;
            myUser.name = user.loginName;
            myUser.headPortrait = user.headPortrait;
            return res.json({myUser:myUser,state:"success",code:1,msg:"注册成功!"});
        }else{
            return res.json({state:"error",code:0,msg:"注册失败,账号已存在!"});
        }

    } catch (e) {
        console.error(`错误: ${e}`);
    }

    //res.forward('/');
    next();
}));

module.exports = router;