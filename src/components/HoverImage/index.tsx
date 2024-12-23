import React, { useState } from 'react';

interface HoverImageProps {
  defaultSrc?: string;
  hoverSrc?: string;
  style?: React.CSSProperties;
  className?: string;
}

const HoverImage = ({ defaultSrc, hoverSrc, style, className }: HoverImageProps) => {
  const [bgImage, setBgImage] = useState(defaultSrc);

  const handleTouchStart = () => setBgImage(hoverSrc);
  const handleTouchEnd = () => setBgImage(defaultSrc);

  const handleMouseEnter = () => setBgImage(hoverSrc);
  const handleMouseLeave = () => setBgImage(defaultSrc);

  return (
    <div
      className={className}
      style={{
        width: '200px',
        height: '200px',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        ...style,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default HoverImage;
