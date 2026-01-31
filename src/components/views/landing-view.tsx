"use client";

import React, { useState, useEffect, memo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ScreenContentWrapperProps {
  children: React.ReactNode;
  title?: string;
  noOuterPadding?: boolean;
}

export const ScreenContentWrapper: React.FC<ScreenContentWrapperProps> = memo(({ 
  children, 
  title, 
  noOuterPadding = false 
}) => (
  <div className={cn(
    "animate-content-fade-in w-full h-full flex flex-col overflow-hidden",
    !noOuterPadding && "p-3 sm:p-4"
  )}>
    <ScrollArea className="flex-grow gb-screen-content">
      {noOuterPadding ? (
        <div className="p-3 sm:p-4 h-full flex flex-col">
          {title && <h2 className="text-sm font-bold gb-text-on-screen mb-2 text-center font-headline">{title}</h2>}
          {children}
        </div>
      ) : (
        <>
          {title && <h2 className="text-sm font-bold gb-text-on-screen mb-2 text-center font-headline">{title}</h2>}
          {children}
        </>
      )}
    </ScrollArea>
  </div>
));

ScreenContentWrapper.displayName = 'ScreenContentWrapper';

interface LandingViewProps {
  name: string;
  role: string;
  hasPlayedAnimation: boolean;
  setHasPlayedAnimation: (played: boolean) => void;
}

export const LandingView: React.FC<LandingViewProps> = memo(({ 
  name, 
  role, 
  hasPlayedAnimation, 
  setHasPlayedAnimation 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const line1Text = `Hi! I'm ${name}.`;
  const line2Text = role;
  const fullCombinedText = `${line1Text}\n${line2Text}`;
  const typingSpeed = 50;
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const separator = now.getSeconds() % 2 === 0 ? ':' : ' ';
      setCurrentDateTime(`${day}/${month}/${year} ${hours}${separator}${minutes}`);
    };

    updateDateTime();
    const timerId = setInterval(updateDateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (hasPlayedAnimation) {
      setDisplayedText(fullCombinedText);
      return;
    }

    setDisplayedText('');
    let charIndex = 0;
    const intervalId = setInterval(() => {
      if (charIndex < fullCombinedText.length) {
        setDisplayedText(prev => fullCombinedText.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(intervalId);
        setHasPlayedAnimation(true);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [name, role, fullCombinedText, hasPlayedAnimation, setHasPlayedAnimation]);

  const [currentLine1ToDisplay, ...restOfLines] = displayedText.split('\n');
  const currentLine2ToDisplay = restOfLines.join('\n');

  const isTypingLine1 = !hasPlayedAnimation && displayedText.length <= line1Text.length;
  const isTypingLine2 = !hasPlayedAnimation && displayedText.length > (line1Text.length + 1) && displayedText.length < fullCombinedText.length;
  const isCurrentlyTyping = !hasPlayedAnimation && displayedText.length < fullCombinedText.length;

  return (
    <ScreenContentWrapper noOuterPadding>
      <div className="flex flex-col justify-center items-center text-center gb-text-on-screen px-1 h-full">
        {currentDateTime && (
          <p className="text-xxs opacity-60 mb-2 font-body absolute top-2 left-3 right-auto text-left animate-fade-in">
            {currentDateTime}
          </p>
        )}

        <div className="flex flex-col justify-center items-center text-center mt-24">
          <p className="text-base leading-tight font-body min-h-[24px] max-w-full break-words">
            {currentLine1ToDisplay}
            {isTypingLine1 && isCurrentlyTyping && (
              <span className="inline-block w-2.5 h-4 bg-screen-fg animate-pulse ml-0.5 align-baseline" />
            )}
          </p>

          {displayedText.includes('\n') && (
            <p className="text-xs leading-relaxed font-body min-h-[40px] sm:min-h-[60px] max-w-full break-words whitespace-pre-wrap pt-1">
              {currentLine2ToDisplay}
              {isTypingLine2 && isCurrentlyTyping && (
                <span className="inline-block w-2 h-3 bg-screen-fg animate-pulse ml-0.5 align-baseline" />
              )}
            </p>
          )}
        </div>

        <p className="text-xxs opacity-45 mt-auto pt-2 pb-2">Use D-Pad to navigate</p>
      </div>
    </ScreenContentWrapper>
  );
});

LandingView.displayName = 'LandingView';
