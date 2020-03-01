var express = require('express');
var app = express();
var home = require('./route/home')
var admin = require('./route/admin')
app.use('/home', home)
app.use('/admin', admin)

app.use('/static',express.static(__dirname + '/static'));
//拦截所有请求
app.use('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', req.headers.origin); //注意这里不能使用 *
	res.header('Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header("X-Powered-By", ' 3.2.1');
	res.header('Access-Control-Allow-Credentials', true); // 允许服务器端发送Cookie数据
	res.header("Content-Type", "application/json;charset=utf-8");
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); //设置方法
	if (req.method == 'OPTIONS') {
		res.sendStatus(200); // 在正常的请求之前，会发送一个验证，是否可以请求。
	} else {
		next();
	}
});
app.get('/', function(req, res) {
	res.send('这是首页')
})
app.use('*', function(req, res, next) {
	res.send('暂无此路由')
});

app.listen(3000)
console.log('服务器已启动:localhost:3000')
