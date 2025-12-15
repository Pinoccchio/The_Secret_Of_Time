'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';

interface ThreatSceneProps {
  onComplete: () => void;
}

export function ThreatScene({ onComplete }: ThreatSceneProps) {
  const { settings } = useGameStore();
  const [phase, setPhase] = useState<'approach' | 'underground' | 'leak' | 'urgency' | 'ready'>('approach');
  const [dialogueIndex, setDialogueIndex] = useState(0);

  interface DialogueData {
    character: string;
    characterImage?: string;
    en: string;
    tl: string;
  }

  // Phase 1: Approach dialogues
  const approachDialogues: DialogueData[] = [
    {
      character: 'Narrator',
      en: 'Maria leads you through winding paths, avoiding patrols, until you reach an unassuming building.',
      tl: 'Dinala ka ni Maria sa mga likong daan, iniiwasan ang mga patrol, hanggang sa makarating kayo sa isang simpleng gusali.',
    },
    {
      character: 'Narrator',
      en: 'She knocks—three short, two long, one short. A slot opens. Eyes peer out.',
      tl: 'Kumatok siya—tatlong maikli, dalawang mahaba, isang maikli. Bumukas ang butas. May mga matang tumitingin.',
    },
    {
      character: 'Narrator',
      en: 'A whispered password exchange. The door opens.',
      tl: 'Isang bulongang password. Bumukas ang pinto.',
    },
  ];

  // Phase 2: Underground room dialogues
  const undergroundDialogues: DialogueData[] = [
    {
      character: 'Narrator',
      en: 'Inside: chaos organized into purpose.',
      tl: 'Sa loob: kaguluhan na organisado.',
    },
    {
      character: 'Narrator',
      en: 'Students operate mimeograph machines, cranking out newsletters. Others type on ancient typewriters. Radio equipment crackles in a corner.',
      tl: 'Mga estudyante ang gumagana ng mimeograph machines, gumagawa ng newsletters. Iba ay nagte-type sa lumang typewriter. Tumutunog ang radio equipment sa sulok.',
    },
    {
      character: 'Narrator',
      en: 'Stacks of paper everywhere—underground newspapers, pamphlets, poems.',
      tl: 'Bunton ng papel saanman—underground newspapers, pamphlets, tula.',
    },
    {
      character: 'Narrator',
      en: 'A banner on the wall: "ANG BAYAN KONG PILIPINAS" with a clenched fist.',
      tl: 'Isang banner sa dingding: "ANG BAYAN KONG PILIPINAS" na may nakakuyom na kamao.',
    },
  ];

  // Phase 3: The leak dialogues
  const leakDialogues: DialogueData[] = [
    {
      character: 'Student Activist',
      characterImage: '/assets/images/characters/chapter4_student_activist.png',
      en: 'Tita Maria! The contact from Malacañang arrived. There\'s a leak.',
      tl: 'Tita Maria! Dumating na yung contact natin sa Malacañang. May leak.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'Ano?',
      tl: 'Ano?',
    },
    {
      character: 'Student Activist',
      characterImage: '/assets/images/characters/chapter4_student_activist.png',
      en: 'A list. Of the next people to be arrested. Student leaders. Journalists. Some—',
      tl: 'Listahan. Ng mga susunod na i-a-aresto. Mga student leaders. Mga journalist. Mga—',
    },
    {
      character: 'Narrator',
      en: 'He glances at you suspiciously.',
      tl: 'Tumingin siya sa iyo na may hinala.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'This one can be trusted. What else?',
      tl: 'Siya ay mapagkakatiwalaan. Ano pa?',
    },
    {
      character: 'Student Activist',
      characterImage: '/assets/images/characters/chapter4_student_activist.png',
      en: 'The list is encrypted. So if it\'s intercepted, they can\'t read it.',
      tl: 'Naka-encrypt ang listahan. Para kung ma-intercept, hindi nila mabasa.',
    },
  ];

  // Phase 4: Urgency dialogues
  const urgencyDialogues: DialogueData[] = [
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'What kind of cipher?',
      tl: 'Anong klaseng cipher?',
    },
    {
      character: 'Student Activist',
      characterImage: '/assets/images/characters/chapter4_student_activist.png',
      en: "We don't know. But there's a pattern. Like zigzag?",
      tl: 'Hindi namin alam. Pero may pattern. Parang zigzag?',
    },
    {
      character: 'Narrator',
      en: "Maria's eyes light up. She turns to you.",
      tl: 'Kumislap ang mga mata ni Maria. Humarap siya sa iyo.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'Rail Fence. We used it in WWII for quick messages. The message is written in zigzag pattern, then read in rows.',
      tl: 'Rail Fence. Ginamit namin yan noon sa WWII para sa mga mensaheng mabilis. Ang mensahe ay sinusulat sa zigzag pattern, tapos binabasa sa mga linya.',
    },
    {
      character: 'Narrator',
      en: 'She puts a hand on your shoulder.',
      tl: 'Inilagay niya ang kamay sa iyong balikat.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: "You can do this. I saw you do Playfair under pressure. This—is easier. But the stakes are higher.",
      tl: 'Kaya mo \'to. Nakita kong ginawa mo ang Playfair sa ilalim ng pressure. Ito—mas madali. Pero mas mataas ang stakes.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: "If we don't decrypt it tonight, tomorrow—the students on that list will disappear. They call it 'salvaging.' But we know what it really means.",
      tl: 'Kung hindi natin ma-decrypt yan ngayong gabi, bukas—mawawala ang mga estudyanteng nasa listahan. \'Salvaging\' ang tawag nila. Pero alam natin kung ano talaga.',
    },
    {
      character: 'Narrator',
      en: 'She hands you the encrypted message.',
      tl: 'Ibinigay niya sa iyo ang naka-encrypt na mensahe.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'Three levels. Three lines. Read what\'s in between.',
      tl: 'Tatlong antas. Tatlong linya. Basahin mo ang nasa pagitan.',
    },
  ];

  const getCurrentDialogues = () => {
    if (phase === 'approach') return approachDialogues;
    if (phase === 'underground') return undergroundDialogues;
    if (phase === 'leak') return leakDialogues;
    if (phase === 'urgency') return urgencyDialogues;
    return [];
  };

  const currentDialogues = getCurrentDialogues();
  const currentDialogue = currentDialogues[dialogueIndex];
  const displayText = currentDialogue ? (settings.language === 'tl' ? currentDialogue.tl : currentDialogue.en) : '';
  const isMainCharacter = currentDialogue?.character === 'You';

  // Track previous character to avoid fade animation when same character speaks
  const prevDialogue = dialogueIndex > 0 ? currentDialogues[dialogueIndex - 1] : null;
  const isSameCharacter = prevDialogue && currentDialogue && prevDialogue.character === currentDialogue.character && prevDialogue.characterImage === currentDialogue.characterImage;

  const handleNext = () => {
    if (dialogueIndex < currentDialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      // Move to next phase
      setDialogueIndex(0);
      if (phase === 'approach') {
        setPhase('underground');
      } else if (phase === 'underground') {
        setPhase('leak');
      } else if (phase === 'leak') {
        setPhase('urgency');
      } else if (phase === 'urgency') {
        setPhase('ready');
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

      {/* Underground atmosphere effect */}
      <motion.div
        className="absolute inset-0 bg-orange-900/10 z-5"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-12 pb-96 px-8">
        <AnimatePresence mode="wait">
          {/* Dialogue Phases */}
          {phase !== 'ready' && (
            <div className="w-full">
              {/* Character Portraits - RPG Style */}
              <AnimatePresence>
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
              </AnimatePresence>

              {/* Dialogue Box - Fixed at bottom */}
              <motion.div
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
                        {currentDialogues.map((_, index) => (
                          <div
                            key={index}
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
            </div>
          )}

          {/* Ready Phase */}
          {phase === 'ready' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl"
              >
                <div className="bg-background/90 backdrop-blur-md border-2 border-gold/50 rounded-xl p-8 mb-8">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    🔐
                  </motion.div>

                  <h3 className="font-dramatic text-4xl text-gold mb-4">
                    {settings.language === 'tl' ? 'Encrypted na Mensahe' : 'Encrypted Message'}
                  </h3>

                  <p className="font-body text-lg text-foreground/90 mb-6">
                    {settings.language === 'tl'
                      ? 'Kung hindi mo ito ma-decrypt ngayong gabi, bukas ay mawawala ang mga estudyante. Gumamit ng Rail Fence cipher—3 rails, zigzag pattern.'
                      : "If you don't decrypt this tonight, tomorrow the students will disappear. Use the Rail Fence cipher—3 rails, zigzag pattern."}
                  </p>

                  <motion.div
                    className="text-red-400 font-body text-sm mb-6"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {settings.language === 'tl' ? '⚠️ Kailangan Ngayon!' : '⚠️ Needed Now!'}
                  </motion.div>

                  <Button
                    onClick={() => {
                      setTimeout(onComplete, 300);
                    }}
                    variant="primary"
                    className="w-full bg-gold hover:bg-gold/80"
                  >
                    {settings.language === 'tl' ? 'Simulan ang Decryption' : 'Begin Decryption'}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Sound effects indicators */}
        <AnimatePresence>
          {(phase === 'underground' || phase === 'urgency' || phase === 'ready') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            >
              <p className="text-foreground/40 text-sm font-body">
                {settings.language === 'tl'
                  ? '🔊 Typewriter... mimeograph... mga bulong...'
                  : '🔊 Typewriter... mimeograph... whispers...'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
