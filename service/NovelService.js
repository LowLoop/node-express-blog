/**
 * Created by j.frank on 2017/5/22 0022.
 */
var modelJoinService = require('./modelJoinService');
var Novel = require('../model/Novel');
var User = require('../model/User');
var page = require('../model/Page');
var co = require('co');

module.exports = {
    getNovelList:function(page){
        console.log('page:'+page);
        if(page == '' || typeof page == 'undefined'){
            page = 1;
        }
        modelJoinService.oneToMany(User,Novel,Novel.userId,User.id,'userName');
        return Novel.findAll({
            include:[{
                model:User,
                attributes:['loginName']
            }],
            attributes:[
                'id',
                'title',
                'content',
                'created_at'
            ],
            'limit': 1,// 每页多少条
            'offset':(page-1)*1
            //'offset': countPerPage * (currentPage - 1)  // 跳过多少条
        })
    },
    getNovelCount:function(){
        return page.getPage(Novel);
    },
    buildNovel:function(novel){
        return Novel.build({
            title:novel.title,
            content:novel.novelContent,
            userId:novel.userId
        });
    },
    getNovelById:function(id){
        modelJoinService.oneToMany(User,Novel,Novel.userId,User.id,'userName');
        return Novel.findOne({
            include:[{
                model:User,
                attributes:['loginName']
            }],
            where:{
                id:id
            }
        });
    }
};