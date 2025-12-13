'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';

export function RevelationScene() {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const { settings, setChapterStatus, addSecret } = useGameStore();

  const dialogues = [
    {
      character: 'Maria (60 years old)',
      en: '"I am the same as your lola." That is what the message says.',
      tl: '"Ako ay pareho ng iyong lola." Iyan ang sinasabi ng mensahe.',
    },
    {
      character: 'You',
      en: 'What? But... that would mean...',
      tl: 'Ano? Ngunit... ibig sabihin...',
    },
    {
      character: 'Maria (60 years old)',
      en: 'Yes. I am Maria. Your lola. Standing here in 1986, looking at you - my future grandchild.',
      tl: 'Oo. Ako si Maria. Ang iyong lola. Nakatayo dito sa 1986, tumitingin sa iyo - ang aking apong bunga.',
    },
    {
      character: 'Maria (60 years old)',
      en: 'The amulet has been passed down through our family for generations. Each keeper learns to protect it, to use it wisely.',
      tl: 'Ang anting-anting ay ipinasa sa ating pamilya sa maraming henerasyon. Bawat tagapag-alaga ay natututo na protektahan ito, gamitin nang matalino.',
    },
    {
      character: 'Maria (60 years old)',
      en: 'I was young when I first received it - scared, confused. Like you are now. But I learned its secrets.',
      tl: 'Bata pa ako nang una kong tanggapin ito - takot, nalilito. Tulad mo ngayon. Ngunit natutunan ko ang mga lihim nito.',
    },
    {
      character: 'You',
      en: 'Why didn\'t you tell me any of this before?',
      tl: 'Bakit hindi mo sinabi sa akin noon pa?',
    },
    {
      character: 'Maria (60 years old)',
      en: 'Because you had to discover it yourself. You had to prove you were ready. The amulet chooses when to reveal its truths.',
      tl: 'Dahil kailangan mong matuklasan ito mismo. Kailangan mong patunayan na handa ka na. Ang anting-anting ang pumipili kung kailan ibubunyag ang katotohanan.',
    },
    {
      character: 'Maria (60 years old)',
      en: 'Now comes the hardest part. You must make a choice that will affect not just you, but our entire family\'s future.',
      tl: 'Ngayon ang pinakamahirap na parte. Kailangan mong gumawa ng desisyon na makakaapekto hindi lamang sa iyo, kundi sa hinaharap ng buong pamilya.',
    },
    {
      character: 'Maria (60 years old)',
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

  const getCharacterEmoji = (character: string) => {
    if (character.includes('Maria')) return '👵';
    if (character === 'You') return '🧑';
    return '📜';
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background with mystical glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/10 via-background to-background" />

      {/* Animated mystical effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

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
                  : 'The Choice Awaits...'
                }
              </h2>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-3xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Success badge */}
        {dialogueIndex === 0 && (
          <motion.div
            className="text-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-3 bg-gold/10 border-2 border-gold/50 rounded-full px-6 py-3">
              <span className="text-3xl">🔓</span>
              <span className="font-display text-gold text-lg">
                {settings.language === 'tl' ? 'Lihim Natuklasan!' : 'Secret Revealed!'}
              </span>
            </div>
          </motion.div>
        )}

        {/* Character portrait */}
        <motion.div
          key={currentDialogue.character}
          className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-gold/50 bg-background/50 flex items-center justify-center text-5xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          {getCharacterEmoji(currentDialogue.character)}
        </motion.div>

        {/* Dialogue box */}
        <div className="bg-background/90 backdrop-blur-md border-2 border-gold/50 rounded-xl p-6 md:p-8 mb-6">
          <p className="font-display text-gold text-sm mb-3 tracking-wide text-center">
            {currentDialogue.character.toUpperCase()}
          </p>

          <div className="font-body text-foreground text-lg leading-relaxed min-h-[100px] text-center">
            <TypeAnimation
              key={dialogueIndex}
              sequence={[displayText]}
              wrapper="span"
              speed={settings.textSpeed === 'slow' ? 40 : settings.textSpeed === 'fast' ? 80 : 60}
              cursor={false}
            />
          </div>
        </div>

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
              ? settings.language === 'tl' ? 'Magpatuloy sa Epilogue' : 'Continue to Epilogue'
              : settings.language === 'tl' ? 'Susunod' : 'Next'
            }
          </Button>
        </div>

        {/* Revelation emphasis */}
        {dialogueIndex >= 2 && dialogueIndex <= 4 && (
          <motion.div
            className="mt-6 p-6 bg-gold/10 border-2 border-gold/50 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="font-display text-gold text-center text-xl">
              {settings.language === 'tl'
                ? '✨ Ang Maria na ito... ay ang iyong Lola! ✨'
                : '✨ This Maria... is your Lola! ✨'
              }
            </p>
          </motion.div>
        )}

        {/* Chapter complete */}
        {dialogueIndex === dialogues.length - 1 && (
          <motion.div
            className="mt-6 p-4 bg-purple/10 border border-purple/30 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-body text-purple text-sm text-center">
              {settings.language === 'tl'
                ? '📖 Kabanata 5 Tapos Na • Ang Buong Katotohanan ay Iyong Natuklasan'
                : '📖 Chapter 5 Complete • The Full Truth Has Been Revealed'
              }
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
