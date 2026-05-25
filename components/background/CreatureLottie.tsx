'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export function CreatureLottie({ url }: { url: string }) {
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    let active = true;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (active) setAnimationData(data);
      })
      .catch((err) => console.error('Failed to load Lottie animation:', err));
    
    return () => {
      active = false;
    };
  }, [url]);

  if (!animationData) return null;

  return <Lottie animationData={animationData} loop={true} className="w-full h-full" />;
}
