import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, Cpu, Sparkles } from 'lucide-react';
import './StaggeredMenu.css';

export interface MenuItem {
  id: string;
  label: string;
  href: string;
}

interface StaggeredMenuProps {
  items?: MenuItem[];
  activeSection?: string;
  onSelectSection?: (sectionId: string) => void;
}

const DEFAULT_ITEMS: MenuItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'protossem', label: 'ProtoSem', href: '#protossem' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  items = DEFAULT_ITEMS,
  activeSection = 'home',
  onSelectSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Build GSAP Timeline
    const tl = gsap.timeline({ paused: true });

    tl.to(backdropRef.current, {
      autoAlpha: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
      .to(
        contentRef.current,
        {
          x: '0%',
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.2'
      )
      .to(
        itemRefs.current.filter(Boolean),
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.45,
          ease: 'back.out(1.4)',
        },
        '-=0.3'
      );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  const toggleMenu = () => {
    if (!timelineRef.current) return;

    if (!isOpen) {
      setIsOpen(true);
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse().then(() => {
        setIsOpen(false);
      });
    }
  };

  const handleItemClick = (id: string) => {
    if (onSelectSection) {
      onSelectSection(id);
    }
    if (timelineRef.current) {
      timelineRef.current.reverse().then(() => {
        setIsOpen(false);
      });
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className="staggered-menu-btn"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Menu Overlay Container */}
      <div
        ref={wrapperRef}
        className={`staggered-menu-wrapper ${isOpen ? 'is-open' : ''}`}
      >
        {/* Backdrop */}
        <div
          ref={backdropRef}
          className="staggered-menu-backdrop"
          onClick={toggleMenu}
        />

        {/* Sliding Panel */}
        <div ref={contentRef} className="staggered-menu-content">
          <div>
            <div className="flex items-center gap-2 mb-8 text-amber-500 font-mono text-xs tracking-wider uppercase">
              <Cpu className="w-4 h-4 animate-spin-slow" />
              <span>Navigation Systems // ECE</span>
            </div>

            <ul className="staggered-menu-list">
              {items.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <li
                    key={item.id}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className="staggered-menu-item"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleItemClick(item.id);
                      }}
                      className={`staggered-menu-link ${isActive ? 'active' : ''}`}
                    >
                      <span className="staggered-menu-num">0{index + 1}</span>
                      <span>{item.label}</span>
                      {isActive && (
                        <Sparkles className="w-5 h-5 text-amber-400 animate-pulse ml-auto" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="staggered-menu-footer">
            <div className="flex justify-between items-center text-slate-400">
              <span>SANJAY RAJENDRAN</span>
              <span>ECE '28</span>
            </div>
            <div className="text-amber-500/80">Embedded Systems · IoT · Digital Electronics</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaggeredMenu;
