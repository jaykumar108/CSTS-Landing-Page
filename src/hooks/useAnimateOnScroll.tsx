import { useEffect, useRef, RefObject } from 'react';

type AnimationOptions = {
  threshold?: number;
  rootMargin?: string;
  animateOnce?: boolean;
  animationClass?: string;
};

export function useAnimateOnScroll<T extends HTMLElement>(
  options: AnimationOptions = {}
): RefObject<T> {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    animateOnce = true,
    animationClass = 'animate-fadeIn'
  } = options;
  
  const ref = useRef<T>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            
            if (animateOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!animateOnce) {
            entry.target.classList.remove(animationClass);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );
    
    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, animateOnce, animationClass]);
  
  return ref;
}