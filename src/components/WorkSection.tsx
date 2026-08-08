import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplets, CreditCard, Briefcase, Wrench, CheckCircle2 } from 'lucide-react';
import BorderGlow from './BorderGlow';

gsap.registerPlugin(ScrollTrigger);

export const WorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const track = trackRef.current;

    if (!section || !trigger || !track) return;

    // Calculate total horizontal scroll width
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth + 80);
    };

    // GSAP ScrollTrigger with PINNING (Locks screen completely fixed)
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 2, track.scrollWidth)}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative w-full">
      {/* Pinned Trigger Viewport (Locks screen 100% fixed while scrubbing) */}
      <div ref={triggerRef} className="h-screen w-full flex flex-col justify-center overflow-hidden bg-[#07080d] z-20 py-8 px-6 sm:px-12">
        
        {/* Section Header (No buttons, clean text) */}
        <div className="max-w-7xl mx-auto w-full mb-8 px-4 shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-2">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            <span>PORTFOLIO PROJECTS & INDUSTRY EXPERIENCE</span>
          </div>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl uppercase tracking-tight bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-400 text-transparent bg-clip-text">
            PROJECTS & EXPERIENCE
          </h2>
        </div>

        {/* Horizontal Motion Track */}
        <div className="w-full flex items-center overflow-hidden">
          <div ref={trackRef} className="flex gap-6 sm:gap-10 items-stretch pl-4 sm:pl-12 pr-12">
            
            {/* Card 1: Project 1 */}
            <div className="shrink-0 w-[340px] sm:w-[460px] md:w-[500px]">
              <BorderGlow glowColor="#38bdf8" edgeSensitivity={220} className="h-full">
                <div className="p-8 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-300 font-semibold mb-3">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                        <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Embedded Systems · IoT
                      </span>
                      <span className="text-slate-400">Municipal Water</span>
                    </div>
                    <h4 className="font-syne font-bold text-xl sm:text-2xl text-white">
                      Municipal Pipeline Leakage Detection System
                    </h4>
                    <p className="mt-3 text-slate-200 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                      An embedded system designed to detect leakage in municipal water pipelines and provide real-time telemetry monitoring.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-mono text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Worked With
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {['ESP8266', 'Water / flow sensing', 'Basic embedded C', 'IoT connectivity'].map((tech, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs font-mono font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/15 flex items-center gap-2 text-xs font-mono text-cyan-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span><strong>Focus:</strong> Real-time leakage detection & telemetry.</span>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </div>

            {/* Card 2: Project 2 */}
            <div className="shrink-0 w-[340px] sm:w-[460px] md:w-[500px]">
              <BorderGlow glowColor="#f59e0b" edgeSensitivity={220} className="h-full">
                <div className="p-8 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-amber-300 font-semibold mb-3">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300">
                        <CreditCard className="w-3.5 h-3.5 text-amber-400" /> Embedded Systems · IoT
                      </span>
                      <span className="text-slate-400">Attendance</span>
                    </div>
                    <h4 className="font-syne font-bold text-xl sm:text-2xl text-white">
                      Smart RFID Attendance System
                    </h4>
                    <p className="mt-3 text-slate-200 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                      An RFID-based attendance system using a microcontroller and wireless connectivity to digitally record student attendance.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-mono text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Worked With
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {['RFID MFRC522', 'ESP8266', 'Arduino', 'Wi-Fi connectivity'].map((tech, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/15 flex items-center gap-2 text-xs font-mono text-amber-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Focus:</strong> Automating digital attendance logging.</span>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </div>

            {/* Card 3: Experience 1 */}
            <div className="shrink-0 w-[340px] sm:w-[460px] md:w-[480px]">
              <BorderGlow glowColor="#10b981" edgeSensitivity={200} className="h-full">
                <div className="p-8 flex flex-col justify-between h-full space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-300 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> INTERNSHIP
                    </span>
                    <span>EDU TANTR</span>
                  </div>
                  <h4 className="font-syne font-bold text-xl sm:text-2xl text-white">Embedded Systems Intern</h4>
                  <p className="text-slate-300 text-xs font-mono">Hands-on industrial exposure & practical hardware builds</p>

                  <div className="pt-2">
                    <h5 className="font-mono text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Exposure To:
                    </h5>
                    <ul className="space-y-1.5 text-slate-200 text-xs font-sans">
                      {[
                        'Embedded systems fundamentals & microcontroller architectures',
                        'Basic sensor interfacing & analog-to-digital conversions',
                        'Arduino-based rapid prototype development',
                        'IoT fundamentals & wireless communication protocols'
                      ].map((exp, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BorderGlow>
            </div>

            {/* Card 4: Experience 2 */}
            <div className="shrink-0 w-[340px] sm:w-[460px] md:w-[480px]">
              <BorderGlow glowColor="#8b5cf6" edgeSensitivity={200} className="h-full">
                <div className="p-8 flex flex-col justify-between h-full space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-purple-300 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-purple-400" /> MANAGEMENT
                    </span>
                    <span>M.R. CONSTRUCTIONS</span>
                  </div>
                  <h4 className="font-syne font-bold text-xl sm:text-2xl text-white">Management Role</h4>
                  <p className="text-slate-300 text-xs font-mono">Operations, documentation & project management</p>

                  <div className="pt-2">
                    <h5 className="font-mono text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Exposure To:
                    </h5>
                    <ul className="space-y-1.5 text-slate-200 text-xs font-sans">
                      {[
                        'Business operations & site coordination',
                        'Project documentation & progress reporting',
                        'Accounts and administrative activities',
                        'Day-to-day operations management'
                      ].map((exp, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BorderGlow>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
