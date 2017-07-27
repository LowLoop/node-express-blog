var express = require('express');
var router = express.Router();

var co = require('co');

var signin = require('./sign/r_signin');//登陆
var signup = require('./sign/r_signup');//注册
var signout = require('./sign/r_signout');//登出
var novel = require('./novel/r_novel');//小说
var profile = require('./user/r_profile');//用户信息
//var comment = require('./novel/comment');//小说

var novelService = require('../service/NovelService');

//module.exports = function(app){
  /* GET home page. */
  router.get('/', co.wrap(function* (req, res, next) {
    var pageNo = req.query.page;
    var pageObj = {};
    var novelCount = yield novelService.getNovelCount();
    var novelList = yield novelService.getNovelList(pageNo);

    if(pageNo == '' || typeof pageNo == 'undefined'){
      pageNo = 1;
    }
    console.log(novelCount);
    pageObj.size = 1;
    pageObj.totalSize = novelCount;
    pageObj.curPage = pageNo;
    pageObj.pageSize = Math.ceil(novelCount/1);

    res.render('index', {
      novels:novelList,
      pageObj:pageObj
    });

  }));
  router.post('/vueIndex',co.wrap(function* (req,res,next){
    var pageNo = req.body.page;
    var pageObj = {};
    var novelCount = yield novelService.getNovelCount();
    var novelList = yield novelService.getNovelList(pageNo);

    if(pageNo == '' || typeof pageNo == 'undefined'){
      pageNo = 1;
    }
    console.log(novelCount);
    pageObj.size = 1;
    pageObj.totalSize = novelCount;
    pageObj.curPage = pageNo;
    pageObj.pageSize = Math.ceil(novelCount/1);

    var indexData = {};
    indexData.novelList = novelList;
    indexData.pageObj = pageObj;

    res.json(indexData);
  }));
  router.use('/signin', signin);//登陆
  router.use('/signup', signup);//注册
  router.use('/signout', signout);//登出
  router.use('/novel', novel);//小说
  router.use('/user', profile);//用户信息
//router.use('/comment', comment);//评论
//}
module.exports = router;