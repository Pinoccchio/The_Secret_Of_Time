/**
 * Rail Fence Cipher Implementation
 *
 * A transposition cipher that rearranges letters in a zigzag pattern.
 * Popular for quick field encryption—used by resistance movements worldwide.
 *
 * Used in Chapter 4: Martial Law Philippines (1983)
 * Rails: 3
 */

/**
 * Encrypts plaintext using Rail Fence cipher
 * @param plaintext - The message to encrypt
 * @param rails - Number of rails (rows) in the zigzag pattern
 * @returns Encrypted message
 */
export function railFenceEncrypt(plaintext: string, rails: number): string {
  if (!plaintext || rails < 2) return plaintext;

  // Remove spaces and convert to uppercase
  const clean = plaintext.replace(/\s/g, '').toUpperCase();

  // Create rails array
  const fence: string[][] = Array.from({ length: rails }, () => []);

  let rail = 0;
  let direction = 1; // 1 for down, -1 for up

  // Place each character in zigzag pattern
  for (let i = 0; i < clean.length; i++) {
    fence[rail].push(clean[i]);

    // Change direction at top and bottom rails
    if (rail === 0) {
      direction = 1;
    } else if (rail === rails - 1) {
      direction = -1;
    }

    rail += direction;
  }

  // Read fence row by row
  return fence.map(row => row.join('')).join('');
}

/**
 * Decrypts ciphertext using Rail Fence cipher
 * @param ciphertext - The encrypted message
 * @param rails - Number of rails used for encryption
 * @returns Decrypted message
 */
export function railFenceDecrypt(ciphertext: string, rails: number): string {
  if (!ciphertext || rails < 2) return ciphertext;

  const clean = ciphertext.replace(/\s/g, '').toUpperCase();
  const len = clean.length;

  // Create fence pattern to know how many chars per rail
  const fence: (string | null)[][] = Array.from({ length: rails }, () => Array(len).fill(null));

  let rail = 0;
  let direction = 1;

  // Mark the positions in zigzag pattern
  for (let i = 0; i < len; i++) {
    fence[rail][i] = '*'; // Mark position

    if (rail === 0) {
      direction = 1;
    } else if (rail === rails - 1) {
      direction = -1;
    }

    rail += direction;
  }

  // Fill the marked positions with actual characters
  let index = 0;
  for (let r = 0; r < rails; r++) {
    for (let c = 0; c < len; c++) {
      if (fence[r][c] === '*') {
        fence[r][c] = clean[index];
        index++;
      }
    }
  }

  // Read in zigzag order
  rail = 0;
  direction = 1;
  const result: string[] = [];

  for (let i = 0; i < len; i++) {
    result.push(fence[rail][i] as string);

    if (rail === 0) {
      direction = 1;
    } else if (rail === rails - 1) {
      direction = -1;
    }

    rail += direction;
  }

  return result.join('');
}

/**
 * Validates if the number of rails is valid
 * @param rails - Number of rails to validate
 * @returns Validation result with error message if invalid
 */
export function validateRails(rails: number): { valid: boolean; error?: string } {
  if (rails < 2) {
    return { valid: false, error: 'Rails must be at least 2' };
  }

  if (rails > 10) {
    return { valid: false, error: 'Rails must be 10 or less' };
  }

  return { valid: true };
}

/**
 * Visualizes the rail fence pattern for educational purposes
 * @param text - The text to visualize
 * @param rails - Number of rails
 * @returns String representation of the rail fence pattern
 */
export function visualizeRailFence(text: string, rails: number): string {
  if (!text || rails < 2) return '';

  const clean = text.replace(/\s/g, '').toUpperCase();
  const fence: string[][] = Array.from({ length: rails }, () => []);

  let rail = 0;
  let direction = 1;

  for (let i = 0; i < clean.length; i++) {
    // Add dots for empty positions
    for (let r = 0; r < rails; r++) {
      if (r === rail) {
        fence[r].push(clean[i]);
      } else {
        fence[r].push('.');
      }
    }

    if (rail === 0) {
      direction = 1;
    } else if (rail === rails - 1) {
      direction = -1;
    }

    rail += direction;
  }

  // Format each rail with spaces
  return fence.map((row, idx) => `Rail ${idx + 1}: ${row.join(' ')}`).join('\n');
}

/**
 * Gets step-by-step explanation of the encryption process
 * @param plaintext - The message to encrypt
 * @param rails - Number of rails
 * @returns Array of steps explaining the encryption
 */
export function getRailFenceEncryptionSteps(plaintext: string, rails: number): Array<{
  step: number;
  description: string;
  detail: string;
}> {
  const clean = plaintext.replace(/\s/g, '').toUpperCase();

  const steps = [
    {
      step: 1,
      description: 'Prepare the message',
      detail: `Remove spaces and convert to uppercase:\n${clean}`,
    },
    {
      step: 2,
      description: 'Create zigzag pattern',
      detail: `Write message in ${rails} rails (zigzag pattern):\n\n${visualizeRailFence(clean, rails)}`,
    },
    {
      step: 3,
      description: 'Read each rail',
      detail: `Read each rail from top to bottom, left to right`,
    },
    {
      step: 4,
      description: 'Combine rails',
      detail: `Encrypted message: ${railFenceEncrypt(clean, rails)}`,
    },
  ];

  return steps;
}

/**
 * Chapter 4 specific encrypted message
 *
 * Plaintext: "PEOPLE POWER INHERENT FREEDOM"
 * Rails: 3
 *
 * Zigzag pattern (26 characters):
 * Position: P  E  O  P  L  E  P  O  W  E  R  I  N  H  E  R  E  N  T  F  R  E  E  D  O  M
 * Rail 0:   P  .  .  .  L  .  .  .  W  .  .  .  N  .  .  .  E  .  .  .  R  .  .  .  O  .
 * Rail 1:   .  E  .  P  .  E  .  O  .  E  .  I  .  H  .  R  .  N  .  F  .  E  .  D  .  M
 * Rail 2:   .  .  O  .  .  .  P  .  .  .  R  .  .  .  E  .  .  .  T  .  .  .  E  .  .  .
 *
 * Reading rails: PLWNERO + EPEOEIHRNFEDM + OPRETE
 */
export const CHAPTER4_ENCRYPTED = 'PLWNEROEPEOEIHRNFEDMOPRETE';
export const CHAPTER4_RAILS = 3;
export const CHAPTER4_SOLUTION = 'PEOPLEPOWERINHERENTFREEDOM';
export const CHAPTER4_SOLUTION_FORMATTED = 'PEOPLE POWER INHERENT FREEDOM';
