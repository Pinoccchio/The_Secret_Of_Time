'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';

interface PostCreditsProps {
  ending: 'share' | 'protect';
}

export function PostCredits({ ending }: PostCreditsProps) {
  const router = useRouter();
  const { settings, progress } = useGameStore();

  const credits = [
    { role: 'Created by', name: 'Claude Code Demo Project' },
    { role: 'Story & Design', name: 'Cipher Adventure Game' },
    { role: 'Ciphers Implemented', name: 'Caesar & Columnar Transposition' },
    { role: 'Powered by', name: 'Next.js, React Three Fiber, Framer Motion' },
  ];

  const stats = {
    hintsUsed: progress.discoveredSecrets.length,
    ciphersLearned: progress.unlockedCiphers.length,
    ending: ending === 'share' ? 'Share the Truth' : 'Protect the Secret',
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background-gradient-end" />

      {/* Stars effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-4xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h1 className="font-display text-5xl md:text-6xl text-gold mb-4">
            {settings.language === 'tl' ? 'Ang Lihim ng Panahon' : 'The Secret of Time'}
          </h1>
          <p className="font-display text-xl text-foreground/80 italic">
            {settings.language === 'tl' ? 'Tapos na ang Paglalakbay' : 'Journey Complete'}
          </p>
        </motion.div>

        {/* Player Stats */}
        <motion.div
          className="bg-background/80 backdrop-blur-sm border-2 border-gold/30 rounded-xl p-8 mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <h2 className="font-display text-2xl text-gold text-center mb-6">
            {settings.language === 'tl' ? 'Iyong Mga Napagtagumpayan' : 'Your Achievements'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🔐</div>
              <p className="font-body text-foreground/60 text-sm">
                {settings.language === 'tl' ? 'Mga Cipher' : 'Ciphers Learned'}
              </p>
              <p className="font-display text-gold text-2xl">{stats.ciphersLearned}</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-2">💎</div>
              <p className="font-body text-foreground/60 text-sm">
                {settings.language === 'tl' ? 'Mga Lihim' : 'Secrets Found'}
              </p>
              <p className="font-display text-gold text-2xl">{stats.hintsUsed}</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-2">{ending === 'share' ? '🌍' : '🔒'}</div>
              <p className="font-body text-foreground/60 text-sm">
                {settings.language === 'tl' ? 'Iyong Desisyon' : 'Your Choice'}
              </p>
              <p className="font-display text-gold text-lg">{stats.ending}</p>
            </div>
          </div>
        </motion.div>

        {/* Credits */}
        <motion.div
          className="bg-background/80 backdrop-blur-sm border-2 border-purple/30 rounded-xl p-8 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <h2 className="font-display text-2xl text-purple text-center mb-6">
            {settings.language === 'tl' ? 'Mga Kredito' : 'Credits'}
          </h2>

          <div className="space-y-4">
            {credits.map((credit, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 + index * 0.2 }}
              >
                <p className="font-body text-brass/60 text-sm">{credit.role}</p>
                <p className="font-display text-foreground text-lg">{credit.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Thank you message */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
        >
          <p className="font-body text-gold text-xl mb-2">
            {settings.language === 'tl' ? 'Salamat sa Paglalaro!' : 'Thank You for Playing!'}
          </p>
          <p className="font-body text-foreground/70">
            {settings.language === 'tl'
              ? 'Ang paglalakbay sa panahon ay natapos na, ngunit ang mga alaala ay mananatili magpakailanman.'
              : 'The journey through time is complete, but the memories will last forever.'
            }
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
        >
          <Button
            onClick={() => router.push('/')}
            variant="primary"
            size="lg"
            glow={true}
          >
            {settings.language === 'tl' ? 'Bumalik sa Simula' : 'Return to Start'}
          </Button>

          <Button
            onClick={() => {
              const otherEnding = ending === 'share' ? 'protect' : 'share';
              router.push(`/epilogue?preview=${otherEnding}`);
            }}
            variant="ghost"
            size="lg"
          >
            {settings.language === 'tl' ? 'Tignan ang Ibang Ending' : 'See Other Ending'}
          </Button>
        </motion.div>

        {/* Easter egg */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
        >
          <p className="font-mono text-brass/40 text-xs">
            KHOOR ZRUOG • 47 43 22 47 43 34 • ⏳
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
