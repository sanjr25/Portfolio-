import React from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from './SocialIcons';

interface ContactSectionProps {
  onBackToHome?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onBackToHome }) => {
  return (
    <div className="w-full min-h-[80vh] flex flex-col justify-center items-center py-12 px-4 sm:px-6">
      {/* Top Navigation Back Button if in dedicated view */}
      {onBackToHome && (
        <div className="w-full max-w-5xl flex items-center justify-between mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/15 text-slate-200 hover:bg-white/20 hover:text-white font-mono text-xs font-semibold uppercase transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Portfolio</span>
          </button>
        </div>
      )}

      {/* Main Rounded Contact Card - Exact Replica of Screenshot Design */}
      <div className="w-full max-w-5xl rounded-[32px] bg-[#121319] border border-white/10 p-8 sm:p-16 md:p-20 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
        
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl mx-auto">
          {/* Top Dash Category Badge */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-500 font-bold uppercase mb-6">
            <span className="w-4 h-[2px] bg-amber-500" />
            <span>CONTACT</span>
          </div>

          {/* Main Heading from Screenshot */}
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
            Hey, thanks for stopping by.
          </h2>

          {/* Subtitle Body Text */}
          <p className="mt-6 text-slate-300 text-sm sm:text-base font-sans leading-relaxed max-w-xl font-normal">
            Open to embedded systems and hardware-adjacent opportunities, internships, and collaborations. Let's talk — great things always start with a conversation.
          </p>

          {/* Action Pill Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {/* Primary White Email Me Pill Button */}
            <a
              href="mailto:sanjayrajendran25@gmail.com"
              className="px-8 py-3.5 rounded-full bg-white text-slate-950 font-syne font-bold text-sm hover:bg-slate-200 transition-all duration-300 shadow-lg shadow-white/10 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-slate-950" />
              <span>Email Me</span>
            </a>

            {/* Secondary Dark LinkedIn Pill Button */}
            <a
              href="https://www.linkedin.com/in/sanjay-rajendran-4a731032a?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-transparent border border-slate-700 text-white font-syne font-bold text-sm hover:bg-white/10 hover:border-slate-500 transition-all duration-300 flex items-center gap-2"
            >
              <LinkedInIcon className="w-4 h-4 text-white" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Bottom Footer Links Line */}
          <div className="mt-12 flex items-center justify-center gap-6 font-mono text-xs text-slate-400">
            <a
              href="mailto:sanjayrajendran25@gmail.com"
              className="hover:text-amber-400 transition-colors"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/sanjay-rajendran-4a731032a?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/sanjr25"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Page Copyright from Screenshot */}
      <footer className="mt-8 font-mono text-xs text-slate-400 text-center">
        © {new Date().getFullYear()} Sanjay Rajendran. Salem & Coimbatore, Tamil Nadu, India.
      </footer>
    </div>
  );
};

export default ContactSection;
