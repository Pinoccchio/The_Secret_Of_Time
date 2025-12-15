'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';

export function RevelationScene() {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const { settings, setChapterStatus, addSecret } = useGameStore();

  interface DialogueData {
    character: string;
    characterImage?: string;
    en: string;
    tl: string;
  }

  const dialogues: DialogueData[] = [
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter5_elder_edsa.png',
      en: '"I am the same as your lola." That is what the message says.',
      tl: '"Ako ay pareho ng iyong lola." Iyan ang sinasabi ng mensahe.',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: 'What? But... that would mean...',
      tl: 'Ano? Ngunit... ibig sabihin...',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter5_elder_edsa.png',
      en: 'Yes. I am Maria. Your lola. Standing here in 1986, looking at you - my future grandchild.',
      tl: 'Oo. Ako si Maria. Ang iyong lola. Nakatayo dito sa 1986, tumitingin sa iyo - ang aking apong bunga.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter5_elder_edsa.png',
      en: 'The amulet has been passed down through our family for generations. Each keeper learns to protect it, to use it wisely.',
      tl: 'Ang anting-anting ay ipinasa sa ating pamilya sa maraming henerasyon. Bawat tagapag-alaga ay natututo na protektahan ito, gamitin nang matalino.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter5_elder_edsa.png',
      en: 'I was young when I first received it - scared, confused. Like you are now. But I learned its secrets.',
      tl: 'Bata pa ako nang una kong tanggapin ito - takot, nalilito. Tulad mo ngayon. Ngunit natutunan ko ang mga lihim nito.',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: 'Why didn\'t you tell me any of this before?',
      tl: 'Bakit hindi mo sinabi sa akin noon pa?',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter5_elder_edsa.png',
      en: 'Because you had to discover it yourself. You had to prove you were ready. The amulet chooses when to reveal its truths.',
      tl: 'Dahil kailangan mong matuklasan ito mismo. Kailangan mong patunayan na handa ka na. Ang anting-anting ang pumipili kung kailan ibubunyag ang katotohanan.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter5_elder_edsa.png',
      en: 'Now comes the hardest part. You must make a choice that will affect not just you, but our entire family\'s future.',
      tl: 'Ngayon ang pinakamahirap na parte. Kailangan mong gumawa ng desisyon na makakaapekto hindi lamang sa iyo, kundi sa hinaharap ng buong pamilya.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter5_elder_edsa.png',
      en: 'Will you share the amulet\'s power with the world? Or keep it secret, as our ancestors have done?',
      tl: 'Ibabahagi mo ba ang kapangyarihan ng anting-anting sa mundo? O panatilihing lihim, tulad ng ginawa ng ating mga ninuno?',
    },
    {
      character: 'Narrator',
      en: 'The amulet glows warmly in your hands. Time itself seems to hold its breath, waiting for your decision...',
      tl: 'Ang anting-anting ay kumikislap sa iyong mga kamay. Ang panahon mismo ay tila humihinto, naghihintay ng iyong desisyon...',
    },
  ];

  const currentDialogue = dialogues[dialogueIndex];
  const displayText = settings.language === 'tl' ? currentDialogue.tl : currentDialogue.en;
  const isMainCharacter = currentDialogue?.character === 'You';

  // Track previous character to avoid fade animation when same character speaks
  const prevDialogue = dialogueIndex > 0 ? dialogues[dialogueIndex - 1] : null;
  const isSameCharacter = prevDialogue && currentDialogue && prevDialogue.character === currentDialogue.character && prevDialogue.characterImage === currentDialogue.characterImage;

  const handleNext = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      // Transition to epilogue
      setIsTransitioning(true);
      setChapterStatus(5, 'completed');
      addSecret('maria-identity');

      setTimeout(() => {
        router.push('/epilogue');
      }, 3000);
    }
  };

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
        {/* Lighter overlay for mystical atmosphere */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Mystical glow effect */}
      <motion.div
        className="absolute inset-0 bg-gold/10 z-5"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Transition effect */}
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-50 bg-purple"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.2, 0.8, 1] }}
        >
          <div className="flex items-center justify-center h-full">
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 1 }}
            >
              <div className="text-8xl mb-4">💭</div>
              <h2 className="font-display text-4xl text-background">
                {settings.language === 'tl'
                  ? 'Ang Desisyon ay Naghihintay...'
                  : 'The Choice Awaits...'}
              </h2>
            </motion.div>
          </div>
        </motion.div>
      )}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-12 pb-96 px-8">
        <AnimatePresence mode="wait">
          {/* Character Portraits - RPG Style */}
          {currentDialogue?.characterImage && (
            <motion.div
              key={currentDialogue.character}
              className={`
                absolute bottom-[280px] z-40
                ${isMainCharacter ? 'left-8 md:left-16' : 'right-8 md:right-16'}
              `}
              initial={isSameCharacter ? false : {
                opacity: 0,
                x: isMainCharacter ? -100 : 100,
                y: 50
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0
              }}
              exit={{
                opacity: 0,
                x: isMainCharacter ? -100 : 100,
                y: 50
              }}
              transition={{
                duration: 0.5,
                ease: 'easeOut'
              }}
            >
              <div className="relative">
                {/* Character portrait - no border */}
                <div className="w-48 h-48 md:w-64 md:h-64 overflow-hidden">
                  <img
                    src={currentDialogue.characterImage}
                    alt={currentDialogue.character}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Character name label */}
                <div className="
                  absolute -bottom-2 left-1/2 -translate-x-1/2
                  bg-background/95 backdrop-blur-sm
                  border-2 border-gold/70
                  rounded-full
                  px-4 py-1
                  whitespace-nowrap
                ">
                  <p className="font-display text-gold text-sm">
                    {currentDialogue.character}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Dialogue Box - Fixed at bottom */}
          <motion.div
            key="revelation-dialogue-box"
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="max-w-5xl mx-auto">
              <div className="
                bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]
                border-2 border-gold
                rounded-lg
                p-6 md:p-8
                shadow-2xl
              ">
                {/* Character name */}
                <h3 className="font-display text-gold text-xl md:text-2xl mb-4">
                  {currentDialogue?.character.toUpperCase()}
                </h3>

                {/* Dialogue text */}
                <div className="font-body text-foreground text-base md:text-lg leading-relaxed mb-4">
                  {displayText}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {dialogues.map((_, index) => (
                      <div
                        key={`revelation-dialogue-dot-${index}`}
                        className={`
                          w-2 h-2 rounded-full
                          ${index === dialogueIndex ? 'bg-gold' : 'bg-foreground/30'}
                          ${index < dialogueIndex ? 'bg-gold/50' : ''}
                        `}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={handleNext}
                    className="
                      font-display text-gold text-sm tracking-wider
                      hover:text-gold/80 transition-colors
                      cursor-pointer
                    "
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    {settings.language === 'tl' ? 'CLICK TO CONTINUE ▸' : 'CLICK TO CONTINUE ▸'}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
