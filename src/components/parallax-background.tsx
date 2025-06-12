
// components/parallax-background.tsx
"use client";
import React, { useState } from 'react'; // Removed useEffect, useRef

const ParallaxBackground: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0); // This will remain 0 and not be updated by animation

  const PixelLayer: React.FC<{ speed: number; pattern: string; size: string; opacity?: number; colorClass?: string }> = ({ speed, pattern, size, opacity = 0.5, colorClass = "text-neutral-500" }) => (
    <div
      className={`absolute inset-0 ${colorClass}`}
      style={{
        transform: `translateY(${offsetY * speed}px) translateX(${offsetY * speed * 0.2}px)`, // Will always be 0
        backgroundImage: pattern,
        backgroundSize: size,
        opacity: opacity,
        // Removed willChange: 'transform' as it's static now
      }}
    />
  );

  // Simple SVG pixel patterns
  const pattern1 = `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' x='0' y='0' fill='currentColor'/%3E%3C/svg%3E")`;
  const pattern2 = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='2' height='2' x='5' y='5' fill='currentColor'/%3E%3Crect width='2' height='2' x='15' y='15' fill='currentColor'/%3E%3C/svg%3E")`;
  const pattern3 = `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15h30M15 0v30' stroke-width='1' stroke='currentColor' fill='none'/%3E%3C/svg%3E")`;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background pointer-events-none">
      <PixelLayer speed={0.1} pattern={pattern1} size="20px" opacity={0.1} colorClass="text-neutral-400 dark:text-neutral-700" />
      <PixelLayer speed={0.25} pattern={pattern2} size="50px" opacity={0.08} colorClass="text-neutral-500 dark:text-neutral-600" />
      <PixelLayer speed={0.4} pattern={pattern3} size="80px" opacity={0.05} colorClass="text-neutral-600 dark:text-neutral-500" />
    </div>
  );
};

export default ParallaxBackground;
