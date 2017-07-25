/**
 * Created by j.frank on 2017/3/27 0027.
 */
var Sequelize = require('sequelize');
var sequelizeConnect = require("../sequelizeConnectPool/sqlConnect");

module.exports = sequelizeConnect.define("user",{
    loginName:{
        type:Sequelize.STRING,
        field:'login_name'
    },
    loginPasd:{
        type:Sequelize.STRING,
        field:'login_password'
    },
    email:{
        type:Sequelize.STRING,
        field:'email'
    },
    nickName:{
        type:Sequelize.STRING,
        field:'nick_name'
    },
    headPortrait:{
        type:Sequelize.STRING,
        field:'head_portrait'
    }
},{
    freezeTableName:true,   //model对应的表名是否相同 true 相同
    tableName:'low_user',
    timestamps:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt:'deleted_at',
    paranoid:true
});
/*
 timestamps: true－时间戳，启用该配置后会自动添加createdAt、updatedAt两个字段，分别表示创建和更新时间
 underscored: true－使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则，如：createdAt在数据库中的字段名会是created_at
 paranoid: true－虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
 */
//User.hasMany(Novel);
/*var user = class User {
    constructor(loginName,loginPassword){
        this.loginName = loginName;
        this.loginPassword = loginPassword;
    }
    getLoginName(){
        return this.loginName;
    }
    getLoginPassword(){
        return this.loginPassword;
    }
}*/