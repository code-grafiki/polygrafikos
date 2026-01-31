"use client";

import React, { memo } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { ScreenContentWrapper } from './landing-view';
import { skills, certifications } from '@/data/skills';

export const AboutView: React.FC = memo(() => {
  return (
    <ScreenContentWrapper noOuterPadding>
      <div className="p-3 sm:p-4">
        <h2 className="text-sm font-bold gb-text-on-screen mb-2 text-center font-headline">ABOUT ME</h2>
        <div className="space-y-2 text-xxs gb-text-on-screen leading-relaxed">
          <p className="text-center">
            Hello! I&apos;m a passionate game developer with a love for creating intuitive and engaging digital experiences.
            <br/>Driven by curiosity and a passion for creation, I&apos;ve largely self-taught in game development
            and design, leveraging online resources, tutorials, and hands-on project work.
          </p>
          <h3 className="font-bold text-xs pt-1 font-headline">Skills:</h3>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
            {skills.map(skill => (
              <li key={skill.name} className="flex items-center space-x-1.5 text-xxs">
                <skill.icon className="w-3 h-3 opacity-80 gb-text-on-screen" />
                <span>{skill.name}</span>
              </li>
            ))}
          </ul>
          <br/>
          <h3 className="font-bold text-xs pt-1 font-headline">Certifications:</h3>
          <ul className="space-y-0.5">
            {certifications.map(cert => (
              <li key={cert.name} className="flex items-center justify-between text-xxs">
                <span>• {cert.name} ({cert.year})</span>
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={`View certificate for ${cert.name}`} 
                  className="hover:opacity-70 transition-opacity"
                >
                  <LinkIcon className="w-3 h-3 opacity-70 gb-text-on-screen ml-1 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
          <br/>
          <p className="text-center">
            When I&apos;m not coding, I enjoy exploring the latest advancements in technology and space.
            I&apos;m always eager to learn and grow.
          </p>
        </div>
      </div>
    </ScreenContentWrapper>
  );
});

AboutView.displayName = 'AboutView';
