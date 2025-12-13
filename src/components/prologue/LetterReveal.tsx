'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import dynamic from 'next/dynamic';

const AmuletScene3D = dynamic(
  () => import('@/components/3d/AmuletScene').then((mod) => mod.AmuletScene),
  { ssr: false }
);

interface LetterRevealProps {
  onComplete: () => void;
}

export function LetterReveal({ onComplete }: LetterRevealProps) {
  const [phase, setPhase] = useState<'opening' | 'amulet' | 'letter' | 'complete'>('opening');
  const [letterVisible, setLetterVisible] = useState(false);
  const { settings, unlockCipher } = useGameStore();

  const handleOpeningComplete = () => {
    setTimeout(() => setPhase('amulet'), 1000);
  };

  const handleAmuletClick = () => {
    setPhase('letter');
    setTimeout(() => setLetterVisible(true), 500);
  };

  const handleLetterComplete = () => {
    unlockCipher('caesar');
    setPhase('complete');
  };

  const letterContent = {
    en: `My dearest Apo,

If you are reading this, then I have finally shared our family's greatest secret with you.

The amulet you hold - the Agimat ng Panahon - has been passed down through our family for generations. It is said to have been blessed by a babaylan in the old times, granting its bearer the power to witness the flow of time itself.

I received it from my grandmother when I was your age. She told me stories of our ancestors - of their bravery, their sacrifices, and the secrets they kept to protect our family.

Now, I pass this responsibility to you. The amulet will show you our history - not as it is written in books, but as it truly happened. You will meet our ancestors, walk in their footsteps, and understand the weight of the choices they made.

But beware - time is a delicate thread. Observe, learn, but do not interfere. The past must remain as it was, or the present may unravel.

Your journey begins with a cipher - the same one I learned from my lola. Master it, and the amulet will reveal the first thread of our story.

With all my love,
Lola Maria

P.S. - The first cipher is simple. Caesar used it in his time. Shift the letters, and you shall find the truth.`,
    tl: `Mahal kong Apo,

Kung binabasa mo ito, ibinigay ko na sa'yo ang pinakadakilang lihim ng ating pamilya.

Ang anting-anting na hawak mo - ang Agimat ng Panahon - ay ipinasa sa ating pamilya mula pa noong unang panahon. Sinasabi na ito ay pinagpala ng isang babaylan, at binibigyan ang may hawak nito ng kapangyarihang makita ang daloy ng panahon.

Tinanggap ko ito mula sa aking lola noong kasing edad mo pa lang ako. Kinuwento niya sa akin ang mga kuwento ng ating mga ninuno - ng kanilang katapangan, kanilang sakripisyo, at mga lihim na kanilang iningatan upang protektahan ang pamilya.

Ngayon, ipinasa ko sa'yo ang responsibilidad na ito. Ipapakita sa'yo ng anting-anting ang ating kasaysayan - hindi kung paano ito nakasulat sa mga aklat, kundi kung paano talaga ito nangyari. Makikilala mo ang ating mga ninuno, lalakarin ang kanilang landas, at maiintindihan mo ang bigat ng kanilang mga desisyon.

Ngunit mag-ingat - ang panahon ay delikado. Obserbahan, matuto, ngunit huwag makialam. Ang nakaraan ay dapat manatiling kung ano ito, o ang kasalukuyan ay maaaring mawasak.

Ang iyong paglalakbay ay magsisimula sa isang cipher - ang parehong natutunan ko mula sa aking lola. Matutunan mo ito, at ipapakita ng anting-anting ang unang sinulid ng ating kuwento.

Mahal na mahal kita,
Lola Maria

P.S. - Ang unang cipher ay simple. Ginamit ito ni Caesar noong kanyang panahon. I-shift ang mga letra, at makikita mo ang katotohanan.`,
  };

  const displayLetter = settings.language === 'tl' ? letterContent.tl : letterContent.en;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-background-gradient-end overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        {/* Phase 1: Baúl Opening */}
        {phase === 'opening' && (
          <motion.div
            key="opening"
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={handleOpeningComplete}
          >
            <motion.div
              className="w-64 h-48 mx-auto mb-8 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1, rotateX: [0, -15, 0] }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              {/* Baúl visualization */}
              <div className="absolute inset-0 bg-gradient-to-b from-mahogany to-mahogany/70 rounded-lg border-4 border-brass/50 shadow-2xl">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-gold/50 rounded-full" />
              </div>

              {/* Light burst */}
              <motion.div
                className="absolute inset-0 bg-gold/20 blur-3xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </motion.div>

            <motion.p
              className="font-display text-gold text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Opening the baúl...
            </motion.p>
          </motion.div>
        )}

        {/* Phase 2: 3D Amulet Reveal */}
        {phase === 'amulet' && (
          <motion.div
            key="amulet"
            className="text-center max-w-4xl px-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.h2
              className="font-display text-4xl text-gold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              The Amulet of Time
            </motion.h2>

            <motion.p
              className="font-body text-foreground/80 text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {settings.language === 'tl'
                ? 'Isang mahiwagang anting-anting ang kumikislap sa loob ng baúl...'
                : 'A mystical amulet glows inside the baúl...'
              }
            </motion.p>

            {/* 3D Amulet */}
            <motion.div
              className="w-full max-w-lg h-96 mx-auto mb-8 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleAmuletClick}
            >
              <AmuletScene3D interactive={true} />
            </motion.div>

            <motion.div
              className="font-body text-brass/80 text-base italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ delay: 1, duration: 2, repeat: Infinity }}
            >
              Click the amulet to examine it
            </motion.div>
          </motion.div>
        )}

        {/* Phase 3: Letter Reading */}
        {phase === 'letter' && (
          <motion.div
            key="letter"
            className="max-w-3xl px-6 w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <motion.h2
              className="font-display text-3xl text-gold mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {settings.language === 'tl' ? 'Sulat mula kay Lola' : 'Letter from Lola'}
            </motion.h2>

            {/* Letter Paper */}
            <motion.div
              className="bg-gradient-to-b from-[#f4e9d8] to-[#e8d7ba] text-mahogany p-8 md:p-12 rounded-lg shadow-2xl border-4 border-brass/30 relative overflow-hidden"
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-5 bg-repeat"
                   style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h60v60H0z\' fill=\'none\'/%3E%3Cpath d=\'M30 30L0 0h60L30 30z\' fill=\'%23000\' fill-opacity=\'.1\'/%3E%3C/svg%3E")' }}
              />

              <div className="relative font-body text-base md:text-lg leading-relaxed whitespace-pre-line">
                {letterVisible && (
                  <TypeAnimation
                    sequence={[displayLetter]}
                    wrapper="div"
                    speed={70}
                    cursor={false}
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={handleLetterComplete}
                variant="primary"
                size="lg"
                glow={true}
              >
                {settings.language === 'tl' ? 'Simulan ang Paglalakbay' : 'Begin the Journey'}
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Phase 4: Completion Transition */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => setTimeout(onComplete, 1500)}
          >
            <motion.div
              className="font-display text-4xl text-gold mb-4"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨
            </motion.div>

            <motion.p
              className="font-body text-foreground/90 text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {settings.language === 'tl'
                ? 'Nagsisimula ang iyong paglalakbay sa panahon...'
                : 'Your journey through time begins...'
              }
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
