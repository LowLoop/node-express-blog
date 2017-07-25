var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var cors = require('cors');
//var routes = require('./routes');

//var ejs = require('ejs');//引入ejs

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup 这两句是使用jade模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//这两句是使用html模板
/*app.engine("html",ejs.__express);//设置html模板
app.set("view engine", "html");//设置视图引擎*/

//更改服务监听的 端口号
/*process.env.PORT = 8888;
app.set('port', process.env.PORT);*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//添加一个中间件,设置静态资源路径为public

//跨域
app.use(cors({
  origin:['http://localhost:3000'],//允许这个域访问
  methods:['GET','POST']//只允许这两种请求
}));

app.use(session({
  secret: 'low',
  key: 'low',
  cookie: {maxAge: 600000},//604800000
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

app.use(function (req, res, next) {
  res.locals.err = req.flash('error');
  res.locals.info = req.flash('info');
  res.locals.user = req.session.user || null;
  res.locals.moment = require('moment');
  res.locals.ctx = "http://" + req.headers.host;//origin
  res.locals.title = 'low',
  res.locals.login = '登陆',
  res.locals.register = "注册"
  next();
});
//routes(app);
app.use('/', index);
//app.use('/users', users);
//app.post('/register',register);



//这里做路由,中间件 的学习测试
app.use('/low',function(request,response,next){
  //console.log(server);
  console.log('访问: /low');
  next();
});

app.use('/low/one',function(){
  console.log('访问: /low/one');
  next();
});

//上面是做路由,中间件 的学习测试

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
