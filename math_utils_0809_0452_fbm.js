// 代码生成时间: 2025-08-09 04:52:05
class MathUtils {
    /**
     * Adds two numbers
     *
     * @param {number} a - The first number
     * @param {number} b - The second number
     * @returns {number} The sum of a and b
     */
    add(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Both arguments must be numbers');
        }
        return a + b;
    }

    /**
     * Subtracts two numbers
     *
     * @param {number} a - The first number
     * @param {number} b - The second number
     * @returns {number} The difference of a and b
     */
    subtract(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Both arguments must be numbers');
        }
        return a - b;
    }

    /**
     * Multiplies two numbers
     *
     * @param {number} a - The first number
     * @param {number} b - The second number
     * @returns {number} The product of a and b
     */
    multiply(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Both arguments must be numbers');
        }
        return a * b;
    }

    /**
     * Divides two numbers
     *
     * @param {number} a - The first number
     * @param {number} b - The second number
     * @returns {number} The quotient of a and b
     */
    divide(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Both arguments must be numbers');
        }
        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }
        return a / b;
    }
}

// Example usage:
const mathUtils = new MathUtils();
console.log(mathUtils.add(5, 3)); // Output: 8
console.log(mathUtils.subtract(10, 4)); // Output: 6
console.log(mathUtils.multiply(7, 2)); // Output: 14
console.log(mathUtils.divide(20, 5)); // Output: 4