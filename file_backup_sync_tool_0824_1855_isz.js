// 代码生成时间: 2025-08-24 18:55:01
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import * as readline from 'readline';

// 引入 Ionic 框架
import { IonicModule } from '@ionic/angular';

// 异步版本 fs.copyFile 和 fs.rmdir
const copyFileAsync = promisify(fs.copyFile);
const rmdirAsync = promisify(fs.rmdir);

// 异常处理函数
function handleError(error) {
  console.error("An error occurred: ", error.message);
}

// 同步文件函数，将 sourcePath 同步到 targetPath
async function syncFiles(sourcePath, targetPath) {
  try {
    const files = await fs.promises.readdir(sourcePath);
    for (const file of files) {
      const filePath = path.join(sourcePath, file);
      const targetFilePath = path.join(targetPath, file);
      const fileStats = await fs.promises.stat(filePath);

      if (fileStats.isDirectory()) {
        await fs.promises.mkdir(targetFilePath, { recursive: true });
        await syncFiles(filePath, targetFilePath);
      } else if (fileStats.isFile()) {
        await copyFileAsync(filePath, targetFilePath);
      }
    }
  } catch (error) {
    handleError(error);
  }
}

// 删除文件夹及其内容函数
async function clearDirectory(directoryPath) {
  try {
    await rmdirAsync(directoryPath, { recursive: true });
  } catch (error) {
    handleError(error);
  }
}

// 主函数，用于备份和同步文件
async function main() {
  // 获取用户输入的源路径和目标路径
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await new Promise(resolve => rl.question('Enter source directory path: ', async (sourcePath) => {
    await new Promise(resolve => rl.question('Enter target directory path: ', async (targetPath) => {
      rl.close();

      try {
        // 确保源路径和目标路径存在
        await fs.promises.access(sourcePath, fs.constants.F_OK);
        await fs.promises.access(targetPath, fs.constants.W_OK);

        // 清空目标目录
        await clearDirectory(targetPath);

        // 同步文件
        await syncFiles(sourcePath, targetPath);
        console.log("Backup and sync operation completed successfully.");
      } catch (error) {
        handleError(error);
      }
    }));
  }));
}

// 运行主函数
main();