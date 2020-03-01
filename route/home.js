const express = require("express");
var app = express();
var db = require('../mysql/index');
// 引入body-parser模块
const bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const home = express.Router();

home.get('/login',(req, res, next) => {
	let params = req.query;
	console.log(params)
	if(!params.name){
		res.send('请填写用户名');
		return false;
	}
	if(!params.pwd){
		res.send('请填写密码');
		return false;
	}
	let sql = `select * from blog_login where lg_username='${params.name}' and lg_password='${params.pwd}'`;
	let data = {};
	db.base(sql, data, (result) => {
		if(result.length>0){
			res.send(`欢迎你:${params.name}`);
		}else{
			res.send('账号或密码错误');
		}
	});
})

home.get('/page/:id', (req, res) => {
	res.send(req.params)
})

// home.post('/login',urlencodedParser, (req, res, next) => {
// 	let params = req.body;
// 	if(!params.name){
// 		res.send('请填写用户名');
// 		return false;
// 	}
// 	if(!params.pwd){
// 		res.send('请填写密码');
// 		return false;
// 	}
// 	let sql = `select * from blog_login where lg_username='${params.name}' and lg_password='${params.pwd}'`;
// 	let data = {};
// 	db.base(sql, data, (result) => {
// 		if(result.length>0){
// 			res.send(`欢迎你:${params.name}`);
// 		}else{
// 			res.send('账号或密码错误');
// 		}
// 	});
// })


module.exports = home;
