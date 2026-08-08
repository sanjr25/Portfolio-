import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Code2, Image as ImageIcon } from 'lucide-react';
import type { WeekData } from '../data/protosemWeeks';

interface ProtoSemModalProps {
  week: WeekData | null;
  onClose: () => void;
}

export const ProtoSemModal: React.FC<ProtoSemModalProps> = ({ week, onClose }) => {
  if (!week) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#06080d]/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d1017] border border-amber-500/30 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden flex flex-col z-10"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#121622]/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono text-xs font-semibold">
                WEEK 0{week.weekNum}
              </span>
              <h3 className="font-syne font-bold text-xl md:text-2xl text-white">
                {week.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-slate-300">
            {/* Subtitle */}
            <div className="bg-amber-500/5 border-l-4 border-amber-500 p-4 rounded-r-xl">
              <p className="font-mono text-sm text-amber-300 font-medium">
                {week.subtitle}
              </p>
            </div>

            {/* Detailed Explanation Updated by User */}
            <div>
              <h4 className="flex items-center gap-2 font-syne text-lg font-bold text-white mb-3">
                <Cpu className="w-5 h-5 text-cyan-400" />
                Work Log & Notes
              </h4>
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5 font-sans text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {week.content}
              </div>
            </div>

            {/* Photo Gallery */}
            {week.photos && week.photos.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 font-syne text-lg font-bold text-white mb-4">
                  <ImageIcon className="w-5 h-5 text-amber-400" />
                  Uploaded Photos
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {week.photos.map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-xl overflow-hidden border border-white/10 bg-slate-900"
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {img.caption && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                          <p className="text-xs font-mono text-amber-200">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Snippet */}
            {week.codeSnippet && (
              <div>
                <h4 className="flex items-center gap-2 font-syne text-lg font-bold text-white mb-3">
                  <Code2 className="w-5 h-5 text-emerald-400" />
                  Code File: {week.codeSnippet.title}
                </h4>
                <div className="relative rounded-xl overflow-hidden border border-emerald-500/30 bg-[#090b10]">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-white/10 text-xs font-mono text-slate-400">
                    <span>{week.codeSnippet.language}</span>
                    <span className="text-emerald-400">{week.codeSnippet.title}</span>
                  </div>
                  <pre className="p-4 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{week.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/10 bg-[#121622] flex justify-between items-center text-xs font-mono text-slate-400">
            <span>ProtoSem Track • Week 0{week.weekNum}</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProtoSemModal;
