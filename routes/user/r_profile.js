/**
 * Created by j.frank on 2017/6/6 0006.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
//var muilter = require('../../middlewares/multerUtil');

var path = require('path');
var co = require('co');
var checkLogin = require('../../middlewares/check').checkLogin;

var userService = require('../../service/UserService');

//修改个人头像
router.post('/updateHeadPortrait',checkLogin,function(req,res,next){
    console.log("头像头像头像头像头像头像");
    var imgData = req.body.headPortrait;
    var userId = req.body.userId;

    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');

    //将buffer写成文件,文件名如果重名的话.则会覆盖
    var f = path.join('./public', 'uploads', 'headPortrait' + userId + '.jpg');
    console.log(f);
    fs.writeFile(f, dataBuffer, function (err) {
        if (err) {
            //上传出现错误
            console.log(err);
            return res.json("上传失败!");
        } else {
            //上传成功，存数据库
            var user = userService.updateUser({'headPortrait': '/uploads/headPortrait' + userId + '.jpg'}, userId);
            user.then(function (rlt) {
                return res.json("成功!");
            }, function (err) {
                console.log(err);
                return res.json("写数据库失败!");
            }).catch(function (error) {
                console.log(error);
                return res.json("写数据库异常!");
            })
        }
    });

    //multer有single()中的名称必须是表单上传字段的name名称。
    /*var upload = muilter.single('headPortrait');
    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            return  console.log(err);
        }
        //文件信息在req.file或者req.files中显示。
        console.log(req);

        console.log(req.file);
        console.log(req.file.path);
    });*/
    //next();
});

router.post('/updateUserInfo',checkLogin,function(req,res,next){
    var nickName = req.body.nickName;
    var email = req.body.email;


    var user = userService.updateUser({'headPortrait':'/uploads/headPortrait'+userId+'.jpg'},userId);
    console.log(user.get({'plain': true}));
    var message = req.body.message;
    return res.json("成功啦!");
    next();
});

//查看个人信息
router.get('/profile',checkLogin, co.wrap(function* (req, res, next) {
    var userId = req.query.userId;
    var user = yield userService.getUserById(userId);
    res.render('jade/profile',{
        title: 'low',
        login:'登陆',
        register:"注册",
        userInfo:user
    });
    //next();
}));



module.exports = router;