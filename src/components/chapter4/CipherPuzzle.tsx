'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';
import {
  visualizeRailFence,
  CHAPTER4_ENCRYPTED,
  CHAPTER4_RAILS,
  CHAPTER4_SOLUTION,
  CHAPTER4_SOLUTION_FORMATTED,
} from '@/lib/ciphers/railfence';

interface CipherPuzzleProps {
  onComplete: () => void;
}

export function CipherPuzzle({ onComplete }: CipherPuzzleProps) {
  const { settings, unlockCipher } = useGameStore();
  const [showTutorial, setShowTutorial] = useState(true);
  const [userDecryptedText, setUserDecryptedText] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);
  const [solved, setSolved] = useState(false);
  const [showError, setShowError] = useState(false);

  // Interactive visualization controls
  const [customRails, setCustomRails] = useState(CHAPTER4_RAILS);
  const [customText, setCustomText] = useState(CHAPTER4_ENCRYPTED);

  const handleCheck = () => {
    const cleanUserInput = userDecryptedText.replace(/\s/g, '').toUpperCase();
    const cleanSolutionWithSpaces = CHAPTER4_SOLUTION_FORMATTED.replace(/\s/g, '').toUpperCase();
    const cleanSolutionWithoutSpaces = CHAPTER4_SOLUTION.replace(/\s/g, '').toUpperCase();

    // Accept both versions
    if (cleanUserInput === cleanSolutionWithSpaces || cleanUserInput === cleanSolutionWithoutSpaces) {
      setSolved(true);
      unlockCipher('railfence');
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
          src="/assets/images/backgrounds/chapter4_bg2.jpg"
          alt="Underground resistance headquarters 1983"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
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
                className="max-w-4xl w-full bg-gradient-to-br from-background to-gray-900/20 border-2 border-gold/50 rounded-xl p-8 max-h-[90vh] overflow-y-auto"
              >
                <h2 className="font-display text-4xl text-gold mb-6 text-center">
                  {settings.language === 'tl' ? 'Ang Rail Fence Cipher' : 'The Rail Fence Cipher'}
                </h2>

                <div className="font-body text-foreground/90 space-y-4 mb-6">
                  <p>
                    {settings.language === 'tl'
                      ? 'Ang Rail Fence cipher ay isang transposition cipher na nag-aayos ng mga letra sa zigzag pattern. Ginagamit ito ng resistance movements para sa mabilis na encryption.'
                      : 'The Rail Fence cipher is a transposition cipher that rearranges letters in a zigzag pattern. Used by resistance movements for quick encryption.'}
                  </p>

                  <div className="bg-background/50 border border-gold/30 rounded-lg p-4">
                    <h3 className="font-dramatic text-xl text-sunset mb-2">
                      {settings.language === 'tl' ? 'Paano Gumagana:' : 'How it works:'}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>
                        {settings.language === 'tl'
                          ? 'Isulat ang mensahe sa zigzag pattern na may N "rails" (linya)'
                          : 'Write message in zigzag across N "rails" (rows)'}
                      </li>
                      <li>
                        {settings.language === 'tl'
                          ? 'Basahin ang bawat rail mula kaliwa pakanan upang gumawa ng ciphertext'
                          : 'Read each rail left-to-right to create ciphertext'}
                      </li>
                      <li>
                        {settings.language === 'tl'
                          ? 'Para i-decrypt: baliktarin ang proseso'
                          : 'To decrypt: reverse the process'}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/20 border border-sunset/30 rounded-lg p-4">
                    <h3 className="font-dramatic text-xl text-gold mb-2">
                      {settings.language === 'tl' ? 'Halimbawa (3 Rails):' : 'Example (3 Rails):'}
                    </h3>
                    <div className="font-mono text-xs space-y-1 whitespace-pre-wrap overflow-x-auto">
                      <p className="text-foreground/80">Message: &quot;WE ARE FOUND&quot;</p>
                      <p className="text-gold">Rail 1: W . . . R . . . U . .</p>
                      <p className="text-purple">Rail 2: . E . A . E . O . N .</p>
                      <p className="text-sunset">Rail 3: . . A . . . F . . . D</p>
                      <p className="text-green-400 mt-2">Encrypted: WRAU + EAEON + AFD</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/70">
                    {settings.language === 'tl'
                      ? 'Para sa puzzle na ito: 3 rails, zigzag pattern. I-type ang iyong sagot.'
                      : 'For this puzzle: 3 rails, zigzag pattern. Type your answer.'}
                  </p>
                </div>

                <Button onClick={() => setShowTutorial(false)} variant="primary" className="w-full">
                  {settings.language === 'tl' ? 'Simulan ang Puzzle' : 'Begin Puzzle'}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Puzzle Interface */}
        <div className="max-w-6xl mx-auto pt-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="font-display text-5xl text-gold mb-4">
              {settings.language === 'tl' ? 'I-decrypt ang Mensahe' : 'Decrypt the Message'}
            </h1>
            <motion.p
              className="text-red-400 text-sm font-body"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {settings.language === 'tl'
                ? '⚠️ Ang buhay ng mga estudyante ay nakasalalay dito!'
                : '⚠️ The lives of students depend on this!'}
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Left Column: Encrypted Message & Input */}
            <div className="space-y-6">
              {/* Encrypted Message */}
              <div className="bg-background/80 backdrop-blur-sm border-2 border-gold/30 rounded-xl p-6">
                <h2 className="font-dramatic text-2xl text-sunset mb-4">
                  {settings.language === 'tl' ? 'Intercepted na Mensahe' : 'Intercepted Message'}
                </h2>
                <div className="font-mono text-2xl text-gold break-all leading-relaxed bg-background/50 p-4 rounded-lg border border-gold/20">
                  {CHAPTER4_ENCRYPTED}
                </div>
                <p className="text-sm text-foreground/60 mt-2">
                  {settings.language === 'tl'
                    ? `${CHAPTER4_ENCRYPTED.length} mga letra | ${CHAPTER4_RAILS} rails`
                    : `${CHAPTER4_ENCRYPTED.length} letters | ${CHAPTER4_RAILS} rails`}
                </p>
              </div>

              {/* Manual Decryption Input */}
              <div className="bg-background/80 backdrop-blur-sm border-2 border-green-500/30 rounded-xl p-6">
                <h2 className="font-dramatic text-2xl text-green-400 mb-4">
                  {settings.language === 'tl' ? 'I-type ang Iyong Sagot' : 'Type Your Decrypted Answer'}
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
                    ? 'Gamitin ang 3 rails zigzag pattern para i-decrypt'
                    : 'Use the 3 rails zigzag pattern to decrypt'}
                </p>

                <Button onClick={handleCheck} variant="primary" className="w-full mt-4" disabled={!userDecryptedText}>
                  {settings.language === 'tl' ? 'Suriin ang Solusyon' : 'Check Solution'}
                </Button>
              </div>
            </div>

            {/* Right Column: Visualization & Hints */}
            <div className="space-y-6">
              {/* Interactive Zigzag Visualization */}
              <div className="bg-background/80 backdrop-blur-sm border-2 border-brass/30 rounded-xl p-6">
                <Button
                  onClick={() => setShowVisualization(!showVisualization)}
                  variant="secondary"
                  className="w-full mb-4"
                >
                  {showVisualization
                    ? settings.language === 'tl'
                      ? 'Itago ang Zigzag Pattern'
                      : 'Hide Zigzag Pattern'
                    : settings.language === 'tl'
                      ? 'Ipakita ang Zigzag Pattern'
                      : 'Show Zigzag Pattern'}
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
                            {settings.language === 'tl' ? 'Bilang ng Rails (Hanay)' : 'Number of Rails (Rows)'}
                          </label>
                          <div className="flex items-center gap-4">
                            <input
                              type="range"
                              min="2"
                              max="5"
                              value={customRails}
                              onChange={(e) => setCustomRails(Number(e.target.value))}
                              className="flex-1 h-2 bg-background border border-gold/30 rounded-lg appearance-none cursor-pointer"
                              style={{
                                accentColor: 'var(--color-gold)',
                              }}
                            />
                            <span className="font-mono text-2xl text-gold w-12 text-center font-bold">
                              {customRails}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-dramatic text-purple mb-2">
                            {settings.language === 'tl'
                              ? 'Text para Visualize (o gamitin ang encrypted message)'
                              : 'Text to Visualize (or use the encrypted message)'}
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
                              onClick={() => setCustomText(CHAPTER4_ENCRYPTED)}
                              className="text-xs px-3 py-1 bg-brass/20 hover:bg-brass/30 border border-brass/30 rounded transition-colors text-brass"
                            >
                              {settings.language === 'tl' ? 'Gamitin ang Puzzle Text' : 'Use Puzzle Text'}
                            </button>
                            <button
                              onClick={() => {
                                setCustomRails(CHAPTER4_RAILS);
                                setCustomText(CHAPTER4_ENCRYPTED);
                              }}
                              className="text-xs px-3 py-1 bg-gold/20 hover:bg-gold/30 border border-gold/30 rounded transition-colors text-gold"
                            >
                              {settings.language === 'tl' ? 'I-reset' : 'Reset'}
                            </button>
                          </div>
                        </div>

                        {/* Info Display */}
                        <div className="flex gap-4 text-xs text-foreground/60">
                          <div>
                            <span className="text-foreground/80 font-semibold">
                              {settings.language === 'tl' ? 'Bilang ng Letra:' : 'Total Letters:'}
                            </span>{' '}
                            {customText.replace(/\s/g, '').length}
                          </div>
                          <div>
                            <span className="text-foreground/80 font-semibold">
                              {settings.language === 'tl' ? 'Bilang ng Columns:' : 'Total Columns:'}
                            </span>{' '}
                            {customText.replace(/\s/g, '').length}
                          </div>
                        </div>
                      </div>

                      {/* Pattern Visualization */}
                      <div className="overflow-x-auto">
                        <pre className="font-mono text-xs text-foreground/80 whitespace-pre-wrap bg-background/50 p-4 rounded border border-brass/20">
                          {visualizeRailFence(customText, customRails)}
                        </pre>
                        <p className="text-xs text-foreground/60 mt-2">
                          {settings.language === 'tl'
                            ? 'Basahin ang zigzag pattern upang makuha ang decrypted message'
                            : 'Read the zigzag pattern to get the decrypted message'}
                        </p>
                      </div>

                      {/* Helper Guide */}
                      <div className="bg-sunset/10 border border-sunset/30 rounded-lg p-3">
                        <p className="text-xs text-foreground/70 leading-relaxed">
                          <span className="text-sunset font-semibold">
                            {settings.language === 'tl' ? '💡 Gabay:' : '💡 Guide:'}
                          </span>{' '}
                          {settings.language === 'tl'
                            ? 'Ayusin ang bilang ng rails hanggang sa makita mo ang tamang pattern. Basahin ang mga letra mula itaas pababa sa bawat hanay, sundin ang zigzag.'
                            : 'Adjust the number of rails until you see the correct pattern. Read the letters top to bottom on each row, following the zigzag.'}
                        </p>
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
                          ? '• Gamitin ang 3 rails: hatiin ang encrypted text sa tatlong grupo'
                          : '• Use 3 rails: divide the encrypted text into three groups'}
                      </p>
                      <p>
                        {settings.language === 'tl'
                          ? '• Basahin ang pattern: taas → baba → taas → baba (zigzag)'
                          : '• Read the pattern: up → down → up → down (zigzag)'}
                      </p>
                      <p className="text-xs text-foreground/70 mt-3">
                        {settings.language === 'tl'
                          ? '• Ang mensahe ay tungkol sa hinaharap—1986, EDSA'
                          : '• The message is about the future—1986, EDSA'}
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
                    ? 'Ang student activists noong Martial Law ay gumamit ng mga cipher para sa kanilang lihim na komunikasyon. Maraming estudyante ang "salvaged" o pinatay ng rehimen. Ang Rail Fence ay simple pero epektibo para sa mabilis na mensahe.'
                    : 'Student activists during Martial Law used ciphers for their secret communications. Many students were "salvaged" or killed by the regime. The Rail Fence is simple but effective for quick messages.'}
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

                  <div className="font-dramatic text-2xl text-foreground/90 mb-8">&quot;{CHAPTER4_SOLUTION_FORMATTED}&quot;</div>

                  <p className="font-body text-lg text-foreground/80">
                    {settings.language === 'tl'
                      ? 'Nag-unlock ka ng Rail Fence Cipher! Ang propesiya tungkol sa People Power...'
                      : "You've unlocked the Rail Fence Cipher! The prophecy about People Power..."}
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
                      ? 'Subukan muli. Gamitin ang 3 rails zigzag pattern.'
                      : 'Try again. Use the 3 rails zigzag pattern.'
                    }
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Attempt Counter */}
          {attempts > 0 && !solved && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-foreground/50 text-sm mt-4">
              {settings.language === 'tl' ? 'Mga Pagsubok:' : 'Attempts:'} {attempts}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
