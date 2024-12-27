import { useEffect, useRef, useState } from 'react';
import ConnectWallet from '../ConnectWallet';
import HoverImage from '../HoverImage';
import ITooltip from '../ITooltip';
import './index.scss';

import SwitchGame from '@/assets/images/icons/switch-game.svg';

interface StickyHeaderProps {
  text: string;
  imgSrc?: string;
  children?: React.ReactNode;
}
const StickyHeader = ({ text, imgSrc, children, ...rest }: StickyHeaderProps) => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (stickyRef.current) {
      setHeight(stickyRef.current.offsetHeight);
    }
  }, []);
  return (
    <div>
      <div style={{ height: `${height}px` }} />
      <div ref={stickyRef} className="flex flex-col sticky-header w-screen fixed top-0 z-10 px-4 pt-3" {...rest}>
        <ConnectWallet />
        <div className=" relative">
          <div className="sticky-header-title w-max h-12 px-7 flex justify-center items-center mt-1 mx-auto relative">
            <h3 className="font-Kitty header-title">{text}</h3>
            {/* <ITooltip title="Coming soon" className="absolute -right-4 top-[50%] translate-y-[-50%]" /> */}
            <ITooltip title="Coming soon" className="absolute -right-4 bottom-1" />
          </div>
          <img className=" absolute -top-9 left-1/2 -translate-x-1/2" src={imgSrc} alt="" />
        </div>
        <div className="absolute top-3 right-4">
          <HoverImage imgUrl={SwitchGame} text={`SWITCH TO\nGAME`} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default StickyHeader;
