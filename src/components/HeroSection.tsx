import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Mail, Terminal, Sparkles, User, Radio } from 'lucide-react';
import BorderGlow from './BorderGlow';
import { LinkedInIcon, GitHubIcon } from './SocialIcons';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onExploreAbout: () => void;
  onExploreIOT?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onExploreAbout,
  onExploreIOT,
}) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden">
      {/* Super Colorful & Vibrant Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-pink-500/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-[500px] h-[500px] bg-cyan-500/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Main Hero Card with Multi-Color Glowing Border */}
        <BorderGlow glowColor="#ec4899" edgeSensitivity={250} glowRadius={350} className="w-full">
          <div className="p-8 sm:p-12 md:p-14 flex flex-col items-center text-center justify-center">
            
            {/* Perfectly Sized Name - Fits Perfectly on All Devices */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full mb-3"
            >
              <h1 className="font-syne font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-normal uppercase leading-tight bg-gradient-to-r from-amber-400 via-pink-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-[0_2px_12px_rgba(236,72,153,0.3)]">
                SANJAY RAJENDRAN
              </h1>
            </motion.div>

            {/* Subtitle with Colorful Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-mono text-sm sm:text-lg text-cyan-300 font-bold tracking-wide"
            >
              Electronics & Communication Engineering Student
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase font-semibold"
            >
              <span className="text-amber-400">Embedded Systems</span>
              <span className="text-white/30">•</span>
              <a
                href="#iot"
                onClick={(e) => {
                  e.preventDefault();
                  if (onExploreIOT) onExploreIOT();
                }}
                className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/50 hover:decoration-emerald-400 flex items-center gap-1 transition-colors group cursor-pointer"
                title="Direct link to IoT & Smart Systems section"
              >
                <span>IoT & Smart Home</span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-125 transition-transform" />
              </a>
              <span className="text-white/30">•</span>
              <span className="text-cyan-400">Digital Electronics</span>
            </motion.div>

            {/* Unique Custom-Designed High-Tech Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 relative group max-w-2xl w-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-pink-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
              <div className="relative px-6 py-4 rounded-2xl bg-[#0b0e17]/90 border border-white/15 flex flex-col sm:flex-row items-center gap-3 justify-center text-center sm:text-left">
                <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0 shadow-inner">
                  <Terminal className="w-5 h-5 animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] font-mono text-amber-300 font-bold tracking-wider uppercase mb-0.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    ENGINEERING PHILOSOPHY
                  </div>
                  <p className="text-slate-100 text-sm sm:text-base font-sans italic font-medium">
                    "Bridging hardware and software, one build at a time."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons & Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 w-full"
            >
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={onExploreProjects}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white font-syne font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-2 transition-all duration-300 shadow-lg shadow-pink-500/25 hover:scale-105 hover:shadow-pink-500/40"
                >
                  <span>View Hardware Projects</span>
                  <Wifi className="w-4 h-4 text-white" />
                </button>

                <a
                  href="#iot"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onExploreIOT) onExploreIOT();
                  }}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-syne font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:scale-105 hover:shadow-emerald-500/50 cursor-pointer"
                >
                  <span>IoT & Smart Systems</span>
                  <Radio className="w-4 h-4 text-slate-950" />
                </a>

                <button
                  onClick={onExploreAbout}
                  className="px-6 py-3.5 rounded-xl glass-panel border border-cyan-500/40 text-cyan-300 font-syne font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-2 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
                >
                  <span>Explore Background</span>
                  <User className="w-4 h-4 text-cyan-400" />
                </button>
              </div>

              {/* Quick Social Badges with Colorful Glows */}
              <div className="flex items-center gap-2.5">
                <a
                  href="mailto:sanjayrajendran25@gmail.com"
                  title="Email Sanjay"
                  className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:scale-110 transition-all shadow-sm"
                >
                  <Mail className="w-5 h-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/sanjay-rajendran-4a731032a?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="p-3 rounded-xl bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:border-indigo-400 hover:scale-110 transition-all shadow-sm"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>

                <a
                  href="https://github.com/sanjr25"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:border-emerald-400 hover:scale-110 transition-all shadow-sm"
                >
                  <GitHubIcon className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
};

export default HeroSection;
