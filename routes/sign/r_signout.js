/**
 * Created by j.frank on 2017/4/11 0011.
 */
var express = require('express');
var router = express.Router();

var checkLogin = require('../../middlewares/check').checkLogin;

//登出
router.get('/',checkLogin, function(req, res, next) {
    console.log(222);
    //res.send(req.flash());
    // 清空 session 中用户信息
    req.session.user = null;
    req.flash('info', '登出成功');
    // 登出成功后跳转到主页
    res.redirect('/');
    next();
});

router.get('/vueSignout', function(req, res, next) {
    // 清空 session 中用户信息
    req.session.user = null;
    return res.json("登出成功!");
});

module.exports = router;