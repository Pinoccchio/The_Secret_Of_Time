'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import {
  columnarTranspositionDecrypt,
  getColumnarTranspositionGrid,
} from '@/lib/ciphers/columnarTransposition';

interface CipherPuzzleProps {
  onComplete: () => void;
}

export function CipherPuzzle({ onComplete }: CipherPuzzleProps) {
  const [keyword, setKeyword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);

  const { settings, useHint: trackHint } = useGameStore();

  // The encrypted message from Maria
  const encryptedMessage = 'IAUEEMTTHRLYWSNAAOS';
  const correctKeyword = 'EDSA';
  const correctAnswer = 'IAMTHESAMEASYOURLO LA';

  const decryptedMessage = keyword.length > 0
    ? columnarTranspositionDecrypt(encryptedMessage, keyword)
    : '';

  const isAnswerCorrect = keyword.toUpperCase() === correctKeyword && decryptedMessage.replace(/\s/g, '') === correctAnswer.replace(/\s/g, '');

  const handleSubmit = () => {
    setAttempts(attempts + 1);

    if (isAnswerCorrect) {
      setIsCorrect(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    } else {
      if (attempts >= 2 && !showHint) {
        setShowHint(true);
        trackHint();
      }
    }
  };

  const handleHint = () => {
    setShowHint(true);
    trackHint();
  };

  // Get grid visualization
  const gridData = keyword.length > 0
    ? getColumnarTranspositionGrid(encryptedMessage, keyword)
    : null;

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-gradient-end to-background" />

      <div className="relative z-10 max-w-6xl w-full">
        {/* Tutorial Overlay */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="max-w-2xl bg-background border-2 border-gold/50 rounded-xl p-8"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
              >
                <h2 className="font-display text-3xl text-gold mb-4">
                  {settings.language === 'tl' ? 'Columnar Transposition Tutorial' : 'Columnar Transposition Tutorial'}
                </h2>

                <div className="space-y-4 font-body text-foreground/90 text-lg">
                  <p>
                    {settings.language === 'tl'
                      ? 'Ang Columnar Transposition ay gumagamit ng isang keyword upang ayusin ang mga column. Ang plaintext ay isinusulat sa isang grid, at binabasa column by column batay sa alphabetical order ng keyword.'
                      : 'Columnar Transposition uses a keyword to arrange columns. The plaintext is written in a grid, then read column by column based on the alphabetical order of the keyword.'
                    }
                  </p>

                  <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                    <p className="text-gold font-semibold mb-2">
                      {settings.language === 'tl' ? 'Halimbawa:' : 'Example:'}
                    </p>
                    <div className="font-mono text-sm space-y-2">
                      <p>Keyword: "KEY" → Order: K(1) E(0) Y(2)</p>
                      <p>Plaintext: "HELLO" → Grid:</p>
                      <div className="pl-4">
                        <p>K E Y</p>
                        <p>H E L</p>
                        <p>L O X</p>
                      </div>
                      <p>Read columns by order: E→K→Y = "EOHL LX"</p>
                    </div>
                  </div>

                  <p>
                    {settings.language === 'tl'
                      ? 'Hanapin ang tamang keyword upang i-decrypt ang mensahe ni Maria.'
                      : 'Find the correct keyword to decrypt Maria\'s message.'
                    }
                  </p>
                </div>

                <div className="flex justify-center mt-6">
                  <Button
                    onClick={() => setShowTutorial(false)}
                    variant="primary"
                    glow={true}
                  >
                    {settings.language === 'tl' ? 'Magsimula' : 'Begin Puzzle'}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success overlay */}
        <AnimatePresence>
          {isCorrect && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.5, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 0.8 }}
              >
                <motion.div
                  className="text-8xl mb-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  ✨
                </motion.div>

                <h2 className="font-display text-4xl text-gold mb-4">
                  {settings.language === 'tl' ? 'Tama!' : 'Correct!'}
                </h2>

                <p className="font-body text-foreground/90 text-xl">
                  {settings.language === 'tl'
                    ? 'Nalaman mo ang katotohanan!'
                    : 'You\'ve uncovered the truth!'
                  }
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
            {settings.language === 'tl' ? 'I-decrypt ang Mensahe ni Maria' : 'Decrypt Maria\'s Message'}
          </h2>
          <p className="font-body text-foreground/80 text-lg">
            {settings.language === 'tl'
              ? 'Hanapin ang tamang keyword upang malaman ang katotohanan'
              : 'Find the correct keyword to learn the truth'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Keyword input and grid */}
          <div className="space-y-6">
            {/* Keyword input */}
            <div className="bg-background/80 backdrop-blur-sm border-2 border-gold/30 rounded-xl p-6">
              <h3 className="font-display text-gold text-lg mb-4">
                {settings.language === 'tl' ? 'Keyword:' : 'Keyword:'}
              </h3>

              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value.toUpperCase())}
                placeholder={settings.language === 'tl' ? 'Ipasok ang keyword...' : 'Enter keyword...'}
                className="w-full px-4 py-3 bg-background/50 border-2 border-gold/30 rounded-lg font-mono text-lg text-gold focus:outline-none focus:border-gold/60 transition-colors uppercase"
                maxLength={10}
              />

              <p className="text-brass/60 text-sm mt-2 text-center">
                {settings.language === 'tl'
                  ? 'Subukan ang mga salitang may kaugnayan sa EDSA Revolution'
                  : 'Try words related to the EDSA Revolution'
                }
              </p>
            </div>

            {/* Grid visualization */}
            {gridData && (
              <motion.div
                className="bg-background/80 backdrop-blur-sm border-2 border-purple/30 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-display text-purple text-lg mb-4 text-center">
                  {settings.language === 'tl' ? 'Grid Visualization' : 'Grid Visualization'}
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        {keyword.split('').map((char, i) => (
                          <th key={i} className="border border-purple/30 p-2">
                            <div className="text-center">
                              <div className="font-mono text-gold font-bold">{char}</div>
                              <div className="text-xs text-purple/60 mt-1">
                                {gridData.columnOrder[i]}
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {gridData.grid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="border border-purple/30 p-2 text-center font-mono text-foreground/70"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-brass/60 mt-4 text-center">
                  {settings.language === 'tl'
                    ? 'Binabasa ang mga column ayon sa order (0, 1, 2...)'
                    : 'Read columns in order (0, 1, 2...)'
                  }
                </p>
              </motion.div>
            )}

            {/* Hint */}
            <div className="text-center">
              {!showHint && attempts < 3 && (
                <Button onClick={handleHint} variant="ghost" size="sm">
                  💡 {settings.language === 'tl' ? 'Humingi ng Hint' : 'Get a Hint'}
                </Button>
              )}

              {showHint && (
                <motion.div
                  className="bg-purple/10 border border-purple/30 rounded-lg p-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="font-body text-purple text-sm">
                    {settings.language === 'tl'
                      ? '💡 Saan tayo ngayon? Ang keyword ay may 4 na letra at nagsisimula sa "E"!'
                      : '💡 Where are we now? The keyword has 4 letters and starts with "E"!'
                    }
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right side - Messages */}
          <div className="space-y-6">
            {/* Encrypted message */}
            <div className="bg-background/80 backdrop-blur-sm border-2 border-brass/30 rounded-xl p-6">
              <h3 className="font-display text-brass text-lg mb-4">
                {settings.language === 'tl' ? 'Encrypted na Mensahe:' : 'Encrypted Message:'}
              </h3>
              <p className="font-mono text-foreground/70 text-lg break-all leading-relaxed">
                {encryptedMessage}
              </p>
            </div>

            {/* Decrypted message */}
            <div className="bg-background/80 backdrop-blur-sm border-2 border-gold/30 rounded-xl p-6">
              <h3 className="font-display text-gold text-lg mb-4">
                {settings.language === 'tl' ? 'Decrypted na Mensahe:' : 'Decrypted Message:'}
              </h3>
              <p className={`font-mono text-lg break-all leading-relaxed transition-colors ${
                isAnswerCorrect ? 'text-gold' : 'text-foreground/70'
              }`}>
                {decryptedMessage || settings.language === 'tl' ? 'Mag-input ng keyword...' : 'Enter a keyword...'}
              </p>
            </div>

            {/* Attempt counter */}
            <div className="text-center">
              <p className="font-body text-brass/60 text-sm">
                {settings.language === 'tl' ? 'Mga Pagsubok:' : 'Attempts:'} {attempts}
              </p>
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                variant="primary"
                size="lg"
                glow={isAnswerCorrect}
                disabled={isCorrect || keyword.length === 0}
              >
                {isAnswerCorrect
                  ? settings.language === 'tl' ? '✓ Tama!' : '✓ Correct!'
                  : settings.language === 'tl' ? 'Tingnan ang Sagot' : 'Check Answer'
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
