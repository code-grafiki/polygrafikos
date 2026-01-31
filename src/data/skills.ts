import { Code2, Palette, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Skill {
  name: string;
  icon: LucideIcon;
}

export const skills: Skill[] = [
  { name: 'C', icon: Code2 },
  { name: 'C++', icon: Code2 },
  { name: 'C#', icon: Code2 },
  { name: 'Python', icon: Code2 },
  { name: 'VS Code', icon: Wrench },
  { name: 'Unity Engine', icon: Wrench },
  { name: 'Blender', icon: Wrench },
  { name: 'LaTeX', icon: Wrench },
  { name: 'Git', icon: Wrench },
  { name: 'Figma', icon: Palette },
  { name: 'UI/UX Design', icon: Palette },
];

export interface Certification {
  name: string;
  year: string;
  link: string;
}

export const certifications: Certification[] = [
  { 
    name: 'C# Unity, Udemy', 
    year: '2024', 
    link: 'http://ude.my/UC-4c1ebcc9-30bb-4812-8ca6-a0809b055ea1' 
  },
  { 
    name: 'Python, Kaggle', 
    year: '2024', 
    link: 'https://www.kaggle.com/learn/certification/polygrafikos/python' 
  },
];
