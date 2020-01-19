// commands/init.js
const shell = require('shelljs');
const symbols = require('log-symbols');
const clone = require('../utils/clone.js');
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');

const initAction = async (name, option) => {
	// 检查控制台是否可以运行`git `，
	if (!shell.which('git')) {
		console.log(symbols.error, '对不起，git命令不可用！请先安装git！');
		shell.exit(1);
	}
	// 验证输入name是否合法
	if (fs.existsSync(name)) {
		console.log(symbols.warning,`已存在项目文件夹${name}！`);
		return;
	}
	if (name.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) {
		console.log(symbols.error, '项目名称存在非法字符！');
		return;
	}
	// 获取option，确定模板类型（分支）
	if (option.dev) branch = 'develop';

	// 定义需要询问的问题
	const questions = [
		{
			type: 'list',
			name: 'plattype',
			message: '请选择网络类型?',
			choices: [
				'外网',
				'内网',
			]
		},
		{
			type: 'input',
			message: '请输入项目名称:',
			default: name,
			name: 'name',
			validate(val) {
				if (!val) return '项目名称不能为空！';
				if (val.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) return '项目名称包含非法字符，请重新输入';
				return true;
			}
		},
		{
			type: 'input',
			message: '请输入项目关键词（用;分割）:',
			name: 'keywords',
		},
		{
			type: 'input',
			default: `A vue product name ${name}`,
			message: '请输入项目简介:',
			name: 'description'
		},
		{
			type: 'input',
			message: '请输入您的名字:',
			name: 'author'
		}
	];
	const answers = await inquirer.prompt(questions);
	// 下载模板
	let remote = 'https://gitee.com/bugzhang/libra-demo.git';
	let branch = 'master';
	if (answers.plattype === '内网') {
		remote = 'http://mayun.itc.cmbchina.cn/80284745/libra-demo.git';
	}
	try {
		await clone(`direct:${remote}#${branch}`, name, { clone: true });
	} catch (error) {
		console.log("对不起，下载模板失败，请检测网络类型是否选择正确!")
	}

	// 清理文件
	const deleteDir = ['.git']; // 需要清理的文件
	const pwd = shell.pwd();
	deleteDir.map(item => shell.rm('-rf', pwd + `/${name}/${item}`));
};

module.exports = initAction;
