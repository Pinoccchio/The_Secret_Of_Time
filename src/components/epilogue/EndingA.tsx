'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';

interface EndingAProps {
  onComplete: () => void;
}

export function EndingA({ onComplete }: EndingAProps) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const { settings } = useGameStore();

  const dialogues = [
    {
      en: 'You decide to share the truth with the world.',
      tl: 'Nagpasya kang ibahagi ang katotohanan sa mundo.',
    },
    {
      en: 'News of the time-traveling amulet spreads quickly. Scientists, historians, and leaders from around the world gather to study it.',
      tl: 'Ang balita tungkol sa agimat ng paglalakbay sa panahon ay mabilis na kumalat. Mga siyentipiko, historyador, at mga lider mula sa buong mundo ay nagtipon upang pag-aralan ito.',
    },
    {
      en: 'With the amulet\'s power, humanity begins to learn from history\'s mistakes. Wars are prevented. Injustices are corrected. Lost knowledge is recovered.',
      tl: 'Sa kapangyarihan ng agimat, nagsimulang matuto ang sangkatauhan mula sa mga pagkakamali ng kasaysayan. Naiwasan ang mga digmaan. Natama ang mga kamalian. Nabawi ang nawala nang kaalaman.',
    },
    {
      en: 'But change comes with a price. The timeline shifts and fractures. Some people remember the old history, others only the new. Reality itself becomes uncertain.',
      tl: 'Ngunit may kapalit ang pagbabago. Ang timeline ay nag-shift at naghiwa-hiwalay. Ang iba ay naaalala ang lumang kasaysayan, ang iba ay ang bago lamang. Ang katotohanan ay naging hindi tiyak.',
    },
    {
      en: 'Your family\'s role as guardians evolves. No longer keepers of a secret, you become guides - teaching the world to use time travel responsibly.',
      tl: 'Ang papel ng iyong pamilya bilang tagapag-alaga ay nag-evolve. Hindi na tagapag-ingat ng lihim, naging gabay kayo - nagtuturo sa mundo kung paano responsableng gumamit ng paglalakbay sa panahon.',
    },
    {
      en: 'Lola Maria, in the present, smiles when she sees the news. "You chose hope over fear," she whispers. "Just as I knew you would."',
      tl: 'Si Lola Maria, sa kasalukuyan, ay ngumiti nang makita niya ang balita. "Pinili mo ang pag-asa sa takot," bulong niya. "Tulad ng alam kong gagawin mo."',
    },
    {
      en: 'The world will never be the same. And neither will you.',
      tl: 'Ang mundo ay hindi na magiging katulad ng dati. At hindi rin ikaw.',
    },
  ];

  const currentText = settings.language === 'tl'
    ? dialogues[dialogueIndex].tl
    : dialogues[dialogueIndex].en;

  const handleNext = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-background to-background" />

      {/* Animated effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-3xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Ending title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-gold text-sm tracking-widest mb-2">
            {settings.language === 'tl' ? 'WAKAS A' : 'ENDING A'}
          </h2>
          <h1 className="font-display text-3xl md:text-4xl text-gold mb-4">
            {settings.language === 'tl' ? 'Ang Mundo ay Nag-iba' : 'The World Changed'}
          </h1>
        </motion.div>

        {/* Story text */}
        <motion.div
          className="bg-background/90 backdrop-blur-md border-2 border-gold/50 rounded-xl p-8 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="font-body text-foreground/90 text-lg leading-relaxed min-h-[150px] text-center">
            <TypeAnimation
              key={dialogueIndex}
              sequence={[currentText]}
              wrapper="div"
              speed={settings.textSpeed === 'slow' ? 40 : settings.textSpeed === 'fast' ? 80 : 60}
              cursor={false}
            />
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="font-body text-brass/60 text-sm">
            {dialogueIndex + 1} / {dialogues.length}
          </div>

          <Button
            onClick={handleNext}
            variant="primary"
            glow={dialogueIndex === dialogues.length - 1}
          >
            {dialogueIndex === dialogues.length - 1
              ? settings.language === 'tl' ? 'Tapos' : 'Finish'
              : settings.language === 'tl' ? 'Susunod' : 'Next'
            }
          </Button>
        </div>

        {/* Final message */}
        {dialogueIndex === dialogues.length - 1 && (
          <motion.div
            className="mt-8 p-6 bg-gold/10 border-2 border-gold/50 rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-display text-gold text-2xl mb-2">
              {settings.language === 'tl' ? 'Salamat sa Paglalakbay' : 'Thank You for Playing'}
            </p>
            <p className="font-body text-foreground/80">
              {settings.language === 'tl'
                ? 'Ikaw ay nagtapos ng "Ang Lihim ng Panahon"'
                : 'You completed "The Secret of Time"'
              }
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
