/**
 * Created by j.frank on 2017/4/11 0011.
 */
var express = require('express');
var router = express.Router();

var co = require('co');

var checkLogin = require('../../middlewares/check').checkLogin;
var novelService = require('../../service/NovelService');

//新建(发表)小说 页面
router.get('/createNovel',checkLogin, function(req, res, next) {
    res.render('jade/createNovel');
    next();
});

//发表一篇小说
router.post('/createNovel',checkLogin,function(req,res,next){
    //res.send(req.flash());
    var userId = req.body.userId;
    var title = req.body.novelTitle;
    var novelContent = req.body.novelContent;

    var novelObj = {};
    novelObj.title = title;
    novelObj.novelContent = novelContent;
    novelObj.userId = userId;

    var novel = novelService.buildNovel(novelObj);
    var novel = novel.save();
    console.log(novel.get({"plain":true}));

    req.flash('info', '发表成功');
    return res.redirect('/');
    next();
});

//某一本小说(单独一篇小说页面)
router.get('/oneNovel', co.wrap(function* (req, res, next) {
    var novelId = req.query.novelId;

    var novel = yield novelService.getNovelById(novelId);
    console.log(novel);
    res.render('jade/oneNovel',{
        novel:novel
    });

    next();
}));

//某一本小说(单独一篇小说页面)
router.get('/vueOneNovel', co.wrap(function* (req, res, next) {
    var novelId = req.query.id;

    var novel = yield novelService.getNovelById(novelId);
    return res.json(novel);
    next();
}));

//小说主页(所有的小说或特定用户的小说)
router.get('/', function(req, res, next) {
    //res.send(req.flash());
    console.log("1");
    next();
});

//作者小说主页
router.get('/?author=XXX', function(req, res, next) {
    next();
});

/*//修改一本小说 页面
router.get('/:novelId/edit',checkLogin, function(req, res, next) {
    res.send(req.flash());
});

//修改一本小说
router.post('/:novelId/edit',checkLogin, function(req, res, next) {
    res.send(req.flash());
});

//删除一本小说
router.delete('/:novelId',checkLogin, function(req, res, next) {

});*/

module.exports = router;