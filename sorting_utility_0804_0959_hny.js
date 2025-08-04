// 代码生成时间: 2025-08-04 09:59:05
 * It is designed to be easily understandable, maintainable, and extensible.
 */

/**
 * Bubble Sort Algorithm
 * @function bubbleSort
 * @param {Array} array - The array of numbers to sort.
 * @returns {Array} - The sorted array.
 */
function bubbleSort(array) {
  let len = array.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < len - 1; i++) {
      if (array[i] > array[i + 1]) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return array;
}

/**
 * Selection Sort Algorithm
 * @function selectionSort
 * @param {Array} array - The array of numbers to sort.
 * @returns {Array} - The sorted array.
 */
function selectionSort(array) {
  let len = array.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }
    if (min !== i) {
      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;
    }
  }
  return array;
}

/**
 * Insertion Sort Algorithm
 * @function insertionSort
 * @param {Array} array - The array of numbers to sort.
 * @returns {Array} - The sorted array.
 */
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
  return array;
}

/**
 * Quick Sort Algorithm (Helper function for partitioning)
 * @function partition
 * @param {Array} array - The array of numbers to sort.
 * @param {Number} low - The starting index of the array.
 * @param {Number} high - The ending index of the array.
 * @returns {Number} - The pivot index.
 */
function partition(array, low, high) {
  let pivot = array[high];
  let i = (low - 1);
  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  let temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;
  return (i + 1);
}

/**
 * Quick Sort Algorithm
 * @function quickSort
 * @param {Array} array - The array of numbers to sort.
 * @param {Number} low - The starting index of the array.
 * @param {Number} high - The ending index of the array.
 * @returns {Array} - The sorted array.
 */
function quickSort(array, low, high) {
  if (low < high) {
    let pi = partition(array, low, high);
    quickSort(array, low, pi - 1);
    quickSort(array, pi + 1, high);
  }
  return array;
}

/**
 * Main function to call sorting algorithms
 * @function sortArray
 * @param {Array} array - The array of numbers to sort.
 * @param {String} algorithm - The name of the sorting algorithm to use.
 * @returns {Array} - The sorted array.
 */
function sortArray(array, algorithm) {
  if (!Array.isArray(array)) {
    throw new Error('Invalid input: array must be an array.');
  }

  switch (algorithm) {
    case 'bubbleSort':
      return bubbleSort(array.slice());
    case 'selectionSort':
      return selectionSort(array.slice());
    case 'insertionSort':
      return insertionSort(array.slice());
    case 'quickSort':
      return quickSort(array.slice(), 0, array.length - 1);
    default:
      throw new Error('Invalid algorithm: please choose a valid sorting algorithm.');
  }
}

// Example usage:
try {
  let myArray = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
  let sortedArray = sortArray(myArray, 'quickSort');
  console.log('Sorted array:', sortedArray);
} catch (error) {
  console.error(error.message);
}