'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';
import {
  columnarTranspositionDecrypt,
  getColumnarTranspositionGrid,
  visualizeColumnarTransposition,
  CHAPTER5_ENCRYPTED,
  CHAPTER5_KEYWORD,
  CHAPTER5_PLAINTEXT,
  CHAPTER5_PLAINTEXT_FORMATTED,
} from '@/lib/ciphers/columnarTransposition';

interface CipherPuzzleProps {
  onComplete: () => void;
}

export function CipherPuzzle({ onComplete }: CipherPuzzleProps) {
  const [keyword, setKeyword] = useState('');
  const [userDecryptedText, setUserDecryptedText] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);

  // Interactive visualization controls
  const [customKeyword, setCustomKeyword] = useState(CHAPTER5_KEYWORD);
  const [customText, setCustomText] = useState(CHAPTER5_ENCRYPTED);

  const { settings, unlockCipher } = useGameStore();

  const decryptedMessage = keyword.length >= 2
    ? columnarTranspositionDecrypt(CHAPTER5_ENCRYPTED, keyword)
    : '';

  const isAnswerCorrect = (keyword.toUpperCase() === CHAPTER5_KEYWORD &&
    decryptedMessage.replace(/\s/g, '') === CHAPTER5_PLAINTEXT) ||
    userDecryptedText.replace(/\s/g, '').toUpperCase() === CHAPTER5_PLAINTEXT;

  const handleSubmit = () => {
    setAttempts(attempts + 1);

    if (isAnswerCorrect) {
      setIsCorrect(true);
      unlockCipher('columnar');
      setTimeout(() => {
        onComplete();
      }, 3000);
    } else {
      if (attempts >= 1 && !showHint) {
        setShowHint(true);
      }
    }
  };

  // Get grid visualization for custom inputs
  const customGridData = customKeyword.length >= 2 && customText.length > 0
    ? getColumnarTranspositionGrid(customText, customKeyword)
    : null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgrounds/chapter5_bg.jpeg"
          alt="EDSA People Power Revolution 1986"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold/20 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        {/* Tutorial Overlay */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="max-w-3xl bg-gradient-to-br from-background to-gray-900/20 border-2 border-gold/50 rounded-xl p-8 max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
              >
                <h2 className="font-display text-4xl text-gold mb-6 text-center">
                  {settings.language === 'tl' ? 'Ang Columnar Transposition Cipher' : 'The Columnar Transposition Cipher'}
                </h2>

                <div className="font-body text-foreground/90 space-y-4 mb-6">
                  <p>
                    {settings.language === 'tl'
                      ? 'Ang Columnar Transposition cipher ay isang transposition cipher na nag-aayos ng mga letra base sa isang keyword. Ginagamit ito para sa mas secure na encryption kaysa simple ciphers.'
                      : 'The Columnar Transposition cipher is a transposition cipher that rearranges letters based on a keyword. Used for more secure encryption than simple ciphers.'
                    }
                  </p>

                  <div className="bg-background/50 border border-gold/30 rounded-lg p-4">
                    <h3 className="font-dramatic text-xl text-sunset mb-2">
                      {settings.language === 'tl' ? 'Paano Gumagana:' : 'How it works:'}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>
                        {settings.language === 'tl'
                          ? 'Pumili ng keyword (halimbawa: "EDSA")'
                          : 'Choose a keyword (example: "EDSA")'}
                      </li>
                      <li>
                        {settings.language === 'tl'
                          ? 'Isulat ang mensahe sa grid na may haba ng keyword'
                          : 'Write message in grid with width of keyword length'}
                      </li>
                      <li>
                        {settings.language === 'tl'
                          ? 'I-sort ang keyword alphabetically para makuha ang order ng columns'
                          : 'Sort keyword alphabetically to get column reading order'}
                      </li>
                      <li>
                        {settings.language === 'tl'
                          ? 'Basahin ang mga columns ayon sa sorted order'
                          : 'Read columns in sorted order'}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/20 border border-sunset/30 rounded-lg p-4">
                    <h3 className="font-dramatic text-xl text-gold mb-2">
                      {settings.language === 'tl' ? 'Halimbawa:' : 'Example:'}
                    </h3>
                    <div className="font-mono text-xs space-y-1 overflow-x-auto">
                      <p className="text-foreground/80">Keyword: &quot;EDSA&quot; → Alphabetical Order: A(0) D(1) E(2) S(3)</p>
                      <p className="text-foreground/80">Message: &quot;HELLO&quot;</p>
                      <div className="text-gold mt-2">
                        <p>E D S A</p>
                        <p>H E L L</p>
                        <p>O X X X</p>
                      </div>
                      <p className="text-green-400 mt-2">Read A→D→E→S: &quot;LX&quot; + &quot;EX&quot; + &quot;HO&quot; + &quot;LX&quot;</p>
                      <p className="text-green-400">Encrypted: &quot;LXEXHOLX&quot;</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/70">
                    {settings.language === 'tl'
                      ? 'Hanapin ang tamang keyword upang i-decrypt ang mensahe ni Maria. Gumamit ng interactive tool para mag-experiment!'
                      : 'Find the correct keyword to decrypt Maria\'s message. Use the interactive tool to experiment!'
                    }
                  </p>
                </div>

                <Button onClick={() => setShowTutorial(false)} variant="primary" className="w-full">
                  {settings.language === 'tl' ? 'Simulan ang Puzzle' : 'Begin Puzzle'}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success overlay */}
        <AnimatePresence>
          {isCorrect && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="max-w-2xl w-full bg-gradient-to-br from-gold/20 to-green-500/20 border-2 border-gold rounded-xl p-8 text-center"
                initial={{ scale: 0.5, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 0.8 }}
              >
                <motion.div
                  className="text-8xl mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  ✨
                </motion.div>

                <h2 className="font-display text-5xl text-gold mb-6">
                  {settings.language === 'tl' ? 'Tagumpay!' : 'Success!'}
                </h2>

                <div className="font-dramatic text-2xl text-foreground/90 mb-8">
                  &quot;{CHAPTER5_PLAINTEXT_FORMATTED}&quot;
                </div>

                <p className="font-body text-lg text-foreground/80">
                  {settings.language === 'tl'
                    ? 'Nag-unlock ka ng Columnar Transposition Cipher! Ang katotohanan ay natuklasan...'
                    : "You've unlocked the Columnar Transposition Cipher! The truth has been revealed..."}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-display text-5xl text-gold mb-4">
            {settings.language === 'tl' ? 'I-decrypt ang Mensahe' : 'Decrypt the Message'}
          </h1>
          <p className="font-body text-foreground/80 text-lg">
            {settings.language === 'tl'
              ? 'Hanapin ang tamang keyword upang malaman ang katotohanan ni Maria'
              : 'Find the correct keyword to learn Maria\'s truth'
            }
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Left Column: Encrypted Message & Input */}
          <div className="space-y-6">
            {/* Encrypted Message */}
            <div className="bg-background/80 backdrop-blur-sm border-2 border-brass/30 rounded-xl p-6">
              <h2 className="font-dramatic text-2xl text-brass mb-4">
                {settings.language === 'tl' ? 'Mensahe ni Maria' : 'Maria\'s Message'}
              </h2>
              <div className="font-mono text-2xl text-brass break-all leading-relaxed bg-background/50 p-4 rounded-lg border border-brass/20">
                {CHAPTER5_ENCRYPTED}
              </div>
              <p className="text-sm text-foreground/60 mt-2">
                {settings.language === 'tl'
                  ? `${CHAPTER5_ENCRYPTED.length} mga letra | Hanapin ang keyword`
                  : `${CHAPTER5_ENCRYPTED.length} letters | Find the keyword`}
              </p>
            </div>

            {/* Keyword Input */}
            <div className="bg-background/80 backdrop-blur-sm border-2 border-gold/30 rounded-xl p-6">
              <h2 className="font-dramatic text-2xl text-gold mb-4">
                {settings.language === 'tl' ? 'Ipasok ang Keyword' : 'Enter Keyword'}
              </h2>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value.toUpperCase())}
                placeholder={settings.language === 'tl' ? 'Keyword...' : 'Keyword...'}
                className="w-full bg-background border-2 border-gold/50 rounded-lg px-4 py-3 font-mono text-2xl text-gold focus:outline-none focus:border-gold transition-colors uppercase text-center tracking-widest"
                maxLength={10}
                autoComplete="off"
              />
              <p className="text-sm text-foreground/60 mt-2">
                {settings.language === 'tl'
                  ? 'Subukan ang mga salita na may kaugnayan sa People Power Revolution'
                  : 'Try words related to the People Power Revolution'
                }
              </p>
            </div>

            {/* Decrypted Text Input */}
            <div className="bg-background/80 backdrop-blur-sm border-2 border-green-500/30 rounded-xl p-6">
              <h2 className="font-dramatic text-2xl text-green-400 mb-4">
                {settings.language === 'tl' ? 'I-type ang Decrypted Message' : 'Type Decrypted Message'}
              </h2>
              <textarea
                value={userDecryptedText}
                onChange={(e) => setUserDecryptedText(e.target.value.toUpperCase())}
                placeholder={
                  settings.language === 'tl'
                    ? 'I-type ang decrypted message dito...'
                    : 'Type the decrypted message here...'
                }
                className="w-full bg-background border-2 border-green-500/50 rounded-lg px-4 py-3 font-mono text-lg text-green-300 focus:outline-none focus:border-gold transition-colors uppercase min-h-[120px] resize-none"
                autoComplete="off"
              />
              <p className="text-sm text-foreground/60 mt-2">
                {settings.language === 'tl'
                  ? 'Gamitin ang keyword para i-decrypt o subukan nang manu-mano'
                  : 'Use the keyword to decrypt or try manually'}
              </p>

              {/* Auto-fill from keyword preview */}
              {keyword.length >= 2 && decryptedMessage && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setUserDecryptedText(decryptedMessage)}
                  className="mt-3 text-xs px-3 py-1 bg-purple/20 hover:bg-purple/30 border border-purple/30 rounded transition-colors text-purple"
                >
                  {settings.language === 'tl'
                    ? '📋 I-copy ang decrypted result mula sa keyword'
                    : '📋 Copy decrypted result from keyword'}
                </motion.button>
              )}

              <Button
                onClick={handleSubmit}
                variant="primary"
                className="w-full mt-4"
                disabled={isCorrect || userDecryptedText.length < 5}
              >
                {isAnswerCorrect
                  ? settings.language === 'tl' ? '✓ Tama!' : '✓ Correct!'
                  : settings.language === 'tl' ? 'Suriin ang Solusyon' : 'Check Solution'
                }
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Visualization & Hints */}
          <div className="space-y-6">
            {/* Interactive Visualization Tool */}
            <div className="bg-background/80 backdrop-blur-sm border-2 border-brass/30 rounded-xl p-6">
              <Button
                onClick={() => setShowVisualization(!showVisualization)}
                variant="secondary"
                className="w-full mb-4"
              >
                {showVisualization
                  ? settings.language === 'tl'
                    ? 'Itago ang Interactive Tool'
                    : 'Hide Interactive Tool'
                  : settings.language === 'tl'
                    ? 'Ipakita ang Interactive Tool'
                    : 'Show Interactive Tool'}
              </Button>

              <AnimatePresence>
                {showVisualization && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {/* Interactive Controls */}
                    <div className="bg-background/50 border border-gold/20 rounded-lg p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-dramatic text-gold mb-2">
                          {settings.language === 'tl' ? 'Experiment Keyword' : 'Experiment Keyword'}
                        </label>
                        <input
                          type="text"
                          value={customKeyword}
                          onChange={(e) => setCustomKeyword(e.target.value.toUpperCase())}
                          className="w-full bg-background border-2 border-gold/50 rounded-lg px-3 py-2 font-mono text-sm text-gold focus:outline-none focus:border-gold transition-colors uppercase"
                          placeholder="Try different keywords..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-dramatic text-purple mb-2">
                          {settings.language === 'tl'
                            ? 'Experiment Text (o gamitin ang encrypted message)'
                            : 'Experiment Text (or use the encrypted message)'}
                        </label>
                        <input
                          type="text"
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                          className="w-full bg-background border-2 border-purple/50 rounded-lg px-3 py-2 font-mono text-sm text-purple focus:outline-none focus:border-gold transition-colors uppercase"
                          placeholder="Type text here..."
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => {
                              setCustomText(CHAPTER5_ENCRYPTED);
                              setCustomKeyword(CHAPTER5_KEYWORD);
                            }}
                            className="text-xs px-3 py-1 bg-gold/20 hover:bg-gold/30 border border-gold/30 rounded transition-colors text-gold"
                          >
                            {settings.language === 'tl' ? 'I-reset sa Puzzle' : 'Reset to Puzzle'}
                          </button>
                        </div>
                      </div>

                      {/* Info Display */}
                      <div className="flex gap-4 text-xs text-foreground/60">
                        <div>
                          <span className="text-foreground/80 font-semibold">
                            {settings.language === 'tl' ? 'Keyword Length:' : 'Keyword Length:'}
                          </span>{' '}
                          {customKeyword.length}
                        </div>
                        <div>
                          <span className="text-foreground/80 font-semibold">
                            {settings.language === 'tl' ? 'Text Length:' : 'Text Length:'}
                          </span>{' '}
                          {customText.replace(/\s/g, '').length}
                        </div>
                      </div>
                    </div>

                    {/* Custom Grid Visualization */}
                    {customGridData && (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-background/50 rounded">
                          <thead>
                            <tr>
                              {customGridData.keywordChars.map((char, i) => (
                                <th key={i} className="border border-gold/30 p-2">
                                  <div className="text-center">
                                    <div className="font-mono text-gold font-bold">{char}</div>
                                    <div className="text-xs text-purple mt-1">
                                      ({customGridData.columnOrder[i]})
                                    </div>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {customGridData.grid.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <td
                                    key={cellIndex}
                                    className="border border-gold/30 p-2 text-center font-mono text-foreground/70"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Helper Guide */}
                    <div className="bg-sunset/10 border border-sunset/30 rounded-lg p-3">
                      <p className="text-xs text-foreground/70 leading-relaxed">
                        <span className="text-sunset font-semibold">
                          {settings.language === 'tl' ? '💡 Gabay:' : '💡 Guide:'}
                        </span>{' '}
                        {settings.language === 'tl'
                          ? 'Mag-experiment sa iba\'t ibang keywords. Tingnan kung paano nag-iiba ang column order base sa alphabetical sorting ng keyword.'
                          : 'Experiment with different keywords. See how column order changes based on alphabetical sorting of the keyword.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hint System */}
            <AnimatePresence>
              {showHint && !isCorrect && (
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
                        ? '• Ang keyword ay may 6 na letra'
                        : '• The keyword has 6 letters'}
                    </p>
                    <p>
                      {settings.language === 'tl'
                        ? '• Nagsisimula sa "P" at tungkol sa rebolusyon'
                        : '• Starts with "P" and relates to the revolution'}
                    </p>
                    <p className="text-xs text-foreground/70 mt-3">
                      {settings.language === 'tl'
                        ? '• Isipin: Ano ang tawag sa peaceful revolution? _____ Power'
                        : '• Think: What was this peaceful revolution called? _____ Power'}
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
                  ? 'Ang EDSA Revolution ay isang mapayapang rebolusyon na naganap noong Pebrero 22-25, 1986. Ito ay nag-udyok sa pagbagsak ng diktadurya ni Marcos at nagdulot ng demokratikong pagbabago sa Pilipinas.'
                  : 'The EDSA Revolution was a peaceful revolution that took place on February 22-25, 1986. It led to the downfall of the Marcos dictatorship and brought democratic change to the Philippines.'}
              </p>
            </div>
          </div>
        </div>

        {/* Attempt Counter */}
        {attempts > 0 && !isCorrect && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-foreground/50 text-sm mt-4">
            {settings.language === 'tl' ? 'Mga Pagsubok:' : 'Attempts:'} {attempts}
          </motion.div>
        )}
      </div>
      </div>
    </div>
  );
}
