// commands/init.js
const shell = require('shelljs');
const symbols = require('log-symbols');
const clone = require('../utils/clone.js');
const fs = require('fs');
const http = require('http');
const remote = 'https://gitee.com/bugzhang/libra-demo.git';
const insideRemote = 'http//:mayun.itc.cmbchina.cn/80284745/libra-demo.git';
let branch = 'master';

const initAction = async (name, option) => {
	// 0. 检查控制台是否可以运行`git `，
	if (!shell.which('git')) {
		console.log(symbols.error, '对不起，git命令不可用！请先安装git！');
		shell.exit(1);
	}
	// 1. 验证输入name是否合法
	if (fs.existsSync(name)) {
		console.log(symbols.warning,`已存在项目文件夹${name}！`);
		return;
	}
	if (name.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) {
		console.log(symbols.error, '项目名称存在非法字符！');
		return;
	}
	// 2. 获取option，确定模板类型（分支）
	if (option.dev) branch = 'develop';
	// 4. 下载模板
	const http = require('http');
	let statusCode = 0;
	const req = http.get({
		host: 'gitee.com'
	}, async res => {
		statusCode = res.statusCode;
		if (statusCode === 200) {
			await clone(`direct:${remote}#${branch}`, name, { clone: true });
		} else {
			await clone(`direct:${insideRemote}#${branch}`, name, { clone: true });
		}
	});

	// 5. 清理文件
	const deleteDir = ['.git']; // 需要清理的文件
	const pwd = shell.pwd();
	deleteDir.map(item => shell.rm('-rf', pwd + `/${name}/${item}`));
};

module.exports = initAction;
