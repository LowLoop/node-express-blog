# node-express-blog
# 技术栈 express+sequelize+mysql

## 项目结构
> sequelizeConnectPool-- sequelize连接数据库配置

> model-- 存放数据表的实体类

> service-- 对应每个实体类的一些业务方法都塞在这里

> view-- jade模板

> routes-- 路由

> middlewares-- 自己封装的一些中间件

> public-- img,css之类的静态文件

## 启动命令
> npm start

> 在webstorm里面导入项目之后.配置服务: 选择node.js,然后启动文件(javascript file)选择bin目录下的www文件.
## 在centOS上部署项目相关
> 通过svn,git之类的工具将项目传到服务器上之后.如果通过命令启动服务会出现.关闭xShell之后服务就断开的问题.

> 我的解决方案是通过pm2管理node.js进程.

> pm2官方文档：http://pm2.keymetrics.io/docs/usage/quick-start/

> 安装 npm install -g pm2

> 运行 pm2 start app.js

> 查看所有应用运行状态 pm2 list

> 查看日志 pm2 logs

> 停止应用 pm2 stop app.js (app.js 也可以换成 app id  id可以用 pm2 list命令看到)

> 重启应用 pm2 restart [app id]

> 我在实际应用中是用了配置文件来启动,建个名为 start.json的文件然后写入:<br>
``` bash
{
  "apps": [
    {
      "name": "myAppName",
      "script": "bin/www",
      "log_date_format": "YYYY-MM-DD HH:mm Z"
    }
  ]
}
```
然后通过 pm2 start start.json 来运行
