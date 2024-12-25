import React, { useState } from 'react';

interface HoverImageProps {
  defaultSrc?: string;
  hoverSrc?: string;
  style?: React.CSSProperties;
  className?: string;
  rootClassName?: string;
  width?: number;
  height?: number;
}

const HoverImage = ({
  defaultSrc,
  hoverSrc,
  style,
  className,
  rootClassName,
  width,
  height,
  ...rest
}: HoverImageProps) => {
  const [bgImage, setBgImage] = useState(defaultSrc);

  const handleTouchStart = () => setBgImage(hoverSrc);
  const handleTouchEnd = () => setBgImage(defaultSrc);

  const handleMouseEnter = () => setBgImage(hoverSrc);
  const handleMouseLeave = () => setBgImage(defaultSrc);

  return (
    <div className={rootClassName} {...rest}>
      <div
        className={className}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: `url(${bgImage}) no-repeat center center`,
          backgroundSize: 'cover',
          ...style,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default HoverImage;
