// 代码生成时间: 2025-08-07 11:13:09
// 引入所需模块
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * 调整图片尺寸的函数
 * @param {string} folderPath - 包含图片的文件夹路径
 * @param {number} targetWidth - 目标宽度
 * @param {number} targetHeight - 目标高度
 */
async function resizeImages(folderPath, targetWidth, targetHeight) {
  // 检查文件夹路径是否存在
  if (!fs.existsSync(folderPath)) {
    console.error('指定的文件夹路径不存在:', folderPath);
    return;
  }

  // 读取文件夹中的所有文件
  try {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      // 构建完整的文件路径
      const filePath = path.join(folderPath, file);
      // 确保文件是图片
      if (['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase())) {
        console.log(`正在处理图片: ${filePath}`);
        // 使用sharp模块调整图片尺寸
        await sharp(filePath)
          .resize({ width: targetWidth, height: targetHeight })
          .toFile(`${filePath}_resized`);
        console.log(`图片尺寸调整完成: ${filePath}_resized`);
      }
    }
  } catch (error) {
    console.error('读取文件时发生错误:', error);
  }
}

// 导出函数以便在IONIC应用中使用
module.exports = { resizeImages };

// 以下是IONIC框架中使用此模块的示例代码
// const { resizeImages } = require('./image_resizer.js');
// resizeImages('/path/to/images', 800, 600).then(() => {
//   console.log('所有图片尺寸调整完成');
// });