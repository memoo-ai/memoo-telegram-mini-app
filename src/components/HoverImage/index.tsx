import React, { useState } from 'react';
import './index.scss';
import { IconBg } from '../icons';

interface HoverImageProps {
  imgUrl?: string;
  bgUrl?: string;
  style?: React.CSSProperties;
  className?: string;
  rootClassName?: string;
  imgClassName?: string;
  text?: string;
  iconColor?: string;
  iconBorderColor?: string;
  iconHoverColor?: string;
  iconBorderHoverColor?: string;
  children?: React.ReactNode;
  showBg?: boolean;
  canClick?: boolean;
}

const HoverImage = ({
  imgUrl,
  bgUrl,
  style,
  className,
  rootClassName = 'w-12 h-12',
  imgClassName = 'top-0 left-[50%] translate-x-[-50%]',
  text,
  iconColor = '#7B0ABF',
  iconBorderColor = '#B53BFF',
  iconHoverColor = '#ffb43b',
  iconBorderHoverColor = '#ffe83b',
  children,
  showBg = true,
  canClick = true,
  ...rest
}: HoverImageProps) => {
  const [isTouch, setIsTouch] = useState(false);

  return (
    <div
      className={rootClassName}
      {...rest}
      onTouchStart={() => {
        if (!canClick) return;
        setIsTouch(true);
      }}
      onTouchEnd={() => {
        if (!canClick) return;
        setIsTouch(false);
      }}
      onMouseEnter={() => {
        if (!canClick) return;
        setIsTouch(true);
      }}
      onMouseLeave={() => {
        if (!canClick) return;
        setIsTouch(false);
      }}
    >
      <div className={`${isTouch ? 'image-touch' : ''} relative w-full h-full flex items-end`}>
        {showBg &&
          (bgUrl ? (
            <img className="absolute" src={bgUrl} alt="" />
          ) : (
            <IconBg
              className="absolute"
              color={isTouch ? iconHoverColor : iconColor}
              borderColor={isTouch ? iconBorderHoverColor : iconBorderColor}
            />
          ))}
        <img className={`absolute ${imgClassName}`} src={imgUrl} alt="" />
        <span className="font-404px text-stroke text-10-10 z-10 text-white text-center w-full whitespace-pre">
          {text}
        </span>
        {children}
      </div>
    </div>
  );
};

export default HoverImage;
