import React from 'react';
import StaggeredMenu from './StaggeredMenu';

interface NavbarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onSelectSection }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-end">
        {/* React Bits Staggered Menu Component */}
        <div className="pointer-events-auto">
          <StaggeredMenu activeSection={activeSection} onSelectSection={onSelectSection} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
