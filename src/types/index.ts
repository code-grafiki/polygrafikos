export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveLink?: string;
  repoLink?: string;
  dataAiHint?: string;
}

export type ScreenView = 'landing' | 'about' | 'projects' | 'contact' | `project-${string}`;
