'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';

interface EndingBProps {
  onComplete: () => void;
}

export function EndingB({ onComplete }: EndingBProps) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const { settings } = useGameStore();

  const dialogues = [
    {
      en: 'You decide to protect the secret, as your ancestors did before you.',
      tl: 'Nagpasya kang protektahan ang lihim, tulad ng ginawa ng iyong mga ninuno.',
    },
    {
      en: 'You return the amulet to Lola Maria. She holds it with trembling hands, tears in her eyes. "You understand now," she whispers.',
      tl: 'Ibinalik mo ang agimat kay Lola Maria. Hawak niya ito ng nanginginig na mga kamay, may luha sa kanyang mga mata. "Naintindihan mo na," bulong niya.',
    },
    {
      en: 'The knowledge of time travel remains within your family. You become its next guardian, learning the ancient wisdom passed down through generations.',
      tl: 'Ang kaalaman tungkol sa paglalakbay sa panahon ay nanatili sa iyong pamilya. Naging tagapag-alaga ka nito, natututo ng sinaunang karunungan na ipinasa sa mga henerasyon.',
    },
    {
      en: 'You study the ciphers your ancestors used. Caesar, Vigenère, Playfair, Rail Fence, Columnar Transposition - each a piece of the puzzle, each a test for the worthy.',
      tl: 'Pinag-aralan mo ang mga cipher na ginamit ng iyong mga ninuno. Caesar, Vigenère, Playfair, Rail Fence, Columnar Transposition - bawat isa ay bahagi ng puzzle, bawat isa ay pagsusulit para sa karapat-dapat.',
    },
    {
      en: 'The world continues on, unaware of the power that could change everything. Sometimes you wonder - did you make the right choice?',
      tl: 'Ang mundo ay nagpatuloy, hindi alam ang kapangyarihang maaaring baguhin ang lahat. Minsan nag-isip ka - tama ba ang iyong desisyon?',
    },
    {
      en: 'Then Lola Maria takes your hand. "Our family has protected this secret for hundreds of years," she says. "Not because we fear change, but because we respect the natural flow of time."',
      tl: 'Pagkatapos, hinawakan ni Lola Maria ang iyong kamay. "Ang ating pamilya ay nagprotekta sa lihim na ito sa loob ng daan-daang taon," sabi niya. "Hindi dahil takot tayo sa pagbabago, kundi dahil ginagalang natin ang natural na daloy ng panahon."',
    },
    {
      en: 'One day, when the time is right, you will pass the amulet to your own grandchild. And the cycle will continue, as it always has.',
      tl: 'Balang araw, kapag dumating ang tamang panahon, ipapasa mo ang agimat sa iyong sariling apo. At ang siklo ay magpapatuloy, tulad ng dati.',
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgrounds/epilogue_bg.jpg"
          alt="Lola's room - Present day"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Warm overlay with purple tint */}
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-purple/10 to-transparent" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">

      {/* Animated effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
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
          <h2 className="font-display text-purple text-sm tracking-widest mb-2 drop-shadow-[0_2px_8px_rgba(147,112,219,0.9)]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
            {settings.language === 'tl' ? 'WAKAS B' : 'ENDING B'}
          </h2>
          <h1 className="font-display text-3xl md:text-4xl text-purple mb-4 drop-shadow-[0_2px_8px_rgba(147,112,219,0.9)]" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>
            {settings.language === 'tl' ? 'Ang Lihim ay Nanatili' : 'The Secret Remained'}
          </h1>
        </motion.div>

        {/* Story text */}
        <motion.div
          className="bg-black/80 backdrop-blur-md border-2 border-purple/70 rounded-xl p-8 mb-6 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="font-body text-white text-lg leading-relaxed min-h-[150px] text-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
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
            variant="secondary"
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
            className="mt-8 p-6 bg-black/70 border-2 border-purple/70 rounded-xl text-center shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-display text-purple text-2xl mb-2 drop-shadow-[0_2px_8px_rgba(147,112,219,0.9)]" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>
              {settings.language === 'tl' ? 'Salamat sa Paglalakbay' : 'Thank You for Playing'}
            </p>
            <p className="font-body text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
              {settings.language === 'tl'
                ? 'Ikaw ay nagtapos ng "Ang Lihim ng Panahon"'
                : 'You completed "The Secret of Time"'
              }
            </p>
          </motion.div>
        )}
      </motion.div>
      </div>
    </div>
  );
}
