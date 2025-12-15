'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';
import {
  generateVigenereSquare,
  formatCiphertext,
  CHAPTER2_ENCRYPTED,
  CHAPTER2_KEYWORD,
  CHAPTER2_SOLUTION_FORMATTED,
} from '@/lib/ciphers/vigenere';

interface CipherPuzzleProps {
  onComplete: () => void;
}

export function CipherPuzzle({ onComplete }: CipherPuzzleProps) {
  const { settings, unlockCipher } = useGameStore();
  const [showTutorial, setShowTutorial] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [userDecryptedText, setUserDecryptedText] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSquare, setShowSquare] = useState(false);
  const [solved, setSolved] = useState(false);
  const [showError, setShowError] = useState(false);

  const vigenereSquare = generateVigenereSquare();
  const formattedEncrypted = formatCiphertext(CHAPTER2_ENCRYPTED);

  const handleCheck = () => {
    const cleanUserInput = userDecryptedText.replace(/\s/g, '').toUpperCase();
    const cleanSolution = CHAPTER2_SOLUTION_FORMATTED.replace(/\s/g, '').toUpperCase();

    if (cleanUserInput === cleanSolution) {
      setSolved(true);
      unlockCipher('vigenere');
      setTimeout(() => {
        onComplete();
      }, 3000);
    } else {
      setAttempts(attempts + 1);
      // Show error feedback
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);

      if (attempts >= 1) {
        setShowHint(true);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgrounds/chapter2_bg.png"
          alt="Katipunan secret meeting 1896"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Urgency Background Effect */}
      <motion.div
        className="absolute inset-0 bg-red-600/10 z-5"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 min-h-screen p-4 md:p-8">
        {/* Tutorial Overlay */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="max-w-3xl w-full bg-gradient-to-br from-background to-mahogany/20 border-2 border-gold/50 rounded-xl p-8"
              >
                <h2 className="font-display text-4xl text-gold mb-6 text-center">
                  {settings.language === 'tl' ? 'Ang Vigenère Cipher' : 'The Vigenère Cipher'}
                </h2>

                <div className="font-body text-foreground/90 space-y-4 mb-6">
                  <p>
                    {settings.language === 'tl'
                      ? 'Ang Vigenère cipher ay isang polyalphabetic cipher—ang bawat letra ay maaaring i-encrypt nang iba-iba!'
                      : 'The Vigenère cipher is a polyalphabetic cipher—each letter can be encrypted differently!'}
                  </p>

                  <div className="bg-background/50 border border-gold/30 rounded-lg p-4">
                    <h3 className="font-dramatic text-xl text-sunset mb-2">
                      {settings.language === 'tl' ? 'Paano Gumagana:' : 'How it works:'}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>
                        {settings.language === 'tl'
                          ? 'Gumagamit ng isang KEYWORD na inuulit para sa encryption'
                          : 'Uses a KEYWORD (repeated) for encryption'}
                      </li>
                      <li>
                        {settings.language === 'tl'
                          ? 'Bawat letra ng keyword ay nagtutukoy ng iba\'t ibang shift'
                          : 'Each letter of the keyword determines a different shift'}
                      </li>
                      <li>
                        {settings.language === 'tl'
                          ? 'Ang keyword dito ay: KALAYAAN (Kalayaan)'
                          : 'The keyword here is: KALAYAAN (Freedom)'}
                      </li>
                      <li>
                        {settings.language === 'tl'
                          ? 'Gamit ang keyword, i-decrypt mo ang mensahe nang manu-mano'
                          : 'Use the keyword to manually decrypt the message'}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-mahogany/20 border border-sunset/30 rounded-lg p-4">
                    <h3 className="font-dramatic text-xl text-gold mb-2">
                      {settings.language === 'tl' ? 'Halimbawa:' : 'Example:'}
                    </h3>
                    <div className="font-mono text-sm space-y-1">
                      <p>Message: <span className="text-gold">F I G H T</span></p>
                      <p>Key:     <span className="text-sunset">K A L A Y A A N</span></p>
                      <p className="text-foreground/60">          ↓ ↓ ↓ ↓ ↓</p>
                      <p>Shift:   <span className="text-purple">10 0 11 0 24</span> (A=0, B=1... Z=25)</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/70">
                    {settings.language === 'tl'
                      ? 'Gamitin ang Vigenère square para tulungan ka. I-type mo ang iyong sagot sa decryption box...'
                      : 'Use the Vigenère square to help you. Type your answer in the decryption box...'}
                  </p>
                </div>

                <Button
                  onClick={() => setShowTutorial(false)}
                  variant="primary"
                  className="w-full"
                >
                  {settings.language === 'tl' ? 'Simulan ang Puzzle' : 'Begin Puzzle'}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Puzzle Interface */}
        <div className="max-w-6xl mx-auto pt-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-5xl text-gold mb-4">
              {settings.language === 'tl' ? 'I-decrypt ang Mensahe' : 'Decrypt the Message'}
            </h1>
            <motion.p
              className="text-red-400 text-sm font-body"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {settings.language === 'tl' ? '⚠️ Paparating na ang mga Guardia Civil!' : '⚠️ The Guardia Civil are approaching!'}
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Left Column: Encrypted Message & Keyword Input */}
            <div className="space-y-6">
              {/* Encrypted Message */}
              <div className="bg-background/80 backdrop-blur-sm border-2 border-gold/30 rounded-xl p-6">
                <h2 className="font-dramatic text-2xl text-sunset mb-4">
                  {settings.language === 'tl' ? 'Naka-encrypt na Mensahe' : 'Encrypted Message'}
                </h2>
                <div className="font-mono text-xl text-gold break-all leading-relaxed bg-background/50 p-4 rounded-lg border border-gold/20">
                  {formattedEncrypted}
                </div>
                <p className="text-sm text-foreground/60 mt-2">
                  {settings.language === 'tl'
                    ? `Haba: ${CHAPTER2_ENCRYPTED.length} mga letra`
                    : `Length: ${CHAPTER2_ENCRYPTED.length} letters`}
                </p>
              </div>

              {/* Keyword Input */}
              <div className="bg-background/80 backdrop-blur-sm border-2 border-purple/30 rounded-xl p-6">
                <h2 className="font-dramatic text-2xl text-purple mb-4">
                  {settings.language === 'tl' ? 'Ilagay ang Keyword' : 'Enter Keyword'}
                </h2>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value.toUpperCase())}
                  placeholder={settings.language === 'tl' ? 'Ilagay ang keyword dito' : 'Enter keyword here'}
                  className="w-full bg-background border-2 border-purple/50 rounded-lg px-4 py-3 font-mono text-2xl text-gold focus:outline-none focus:border-gold transition-colors uppercase"
                  autoComplete="off"
                />

                {keyword && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4"
                  >
                    <p className="text-sm text-foreground/60 mb-2">
                      {settings.language === 'tl' ? 'Mga Shift Values:' : 'Shift Values:'}
                    </p>
                    <div className="font-mono text-sm text-purple bg-background/50 p-3 rounded border border-purple/20">
                      {keyword.split('').map((char, idx) => {
                        const shift = char.charCodeAt(0) - 'A'.charCodeAt(0);
                        return (
                          <span key={idx} className="inline-block mr-3">
                            {char}={shift}
                          </span>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Manual Decryption Input */}
              <div className="bg-background/80 backdrop-blur-sm border-2 border-green-500/30 rounded-xl p-6">
                <h2 className="font-dramatic text-2xl text-green-400 mb-4">
                  {settings.language === 'tl' ? 'I-type ang Iyong Sagot' : 'Type Your Decrypted Answer'}
                </h2>
                <textarea
                  value={userDecryptedText}
                  onChange={(e) => setUserDecryptedText(e.target.value.toUpperCase())}
                  placeholder={settings.language === 'tl' ? 'I-type ang decrypted message dito...' : 'Type the decrypted message here...'}
                  className="w-full bg-background border-2 border-green-500/50 rounded-lg px-4 py-3 font-mono text-lg text-green-300 focus:outline-none focus:border-gold transition-colors uppercase min-h-[120px] resize-none"
                  autoComplete="off"
                />
                <p className="text-sm text-foreground/60 mt-2">
                  {settings.language === 'tl'
                    ? 'Gamitin ang keyword at Vigenère square para i-decrypt ang mensahe'
                    : 'Use the keyword and Vigenère square to decrypt the message'}
                </p>

                <Button
                  onClick={handleCheck}
                  variant="primary"
                  className="w-full mt-4"
                  disabled={!userDecryptedText || !keyword}
                >
                  {settings.language === 'tl' ? 'Suriin ang Solusyon' : 'Check Solution'}
                </Button>
              </div>
            </div>

            {/* Right Column: Tools & Hints */}
            <div className="space-y-6">
              {/* Vigenère Square Toggle */}
              <div className="bg-background/80 backdrop-blur-sm border-2 border-brass/30 rounded-xl p-6">
                <Button
                  onClick={() => setShowSquare(!showSquare)}
                  variant="secondary"
                  className="w-full mb-4"
                >
                  {showSquare
                    ? (settings.language === 'tl' ? 'Itago ang Square' : 'Hide Square')
                    : (settings.language === 'tl' ? 'Ipakita ang Vigenère Square' : 'Show Vigenère Square')}
                </Button>

                <AnimatePresence>
                  {showSquare && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-x-auto"
                    >
                      <div className="font-mono text-xs">
                        <div className="mb-2 flex">
                          <div className="w-8"></div>
                          {Array.from({ length: 26 }, (_, i) => (
                            <div key={i} className="w-6 text-center text-gold">
                              {String.fromCharCode(65 + i)}
                            </div>
                          ))}
                        </div>
                        {vigenereSquare.map((row, rowIdx) => (
                          <div key={rowIdx} className="flex">
                            <div className="w-8 text-sunset font-bold">
                              {String.fromCharCode(65 + rowIdx)}
                            </div>
                            {row.map((char, colIdx) => (
                              <div
                                key={colIdx}
                                className="w-6 text-center text-foreground/60 hover:text-gold hover:bg-gold/10 transition-colors cursor-default"
                              >
                                {char}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hint System */}
              <AnimatePresence>
                {showHint && !solved && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-gradient-to-br from-gold/20 to-sunset/20 border-2 border-gold/50 rounded-xl p-6"
                  >
                    <h3 className="font-dramatic text-xl text-gold mb-3 flex items-center">
                      💡 {settings.language === 'tl' ? 'Pahiwatig' : 'Hint'}
                    </h3>
                    <div className="space-y-2 text-sm text-foreground/90">
                      <p>
                        {settings.language === 'tl'
                          ? '• Tingnan ang salitang nakasulat sa dingding sa likod ni Bonifacio'
                          : '• Look at the word written on the wall behind Bonifacio'}
                      </p>
                      <p>
                        {settings.language === 'tl'
                          ? '• Ang keyword ay: KALAYAAN'
                          : '• The keyword is: KALAYAAN'}
                      </p>
                      <p className="text-gold font-bold">
                        KALAYAAN
                      </p>
                      <p className="text-xs text-foreground/70 mt-3">
                        {settings.language === 'tl'
                          ? '• Gamit ang Vigenère square, hanapin ang intersection ng encrypted letter at keyword letter'
                          : '• Using the Vigenère square, find the intersection of the encrypted letter and keyword letter'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Historical Context */}
              <div className="bg-background/60 border border-foreground/20 rounded-xl p-6">
                <h3 className="font-dramatic text-lg text-brass mb-3">
                  {settings.language === 'tl' ? 'Kasaysayan' : 'Historical Context'}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {settings.language === 'tl'
                    ? 'Ang Katipunan ay gumamit ng mga coded message para sa kanilang mga lihim na komunikasyon. Ang Vigenère cipher ay ginamit ng mga rebolusyonaryo sa buong mundo dahil mas mahirap itong basahin kaysa sa simple shift ciphers.'
                    : 'The Katipunan used coded messages for their secret communications. The Vigenère cipher was used by revolutionaries worldwide because it\'s much harder to break than simple shift ciphers.'}
                </p>
              </div>
            </div>
          </div>

          {/* Success State */}
          <AnimatePresence>
            {solved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="max-w-2xl w-full bg-gradient-to-br from-gold/20 to-green-500/20 border-2 border-gold rounded-xl p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="text-8xl mb-6"
                  >
                    ✓
                  </motion.div>

                  <h2 className="font-display text-5xl text-gold mb-6">
                    {settings.language === 'tl' ? 'Tagumpay!' : 'Success!'}
                  </h2>

                  <div className="font-dramatic text-2xl text-foreground/90 mb-8">
                    "{CHAPTER2_SOLUTION_FORMATTED}"
                  </div>

                  <p className="font-body text-lg text-foreground/80">
                    {settings.language === 'tl'
                      ? 'Nag-unlock ka ng Vigenère Cipher! Ang amulet ay lilipat ka sa susunod na panahon...'
                      : "You've unlocked the Vigenère Cipher! The amulet will transport you to the next time period..."}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Feedback overlay */}
          <AnimatePresence>
            {showError && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="max-w-md bg-gradient-to-br from-red-900/90 to-background/90 border-2 border-red-500/50 rounded-xl p-8 text-center"
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      rotate: [0, -10, 10, -10, 0],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    ❌
                  </motion.div>

                  <h2 className="font-display text-3xl text-red-400 mb-4">
                    {settings.language === 'tl' ? 'Mali' : 'Incorrect'}
                  </h2>

                  <p className="font-body text-foreground/90 text-lg mb-2">
                    {settings.language === 'tl'
                      ? 'Ang iyong sagot ay hindi tama.'
                      : 'Your answer is not correct.'
                    }
                  </p>

                  <p className="font-body text-foreground/70 text-sm">
                    {settings.language === 'tl'
                      ? 'Subukan muli. Gamitin ang keyword at Vigenère square.'
                      : 'Try again. Use the keyword and Vigenère square.'
                    }
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Attempt Counter */}
          {attempts > 0 && !solved && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-foreground/50 text-sm mt-4"
            >
              {settings.language === 'tl' ? 'Mga Pagsubok:' : 'Attempts:'} {attempts}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
