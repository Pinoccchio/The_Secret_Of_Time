/**
 * Caesar Cipher Implementation
 * A substitution cipher where each letter is shifted by a fixed number of positions
 */

export interface CaesarCipherResult {
  result: string;
  shifts: { original: string; shifted: string; position: number }[];
}

/**
 * Encrypt text using Caesar cipher
 * @param text - Plain text to encrypt
 * @param shift - Number of positions to shift (positive for forward, negative for backward)
 * @returns Encrypted text
 */
export function caesarEncrypt(text: string, shift: number): string {
  return caesarTransform(text, shift);
}

/**
 * Decrypt text using Caesar cipher
 * @param text - Encrypted text to decrypt
 * @param shift - Number of positions to shift back
 * @returns Decrypted text
 */
export function caesarDecrypt(text: string, shift: number): string {
  return caesarTransform(text, -shift);
}

/**
 * Core transformation function for Caesar cipher
 * @param text - Text to transform
 * @param shift - Shift amount
 * @returns Transformed text
 */
function caesarTransform(text: string, shift: number): string {
  // Normalize shift to be within 0-25 range
  const normalizedShift = ((shift % 26) + 26) % 26;

  return text
    .split('')
    .map((char) => {
      // Check if character is a letter
      if (/[a-zA-Z]/.test(char)) {
        const isUpperCase = char === char.toUpperCase();
        const baseCode = isUpperCase ? 65 : 97; // 'A' or 'a'

        // Get position (0-25), apply shift, wrap around
        const position = char.toUpperCase().charCodeAt(0) - 65;
        const shiftedPosition = (position + normalizedShift) % 26;
        const shiftedChar = String.fromCharCode(baseCode + shiftedPosition);

        return shiftedChar;
      }

      // Keep non-letter characters unchanged
      return char;
    })
    .join('');
}

/**
 * Get detailed transformation steps for educational purposes
 * @param text - Text to analyze
 * @param shift - Shift amount
 * @returns Array of shift steps showing transformation
 */
export function getDetailedCaesarSteps(
  text: string,
  shift: number
): { original: string; shifted: string; position: number }[] {
  const normalizedShift = ((shift % 26) + 26) % 26;

  return text
    .split('')
    .filter((char) => /[a-zA-Z]/.test(char))
    .map((char) => {
      const position = char.toUpperCase().charCodeAt(0) - 65;
      const shiftedPosition = (position + normalizedShift) % 26;
      const shifted = String.fromCharCode(
        (char === char.toUpperCase() ? 65 : 97) + shiftedPosition
      );

      return {
        original: char,
        shifted,
        position,
      };
    });
}

/**
 * Attempt to crack a Caesar cipher by analyzing letter frequency
 * @param ciphertext - Encrypted text to crack
 * @returns Array of possible decryptions sorted by likelihood
 */
export function bruteForceCaesar(ciphertext: string): {
  shift: number;
  text: string;
  score: number;
}[] {
  const results: { shift: number; text: string; score: number }[] = [];

  // Try all possible shifts (0-25)
  for (let shift = 0; shift < 26; shift++) {
    const decrypted = caesarDecrypt(ciphertext, shift);
    const score = scoreEnglishText(decrypted);

    results.push({ shift, text: decrypted, score });
  }

  // Sort by score (higher is better)
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Score text based on English letter frequency
 * Simple heuristic: count common English words and letter patterns
 * @param text - Text to score
 * @returns Score (higher = more likely to be English)
 */
function scoreEnglishText(text: string): number {
  const commonWords = ['THE', 'AND', 'FOR', 'ARE', 'BUT', 'NOT', 'YOU', 'ALL', 'CAN', 'HER', 'WAS', 'ONE', 'OUR', 'OUT', 'DAY'];
  const upperText = text.toUpperCase();

  let score = 0;

  // Check for common words
  commonWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = upperText.match(regex);
    if (matches) {
      score += matches.length * word.length;
    }
  });

  // Check for common letter frequency (E, T, A, O, I, N are most common)
  const commonLetters = ['E', 'T', 'A', 'O', 'I', 'N'];
  const letters = upperText.replace(/[^A-Z]/g, '');

  commonLetters.forEach((letter) => {
    const count = (letters.match(new RegExp(letter, 'g')) || []).length;
    score += count * 0.1;
  });

  return score;
}

/**
 * Validate if a Caesar cipher solution is correct
 * @param encrypted - Encrypted text
 * @param decrypted - Attempted decryption
 * @param expectedShift - Expected shift value
 * @returns True if decryption is correct
 */
export function validateCaesarSolution(
  encrypted: string,
  decrypted: string,
  expectedShift: number
): boolean {
  const correctDecryption = caesarDecrypt(encrypted, expectedShift);
  return correctDecryption.toUpperCase().replace(/\s/g, '') === decrypted.toUpperCase().replace(/\s/g, '');
}

/**
 * Generate a Caesar cipher challenge
 * @param plaintext - Original message
 * @param shift - Shift to apply
 * @returns Cipher challenge object
 */
export function generateCaesarChallenge(plaintext: string, shift: number) {
  return {
    plaintext,
    ciphertext: caesarEncrypt(plaintext, shift),
    shift,
    hints: [
      `The message was shifted by ${shift} positions`,
      `Try shifting each letter ${shift} steps ${shift > 0 ? 'backward' : 'forward'} in the alphabet`,
      `A becomes ${caesarEncrypt('A', shift)}`,
    ],
  };
}
