'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';

export function TimeTravel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const { setChapterStatus } = useGameStore();
  const [phase, setPhase] = useState<'kaleidoscope' | 'shatter' | 'complete'>('kaleidoscope');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;
    let time = 0;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    // Phase 1: Kaleidoscope Effect
    if (phase === 'kaleidoscope') {
      const animate = () => {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        time += 0.02;

        // Create kaleidoscope pattern
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const segments = 8;

        for (let i = 0; i < segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          const radius = 100 + Math.sin(time) * 50;

          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(angle + time * 0.5);

          // Draw rotating shapes
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
          gradient.addColorStop(0, `rgba(255, 215, 0, ${0.6 + Math.sin(time) * 0.2})`);
          gradient.addColorStop(0.5, `rgba(255, 107, 53, ${0.4})`);
          gradient.addColorStop(1, `rgba(155, 89, 182, ${0.2})`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(radius, 0, 30 + Math.sin(time * 2) * 10, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }

        // Spiral effect
        for (let j = 0; j < 50; j++) {
          const spiralAngle = (j / 50) * Math.PI * 8 + time;
          const spiralRadius = (j / 50) * 300;
          const x = centerX + Math.cos(spiralAngle) * spiralRadius;
          const y = centerY + Math.sin(spiralAngle) * spiralRadius;

          ctx.fillStyle = `rgba(255, 215, 0, ${(1 - j / 50) * 0.5})`;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      // Transition to shatter phase after 3 seconds
      setTimeout(() => {
        setPhase('shatter');
      }, 3000);
    }

    // Phase 2: Screen Shatter Effect
    if (phase === 'shatter') {
      // Create shatter particles
      const gridSize = 20;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() - 0.5) * 15 - 5,
            size: gridSize,
            color: `hsl(${Math.random() * 60 + 30}, 70%, ${50 + Math.random() * 20}%)`,
            alpha: 1,
          });
        }
      }

      const animate = () => {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.95)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
          // Update physics
          p.vy += 0.5; // gravity
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.01;

          // Draw particle
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.restore();

          // Remove if off screen
          if (p.y > canvas.height || p.alpha <= 0) {
            particles.splice(index, 1);
          }
        });

        if (particles.length > 0) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setPhase('complete');
        }
      };

      animate();
    }

    // Phase 3: Complete - Navigate to Chapter 1
    if (phase === 'complete') {
      setTimeout(() => {
        setChapterStatus(1, 'available');
        router.push('/chapter/1');
      }, 1000);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase, router, setChapterStatus]);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Canvas for effects */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
      />

      {/* Text overlays */}
      {phase === 'kaleidoscope' && (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center">
            <motion.h2
              className="font-display text-4xl md:text-6xl text-gold"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Time flows...
            </motion.h2>

            <motion.p
              className="font-body text-foreground/80 text-xl mt-4"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              The amulet awakens
            </motion.p>
          </div>
        </motion.div>
      )}

      {phase === 'shatter' && (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="text-center"
            animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 2 }}
          >
            <div className="text-8xl">✨</div>
          </motion.div>
        </motion.div>
      )}

      {phase === 'complete' && (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <motion.h2
              className="font-display text-5xl text-gold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              1450 CE
            </motion.h2>

            <motion.p
              className="font-body text-foreground/90 text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Pre-Colonial Philippines
            </motion.p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
