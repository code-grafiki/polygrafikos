"use client";

import React, { useMemo, memo } from 'react';
import { LandingView, AboutView, ProjectsListView, ProjectDetailView, ContactView } from './views';
import type { Project, ScreenView } from '@/types';

interface ScreenComponentProps {
  currentView: ScreenView;
  projects: Project[];
  selectedProjectId: string | null;
  navigateTo: (view: ScreenView, projectId?: string) => void;
  name: string;
  role: string;
  hasLandingAnimationPlayed: boolean;
  setHasLandingAnimationPlayed: (played: boolean) => void;
}

const ScreenComponent: React.FC<ScreenComponentProps> = ({
  currentView,
  projects,
  selectedProjectId,
  navigateTo,
  name,
  role,
  hasLandingAnimationPlayed,
  setHasLandingAnimationPlayed,
}) => {
  const selectedProject = useMemo(
    () => projects.find(p => p.id === selectedProjectId),
    [projects, selectedProjectId]
  );

  const renderView = (): React.ReactElement => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingView 
            name={name} 
            role={role} 
            hasPlayedAnimation={hasLandingAnimationPlayed} 
            setHasPlayedAnimation={setHasLandingAnimationPlayed} 
          />
        );
      case 'about':
        return <AboutView />;
      case 'projects':
        return <ProjectsListView projects={projects} navigateTo={navigateTo} />;
      case 'contact':
        return <ContactView />;
      default:
        if (currentView.startsWith('project-') && selectedProject) {
          return <ProjectDetailView project={selectedProject} />;
        }
        return <LandingView 
          name={name} 
          role={role} 
          hasPlayedAnimation={hasLandingAnimationPlayed} 
          setHasPlayedAnimation={setHasLandingAnimationPlayed} 
        />;
    }
  };

  return (
    <div 
      className="gb-bg-screen w-full aspect-gb-screen rounded-sm border-2 border-neutral-900/70 shadow-inner overflow-hidden relative mb-5 sm:mb-6 pixelated"
      style={{
        boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.2), inset -2px -2px 5px rgba(0,0,0,0.1)',
      }}
      aria-live="polite"
      aria-label={`Current view: ${currentView}`}
    >
      <div 
        className="absolute inset-0 bg-black/5 pointer-events-none opacity-20" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 50%, transparent 50%)', 
          backgroundSize: '1px 2px' 
        }}
      />
      {renderView()}
    </div>
  );
};

export default memo(ScreenComponent);
