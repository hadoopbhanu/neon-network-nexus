
import { useEffect, useState } from 'react';

// Intersection Observer hook for triggering animations when element is visible
export const useInView = (options = {}) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [setRef, isInView];
};

// Staggered animation for child elements
export const staggeredAnimations = (index: number, delayIncrement = 100) => {
  return {
    className: `animate-fade-in`,
    style: { animationDelay: `${index * delayIncrement}ms` }
  };
};

// Randomize float animation delay
export const randomFloatDelay = () => {
  const delays = ['animate-delay-100', 'animate-delay-200', 'animate-delay-300', 'animate-delay-400', 'animate-delay-500'];
  return delays[Math.floor(Math.random() * delays.length)];
};

// Parallax effect
export const useParallax = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};
