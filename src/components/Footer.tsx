import React from 'react';
import { Cpu, ArrowUp, Mail } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/15 bg-[#07090e]/95 py-10 px-6 font-mono text-xs text-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="font-syne font-bold text-sm text-white block">SANJAY RAJENDRAN</span>
            <span className="text-[11px] text-slate-300 font-medium">ECE · Kumaraguru College of Technology</span>
          </div>
        </div>

        {/* Social / Contact Links */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:sanjayrajendran25@gmail.com"
            title="Email Sanjay"
            className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-amber-300 hover:text-white hover:border-amber-400/50 transition-all flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline text-xs font-semibold">Email</span>
          </a>

          <a
            href="https://www.linkedin.com/in/sanjay-rajendran-4a731032a?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-amber-300 hover:text-white hover:border-amber-400/50 transition-all flex items-center gap-1.5"
          >
            <LinkedInIcon className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline text-xs font-semibold">LinkedIn</span>
          </a>

          <a
            href="https://github.com/sanjr25"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-amber-300 hover:text-white hover:border-amber-400/50 transition-all flex items-center gap-1.5"
          >
            <GitHubIcon className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline text-xs font-semibold">GitHub</span>
          </a>
        </div>

        {/* Right Scroll to top */}
        <div className="flex items-center gap-4">
          <span className="text-slate-300">© {new Date().getFullYear()} Sanjay Rajendran</span>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
