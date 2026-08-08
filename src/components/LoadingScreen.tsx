import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#07090e] text-white select-none p-6 overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-syne font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white"
        >
          Hello, this is <span className="text-amber-400 font-extrabold">Sanjay</span>.
        </motion.h1>

        {/* Minimal Animated Indicator Line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '80px', opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
          className="h-1 bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 rounded-full mt-6"
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
