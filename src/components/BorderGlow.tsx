import React, { useRef, useState } from 'react';
import './BorderGlow.css';

interface BorderGlowProps {
  children: React.ReactNode;
  glowColor?: string;
  edgeSensitivity?: number;
  glowRadius?: number;
  glowOpacity?: number;
  className?: string;
  contentClassName?: string;
}

export const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  glowColor = '#f59e0b',
  edgeSensitivity = 200,
  glowRadius = 300,
  glowOpacity = 0.8,
  className = '',
  contentClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });

    // Distance check to borders
    const distToLeft = x;
    const distToRight = rect.width - x;
    const distToTop = y;
    const distToBottom = rect.height - y;

    const minEdgeDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);

    if (minEdgeDist < edgeSensitivity) {
      setOpacity(glowOpacity);
    } else {
      setOpacity(glowOpacity * 0.4);
    }
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`border-glow-container ${className}`}
      style={{
        boxShadow: opacity > 0 ? `0 0 25px -5px ${glowColor}33` : 'none',
      }}
    >
      {/* Glowing Border Canvas/Radial Overlay */}
      <div
        className="border-glow-overlay"
        style={{
          opacity,
          background: `radial-gradient(${glowRadius}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 70%)`,
        }}
      />

      {/* Inner Content Box */}
      <div className={`border-glow-content ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default BorderGlow;
