// 代码生成时间: 2025-09-06 10:35:05
function JsonDataFormatter() {}

/**
 * 格式化JSON数据
 * @param {string} rawData - 源JSON字符串
 * @param {string} targetFormat - 目标格式（例如：'pretty'表示美化格式）
 * @returns {string} - 格式化后的JSON字符串
 */
JsonDataFormatter.prototype.format = function(rawData, targetFormat) {
  // 验证输入数据是否合法
  if (typeof rawData !== 'string') {
    throw new Error('Invalid input: rawData must be a string.');
  }

  // 尝试解析JSON数据
  try {
    const data = JSON.parse(rawData);
    // 根据targetFormat参数格式化JSON数据
    switch (targetFormat) {
      case 'pretty':
        return JSON.stringify(data, null, 2); // 美化JSON格式
      case 'compact':
        return JSON.stringify(data); // 紧凑JSON格式
      default:
        throw new Error('Invalid target format specified.');
    }
  } catch (error) {
    // 如果解析JSON失败，则抛出错误
    throw new Error('Failed to parse JSON: ' + error.message);
  }
};

// 示例用法
try {
  const formatter = new JsonDataFormatter();
  const rawData = '{"name":"John", "age":30}';
  const formattedData = formatter.format(rawData, 'pretty');
  console.log(formattedData);
} catch (error) {
  console.error(error.message);
}