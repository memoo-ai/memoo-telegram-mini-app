import React, { useEffect, useRef, memo, useState } from 'react';
import isMobile from 'is-mobile';
import './index.scss';

interface PageFixedProps {
  top?: number;
  className?: string;
  children: React.ReactNode;
}

const PageFixed = memo(({ children, top = 0, className, ...rest }: PageFixedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const isMobileDevice = useRef(isMobile());
  const initialPositionRef = useRef<number | null>(null);

  const [bannerHeight, setBannerHeight] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    if (bannerRef.current) {
      const height = bannerRef.current.offsetHeight;
      setBannerHeight(height);

      if (initialPositionRef.current === null) {
        initialPositionRef.current = bannerRef.current.getBoundingClientRect().top;
      }
    }
  }, []);

  useEffect(() => {
    if (!isMobileDevice.current || !containerRef.current) return;

    const updatePosition = () => {
      if (!containerRef.current || initialPositionRef.current === null) return;

      const currentTop = containerRef.current.getBoundingClientRect().top;
      const shouldBeFixed = currentTop <= top;

      if (shouldBeFixed !== isFixed) {
        setIsFixed(shouldBeFixed);
      }
    };

    const handleScroll = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed, top]);

  if (!isMobileDevice.current) return null;

  return (
    <div ref={containerRef} className={className}>
      {/* <div
        style={{
          height: isFixed ? bannerHeight : 0,
          transition: 'height 0.1s ease-out',
        }}
      /> */}

      <div
        ref={bannerRef}
        {...rest}
        style={{
          position: isFixed ? 'fixed' : 'relative',
          top: isFixed ? `0` : undefined,
          zIndex: 10,
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
});

PageFixed.displayName = PageFixed.name;

export default PageFixed;
