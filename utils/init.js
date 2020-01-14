// commands/init.js
const shell = require('shelljs');
const symbols = require('log-symbols');
const clone = require('../utils/clone.js');
const remote = 'https://gitee.com/letwrong/cli-demo.git';
let branch = 'master';

const initAction = async (name, option) => {
    // 0. 检查控制台是否可以运行`git `，
    if (!shell.which('git')) {
        console.log(symbols.error, '对不起，git命令不可用！');
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
    await clone(`direct:${remote}#${branch}`, name, { clone: true });
};

module.exports = initAction;
