// 代码生成时间: 2025-09-14 19:41:54
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

/**
 * 执行自动化测试套件
 * @param {string} testFilePath - 测试文件的路径
 * @param {function} callback - 测试完成后的回调函数
 */
function runTests(testFilePath, callback) {
  // 校验文件路径是否存在
  if (!fs.existsSync(testFilePath)) {
    console.error(chalk.red('测试文件不存在: ' + testFilePath));
    return;
  }

  const testFileDir = path.dirname(testFilePath);
  const cmd = 'ionic cordova test browser';

  // 在测试文件所在的目录执行ionic命令
  exec(cmd, { cwd: testFileDir }, (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red('测试执行错误: ' + error.message));
      callback(error);
      return;
    }
    if (stderr) {
      console.error(chalk.red('测试过程中的标准错误信息: ' + stderr));
      callback(new Error(stderr));
      return;
    }
    console.log(chalk.green('测试成功执行:
' + stdout));
    callback(null, stdout);
  });
}

/**
 * 初始化自动化测试套件
 * @param {string} testFilePattern - 测试文件的匹配模式
 * @param {function} callback - 初始化完成后的回调函数
 */
function initTestSuite(testFilePattern, callback) {
  // 假设测试文件存放在项目的 test 目录下
  const testDir = path.join(__dirname, 'test');
  const testFiles = fs.readdirSync(testDir).filter(file => file.match(testFilePattern));

  if (testFiles.length === 0) {
    console.error(chalk.red('没有找到匹配的测试文件'));
    callback(new Error('No test files found'));
    return;
  }

  // 遍历所有测试文件并执行测试
  testFiles.forEach(testFile => {
    const testFilePath = path.join(testDir, testFile);
    runTests(testFilePath, (error, result) => {
      if (error) {
        console.error(chalk.red('测试失败: ' + error.message));
      } else {
        console.log(chalk.green('测试文件 ' + testFile + ' 执行成功:
' + result));
      }
    });
  });
  callback(null);
}

// 使用示例
initTestSuite(/\.spec\.js$/, (error) => {
  if (error) {
    console.error(chalk.red('自动化测试套件初始化失败: ' + error.message));
  } else {
    console.log(chalk.green('自动化测试套件成功初始化'));
  }
});