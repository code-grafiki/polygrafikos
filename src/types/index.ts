export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  dataAiHint?: string;
  liveLink?: string;
  repoLink?: string;
}

export type ScreenView = 'landing' | 'about' | 'projects' | `project-${string}` | 'contact';
