"use client";

import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import type { ScreenView } from '@/types';
import { Mail, Home, User, Archive } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ControlsComponentProps {
  navigateTo: (view: ScreenView) => void;
  currentView: ScreenView;
  toggleTheme: () => void;
  handleKonamiInput: (key: string) => void;
}

const dPadButtonStyle = "w-10 h-10 sm:w-12 sm:h-12 p-2 bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/50 flex items-center justify-center shadow-md";

const ControlsComponent: React.FC<ControlsComponentProps> = ({ 
  navigateTo, 
  currentView, 
  toggleTheme, 
  handleKonamiInput 
}) => {
  const { toast } = useToast();

  const handleBack = () => {
    handleKonamiInput('b');
    if (currentView.startsWith('project-')) {
      navigateTo('projects');
    } else if (currentView === 'projects' || currentView === 'about' || currentView === 'contact') {
      navigateTo('landing');
    }
  };

  const handleActionA = () => {
    handleKonamiInput('a');
    if (currentView === 'contact') {
      // Dispatch custom event to trigger form submission
      window.dispatchEvent(new CustomEvent('submit-contact-form'));
    }
    // No action for other views - button is disabled or does nothing
  };

  const isBackButton = currentView.startsWith('project-') || 
                       currentView === 'projects' || 
                       currentView === 'about' || 
                       currentView === 'contact';

  const isActionButtonActive = currentView === 'contact';

  return (
    <div className="px-1 sm:px-2 select-none pb-6">
      <div className="flex justify-between items-center">
        {/* D-Pad */}
        <TooltipProvider delayDuration={0}>
          <div className="grid grid-cols-3 grid-rows-3 w-[120px] h-[120px] sm:w-36 sm:h-36 relative">
            <div />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={() => { navigateTo('about'); handleKonamiInput('ArrowUp'); }} 
                  className={`${dPadButtonStyle} col-start-2 row-start-1 rounded-t-md rounded-b-none`} 
                  aria-label="Navigate to About section"
                >
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>About Me</p>
              </TooltipContent>
            </Tooltip>
            <div />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={() => { navigateTo('projects'); handleKonamiInput('ArrowLeft'); }} 
                  className={`${dPadButtonStyle} col-start-1 row-start-2 rounded-l-md rounded-r-none flex items-center justify-center`} 
                  aria-label="Navigate to Projects section"
                >
                  <Archive className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Projects</p>
              </TooltipContent>
            </Tooltip>
            <div className="bg-primary col-start-2 row-start-2 flex items-center justify-center shadow-md w-10 h-10 sm:w-12 sm:h-12 border border-primary/50">
               <div className="w-4 h-4 sm:w-5 sm:h-5 bg-primary/70 rounded-full border border-primary/90"></div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={() => { navigateTo('contact'); handleKonamiInput('ArrowRight'); }} 
                  className={`${dPadButtonStyle} col-start-3 row-start-2 rounded-r-md rounded-l-none`} 
                  aria-label="Navigate to Contact section"
                >
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Contact Me</p>
              </TooltipContent>
            </Tooltip>
            <div />
            <Tooltip>
              <TooltipTrigger asChild>
                 <Button 
                  onClick={() => { navigateTo('landing'); handleKonamiInput('ArrowDown'); }} 
                  className={`${dPadButtonStyle} col-start-2 row-start-3 rounded-b-md rounded-t-none`} 
                  aria-label="Navigate to Landing page"
                 >
                  <Home className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
            <div />
          </div>
        </TooltipProvider>

        {/* A and B Buttons */}
        <div className="flex items-center space-x-3 sm:space-x-4 relative -top-4">
          <div className="flex flex-col items-center">
            <Button
              onClick={handleBack}
              className="gb-button rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-primary text-primary-foreground hover:bg-primary/90 border-primary/50"
              aria-label={isBackButton ? "Back" : "Back button"}
            >
              <span className="text-base sm:text-lg leading-none">B</span>
            </Button>
            <span className="text-xxs sm:text-xs text-muted-foreground mt-1">
              {isBackButton ? "BACK" : ""}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Button
              onClick={handleActionA}
              disabled={!isActionButtonActive}
              className="gb-button rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-red-600 hover:bg-red-600/90 text-white border-red-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={currentView === 'contact' ? "Submit Contact Form" : "A button"}
            >
              <span className="text-base sm:text-lg leading-none">A</span>
            </Button>
             <span className="text-xxs sm:text-xs text-muted-foreground mt-1">
              {currentView === 'contact' ? "SEND" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Start and Select Buttons */}
      <div className="flex justify-center items-center space-x-3 sm:space-x-4 mt-2 sm:mt-3">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleTheme}
                className="h-6 sm:h-7 w-16 sm:w-20 rounded-[20px] bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xxs font-bold border-secondary/50 active:scale-95 shadow-md"
                aria-label="Toggle Theme"
              >
                SELECT
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Toggle Theme</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => toast({ title: "Hello World", variant: "default" })}
                className="h-6 sm:h-7 w-16 sm:w-20 rounded-[20px] bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xxs font-bold border-secondary/50 active:scale-95 shadow-md"
                aria-label="Start Button"
              >
                START
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Start / Options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default memo(ControlsComponent);
