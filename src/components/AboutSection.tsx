import React from 'react';
import { Cpu, GraduationCap, MapPin, Calendar, Sparkles, Binary, Radio } from 'lucide-react';
import BorderGlow from './BorderGlow';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-pink-500/40 bg-pink-500/10 text-xs font-mono text-pink-300 uppercase tracking-widest mb-3">
          <Cpu className="w-3.5 h-3.5 text-pink-400" />
          <span>BACKGROUND & ACADEMICS</span>
        </div>
        <h2 className="font-syne font-extrabold text-4xl sm:text-5xl uppercase tracking-tight bg-gradient-to-r from-amber-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
          ABOUT ME
        </h2>
      </div>

      {/* Main Bio Card */}
      <BorderGlow glowColor="#ec4899" edgeSensitivity={200} className="mb-12">
        <div className="p-8 sm:p-10 space-y-4">
          <p className="text-white text-base sm:text-lg leading-relaxed font-sans font-medium">
            I'm an Electronics and Communication Engineering student interested in{' '}
            <strong className="text-amber-400 font-bold">Embedded Systems, IoT, and Digital Electronics</strong>.
          </p>
          <p className="text-slate-200 text-base leading-relaxed font-sans">
            I enjoy working with hardware, sensors, microcontrollers, and connected systems to turn engineering ideas into practical solutions.
          </p>
          <p className="text-slate-200 text-base leading-relaxed font-sans">
            My focus is on understanding how electronic systems work, integrating hardware with basic embedded programming, and building reliable prototypes that solve real-world problems.
          </p>
        </div>
      </BorderGlow>

      {/* Grid Layout: Education & Areas of Interest */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Education Column */}
        <div className="space-y-6">
          <h3 className="font-syne font-bold text-2xl text-white uppercase flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            EDUCATION
          </h3>

          <BorderGlow glowColor="#38bdf8" edgeSensitivity={200}>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300 font-semibold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" /> 2024 – 2028
                </span>
                <span className="flex items-center gap-1 text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Coimbatore, Tamil Nadu
                </span>
              </div>
              <h4 className="font-syne font-bold text-xl text-white">Kumaraguru College of Technology</h4>
              <p className="text-amber-400 font-mono text-sm font-semibold">B.E. Electronics and Communication Engineering</p>
              <p className="text-slate-200 text-xs font-sans leading-relaxed">
                Pursuing rigorous foundational coursework in Embedded Systems, Signals & Systems, Digital Logic Design, and IoT system prototyping.
              </p>
            </div>
          </BorderGlow>

          <BorderGlow glowColor="#38bdf8" edgeSensitivity={200}>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-200">
                <span className="font-semibold text-cyan-300">School Education</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Ketti, Ooty, Tamil Nadu
                </span>
              </div>
              <h4 className="font-syne font-bold text-xl text-white">The Laidlaw Memorial School and Junior College</h4>
              <p className="text-slate-200 font-mono text-xs">Primary & Secondary High School Education</p>
            </div>
          </BorderGlow>
        </div>

        {/* Areas of Interest Column */}
        <div className="space-y-6">
          <h3 className="font-syne font-bold text-2xl text-white uppercase flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            AREAS OF INTEREST
          </h3>

          <div className="space-y-4">
            {/* Interest 1 */}
            <BorderGlow glowColor="#10b981" edgeSensitivity={200}>
              <div className="p-6">
                <h4 className="font-syne font-bold text-lg text-emerald-400 flex items-center gap-2 mb-3">
                  <Cpu className="w-5 h-5" /> Embedded Systems
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Microcontrollers', 'Basic Embedded C', 'Arduino', 'Sensor interfacing', 'Hardware-software integration'].map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </BorderGlow>

            {/* Interest 2 */}
            <BorderGlow glowColor="#f59e0b" edgeSensitivity={200}>
              <div className="p-6">
                <h4 className="font-syne font-bold text-lg text-amber-400 flex items-center gap-2 mb-3">
                  <Radio className="w-5 h-5" /> IoT (Internet of Things)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['ESP8266', 'Wireless connectivity', 'Sensor-based systems', 'Basic IoT systems'].map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </BorderGlow>

            {/* Interest 3 */}
            <BorderGlow glowColor="#8b5cf6" edgeSensitivity={200}>
              <div className="p-6">
                <h4 className="font-syne font-bold text-lg text-purple-400 flex items-center gap-2 mb-3">
                  <Binary className="w-5 h-5" /> Digital Electronics & VLSI
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Digital Logic Design', 'Basic Verilog HDL', 'Digital circuit design', 'Signals & Systems', 'Basic signal analysis'].map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
