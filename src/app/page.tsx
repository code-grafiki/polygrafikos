"use client";

import { useState, useEffect, useCallback, memo } from 'react';
import GameBoyFrame from '@/components/gameboy-frame';
import ScreenComponent from '@/components/screen-component';
import ControlsComponent from '@/components/controls-component';
import ParallaxBackground from '@/components/parallax-background';
import type { ScreenView } from '@/types';
import { projects as initialProjects } from '@/data/projects';
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Figma, Download, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";

const YOUR_NAME = "Kishore\u00A0M";
const YOUR_ROLE = "Game developer, UI/UX designer, 3D Artist";

const konamiCodeSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const HomePage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ScreenView>('landing');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { toast } = useToast();
  const [userInputSequence, setUserInputSequence] = useState<string[]>([]);
  const [hasLandingAnimationPlayed, setHasLandingAnimationPlayed] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleKonamiInput = useCallback((key: string) => {
    setUserInputSequence(prevSequence => {
      const newSequence = [...prevSequence, key].slice(-konamiCodeSequence.length);
      if (JSON.stringify(newSequence) === JSON.stringify(konamiCodeSequence)) {
        toast({
          title: "KONAMI CODE!",
          description: "You found the retro secret! 🎉",
          variant: "default",
        });
        import('canvas-confetti').then(confettiModule => {
          const runConfetti = confettiModule.default || confettiModule;
          if (typeof runConfetti === 'function') {
            runConfetti({
              particleCount: 150,
              spread: 90,
              origin: { y: 0.6 },
              zIndex: 9999
            });
          }
        }).catch(error => {
          console.error("Error loading confetti:", error);
        });
        return [];
      }
      return newSequence;
    });
  }, [toast]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let processedKey = event.key;
      if (event.key.toLowerCase() === 'b') {
        processedKey = 'b';
      } else if (event.key.toLowerCase() === 'a') {
        processedKey = 'a';
      }
      if (konamiCodeSequence.includes(processedKey)) {
        handleKonamiInput(processedKey);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKonamiInput]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const navigateTo = useCallback((view: ScreenView, projectId?: string) => {
    setCurrentView(view);
    if (projectId) {
      setSelectedProjectId(projectId);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <ParallaxBackground />
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-2 sm:p-4 font-body">
        <a 
          href="/resume.pdf" 
          download={`${YOUR_NAME.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`} 
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20"
          aria-label="Download Resume"
        >
          <Button variant="outline" size="sm" className="bg-background/80 hover:bg-background">
            <Download className="mr-2 h-4 w-4" />
            Resume
          </Button>
        </a>
        <GameBoyFrame>
          <ScreenComponent
            currentView={currentView}
            projects={initialProjects}
            selectedProjectId={selectedProjectId}
            navigateTo={navigateTo}
            name={YOUR_NAME}
            role={YOUR_ROLE}
            hasLandingAnimationPlayed={hasLandingAnimationPlayed}
            setHasLandingAnimationPlayed={setHasLandingAnimationPlayed}
          />
          <ControlsComponent
            navigateTo={navigateTo}
            currentView={currentView}
            toggleTheme={toggleTheme}
            handleKonamiInput={handleKonamiInput}
          />
        </GameBoyFrame>
      </main>
      <footer className="relative z-10 text-center text-xxs text-foreground/70 dark:text-foreground/50 py-2 shrink-0">
        <div className="flex justify-center space-x-4 mt-1">
          <a 
            href="https://github.com/code-grafiki" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub Profile" 
            className="text-foreground/70 hover:text-foreground dark:text-foreground/50 dark:hover:text-foreground/80 transition-colors"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://linkedin.com/in/kishore-m-016b38204" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn Profile" 
            className="text-foreground/70 hover:text-foreground dark:text-foreground/50 dark:hover:text-foreground/80 transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="https://www.figma.com/@polygrafikos" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Figma Profile" 
            className="text-foreground/70 hover:text-foreground dark:text-foreground/50 dark:hover:text-foreground/80 transition-colors"
          >
            <Figma size={20} />
          </a>
          <a 
            href="https://www.instagram.com/polygrafikos/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram Profile" 
            className="text-foreground/70 hover:text-foreground dark:text-foreground/50 dark:hover:text-foreground/80 transition-colors"
          >
            <Instagram size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default memo(HomePage);
