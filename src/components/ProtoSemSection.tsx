import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Layers, Search, ArrowUpRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import BorderGlow from './BorderGlow';
import ProtoSemModal from './ProtoSemModal';
import { PROTOSEM_WEEKS } from '../data/protosemWeeks';
import type { WeekData } from '../data/protosemWeeks';

export const ProtoSemSection: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<WeekData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWeeks = PROTOSEM_WEEKS.filter((w) => {
    const q = searchQuery.toLowerCase();
    return (
      w.title.toLowerCase().includes(q) ||
      w.subtitle.toLowerCase().includes(q) ||
      w.content.toLowerCase().includes(q)
    );
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="protossem" className="relative py-24 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>PROTOSEM 20-WEEK STAGGERED WORKFLOW</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-5xl text-amber-400 uppercase tracking-tight">
            PROTOSEM (20 WEEKS)
          </h2>
          <p className="mt-2 text-slate-100 text-sm font-mono max-w-2xl font-normal">
            Click on any week card below (e.g. Week 0) to open the dedicated file view where you can read notes and view uploaded photos.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search week 0 to 19..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-sm text-white font-mono placeholder:text-slate-400 focus:outline-none focus:border-amber-500/50 transition-all"
          />
        </div>
      </div>

      {/* 20 Weeks Grid in Staggered Order */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredWeeks.map((week) => (
          <motion.div
            key={week.weekNum}
            variants={itemVariants}
            onClick={() => setSelectedWeek(week)}
            className="cursor-pointer group h-full"
          >
            <BorderGlow
              glowColor="#f59e0b"
              edgeSensitivity={180}
              className="h-full"
            >
              <div className="p-6 flex flex-col justify-between h-full space-y-4">
                {/* Card Header */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-200 mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                      WEEK 0{week.weekNum}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-200 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                    {week.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-100 font-mono line-clamp-2 leading-relaxed">
                    {week.subtitle}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono text-amber-400 font-medium">
                  <span className="flex items-center gap-1.5 text-slate-100 group-hover:text-amber-300 transition-colors">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>Open Week File</span>
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                </div>
              </div>
            </BorderGlow>
          </motion.div>
        ))}
      </motion.div>

      {/* ProtoSem Modal Popup */}
      <ProtoSemModal week={selectedWeek} onClose={() => setSelectedWeek(null)} />
    </section>
  );
};

export default ProtoSemSection;
