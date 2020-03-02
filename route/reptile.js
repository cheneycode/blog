'use strict'
var request = require('request-promise');
var $ = require('cheerio'); //爬虫框架
var express = require('express');
const reptile = express.Router();
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
		json.title = $ele.children().text() //获取标题
		data.push(json)
	})
	res.send(data) //把data数据返回给前台})
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
reptile.get('*', (req, res) => {
	res.send('我是爬虫页面')
})
module.exports = reptile;
