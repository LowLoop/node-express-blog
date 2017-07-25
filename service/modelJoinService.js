/**
 * Created by j.frank on 2017/5/19 0019.
 */
module.exports = {
    oneToMany:function(one,many,foreignKey,targetKey,as){
        many.belongsTo(one);
        one.hasMany(many, {foreignKey:foreignKey, targetKey:targetKey, as:as});
    }
}

/*
这里是提供联表关系绑定的方法
目前是写成对于user和novel的联表关系绑定
后面会封装成通用方法
 */