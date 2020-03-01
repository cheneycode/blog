/*
    封装通用的方法
*/

const config = require('./config.js');
const mysql = require('mysql');
exports.base = (sql, data, callback) => {
	// 创建数据库连接
	let connection = mysql.createConnection(config.mysql);
	// 执行连接动作
	connection.connect();
	// 执行数据库操作
	connection.query(sql, data, (err, rows, fields) => {
		if (err) throw err;
		callback(rows);
	});
	// 关闭数据库
	connection.end();
}
