/**
 * Created by j.frank on 2017/5/12 0012.
 */
var Sequelize = require('sequelize');
var sequelizeConnect = require("../sequelizeConnectPool/sqlConnect");

module.exports = sequelizeConnect.define("novel",{
    title:{
        type:Sequelize.STRING,
        field:'title'
    },
    content:{
        type:Sequelize.STRING,
        field:'content'
    },
    userId:{
        type:Sequelize.INTEGER,
        field:'user_id'
    }
},{
    freezeTableName:true,   //model对应的表名是否相同 true 相同
    tableName:'yuki_novel',
    timestamps:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt:'deleted_at',
    paranoid:true,
    indexes: [{
        name: 'novel_userId',
        method: 'BTREE',
        fields: ['user_id']
    }]
});

/*
Novel.belongsTo(User);*/
