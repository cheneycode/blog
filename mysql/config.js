//配置数据库相关信息
let env = 'dev'; //dev:  开发变量   prd : 生产环境
let dev = {
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'blog'
}

let prd = {
	host: 'localhost',
	user: 'blog',
	password: 'blog',
	database: 'blog'
}

exports.mysql = (env === "dev" ? dev : prd)
