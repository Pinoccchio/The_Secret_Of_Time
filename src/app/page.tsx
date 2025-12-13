'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { AmuletScene } from '@/components/3d/AmuletScene';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import 3D scene to avoid SSR issues
const AmuletScene3D = dynamic(
  () => import('@/components/3d/AmuletScene').then((mod) => mod.AmuletScene),
  { ssr: false }
);

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleBeginJourney = () => {
    router.push('/prologue');
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background z-0" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 text-center">
        {/* Title Section */}
        <motion.div
          className="space-y-6 md:space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Tagalog Title */}
          <motion.h1
            className="
              font-display text-4xl md:text-6xl lg:text-7xl
              text-gold
              tracking-wide
              floating
            "
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Ang Lihim ng Panahon
          </motion.h1>

          {/* English Subtitle */}
          <motion.h2
            className="
              font-dramatic text-2xl md:text-4xl lg:text-5xl
              text-foreground/90
              italic
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            The Secret of Time
          </motion.h2>

          {/* 3D Amulet */}
          <motion.div
            className="w-full max-w-md h-96 mx-auto my-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
          >
            <AmuletScene3D interactive={true} />
          </motion.div>

          {/* Decorative Divider */}
          <motion.div
            className="flex items-center justify-center gap-4 my-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="w-2 h-2 bg-gold rounded-full mystical-glow" />
            <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </motion.div>

          {/* Description */}
          <motion.p
            className="
              font-body text-lg md:text-xl lg:text-2xl
              text-foreground/80
              max-w-3xl mx-auto
              leading-relaxed
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            Journey through Philippine history, decipher ancient codes, and uncover a family secret that spans centuries.
          </motion.p>

          {/* Quote */}
          <motion.blockquote
            className="
              font-body text-base md:text-lg
              text-brass/90
              italic
              max-w-2xl mx-auto
              mt-6
              border-l-4 border-gold/30
              pl-6
            "
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            "Ang hindi marunong lumingon sa pinanggalingan ay hindi makararating sa paroroonan."
            <footer className="text-sm text-foreground/60 mt-2 not-italic">
              — Filipino Proverb
            </footer>
          </motion.blockquote>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <Button
              onClick={handleBeginJourney}
              variant="primary"
              size="lg"
              glow={true}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
                Begin Journey
              </span>
            </Button>

            <Button
              onClick={() => alert('Coming soon! For now, start with Begin Journey.')}
              variant="ghost"
              size="lg"
              glow={false}
            >
              Learn About Ciphers
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 1 }}
          >
            {[
              {
                icon: '🔐',
                title: 'Master 5 Ciphers',
                description: 'Learn Caesar, Vigenère, Playfair, Rail Fence, and Columnar Transposition',
              },
              {
                icon: '⏳',
                title: 'Travel Through Time',
                description: 'Visit 5 pivotal moments in Philippine history from 1450 to 1986',
              },
              {
                icon: '💎',
                title: 'Uncover Secrets',
                description: 'Discover your lola\'s mysterious past and make a choice that changes everything',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="
                  p-6
                  bg-background/30 backdrop-blur-sm
                  border border-gold/20
                  rounded-xl
                  hover:border-gold/50
                  transition-all duration-300
                  hover:scale-105
                "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3 + index * 0.2 }}
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-display text-gold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-foreground/70 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="text-gold/50 text-sm font-display flex flex-col items-center gap-2">
            <span>Scroll to explore</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
