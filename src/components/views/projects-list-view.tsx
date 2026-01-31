"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ScreenContentWrapper } from './landing-view';
import type { Project, ScreenView } from '@/types';

interface ProjectsListViewProps {
  projects: Project[];
  navigateTo: (view: ScreenView, projectId?: string) => void;
}

export const ProjectsListView: React.FC<ProjectsListViewProps> = memo(({ projects, navigateTo }) => {
  return (
    <ScreenContentWrapper noOuterPadding>
      <div className="p-3 sm:p-4">
        <h2 className="text-sm font-bold gb-text-on-screen mb-2 text-center font-headline">PROJECTS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {projects.map(project => (
            <button
              key={project.id}
              onClick={() => navigateTo(`project-${project.id}` as ScreenView, project.id)}
              className={cn(
                "p-2 rounded border-2 border-screen-fg/30 hover:border-screen-fg/70",
                "focus:border-screen-fg/70 gb-text-on-screen text-left transition-colors w-full",
                "focus:outline-none focus:ring-1 focus:ring-screen-fg pixelated"
              )}
              style={{ 
                backgroundColor: 'hsl(var(--screen-bg))', 
                boxShadow: 'inset 1px 1px 0px hsl(var(--screen-fg)/0.2), inset -1px -1px 0px hsl(var(--screen-fg)/0.2)'
              }}
              aria-label={`View details for ${project.name}`}
            >
              <Image
                src={project.imageUrl}
                alt={project.name}
                width={280}
                height={252}
                className="w-full aspect-[10/9] object-cover rounded mb-2 border-2 border-screen-fg/30 pixelated"
                data-ai-hint={project.dataAiHint || "technology software"}
              />
              <h3 className="font-headline text-xxs">{project.name}</h3>
            </button>
          ))}
        </div>
      </div>
    </ScreenContentWrapper>
  );
});

ProjectsListView.displayName = 'ProjectsListView';
