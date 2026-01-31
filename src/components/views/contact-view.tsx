"use client";

import React, { useState, useRef, useCallback, useEffect, memo, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScreenContentWrapper } from './landing-view';

export const ContactView: React.FC = memo(() => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailServiceEnabled, setEmailServiceEnabled] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleSubmitEvent = () => {
      if (formRef.current) {
        const name = nameInputRef.current?.value;
        const email = emailInputRef.current?.value;
        const message = messageInputRef.current?.value;

        if (!name || !email || !message) {
          toast({ 
            title: "Form Incomplete", 
            description: "Please fill all fields in the contact form.", 
            variant: "destructive"
          });
          return;
        }

        formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    };

    window.addEventListener('submit-contact-form', handleSubmitEvent);
    return () => window.removeEventListener('submit-contact-form', handleSubmitEvent);
  }, [toast]);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const message = messageInputRef.current?.value;

    if (!name || !email || !message) {
      toast({ 
        title: "Input Error", 
        description: "Please fill all fields.", 
        variant: "destructive" 
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({ 
        title: "Input Error", 
        description: "Please enter a valid email.", 
        variant: "destructive" 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({ 
          title: "Message Sent!", 
          description: result.message || "Thanks for reaching out." 
        });
        formRef.current?.reset();
        setEmailServiceEnabled(true);
      } else {
        const displayError = result.error || "Error Sending Message";
        let displayDetails = result.details || "Failed to send message. Please try again later.";

        if (displayDetails.includes("RESEND_API_KEY is not set") || 
            (response.status === 500 && displayError.toLowerCase().includes("api key missing"))) {
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
        
        if (displayDetails.toLowerCase().includes("service not configured") || 
            displayDetails.toLowerCase().includes("service configuration error") || 
            displayDetails.toLowerCase().includes("service is currently unavailable")) {
          setEmailServiceEnabled(false);
        }
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({ 
        title: "Error", 
        description: "An unexpected error occurred. Please try again.", 
        variant: "destructive" 
      });
      setEmailServiceEnabled(false);
    } finally {
      setIsSubmitting(false);
    }
  }, [toast]);

  return (
    <ScreenContentWrapper noOuterPadding>
      <div className="p-3 sm:p-4">
        <h2 className="text-sm font-bold gb-text-on-screen mb-2 text-center font-headline">CONTACT</h2>
        <div className="flex flex-col items-center pt-1">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-1.5 w-full max-w-xs">
            <div>
              <label htmlFor="name" className="block text-xxs font-medium gb-text-on-screen mb-0.5">
                Name
              </label>
              <Input 
                ref={nameInputRef}
                type="text" 
                name="name" 
                id="name" 
                required 
                placeholder="Your Name" 
                disabled={isSubmitting || !emailServiceEnabled} 
                className="bg-screen-bg border-screen-fg/50 gb-text-on-screen focus:ring-screen-fg text-xs h-8 placeholder:text-screen-fg placeholder:opacity-50 placeholder:text-xxs" 
                aria-label="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xxs font-medium gb-text-on-screen mb-0.5">
                Email
              </label>
              <Input 
                ref={emailInputRef}
                type="email" 
                name="email" 
                id="email" 
                required 
                placeholder="your.email@example.com" 
                disabled={isSubmitting || !emailServiceEnabled} 
                className="bg-screen-bg border-screen-fg/50 gb-text-on-screen focus:ring-screen-fg text-xs h-8 placeholder:text-screen-fg placeholder:opacity-50 placeholder:text-xxs" 
                aria-label="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xxs font-medium gb-text-on-screen mb-0.5">
                Message
              </label>
              <Textarea 
                ref={messageInputRef}
                name="message" 
                id="message" 
                rows={2} 
                required 
                placeholder="Your message here..." 
                disabled={isSubmitting || !emailServiceEnabled} 
                className="bg-screen-bg border-screen-fg/50 gb-text-on-screen focus:ring-screen-fg text-xs min-h-[48px] placeholder:text-screen-fg placeholder:opacity-50 placeholder:text-xxs" 
                aria-label="Your Message"
              />
            </div>
            <p className="text-xxs gb-text-on-screen text-center opacity-70 pt-1" aria-live="polite">
              {isSubmitting ? 'Sending...' : (emailServiceEnabled ? 'Press (A) to Send' : 'Email service offline')}
            </p>
          </form>
        </div>
      </div>
    </ScreenContentWrapper>
  );
});

ContactView.displayName = 'ContactView';
