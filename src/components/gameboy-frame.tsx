
import type React from 'react';

interface GameBoyFrameProps {
  children: React.ReactNode;
}

export default function GameBoyFrame({ children }: GameBoyFrameProps) {
  return (
    <div
      className="bg-card p-4 sm:p-5 rounded-lg shadow-xl w-full max-w-[360px] sm:max-w-[440px] font-body relative" // Increased padding
      style={{
        borderTop: '4px solid hsl(0, 0%, 88%)',
        borderLeft: '4px solid hsl(0, 0%, 88%)',
        borderBottom: '6px solid hsl(0, 0%, 50%)',
        borderRight: '6px solid hsl(0, 0%, 50%)',
        borderRadius: '12px 12px 50px 12px', // Base border radius
      }}
    >
      {/* Decorative top part of Gameboy */}
      <div className="flex justify-between items-center mb-1.5 sm:mb-2 px-1 sm:px-1.5">
        <div className="text-[0.45rem] sm:text-[0.5rem] text-muted-foreground/70 tracking-tighter">DOT MATRIX WITH STEREO SOUND</div>
        <div className="flex items-center space-x-0.5 relative -top-px sm:-top-0">
          <span className="text-[0.4rem] sm:text-[0.5rem] text-muted-foreground/70">BATTERY</span>
          {/* Power LED */}
          <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] bg-red-500 rounded-full border border-muted-foreground/50 animate-led-pulse"></div>
        </div>
      </div>
      
      {children} {/* This will contain ScreenComponent and ControlsComponent */}

      {/* Updated Speaker grill */}
      <div className="absolute bottom-5 right-5 opacity-70"> {/* Moved slightly up and left */}
        <div className="grid grid-cols-6 gap-1.5"> {/* Adjusted gap slightly for diamond shape visuals */}
          {Array.from({ length: 24 }).map((_, i) => (
            <div 
              key={i} 
              className="bg-muted-foreground/50 w-1.5 h-1.5 sm:w-2 sm:h-2 transform rotate-45" /* Removed rounded-full, added rotate-45 */
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

