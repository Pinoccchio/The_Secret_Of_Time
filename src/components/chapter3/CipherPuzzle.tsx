'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';
import {
  generatePlayfairGrid,
  formatPlayfairCiphertext,
  CHAPTER3_ENCRYPTED,
  CHAPTER3_KEYWORD,
  CHAPTER3_SOLUTION,
  CHAPTER3_SOLUTION_FORMATTED,
} from '@/lib/ciphers/playfair';

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
  const [showGrid, setShowGrid] = useState(false);
  const [solved, setSolved] = useState(false);

  const playfairGrid = keyword.length >= 3 ? generatePlayfairGrid(keyword) : null;
  const formattedEncrypted = formatPlayfairCiphertext(CHAPTER3_ENCRYPTED);

  const handleCheck = () => {
    const cleanUserInput = userDecryptedText.replace(/\s/g, '').toUpperCase();
    const cleanSolutionWithX = CHAPTER3_SOLUTION.replace(/\s/g, '').toUpperCase();
    const cleanSolutionWithoutX = CHAPTER3_SOLUTION_FORMATTED.replace(/\s/g, '').toUpperCase();

    // Accept both versions: with X fillers (actual decrypted) or without X fillers (readable)
    if (cleanUserInput === cleanSolutionWithX || cleanUserInput === cleanSolutionWithoutX) {
      setSolved(true);
      unlockCipher('playfair');
      setTimeout(() => {
        onComplete();
      }, 3000);
    } else {
      setAttempts(attempts + 1);
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
          src="/assets/images/backgrounds/chapter3_bg2.png"
          alt="War bunker 1945"
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
        className="absolute inset-0 bg-orange-600/10 z-5"
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
                className="max-w-4xl w-full bg-gradient-to-br from-background to-brown-900/20 border-2 border-gold/50 rounded-xl p-8 max-h-[90vh] overflow-y-auto"
              >
                <h2 className="font-display text-4xl text-gold mb-6 text-center">
                  {settings.language === 'tl' ? 'Ang Playfair Cipher' : 'The Playfair Cipher'}
                </h2>

                <div className="font-body text-foreground/90 space-y-4 mb-6">
                  <p>
                    {settings.language === 'tl'
                      ? 'Ang Playfair cipher ay isang digraph substitution cipher na nag-encrypt ng mga pares ng letra gamit ang 5x5 grid. Ginamit ito sa WWI at WWII para sa tactical communications.'
                      : 'The Playfair cipher is a digraph substitution cipher that encrypts pairs of letters using a 5x5 grid. It was used in WWI and WWII for tactical communications.'}
                  </p>

                  <div className="bg-background/50 border border-gold/30 rounded-lg p-4">
                    <h3 className="font-dramatic text-xl text-sunset mb-2">
                      {settings.language === 'tl' ? 'Paano Gumagana:' : 'How it works:'}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>
                        {settings.language === 'tl'
                          ? 'Gumawa ng 5x5 grid gamit ang keyword (tanggalin ang duplicate letters)'
                          : 'Create a 5x5 grid using a keyword (remove duplicate letters)'}
                      </li>
                      <li>
                        {settings.language === 'tl'
                          ? 'Punan ang natitirang spaces ng hindi pa nagamit na letters (I/J ay magkasama)'
                          : 'Fill remaining spaces with unused alphabet letters (I/J share a space)'}
                      </li>
                      <li>
                        {settings.language === 'tl'
                          ? 'Mag-encrypt ng mga letra sa PAIRS gamit ang specific rules'
                          : 'Encrypt letters in PAIRS using specific rules'}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-brown-900/20 border border-sunset/30 rounded-lg p-4">
                    <h3 className="font-dramatic text-xl text-gold mb-2">
                      {settings.language === 'tl' ? 'Decryption Rules:' : 'Decryption Rules:'}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-gold font-semibold">Same row:</span>{' '}
                        {settings.language === 'tl' ? 'Gumamit ng letra sa KALIWA (wrap around)' : 'Use letter to the LEFT (wrap around)'}
                      </p>
                      <p>
                        <span className="text-purple font-semibold">Same column:</span>{' '}
                        {settings.language === 'tl' ? 'Gumamit ng letra sa ITAAS (wrap around)' : 'Use letter ABOVE (wrap around)'}
                      </p>
                      <p>
                        <span className="text-sunset font-semibold">Rectangle:</span>{' '}
                        {settings.language === 'tl'
                          ? 'Palitan sa opposite corners (same row)'
                          : 'Swap to opposite corners (same row)'}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/70">
                    {settings.language === 'tl'
                      ? 'Gamitin ang keyword BATAAN para gumawa ng grid. I-type mo ang iyong decrypted answer sa kahon.'
                      : 'Use the keyword BATAAN to create the grid. Type your decrypted answer in the box.'}
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
              className="text-orange-400 text-sm font-body"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {settings.language === 'tl'
                ? '⚠️ Ang buhay ng iyong mga kasama ay nakasalalay dito!'
                : '⚠️ The lives of your comrades depend on this!'}
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Left Column: Encrypted Message & Keyword Input */}
            <div className="space-y-6">
              {/* Encrypted Message */}
              <div className="bg-background/80 backdrop-blur-sm border-2 border-gold/30 rounded-xl p-6">
                <h2 className="font-dramatic text-2xl text-sunset mb-4">
                  {settings.language === 'tl' ? 'Intercepted na Mensahe' : 'Intercepted Message'}
                </h2>
                <div className="font-mono text-xl text-gold break-all leading-relaxed bg-background/50 p-4 rounded-lg border border-gold/20">
                  {formattedEncrypted}
                </div>
                <p className="text-sm text-foreground/60 mt-2">
                  {settings.language === 'tl'
                    ? `${CHAPTER3_ENCRYPTED.length} mga letra (${CHAPTER3_ENCRYPTED.length / 2} pairs)`
                    : `${CHAPTER3_ENCRYPTED.length} letters (${CHAPTER3_ENCRYPTED.length / 2} pairs)`}
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

                {keyword && keyword.length >= 3 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                    <Button onClick={() => setShowGrid(!showGrid)} variant="secondary" className="w-full">
                      {showGrid
                        ? settings.language === 'tl'
                          ? 'Itago ang Grid'
                          : 'Hide Grid'
                        : settings.language === 'tl'
                          ? 'Ipakita ang Playfair Grid'
                          : 'Show Playfair Grid'}
                    </Button>
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
                    ? 'Gamitin ang keyword at Playfair grid para i-decrypt ang mensahe'
                    : 'Use the keyword and Playfair grid to decrypt the message'}
                </p>

                <Button onClick={handleCheck} variant="primary" className="w-full mt-4" disabled={!userDecryptedText || !keyword}>
                  {settings.language === 'tl' ? 'Suriin ang Solusyon' : 'Check Solution'}
                </Button>
              </div>
            </div>

            {/* Right Column: Playfair Grid & Hints */}
            <div className="space-y-6">
              {/* Playfair Grid */}
              <AnimatePresence>
                {showGrid && playfairGrid && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-background/80 backdrop-blur-sm border-2 border-brass/30 rounded-xl p-6"
                  >
                    <h3 className="font-dramatic text-xl text-brass mb-4 text-center">
                      {settings.language === 'tl' ? 'Playfair Grid (5x5)' : 'Playfair Grid (5x5)'}
                    </h3>

                    <div className="overflow-x-auto">
                      <div className="inline-block min-w-full">
                        <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
                          {playfairGrid.flat().map((letter, index) => (
                            <div
                              key={index}
                              className="aspect-square flex items-center justify-center bg-brass/20 border border-brass/50 rounded text-brass font-mono text-xl font-bold hover:bg-brass/30 transition-colors"
                            >
                              {letter}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-foreground/60 mt-4 text-center">
                      {settings.language === 'tl'
                        ? 'Tandaan: I at J ay magkakaparehang space'
                        : 'Note: I and J share the same space'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

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
                          ? '• Ang keyword ay BATAAN - ang lokasyon kung saan namatay ang tatay ni Maria'
                          : "• The keyword is BATAAN - the location where Maria's father died"}
                      </p>
                      <p className="text-gold font-bold">BATAAN</p>
                      <p className="text-xs text-foreground/70 mt-3">
                        {settings.language === 'tl'
                          ? '• Hatiin ang encrypted text sa pairs, pagkatapos gumamit ng grid para i-decrypt bawat pair'
                          : '• Split the encrypted text into pairs, then use the grid to decrypt each pair'}
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
                    ? 'Ang Filipino guerrillas ay gumamit ng mga captured Japanese ciphers upang makakuha ng intelligence. Ang Playfair cipher ay ginamit ng mga militar ng iba\'t ibang bansa dahil ito ay mas secure kaysa sa simple substitution ciphers ngunit mas mabilis kaysa sa mas kumplikadong machine ciphers.'
                    : 'Filipino guerrillas used captured Japanese ciphers to gain intelligence. The Playfair cipher was used by militaries worldwide because it was more secure than simple substitution ciphers but faster than complex machine ciphers.'}
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

                  <div className="font-dramatic text-2xl text-foreground/90 mb-8">"{CHAPTER3_SOLUTION_FORMATTED}"</div>

                  <p className="font-body text-lg text-foreground/80">
                    {settings.language === 'tl'
                      ? 'Nag-unlock ka ng Playfair Cipher! Naligtas mo ang buhay ng iyong mga kasama...'
                      : "You've unlocked the Playfair Cipher! You saved the lives of your comrades..."}
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
