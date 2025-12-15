/**
 * Columnar Transposition Cipher Implementation
 *
 * A transposition cipher where plaintext is written in rows of fixed length,
 * then read column-by-column in order determined by alphabetical sorting of a keyword.
 *
 * Used in Chapter 5: EDSA Revolution (1986)
 * Keyword: EDSA
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
): { grid: string[][]; columnOrder: number[]; keywordChars: string[] } {
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
  const keywordChars = cleanKeyword.split('');

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

  return { grid, columnOrder, keywordChars };
}

/**
 * Visualizes the columnar transposition grid for educational purposes
 * @param text - The text to visualize
 * @param keyword - The keyword
 * @returns String representation of the columnar transposition grid
 */
export function visualizeColumnarTransposition(text: string, keyword: string): string {
  if (!text || !keyword || keyword.length < 2) return '';

  const { grid, columnOrder, keywordChars } = getColumnarTranspositionGrid(text, keyword);

  // Create header with keyword and order numbers
  let result = 'Keyword: ' + keywordChars.map((char, idx) => `${char}(${columnOrder[idx]})`).join(' ') + '\n\n';

  // Create visual grid
  result += keywordChars.map(char => `  ${char}  `).join('') + '\n';
  result += '─'.repeat(keywordChars.length * 5) + '\n';

  for (const row of grid) {
    result += row.map(cell => `  ${cell}  `).join('') + '\n';
  }

  result += '\nRead columns in order: ';
  const sortedColumns = columnOrder
    .map((order, originalIndex) => ({ order, originalIndex }))
    .sort((a, b) => a.order - b.order);

  const columnReads = sortedColumns.map(({ originalIndex }) => {
    const colData = grid.map(row => row[originalIndex]).join('');
    return `${keywordChars[originalIndex]}→${colData}`;
  });

  result += columnReads.join(' + ');

  return result;
}

/**
 * Gets step-by-step explanation of the encryption process
 * @param plaintext - The message to encrypt
 * @param keyword - The keyword
 * @returns Array of steps explaining the encryption
 */
export function getColumnarTranspositionSteps(plaintext: string, keyword: string): Array<{
  step: number;
  description: string;
  detail: string;
}> {
  const clean = plaintext.replace(/\s/g, '').toUpperCase();
  const cleanKeyword = keyword.toUpperCase();

  const steps = [
    {
      step: 1,
      description: 'Prepare the message and keyword',
      detail: `Message: ${clean}\nKeyword: ${cleanKeyword}`,
    },
    {
      step: 2,
      description: 'Determine column order',
      detail: `Sort keyword alphabetically to get reading order`,
    },
    {
      step: 3,
      description: 'Create grid and fill with message',
      detail: visualizeColumnarTransposition(clean, cleanKeyword),
    },
    {
      step: 4,
      description: 'Read columns in sorted order',
      detail: `Encrypted message: ${columnarTranspositionEncrypt(clean, cleanKeyword)}`,
    },
  ];

  return steps;
}

/**
 * Chapter 5 specific encrypted message
 *
 * Plaintext: "IAMTHESAMEASYOURLOLA"
 * Keyword: "PEOPLE"
 *
 * Grid visualization (20 characters, 6 columns, 4 rows):
 * Order:    P(4)  E(0)  O(3)  P(5)  L(2)  E(1)
 *           I     A     M     T     H     E
 *           S     A     M     E     A     S
 *           Y     O     U     R     L     O
 *           L     A     X     X     X     X
 *
 * Reading columns in alphabetical order E→E→L→O→P→P:
 * E(1): AAOA
 * E(5): ESOX
 * L(4): HALX
 * O(2): MMUX
 * P(0): ISYL
 * P(3): TERX
 * Result: AAOAESOXHALXMMUXISYLTERX
 */
export const CHAPTER5_KEYWORD = 'PEOPLE';
export const CHAPTER5_PLAINTEXT = 'IAMTHESAMEASYOURLOLA';
export const CHAPTER5_PLAINTEXT_FORMATTED = 'I AM THE SAME AS YOUR LOLA';
export const CHAPTER5_ENCRYPTED = columnarTranspositionEncrypt(CHAPTER5_PLAINTEXT, CHAPTER5_KEYWORD);
