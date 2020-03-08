'use strict'
var request = require('request-promise');
var $ = require('cheerio'); //爬虫框架
var express = require('express');
const reptile = express.Router();
//文件下载
var fs = require("fs");
var path = require("path");


//知乎数据接口
reptile.get('/index', async (req, res) => {
	const URI = 'https://daily.zhihu.com/'
	let result = await request(URI) //异步请求网页
	let data = []
	let elements = $('a', '.main-content .wrap .box', result) //解析出网页里的a元素
	//console.log(elements);
	elements.map((i, ele) => {
		console.log(ele);
		let json = {}
		let $ele = $(ele)
		json.url = $ele.attr('href') //获取a元素的地址链接
		json.title = $ele.children().text() //获取标题
		json.img = $ele.children().attr('src') //获取图片
		data.push(json)
	})
	res.send(data) //把data数据返回给前台})
})

//知乎详情
reptile.get('/story/:id', async (req, res) => {
	const URI = 'https://daily.zhihu.com/story/' + req.params.id
	let result = await request(URI) //异步请求网页
	res.send(result) //把data数据返回给前台})
})

//微博热搜榜
reptile.get('/weibo', async (req, res) => {
	const URI = 'https://s.weibo.com/top/summary/'
	let result = await request(URI) //异步请求网页
	let data = []
	let elements = $('tr', '#pl_top_realtimehot tbody', result) //解析出网页里的tr元素
	elements.map((i, ele) => {
		let json = {}
		let $ele = $(ele)
		json.index = $ele.children('.td-01').text() //获取排名
		json.title = $ele.children('.td-02').text().trim().split('\n')[0] //获取标题
		json.heat = $ele.children('.td-02').text().trim().split('\n')[1] //获取热度
		data.push(json)
	})
	res.send(data) //把data数据返回给前台
})

//文字转语音
reptile.get('/audio/:type/:text', async (req, res) => {
	let host = req.hostname
	if (req.params.type === '') {
		res.send('请填写语言类型 中文填:zh,英文填:en')
		return false;
	}
	if (req.params.text === '') {
		res.send('请填写要转的文字')
		return false;
	}
	const URI = 'https://fanyi.baidu.com/gettts?lan=' + (req.params.type == '' ? 'zh' : req.params.type) + '&text=' +
		encodeURI(req.params.text) +
		'&spd=5&source=web';
	var dirPath = path.join('.', "/static/voice");
	if (!fs.existsSync(dirPath)) { //如果文件夹不存在 则创建
		fs.mkdirSync(dirPath);
	}
	let stream = fs.createWriteStream(path.join(dirPath, req.params.text.substr(0, 5) + '.mp3')); //下载文件
	request(URI).pipe(stream).on("close", err => {
		let args = {};
		args.name = req.params.text.substr(0, 5) + '.mp3';
		args.url = host + '/static/voice/' + req.params.text.substr(0, 5) + '.mp3'
		//'文件[' + req.params.text.substr(0, 5) + '.mp3]下载完毕,地址为:' + host + '/static/voice/' + req.params.text.substr(0, 5) + '.mp3'
		res.send(args);
	});
})

reptile.get('*', (req, res) => {
	res.send('我是爬虫页面,没有你输入的路由')
})
module.exports = reptile;
