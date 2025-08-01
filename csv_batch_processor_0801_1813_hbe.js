// 代码生成时间: 2025-08-01 18:13:38
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

// 定义CSV批量处理器类
class CSVBatchProcessor {

    // 构造函数，接收文件路径数组
    constructor(filePaths) {
        this.filePaths = filePaths;
    }

    // 处理每个CSV文件
    async processFile(filePath) {
        try {
            const readStream = fs.createReadStream(filePath);
            const writeStream = fs.createWriteStream(filePath.replace('.csv', '_processed.csv'));

            // 使用流处理CSV文件
            await pipeline(
                readStream,
                csv(),
                writeStream
            );

            console.log(`File ${filePath} processed successfully and saved as ${writeStream.path}`);
        } catch (error) {
            console.error(`Error processing file ${filePath}: ${error.message}`);
        }
    }

    // 批量处理所有CSV文件
    async processAllFiles() {
        for (const filePath of this.filePaths) {
            // 检查文件是否存在
            if (!fs.existsSync(filePath)) {
                console.error(`File ${filePath} not found`);
                continue;
            }
            // 处理每个文件
            await this.processFile(filePath);
        }
    }
}

// 示例：使用CSVBatchProcessor处理CSV文件
const filePaths = [
    './data/batch1.csv',
    './data/batch2.csv',
    './data/batch3.csv',
];

const processor = new CSVBatchProcessor(filePaths);
processor.processAllFiles();