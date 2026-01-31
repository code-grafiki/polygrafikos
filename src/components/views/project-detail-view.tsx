"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import { Link as LinkIcon, Github } from 'lucide-react';
import { ScreenContentWrapper } from './landing-view';
import type { Project } from '@/types';

interface ProjectDetailViewProps {
  project: Project | undefined;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = memo(({ project }) => {
  if (!project) {
    return (
      <ScreenContentWrapper noOuterPadding>
        <div className="p-3 sm:p-4">
          <h2 className="text-sm font-bold gb-text-on-screen mb-2 text-center font-headline">ERROR</h2>
          <p className="gb-text-on-screen text-xxs">Project not found.</p>
        </div>
      </ScreenContentWrapper>
    );
  }
  
  return (
    <ScreenContentWrapper noOuterPadding>
      <div className="p-3 sm:p-4">
        <h2 className="text-sm font-bold gb-text-on-screen mb-2 text-center font-headline">{project.name.toUpperCase()}</h2>
        <div className="gb-text-on-screen space-y-1.5 text-xxs">
          <Image
            src={project.imageUrl}
            alt={project.name}
            width={320}
            height={288}
            className="w-full max-w-[320px] mx-auto aspect-gb-screen object-cover rounded mb-2 border-2 border-screen-fg/30 pixelated"
            data-ai-hint={project.dataAiHint || "application interface"}
          />
          <p className="leading-relaxed">{project.description}</p>
          <h4 className="font-bold text-xs pt-1 font-headline">Technologies:</h4>
          <ul className="flex flex-wrap gap-1">
            {project.technologies.map(tech => (
              <li key={tech} className="bg-screen-fg/10 px-1.5 py-0.5 rounded text-xxs">{tech}</li>
            ))}
          </ul>
          <div className="flex space-x-2 pt-1.5 text-xxs">
            {project.liveLink && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-1 hover:underline"
              >
                <LinkIcon className="w-3 h-3 gb-text-on-screen" /> <span>Live Demo</span>
              </a>
            )}
            {project.repoLink && (
              <a 
                href={project.repoLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-1 hover:underline"
              >
                <Github className="w-3 h-3 gb-text-on-screen" /> <span>Repository</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </ScreenContentWrapper>
  );
});

ProjectDetailView.displayName = 'ProjectDetailView';
