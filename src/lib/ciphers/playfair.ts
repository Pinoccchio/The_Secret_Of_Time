/**
 * Playfair Cipher Implementation
 *
 * A digraph substitution cipher that encrypts pairs of letters using a 5x5 grid.
 * Invented by Charles Wheatstone, popularized by Lord Playfair.
 * Used extensively in WWI and WWII for tactical communications.
 *
 * Used in Chapter 3: WWII Liberation of Manila (1945)
 * Keyword: BATAAN
 */

/**
 * Generates a 5x5 Playfair grid from a keyword
 * @param keyword - The keyword to use for the grid
 * @returns 5x5 grid as a 2D array
 */
export function generatePlayfairGrid(keyword: string): string[][] {
  // Remove spaces, convert to uppercase, and remove duplicates
  const cleanKeyword = keyword.replace(/\s/g, '').toUpperCase();
  const seen = new Set<string>();
  let gridString = '';

  // Add unique letters from keyword
  for (const char of cleanKeyword) {
    if (char >= 'A' && char <= 'Z' && !seen.has(char)) {
      // Treat I and J as the same
      const normalizedChar = char === 'J' ? 'I' : char;
      if (!seen.has(normalizedChar)) {
        seen.add(normalizedChar);
        gridString += normalizedChar;
      }
    }
  }

  // Add remaining letters of the alphabet (except J)
  for (let i = 65; i <= 90; i++) {
    const char = String.fromCharCode(i);
    if (char === 'J') continue; // Skip J, use I instead
    if (!seen.has(char)) {
      seen.add(char);
      gridString += char;
    }
  }

  // Convert string to 5x5 grid
  const grid: string[][] = [];
  for (let row = 0; row < 5; row++) {
    const rowArray: string[] = [];
    for (let col = 0; col < 5; col++) {
      rowArray.push(gridString[row * 5 + col]);
    }
    grid.push(rowArray);
  }

  return grid;
}

/**
 * Finds the position of a letter in the Playfair grid
 * @param grid - The 5x5 Playfair grid
 * @param letter - The letter to find (will be normalized to I if J)
 * @returns {row, col} position or null if not found
 */
function findPosition(grid: string[][], letter: string): { row: number; col: number } | null {
  const normalizedLetter = letter === 'J' ? 'I' : letter;
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (grid[row][col] === normalizedLetter) {
        return { row, col };
      }
    }
  }
  return null;
}

/**
 * Prepares text for Playfair encryption/decryption
 * - Removes non-alphabetic characters
 * - Converts to uppercase
 * - Replaces J with I
 * - Splits into pairs (adds X between duplicate letters in a pair)
 * @param text - The text to prepare
 * @returns Array of letter pairs
 */
export function prepareTextForPlayfair(text: string): string[] {
  // Remove non-alphabetic, convert to uppercase, replace J with I
  let clean = text.replace(/[^A-Z]/gi, '').toUpperCase().replace(/J/g, 'I');

  const pairs: string[] = [];
  let i = 0;

  while (i < clean.length) {
    const first = clean[i];
    let second = i + 1 < clean.length ? clean[i + 1] : 'X';

    // If both letters in pair are the same, insert X
    if (first === second) {
      second = 'X';
      i++; // Only advance by 1, process the duplicate letter next
    } else {
      i += 2;
    }

    pairs.push(first + second);
  }

  // If last pair is incomplete, add X
  if (pairs[pairs.length - 1]?.length === 1) {
    pairs[pairs.length - 1] += 'X';
  }

  return pairs;
}

/**
 * Encrypts a pair of letters using Playfair cipher rules
 * @param grid - The 5x5 Playfair grid
 * @param pair - Two-letter pair to encrypt
 * @returns Encrypted pair
 */
function encryptPair(grid: string[][], pair: string): string {
  const pos1 = findPosition(grid, pair[0]);
  const pos2 = findPosition(grid, pair[1]);

  if (!pos1 || !pos2) return pair;

  let newChar1, newChar2;

  // Same row: shift right
  if (pos1.row === pos2.row) {
    newChar1 = grid[pos1.row][(pos1.col + 1) % 5];
    newChar2 = grid[pos2.row][(pos2.col + 1) % 5];
  }
  // Same column: shift down
  else if (pos1.col === pos2.col) {
    newChar1 = grid[(pos1.row + 1) % 5][pos1.col];
    newChar2 = grid[(pos2.row + 1) % 5][pos2.col];
  }
  // Rectangle: swap columns
  else {
    newChar1 = grid[pos1.row][pos2.col];
    newChar2 = grid[pos2.row][pos1.col];
  }

  return newChar1 + newChar2;
}

/**
 * Decrypts a pair of letters using Playfair cipher rules
 * @param grid - The 5x5 Playfair grid
 * @param pair - Two-letter pair to decrypt
 * @returns Decrypted pair
 */
function decryptPair(grid: string[][], pair: string): string {
  const pos1 = findPosition(grid, pair[0]);
  const pos2 = findPosition(grid, pair[1]);

  if (!pos1 || !pos2) return pair;

  let newChar1, newChar2;

  // Same row: shift left
  if (pos1.row === pos2.row) {
    newChar1 = grid[pos1.row][(pos1.col + 4) % 5]; // +4 is same as -1 mod 5
    newChar2 = grid[pos2.row][(pos2.col + 4) % 5];
  }
  // Same column: shift up
  else if (pos1.col === pos2.col) {
    newChar1 = grid[(pos1.row + 4) % 5][pos1.col]; // +4 is same as -1 mod 5
    newChar2 = grid[(pos2.row + 4) % 5][pos2.col];
  }
  // Rectangle: swap columns (same as encryption)
  else {
    newChar1 = grid[pos1.row][pos2.col];
    newChar2 = grid[pos2.row][pos1.col];
  }

  return newChar1 + newChar2;
}

/**
 * Encrypts plaintext using Playfair cipher
 * @param plaintext - The message to encrypt
 * @param keyword - The keyword for the Playfair grid
 * @returns Encrypted message
 */
export function playfairEncrypt(plaintext: string, keyword: string): string {
  if (!plaintext || !keyword) return '';

  const grid = generatePlayfairGrid(keyword);
  const pairs = prepareTextForPlayfair(plaintext);

  return pairs.map(pair => encryptPair(grid, pair)).join('');
}

/**
 * Decrypts ciphertext using Playfair cipher
 * @param ciphertext - The encrypted message
 * @param keyword - The keyword for the Playfair grid
 * @returns Decrypted message
 */
export function playfairDecrypt(ciphertext: string, keyword: string): string {
  if (!ciphertext || !keyword) return '';

  const grid = generatePlayfairGrid(keyword);

  // Clean and split into pairs
  const clean = ciphertext.replace(/[^A-Z]/gi, '').toUpperCase();
  const pairs: string[] = [];

  for (let i = 0; i < clean.length; i += 2) {
    if (i + 1 < clean.length) {
      pairs.push(clean[i] + clean[i + 1]);
    }
  }

  return pairs.map(pair => decryptPair(grid, pair)).join('');
}

/**
 * Validates if a keyword is suitable for Playfair cipher
 * @param keyword - The keyword to validate
 * @returns Validation result with error message if invalid
 */
export function validatePlayfairKeyword(keyword: string): { valid: boolean; error?: string } {
  if (!keyword || keyword.trim().length === 0) {
    return { valid: false, error: 'Keyword cannot be empty' };
  }

  const cleanKey = keyword.replace(/\s/g, '');

  if (cleanKey.length < 3) {
    return { valid: false, error: 'Keyword must be at least 3 characters long' };
  }

  // Check if keyword contains only alphabetic characters
  if (!/^[A-Za-z]+$/.test(cleanKey)) {
    return { valid: false, error: 'Keyword must contain only letters' };
  }

  return { valid: true };
}

/**
 * Formats Playfair ciphertext into pairs for readability
 * @param ciphertext - The encrypted message
 * @returns Formatted ciphertext with space between pairs
 */
export function formatPlayfairCiphertext(ciphertext: string): string {
  const clean = ciphertext.replace(/\s/g, '');
  const pairs: string[] = [];

  for (let i = 0; i < clean.length; i += 2) {
    if (i + 1 < clean.length) {
      pairs.push(clean[i] + clean[i + 1]);
    } else {
      pairs.push(clean[i]);
    }
  }

  return pairs.join(' ');
}

/**
 * Generates step-by-step explanation of the Playfair decryption process
 * @param ciphertext - The message to decrypt
 * @param keyword - The keyword
 * @returns Array of steps explaining the decryption
 */
export function getPlayfairDecryptionSteps(ciphertext: string, keyword: string): Array<{
  step: number;
  description: string;
  detail: string;
}> {
  const grid = generatePlayfairGrid(keyword);
  const clean = ciphertext.replace(/[^A-Z]/gi, '').toUpperCase();

  const steps = [
    {
      step: 1,
      description: 'Create Playfair grid from keyword',
      detail: `Keyword: ${keyword.toUpperCase()}\nGrid created with unique letters, then filled with remaining alphabet (I/J combined)`,
    },
    {
      step: 2,
      description: 'Split ciphertext into pairs',
      detail: `Ciphertext: ${clean}\nPairs: ${formatPlayfairCiphertext(clean)}`,
    },
    {
      step: 3,
      description: 'Apply decryption rules',
      detail: `Same row → shift LEFT\nSame column → shift UP\nRectangle → swap corners (same row)`,
    },
  ];

  return steps;
}

/**
 * Chapter 3 specific encrypted message
 *
 * Plaintext: "THE ENEMY WILL RETREAT THROUGH LUNETA AMBUSH AT DAWN"
 * With X fillers: "THEXENEMYWILLRETREATTHROUGHLUNETAXAMBUSHATDAWN"
 * Pairs: TH EX EN EM YW IL LR ET RE AT TH RO UG HL UN ET AX AM BU SH AT DA WN (23 pairs)
 *
 * BATAAN Grid (5x5):
 *   B A T N C
 *   D E F G H
 *   I K L M O
 *   P Q R S U
 *   V W X Y Z
 */
export const CHAPTER3_ENCRYPTED = 'CFFWGAGKZXKMRXFAQFTNCFULSHFOSCFATWNKCPUGTNEBYA';
export const CHAPTER3_KEYWORD = 'BATAAN';
export const CHAPTER3_SOLUTION = 'THEXENEMYWILLRETREATTHROUGHLUNETAXAMBUSHATDAWN';
export const CHAPTER3_SOLUTION_FORMATTED = 'THE ENEMY WILL RETREAT THROUGH LUNETA AMBUSH AT DAWN';
