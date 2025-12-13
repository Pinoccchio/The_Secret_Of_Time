'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';

interface PhoneCallProps {
  onComplete: () => void;
}

export function PhoneCall({ onComplete }: PhoneCallProps) {
  const [isRinging, setIsRinging] = useState(true);
  const [callAnswered, setCallAnswered] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [showChoices, setShowChoices] = useState(false);

  const { settings, addChoice } = useGameStore();

  const dialogueLines = [
    {
      en: "Apo... is that you?",
      tl: "Apo... ikaw ba iyan?",
    },
    {
      en: "I need you to come home. There's something important I must give you before... before it's too late.",
      tl: "Kailangan mong umuwi. May importante akong ibibigay sa'yo bago... bago huli na ang lahat.",
    },
    {
      en: "It's about our family's secret. The one I've been keeping all these years.",
      tl: "Tungkol ito sa lihim ng ating pamilya. Ang lihim na matagal ko nang itinago.",
    },
    {
      en: "Please, come to the ancestral house. Look for the old baúl in my room.",
      tl: "Pakiusap, pumunta ka sa lumang bahay. Hanapin mo ang lumang baúl sa aking silid.",
    },
  ];

  useEffect(() => {
    // Phone rings for 3 seconds
    const ringTimer = setTimeout(() => {
      setIsRinging(false);
    }, 3000);

    return () => clearTimeout(ringTimer);
  }, []);

  const handleAnswerCall = () => {
    setCallAnswered(true);
    setTimeout(() => {
      setShowDialogue(true);
    }, 500);
  };

  const handleNextDialogue = () => {
    if (currentDialogue < dialogueLines.length - 1) {
      setCurrentDialogue(currentDialogue + 1);
    } else {
      setShowDialogue(false);
      setShowChoices(true);
    }
  };

  const handleChoice = (choice: 'now' | 'morning') => {
    addChoice('prologue-timing', choice);
    // Brief pause before transitioning
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const currentText = settings.language === 'tl'
    ? dialogueLines[currentDialogue].tl
    : dialogueLines[currentDialogue].en;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background-gradient-end">
      <AnimatePresence mode="wait">
        {/* Phone Ringing Animation */}
        {isRinging && !callAnswered && (
          <motion.div
            key="ringing"
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-8 relative"
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.05, 1, 1.05, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="absolute inset-0 bg-gold rounded-full opacity-20 animate-ping" />
              <svg
                className="w-full h-full text-gold"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
            </motion.div>

            <motion.h2
              className="font-display text-3xl text-gold mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Incoming Call
            </motion.h2>

            <p className="font-body text-foreground/80 text-xl mb-8">
              Lola Maria
            </p>

            <Button
              onClick={handleAnswerCall}
              variant="primary"
              size="lg"
              glow={true}
            >
              Answer Call
            </Button>
          </motion.div>
        )}

        {/* Call Answered - Dialogue */}
        {callAnswered && showDialogue && (
          <motion.div
            key="dialogue"
            className="max-w-3xl w-full px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Character Portrait Placeholder */}
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-full border-4 border-gold/50 overflow-hidden bg-background/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
            >
              <div className="w-full h-full flex items-center justify-center text-6xl">
                👵
              </div>
            </motion.div>

            {/* Dialogue Box */}
            <div className="bg-background/90 backdrop-blur-md border-2 border-gold/50 rounded-xl p-8 mb-6">
              <p className="font-display text-gold text-sm mb-2 tracking-wide">
                LOLA MARIA
              </p>

              <div className="font-body text-foreground text-lg leading-relaxed min-h-[120px]">
                <TypeAnimation
                  sequence={[currentText]}
                  wrapper="span"
                  speed={settings.textSpeed}
                  cursor={false}
                />
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleNextDialogue}
                variant="ghost"
                size="md"
              >
                {currentDialogue < dialogueLines.length - 1 ? 'Continue' : 'Next'}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Choice Menu */}
        {showChoices && (
          <motion.div
            key="choices"
            className="max-w-2xl w-full px-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <h2 className="font-display text-3xl text-gold mb-4">
              What will you do?
            </h2>

            <p className="font-body text-foreground/80 text-lg mb-8">
              Your lola sounds worried. This must be important.
            </p>

            <div className="space-y-4">
              <Button
                onClick={() => handleChoice('now')}
                variant="primary"
                size="lg"
                glow={true}
                className="w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Go to the ancestral house now
                </span>
              </Button>

              <Button
                onClick={() => handleChoice('morning')}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Wait until morning
              </Button>
            </div>

            <p className="font-body text-brass/70 text-sm mt-6 italic">
              {settings.language === 'tl'
                ? '"Ang mga desisyon ay may kaakibat na kahihinatnan..."'
                : '"Every choice has consequences..."'
              }
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
