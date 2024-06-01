import { RefObject, useEffect, useState } from 'react';

interface IntersectionCustomOptions {
  ref: RefObject<HTMLElement | null>;
  options?: {
    root: null;
    rootMargin: '0px';
    threshold: 0.1;
  };
}

function useIntersectionObserver({ ref, options }: IntersectionCustomOptions) {
  const [isInterSecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => setIsIntersecting(entry.isIntersecting));
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options, ref]);

  return {
    isInterSecting,
  };
}

export { useIntersectionObserver };
