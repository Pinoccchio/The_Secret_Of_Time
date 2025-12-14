/**
 * Vigenère Cipher Implementation
 *
 * A polyalphabetic substitution cipher that uses a keyword to encrypt messages.
 * Each letter of the keyword represents a different Caesar cipher shift.
 *
 * Used in Chapter 2: Philippine Revolution (1896)
 * Keyword: KALAYAAN (Freedom)
 */

/**
 * Encrypts a message using the Vigenère cipher
 * @param plaintext - The message to encrypt
 * @param keyword - The keyword to use for encryption
 * @returns The encrypted message
 */
export function vigenereEncrypt(plaintext: string, keyword: string): string {
  if (!plaintext || !keyword) return '';

  // Remove spaces and convert to uppercase
  const cleanText = plaintext.replace(/\s/g, '').toUpperCase();
  const cleanKey = keyword.replace(/\s/g, '').toUpperCase();

  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];

    // Only encrypt alphabetic characters
    if (char >= 'A' && char <= 'Z') {
      // Get the shift value from the keyword
      const keyChar = cleanKey[keyIndex % cleanKey.length];
      const shift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0);

      // Apply the shift
      const charCode = char.charCodeAt(0) - 'A'.charCodeAt(0);
      const encryptedCharCode = (charCode + shift) % 26;
      const encryptedChar = String.fromCharCode(encryptedCharCode + 'A'.charCodeAt(0));

      result += encryptedChar;
      keyIndex++;
    } else {
      // Keep non-alphabetic characters as is
      result += char;
    }
  }

  return result;
}

/**
 * Decrypts a message encrypted with the Vigenère cipher
 * @param ciphertext - The encrypted message
 * @param keyword - The keyword used for encryption
 * @returns The decrypted message
 */
export function vigenereDecrypt(ciphertext: string, keyword: string): string {
  if (!ciphertext || !keyword) return '';

  // Remove spaces and convert to uppercase
  const cleanText = ciphertext.replace(/\s/g, '').toUpperCase();
  const cleanKey = keyword.replace(/\s/g, '').toUpperCase();

  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];

    // Only decrypt alphabetic characters
    if (char >= 'A' && char <= 'Z') {
      // Get the shift value from the keyword
      const keyChar = cleanKey[keyIndex % cleanKey.length];
      const shift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0);

      // Apply the reverse shift
      const charCode = char.charCodeAt(0) - 'A'.charCodeAt(0);
      const decryptedCharCode = (charCode - shift + 26) % 26;
      const decryptedChar = String.fromCharCode(decryptedCharCode + 'A'.charCodeAt(0));

      result += decryptedChar;
      keyIndex++;
    } else {
      // Keep non-alphabetic characters as is
      result += char;
    }
  }

  return result;
}

/**
 * Validates if a keyword is suitable for Vigenère cipher
 * @param keyword - The keyword to validate
 * @returns Validation result with error message if invalid
 */
export function validateKeyword(keyword: string): { valid: boolean; error?: string } {
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
 * Gets the numeric shift value for each letter in the keyword
 * @param keyword - The keyword
 * @returns Array of shift values (A=0, B=1, ..., Z=25)
 */
export function getKeywordShifts(keyword: string): number[] {
  const cleanKey = keyword.replace(/\s/g, '').toUpperCase();
  return cleanKey.split('').map(char => char.charCodeAt(0) - 'A'.charCodeAt(0));
}

/**
 * Generates a step-by-step explanation of the encryption process
 * @param plaintext - The message to encrypt
 * @param keyword - The keyword
 * @returns Array of steps explaining the encryption
 */
export function getEncryptionSteps(plaintext: string, keyword: string): Array<{
  step: number;
  description: string;
  detail: string;
}> {
  const cleanText = plaintext.replace(/\s/g, '').toUpperCase();
  const cleanKey = keyword.replace(/\s/g, '').toUpperCase();

  const steps = [
    {
      step: 1,
      description: 'Prepare the message and keyword',
      detail: `Message: ${cleanText}\nKeyword: ${cleanKey}`,
    },
    {
      step: 2,
      description: 'Align keyword with message',
      detail: `The keyword repeats to match message length:\n${cleanText.split('').map((_, i) => cleanKey[i % cleanKey.length]).join('')}`,
    },
    {
      step: 3,
      description: 'Calculate shifts for each letter',
      detail: `Each letter in KALAYAAN represents a shift:\nK=10, A=0, L=11, A=0, Y=24, A=0, A=0, N=13`,
    },
  ];

  // Add encryption for first few characters as example
  const examples: string[] = [];
  for (let i = 0; i < Math.min(5, cleanText.length); i++) {
    const char = cleanText[i];
    if (char >= 'A' && char <= 'Z') {
      const keyChar = cleanKey[i % cleanKey.length];
      const shift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0);
      const charCode = char.charCodeAt(0) - 'A'.charCodeAt(0);
      const encryptedCharCode = (charCode + shift) % 26;
      const encryptedChar = String.fromCharCode(encryptedCharCode + 'A'.charCodeAt(0));

      examples.push(`${char} + ${keyChar}(${shift}) = ${encryptedChar}`);
    }
  }

  steps.push({
    step: 4,
    description: 'Apply shifts to encrypt',
    detail: `Examples:\n${examples.join('\n')}`,
  });

  return steps;
}

/**
 * Generates the Vigenère square (tabula recta) for reference
 * @returns 26x26 grid representing all possible Caesar shifts
 */
export function generateVigenereSquare(): string[][] {
  const square: string[][] = [];

  for (let row = 0; row < 26; row++) {
    const rowArray: string[] = [];
    for (let col = 0; col < 26; col++) {
      const charCode = ((col + row) % 26) + 'A'.charCodeAt(0);
      rowArray.push(String.fromCharCode(charCode));
    }
    square.push(rowArray);
  }

  return square;
}

/**
 * Formats ciphertext with spaces for better readability
 * @param ciphertext - The encrypted message
 * @param groupSize - Number of characters per group (default: 5)
 * @returns Formatted ciphertext with spaces
 */
export function formatCiphertext(ciphertext: string, groupSize: number = 5): string {
  const clean = ciphertext.replace(/\s/g, '');
  const groups: string[] = [];

  for (let i = 0; i < clean.length; i += groupSize) {
    groups.push(clean.substring(i, i + groupSize));
  }

  return groups.join(' ');
}

/**
 * Chapter 2 specific encrypted message
 */
export const CHAPTER2_ENCRYPTED = 'PIRHRFOEPRPEBOMVXTSRCVOYETTOLNEIORQOPGEGDHPSYCRVPINEMFTUYSPWFOCNWEMEDORR';
export const CHAPTER2_KEYWORD = 'KALAYAAN';
export const CHAPTER2_SOLUTION = 'FIGHTFORFREEDOMINTHREVOLUTIONNEVERFORGETTHESACRIFICEOFTHOSEWHOCAMEBEFORE';
export const CHAPTER2_SOLUTION_FORMATTED = 'FIGHT FOR FREEDOM IN THE REVOLUTION NEVER FORGET THE SACRIFICE OF THOSE WHO CAME BEFORE';
