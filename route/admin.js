const express = require("express");
const admin = express.Router();

admin.get('/index', (req, res) => {
	res.send('管理页面')
})
admin.get('*', (req, res) => {
	res.send('我是后台')
})
module.exports = admin;
