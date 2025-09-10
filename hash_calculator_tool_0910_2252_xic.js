// 代码生成时间: 2025-09-10 22:52:28
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

/**
# 扩展功能模块
 * HashCalculatorService provides a set of functions to calculate hash values for given data.
 * It uses the CryptoJS library for cryptographic operations.
 */
@Injectable({
  providedIn: 'root'
})
export class HashCalculatorService {

  constructor() {
  }

  /**
   * Calculates the SHA-256 hash of a given string.
   *
   * @param {string} data - The input string to be hashed.
   * @returns {string} - The SHA-256 hash of the input data.
   */
  public calculateSHA256(data: string): string {
    if (!data) {
# 扩展功能模块
      throw new Error('Input data cannot be empty.');
    }
    return CryptoJS.SHA256(data).toString();
  }

  /**
   * Calculates the SHA-512 hash of a given string.
   *
   * @param {string} data - The input string to be hashed.
   * @returns {string} - The SHA-512 hash of the input data.
   */
  public calculateSHA512(data: string): string {
    if (!data) {
      throw new Error('Input data cannot be empty.');
    }
# 添加错误处理
    return CryptoJS.SHA512(data).toString();
  }

  /**
   * Calculates the MD5 hash of a given string.
   *
   * @param {string} data - The input string to be hashed.
   * @returns {string} - The MD5 hash of the input data.
   */
  public calculateMD5(data: string): string {
# 增强安全性
    if (!data) {
      throw new Error('Input data cannot be empty.');
    }
# 扩展功能模块
    return CryptoJS.MD5(data).toString();
  }
# 改进用户体验

  /**
   * Calculates the RIPEMD160 hash of a given string.
   *
   * @param {string} data - The input string to be hashed.
   * @returns {string} - The RIPEMD160 hash of the input data.
   */
  public calculateRIPEMD160(data: string): string {
    if (!data) {
      throw new Error('Input data cannot be empty.');
    }
    return CryptoJS.RIPEMD160(data).toString();
  }
}
