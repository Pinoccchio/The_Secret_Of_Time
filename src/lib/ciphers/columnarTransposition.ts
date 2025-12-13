/**
 * Columnar Transposition Cipher
 *
 * A cipher where the plaintext is written out in rows of a fixed length,
 * then read out column by column in a specific order determined by a keyword.
 */

export function columnarTranspositionEncrypt(text: string, keyword: string): string {
  // Remove spaces and convert to uppercase
  const cleanText = text.replace(/\s/g, '').toUpperCase();
  const cleanKeyword = keyword.toUpperCase();
  const keyLength = cleanKeyword.length;

  // Create column order based on alphabetical order of keyword letters
  const keyOrder = cleanKeyword
    .split('')
    .map((char, index) => ({ char, index }))
    .sort((a, b) => a.char.localeCompare(b.char))
    .map((item, sortedIndex) => ({ ...item, order: sortedIndex }));

  const columnOrder = keyOrder.sort((a, b) => a.index - b.index).map(item => item.order);

  // Calculate number of rows needed
  const numRows = Math.ceil(cleanText.length / keyLength);

  // Create the grid
  const grid: string[][] = [];
  let textIndex = 0;

  for (let row = 0; row < numRows; row++) {
    grid[row] = [];
    for (let col = 0; col < keyLength; col++) {
      if (textIndex < cleanText.length) {
        grid[row][col] = cleanText[textIndex];
        textIndex++;
      } else {
        grid[row][col] = 'X'; // Padding
      }
    }
  }

  // Read out columns in order
  let result = '';
  const sortedColumns = columnOrder
    .map((order, originalIndex) => ({ order, originalIndex }))
    .sort((a, b) => a.order - b.order);

  for (const { originalIndex } of sortedColumns) {
    for (let row = 0; row < numRows; row++) {
      result += grid[row][originalIndex];
    }
  }

  return result;
}

export function columnarTranspositionDecrypt(ciphertext: string, keyword: string): string {
  const cleanCiphertext = ciphertext.replace(/\s/g, '').toUpperCase();
  const cleanKeyword = keyword.toUpperCase();
  const keyLength = cleanKeyword.length;

  // Create column order based on alphabetical order of keyword letters
  const keyOrder = cleanKeyword
    .split('')
    .map((char, index) => ({ char, index }))
    .sort((a, b) => a.char.localeCompare(b.char))
    .map((item, sortedIndex) => ({ ...item, order: sortedIndex }));

  const columnOrder = keyOrder.sort((a, b) => a.index - b.index).map(item => item.order);

  // Calculate number of rows
  const numRows = Math.ceil(cleanCiphertext.length / keyLength);

  // Create empty grid
  const grid: string[][] = Array(numRows)
    .fill(null)
    .map(() => Array(keyLength).fill(''));

  // Fill grid column by column in sorted order
  let cipherIndex = 0;
  const sortedColumns = columnOrder
    .map((order, originalIndex) => ({ order, originalIndex }))
    .sort((a, b) => a.order - b.order);

  for (const { originalIndex } of sortedColumns) {
    for (let row = 0; row < numRows; row++) {
      if (cipherIndex < cleanCiphertext.length) {
        grid[row][originalIndex] = cleanCiphertext[cipherIndex];
        cipherIndex++;
      }
    }
  }

  // Read out row by row
  let result = '';
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < keyLength; col++) {
      result += grid[row][col];
    }
  }

  // Remove padding X's at the end
  return result.replace(/X+$/, '');
}

export function getColumnarTranspositionGrid(
  text: string,
  keyword: string
): { grid: string[][]; columnOrder: number[] } {
  const cleanText = text.replace(/\s/g, '').toUpperCase();
  const cleanKeyword = keyword.toUpperCase();
  const keyLength = cleanKeyword.length;

  // Create column order
  const keyOrder = cleanKeyword
    .split('')
    .map((char, index) => ({ char, index }))
    .sort((a, b) => a.char.localeCompare(b.char))
    .map((item, sortedIndex) => ({ ...item, order: sortedIndex }));

  const columnOrder = keyOrder.sort((a, b) => a.index - b.index).map(item => item.order);

  // Calculate number of rows
  const numRows = Math.ceil(cleanText.length / keyLength);

  // Create the grid
  const grid: string[][] = [];
  let textIndex = 0;

  for (let row = 0; row < numRows; row++) {
    grid[row] = [];
    for (let col = 0; col < keyLength; col++) {
      if (textIndex < cleanText.length) {
        grid[row][col] = cleanText[textIndex];
        textIndex++;
      } else {
        grid[row][col] = 'X';
      }
    }
  }

  return { grid, columnOrder };
}
