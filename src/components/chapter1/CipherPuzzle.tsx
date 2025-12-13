'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import { caesarDecrypt } from '@/lib/ciphers/caesar';

interface CipherPuzzleProps {
  onComplete: () => void;
}

export function CipherPuzzle({ onComplete }: CipherPuzzleProps) {
  const [shift, setShift] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);

  const { settings, useHint: trackHint } = useGameStore();

  // The encrypted message from Babaylan Tala
  const encryptedMessage = 'WKH DPXOHW ZDV EOHVVHG EB PB JUDQGPRWKHU';
  const correctShift = 3;
  const correctAnswer = 'THE AMULET WAS BLESSED BY MY GRANDMOTHER';

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const decryptedMessage = caesarDecrypt(encryptedMessage, shift);
  const isAnswerCorrect = decryptedMessage === correctAnswer;

  const handleSubmit = () => {
    setAttempts(attempts + 1);

    if (isAnswerCorrect) {
      setIsCorrect(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    } else {
      // Auto-show hint after 3 failed attempts
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

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-gradient-end to-background" />

      <div className="relative z-10 max-w-5xl w-full">
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
                  {settings.language === 'tl' ? 'Caesar Cipher Tutorial' : 'Caesar Cipher Tutorial'}
                </h2>

                <div className="space-y-4 font-body text-foreground/90 text-lg">
                  <p>
                    {settings.language === 'tl'
                      ? 'Ang Caesar Cipher ay isang substitution cipher kung saan ang bawat letra ay pinalitan ng ibang letra na isang tiyak na bilang ng posisyon sa alphabet.'
                      : 'The Caesar Cipher is a substitution cipher where each letter is replaced by another letter a certain number of positions down the alphabet.'
                    }
                  </p>

                  <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                    <p className="text-gold font-semibold mb-2">
                      {settings.language === 'tl' ? 'Halimbawa:' : 'Example:'}
                    </p>
                    <p className="font-mono">
                      Shift 3: A → D, B → E, C → F
                    </p>
                    <p className="font-mono">
                      "HELLO" → "KHOOR"
                    </p>
                  </div>

                  <p>
                    {settings.language === 'tl'
                      ? 'Gamitin ang wheel sa ibaba upang mahanap ang tamang shift value at i-decrypt ang mensahe ni Babaylan Tala.'
                      : 'Use the wheel below to find the correct shift value and decrypt Babaylan Tala\'s message.'
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
                    ? 'Nagawa mong i-decrypt ang mensahe!'
                    : 'You\'ve decrypted the message!'
                  }
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
            {settings.language === 'tl' ? 'I-decrypt ang Mensahe' : 'Decrypt the Message'}
          </h2>
          <p className="font-body text-foreground/80 text-lg">
            {settings.language === 'tl'
              ? 'Hanapin ang tamang shift value upang basahin ang mensahe ni Babaylan Tala'
              : 'Find the correct shift value to read Babaylan Tala\'s message'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Cipher Wheel */}
          <div className="space-y-6">
            <div className="bg-background/80 backdrop-blur-sm border-2 border-gold/30 rounded-xl p-6">
              <h3 className="font-display text-gold text-lg mb-4 text-center">
                {settings.language === 'tl' ? 'Caesar Wheel' : 'Caesar Wheel'}
              </h3>

              {/* Visual Cipher Wheel */}
              <div className="relative w-full aspect-square max-w-sm mx-auto mb-6">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Outer ring */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gold/30"
                  />

                  {/* Inner ring */}
                  <circle
                    cx="100"
                    cy="100"
                    r="60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-purple/30"
                  />

                  {/* Alphabet on outer ring */}
                  {alphabet.map((letter, index) => {
                    const angle = (index / 26) * 2 * Math.PI - Math.PI / 2;
                    const x = 100 + 75 * Math.cos(angle);
                    const y = 100 + 75 * Math.sin(angle);

                    return (
                      <text
                        key={`outer-${letter}`}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-gold text-xs font-mono font-bold"
                        fill="currentColor"
                      >
                        {letter}
                      </text>
                    );
                  })}

                  {/* Shifted alphabet on inner ring */}
                  {alphabet.map((letter, index) => {
                    const shiftedIndex = (index + shift) % 26;
                    const shiftedLetter = alphabet[shiftedIndex];
                    const angle = (index / 26) * 2 * Math.PI - Math.PI / 2;
                    const x = 100 + 45 * Math.cos(angle);
                    const y = 100 + 45 * Math.sin(angle);

                    return (
                      <text
                        key={`inner-${letter}`}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-purple text-xs font-mono font-bold"
                        fill="currentColor"
                      >
                        {shiftedLetter}
                      </text>
                    );
                  })}

                  {/* Center indicator */}
                  <circle cx="100" cy="100" r="15" className="fill-gold/20" />
                  <text
                    x="100"
                    y="100"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-gold text-sm font-display font-bold"
                    fill="currentColor"
                  >
                    {shift}
                  </text>
                </svg>
              </div>

              {/* Shift slider */}
              <div className="space-y-4">
                <label className="font-body text-foreground/90 text-sm block text-center">
                  {settings.language === 'tl' ? 'Shift Value:' : 'Shift Value:'} {shift}
                </label>

                <input
                  type="range"
                  min="0"
                  max="25"
                  value={shift}
                  onChange={(e) => setShift(parseInt(e.target.value))}
                  className="w-full h-2 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold"
                />

                <div className="flex justify-between text-xs text-brass/60 font-mono">
                  <span>0</span>
                  <span>13</span>
                  <span>25</span>
                </div>
              </div>
            </div>

            {/* Hint button */}
            <div className="text-center">
              {!showHint && attempts < 3 && (
                <Button
                  onClick={handleHint}
                  variant="ghost"
                  size="sm"
                >
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
                      ? '💡 Si Julius Caesar ay gumagamit ng shift na 3. Subukan mo!'
                      : '💡 Julius Caesar used a shift of 3. Try that!'
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
              <p className="font-mono text-foreground/70 text-lg break-words leading-relaxed">
                {encryptedMessage}
              </p>
            </div>

            {/* Decrypted message */}
            <div className="bg-background/80 backdrop-blur-sm border-2 border-gold/30 rounded-xl p-6">
              <h3 className="font-display text-gold text-lg mb-4">
                {settings.language === 'tl' ? 'Decrypted na Mensahe:' : 'Decrypted Message:'}
              </h3>
              <p className={`font-mono text-lg break-words leading-relaxed transition-colors ${
                isAnswerCorrect ? 'text-gold' : 'text-foreground/70'
              }`}>
                {decryptedMessage}
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
                disabled={isCorrect}
              >
                {isAnswerCorrect
                  ? settings.language === 'tl' ? '✓ Tama!' : '✓ Correct!'
                  : settings.language === 'tl' ? 'Tingnan ang Sagot' : 'Check Answer'
                }
              </Button>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-background/60 backdrop-blur-sm border border-gold/20 rounded-full px-6 py-2">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="font-body text-foreground/80 text-sm">
              {settings.language === 'tl' ? 'Pag-aaralan...' : 'Decrypting...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
