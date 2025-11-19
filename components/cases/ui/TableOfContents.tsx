'use client';

import React, { useEffect, useState } from 'react';

interface SectionConfig {
  id: string;
  label: string;
  theme: 'light' | 'dark';
}

export const TableOfContents: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  const sections: SectionConfig[] = [
    { id: 'brand', label: 'Marca', theme: 'light' },
    { id: 'situation', label: 'Situación', theme: 'light' },
    { id: 'task', label: 'Tarea', theme: 'dark' },
    { id: 'action', label: 'Acción', theme: 'light' },
    { id: 'results', label: 'Resultados', theme: 'dark' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show TOC after scrolling past the Hero section (approx 70vh)
      const showThreshold = window.innerHeight * 0.7;
      setIsVisible(window.scrollY > showThreshold);

      // Determine active section based on scroll position
      const viewportMiddle = window.innerHeight / 2;
      let current = '';
      
      // Find the last section whose top is above the middle of the viewport
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < viewportMiddle) {
            current = section.id;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine theme based on active section for dynamic contrast
  const currentTheme = sections.find(s => s.id === activeSection)?.theme || 'light';
  const isDarkTheme = currentTheme === 'dark';
  
  // Adapted to Abra colors
  const textColor = isDarkTheme ? 'text-white' : 'text-[#04213B]';
  const lineColor = isDarkTheme ? 'bg-white' : 'bg-[#04213B]';
  const inactiveLineColor = isDarkTheme ? 'bg-white/30' : 'bg-[#04213B]/30';

  if (!isVisible) return null;

  return (
    <nav 
      className="hidden xl:flex fixed right-12 top-1/2 -translate-y-1/2 flex-col items-end gap-6 z-40 pointer-events-none"
      aria-label="Table of Contents"
    >
      <div className="pointer-events-auto flex flex-col items-end gap-5">
        {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex items-center gap-4 py-2 pl-8 transition-all duration-300"
                  aria-current={isActive ? 'location' : undefined}
                >
                  <span 
                    className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500 ${textColor} ${
                        isActive 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
                    }`}
                  >
                    {section.label}
                  </span>
                  
                  <div 
                    className={`h-[1px] transition-all duration-500 ease-out ${
                      isActive 
                      ? `${lineColor} w-12` 
                      : `${inactiveLineColor} w-6 group-hover:w-8 group-hover:${lineColor}`
                    }`} 
                  />
                </a>
            );
        })}
      </div>
    </nav>
  );
};

