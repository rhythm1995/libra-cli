#!/usr/bin/env node
const commander = require('commander');

// version：版本号
commander
    .version(require('./package.json').version)
		.option('-v,--version', '查看版本号');
// init：初始化
commander
    .command('init <name>') // 定义init子命令，<name>为必需参数可在action的function中接收，如需设置非必需参数，可使用中括号
    .option('-d, --dev', '获取开发版') // 配置参数，简写和全写中使用,分割
    .description('创建项目') // 命令描述说明
    .action(function (name, option) { // 命令执行操作，参数对应上面的设置的参数
        // 我们需要执行的所有操作，都在这里完成
        console.log(name);
        console.log(option.dev);
		});

// 利用commander解析命令行输入，必须写在所有内容最后面
commander.parse(process.argv);