// 代码生成时间: 2025-08-14 09:48:48
// 引入依赖库
const mysql = require('mysql');
const util = require('util');

// 创建MySQL连接池
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// 使用util.promisify将原始的callback风格的query方法转换为返回Promise的版本
const query = util.promisify(pool.query).bind(pool);

/**
 * 执行安全查询以防止SQL注入
 * @param {string} sql - SQL查询语句
 * @param {Array} params - 参数数组，用于预编译查询
 * @returns {Promise} - 返回查询结果的Promise
 */
async function safeQuery(sql, params) {
  try {
    const [rows] = await query(sql, params);
    return rows;
  } catch (error) {
    console.error('查询失败:', error);
    throw error;
  }
}

/**
 * 示例：防止SQL注入的用户查找
 * @param {string} username - 用户名
 * @returns {Promise} - 返回查询结果的Promise
 */
async function findUserByUsername(username) {
  const sql = 'SELECT * FROM users WHERE username = ?';
  const params = [username];
  return safeQuery(sql, params);
}

// 导出模块函数
module.exports = {
  safeQuery,
  findUserByUsername
};