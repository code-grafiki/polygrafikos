
import React, { FormEvent, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Project, ScreenView } from '@/types';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Code2, Palette, Wrench, Link as LinkIcon, Github, Mail as MailIconLucide, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';


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

const ScreenContentWrapper: React.FC<{ children: React.ReactNode; title?: string; noOuterPadding?: boolean }> = ({ children, title, noOuterPadding = false }) => (
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
);

const LandingView: React.FC<{
  name: string;
  role: string;
  hasPlayedAnimation: boolean;
  setHasPlayedAnimation: (played: boolean) => void;
}> = ({ name, role, hasPlayedAnimation, setHasPlayedAnimation }) => {
  const [displayedText, setDisplayedText] = useState('');
  const line1Text = `Hi! I'm ${name}.`;
  const line2Text = role;
  const fullCombinedText = `${line1Text}\n${line2Text}`;
  const typingSpeed = 50; // Milliseconds per character
  const [currentDateTime, setCurrentDateTime] = useState<string | null>(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = String(now.getFullYear()).slice(-2);
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
 setCurrentDateTime(`${day}/${month}/${year} ${hours}${now.getSeconds() % 2 === 0 ? ':' : ' '}${minutes}`);
    };

    updateDateTime();
    const timerId = setInterval(updateDateTime, 1000); // Update every second for time change
    return () => clearInterval(timerId);
  }, []);


  useEffect(() => {
    if (hasPlayedAnimation) {
      setDisplayedText(fullCombinedText);
      return; // Skip animation
    }

    setDisplayedText(''); // Reset for animation
    let charIndex = 0;
    const intervalId = setInterval(() => {
      if (charIndex < fullCombinedText.length) {
        setDisplayedText(prev => fullCombinedText.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(intervalId);
        setHasPlayedAnimation(true); // Mark as played
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [name, role, typingSpeed, fullCombinedText, hasPlayedAnimation, setHasPlayedAnimation]);

  const [currentLine1ToDisplay, ...restOfLines] = displayedText.split('\n');
  const currentLine2ToDisplay = restOfLines.join('\n');

  const isTypingLine1 = !hasPlayedAnimation && displayedText.length <= line1Text.length;
  const isTypingLine2 = !hasPlayedAnimation && displayedText.length > (line1Text.length +1) && displayedText.length < fullCombinedText.length;
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
};

const AboutView: React.FC = () => {
  const skills = [
    { name: 'C', icon: Code2 }, { name: 'C++', icon: Code2 }, { name: 'C#', icon: Code2 }, { name: 'Python', icon: Code2 },
    { name: 'VS Code', icon: Wrench }, { name: 'Unity Engine', icon: Wrench }, { name: 'Blender', icon: Wrench },
    { name: 'LaTeX', icon: Wrench }, { name: 'Git', icon: Wrench }, { name: 'Figma', icon: Palette }, { name: 'UI/UX Design', icon: Palette },
  ];

  const certifications = [
    { name: 'C# Unity, Udemy', year: '2024', link: 'http://ude.my/UC-4c1ebcc9-30bb-4812-8ca6-a0809b055ea1' },
    { name: 'Python, Kaggle', year: '2024', link: 'https://www.kaggle.com/learn/certification/polygrafikos/python' },
  ];
  return (
    <ScreenContentWrapper noOuterPadding>
      <div className="p-3 sm:p-4">
        <h2 className="text-sm font-bold gb-text-on-screen mb-2 text-center font-headline">ABOUT ME</h2>
        <div className="space-y-2 text-xxs gb-text-on-screen leading-relaxed">
          <p className="text-center">
            Hello! I'm a passionate game developer with a love for creating intuitive and engaging digital experiences.
            <br/>Driven by curiosity and a passion for creation, I've largely self-taught in game development
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
          </ul><br/>
          <h3 className="font-bold text-xs pt-1 font-headline">Certifications:</h3>
          <ul className="space-y-0.5">
            {certifications.map(cert => (
              <li key={cert.name} className="flex items-center justify-between text-xxs">
                <span>• {cert.name} ({cert.year})</span>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" aria-label={`View certificate for ${cert.name}`} className="hover:opacity-70 transition-opacity">
                  <LinkIcon className="w-3 h-3 opacity-70 gb-text-on-screen ml-1 shrink-0" />
                </a>
              </li>
            ))}
          </ul><br/>
          <p className="text-center">
            When I'm not coding, I enjoy exploring the latest advancements in technology and space.
            I'm always eager to learn and grow.
          </p>
        </div>
      </div>
    </ScreenContentWrapper>
  );
};

const ProjectsListView: React.FC<{ projects: Project[]; navigateTo: ScreenComponentProps['navigateTo'] }> = ({ projects, navigateTo }) => (
  <ScreenContentWrapper noOuterPadding>
    <div className="p-3 sm:p-4">
      <h2 className="text-sm font-bold gb-text-on-screen mb-2 text-center font-headline">PROJECTS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {projects.map(project => (
          <button
            key={project.id}
            onClick={() => navigateTo(`project-${project.id}` as ScreenView, project.id)}
            className="p-2 rounded border-2 border-screen-fg/30 hover:border-screen-fg/70 focus:border-screen-fg/70 gb-text-on-screen text-left transition-colors w-full focus:outline-none focus:ring-1 focus:ring-screen-fg pixelated"
            style={{ backgroundColor: 'hsl(var(--screen-bg))', boxShadow: 'inset 1px 1px 0px hsl(var(--screen-fg)/0.2), inset -1px -1px 0px hsl(var(--screen-fg)/0.2)'}}
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

const ProjectDetailView: React.FC<{ project: Project | undefined; }> = ({ project }) => {
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
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:underline">
                <LinkIcon className="w-3 h-3 gb-text-on-screen" /> <span>Live Demo</span>
              </a>
            )}
            {project.repoLink && (
              <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:underline">
                <Github className="w-3 h-3 gb-text-on-screen" /> <span>Repository</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </ScreenContentWrapper>
  );
};

const ContactView: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [emailServiceEnabled, setEmailServiceEnabled] = React.useState(true); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      toast({ title: "Input Error", description: "Please fill all fields.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({ title: "Input Error", description: "Please enter a valid email.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({ title: "Message Sent!", description: result.message || "Thanks for reaching out." });
        (event.target as HTMLFormElement).reset();
        setEmailServiceEnabled(true); 
      } else {
         const displayError = result.error || "Error Sending Message";
         let displayDetails = result.details || "Failed to send message. Please try again later.";

        if (displayDetails.includes("RESEND_API_KEY is not set") || (response.status === 500 && displayError.toLowerCase().includes("api key missing"))) {
            displayDetails = "Email service is not configured by the administrator.";
            setEmailServiceEnabled(false);
        } else if (result.name === 'missing_api_key' || result.message?.includes('API Key is required')) {
            displayDetails = "Email service configuration error (API Key). Contact administrator.";
            setEmailServiceEnabled(false);
        } else if (result.message?.includes('Invalid domain') || result.message?.includes('Sender not allowed')) {
            displayDetails = "Email service configuration error (Sender Domain). Contact administrator.";
            setEmailServiceEnabled(false);
        } else if (response.status === 503 && displayError === "Service Unavailable") {
            displayDetails = "The email service is currently unavailable or not configured.";
            setEmailServiceEnabled(false);
        }


        toast({
          title: displayError,
          description: displayDetails,
          variant: "destructive"
        });
        
        if (displayDetails.toLowerCase().includes("service not configured") || displayDetails.toLowerCase().includes("service configuration error") || displayDetails.toLowerCase().includes("service is currently unavailable")) {
          setEmailServiceEnabled(false);
        }
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({ title: "Error", description: "An unexpected error occurred. Please try again.", variant: "destructive" });
      setEmailServiceEnabled(false); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContentWrapper noOuterPadding>
      <div className="p-3 sm:p-4">
        <h2 className="text-sm font-bold gb-text-on-screen mb-2 text-center font-headline">CONTACT</h2>
        <div className="flex flex-col items-center pt-1">
          <form onSubmit={handleSubmit} className="space-y-1.5 w-full max-w-xs">
            <div>
              <label htmlFor="name" className="block text-xxs font-medium gb-text-on-screen mb-0.5">Name</label>
              <Input type="text" name="name" id="name" required placeholder="Your Name" disabled={isSubmitting || !emailServiceEnabled} className="bg-screen-bg border-screen-fg/50 gb-text-on-screen focus:ring-screen-fg text-xs h-8 placeholder:text-screen-fg placeholder:opacity-50 placeholder:text-xxs" />
            </div>
            <div>
              <label htmlFor="email" className="block text-xxs font-medium gb-text-on-screen mb-0.5">Email</label>
              <Input type="email" name="email" id="email" required placeholder="your.email@example.com" disabled={isSubmitting || !emailServiceEnabled} className="bg-screen-bg border-screen-fg/50 gb-text-on-screen focus:ring-screen-fg text-xs h-8 placeholder:text-screen-fg placeholder:opacity-50 placeholder:text-xxs" />
            </div>
            <div>
              <label htmlFor="message" className="block text-xxs font-medium gb-text-on-screen mb-0.5">Message</label>
              <Textarea name="message" id="message" rows={2} required placeholder="Your message here..." disabled={isSubmitting || !emailServiceEnabled} className="bg-screen-bg border-screen-fg/50 gb-text-on-screen focus:ring-screen-fg text-xs min-h-[48px] placeholder:text-screen-fg placeholder:opacity-50 placeholder:text-xxs" />
            </div>
             <p className="text-xxs gb-text-on-screen text-center opacity-70 pt-1">
              {isSubmitting ? 'Sending...' : (emailServiceEnabled ? 'Press (A) to Send' : 'Email service offline')}
            </p>
          </form>
        </div>
      </div>
    </ScreenContentWrapper>
  );
};


export default function ScreenComponent({
  currentView,
  projects,
  selectedProjectId,
  navigateTo,
  name,
  role,
  hasLandingAnimationPlayed,
  setHasLandingAnimationPlayed,
}: ScreenComponentProps) {
  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const renderView = () => {
    if (currentView === 'landing') {
      return <LandingView name={name} role={role} hasPlayedAnimation={hasLandingAnimationPlayed} setHasPlayedAnimation={setHasLandingAnimationPlayed} />;
    }
    if (currentView === 'about') {
      return <AboutView />;
    }
    if (currentView === 'projects') {
      return <ProjectsListView projects={projects} navigateTo={navigateTo} />;
    }
    if (currentView.startsWith('project-') && selectedProject) {
      return <ProjectDetailView project={selectedProject} />;
    }
    if (currentView === 'contact') {
      return <ContactView />;
    }
    return <ScreenContentWrapper><p className="gb-text-on-screen text-xxs">Select an option.</p></ScreenContentWrapper>;
  };

  return (
    <>
      <div className="gb-bg-screen w-full aspect-gb-screen rounded-sm border-2 border-neutral-900/70 shadow-inner overflow-hidden relative mb-5 sm:mb-6 pixelated"
        style={{
          boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.2), inset -2px -2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <div className="absolute inset-0 bg-black/5 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 50%, transparent 50%)', backgroundSize: '1px 2px' }}></div> {/* Scanlines */}
        {renderView()}
      </div>
    </>
  );
}

