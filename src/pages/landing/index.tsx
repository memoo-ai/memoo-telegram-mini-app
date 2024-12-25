import './index.scss';
import { useNavigate } from 'react-router-dom';
import ConnectWallet from '@/components/ConnectWallet';
import memooTapIcon from '@/assets/images/landing/momoo_tap.svg';
import babyMemoo from '@/assets/images/landing/baby_Memoo.png';
import gold1 from '@/assets/images/landing/gold1.png';
import gold2 from '@/assets/images/landing/gold2.png';
import gold3 from '@/assets/images/landing/gold3.png';
import gold4 from '@/assets/images/landing/gold4.png';
import gold5 from '@/assets/images/landing/gold5.png';
import memooPlay from '@/assets/images/landing/memoo_play_bg.png';
import memooGo from '@/assets/images/landing/memoo_go_bg.png';
import IconBrowser from '@/assets/images/landing/website.svg';
import IconFriend from '@/assets/images/landing/communityicon.svg';
import IconTwitter from '@/assets/images/landing/Twitter.svg';
import MemooIcon from '@/assets/images/landing/memoo.png';
import playIcon from '@/assets/images/landing/play.png';
import goIcon from '@/assets/images/landing/go.png';
import alerts from '@/assets/images/landing/bellicon.svg';
import collabs from '@/assets/images/landing/collabicon.svg';
import purpleBg from '@/assets/images/landing/bg-purple.svg';
import switchGame from '@/assets/images/switchGame.png';
import HoverImage from '@/components/HoverImage';

const homePath = import.meta.env.VITE_ROUTE_HOME;
const earnPath = import.meta.env.VITE_ROUTE_HOME;
const website = import.meta.env.VITE_WEBSITE;
const twitterLink = import.meta.env.VITE_LINK_TWITTER;
const Landing = () => {
  const navigate = useNavigate();
  const news = 10;
  const options = [
    {
      key: 'memoo go',
      value: 'memoo go',
      commonSoon: true,
      img: memooPlay,
      icon: playIcon,
      path: null,
    },
    {
      key: 'memoo go',
      value: 'memoo go',
      commonSoon: false,
      img: memooGo,
      icon: goIcon,
      path: homePath,
    },
  ];

  return (
    <div className="landing-page h-screen page_container flex flex-col items-center">
      <div className="flex justify-between items-center w-full mt-2">
        <ConnectWallet />
        <div className="flex items-center gap-x-2 ">
          <div className="icon_before">
            <div
              className="flex items-center justify-center px-2 bg-[#B53BFF] rounded-[7px] w-[34px] h-[31px]"
              onClick={() => window.open(twitterLink)}
            >
              <img src={IconTwitter} alt="" />
            </div>
          </div>
          <div className="icon_before">
            <div className="flex  pl-1 bg-[#B53BFF] rounded-[7px] w-[34px] h-[31px]" onClick={() => navigate(earnPath)}>
              <img src={IconFriend} alt="" />
            </div>
          </div>
          <div className="icon_before">
            <div
              className="flex pt-1 pl-1.5 bg-[#B53BFF] rounded-[7px] w-[34px] h-[31px] "
              onClick={() => window.open(website)}
            >
              <img src={IconBrowser} alt="" />
            </div>
          </div>
        </div>
      </div>
      <img className="mt-4" src={memooTapIcon} alt="" />
      <div className="mt-4 relative w-full flex items-center justify-center">
        <div className=" memoo-baby">
          <img src={babyMemoo} alt="" />
          <img className="absolute top-[73px] -left-[10px]" src={gold1} alt="" />
          <img className="absolute top-[105px] -left-[42px]" src={gold2} alt="" />
          <img className="absolute top-[169px] -left-[17px]" src={gold3} alt="" />
          <img className="absolute top-[90px] -right-[59px]" src={gold4} alt="" />
          <img className="absolute top-[141px] -right-[29px]" src={gold5} alt="" />
        </div>
        <div className="absolute right-0 bottom-[36px] flex flex-col gap-y-2.5 w-12 h-[114px]">
          <HoverImage imgUrl={collabs} text="COLLABS" />
          <HoverImage imgUrl={alerts} text="ALERTS">
            <span className="absolute top-0 right-0 text-10-10 font-404px text-white flex items-center justify-center h-4 w-4 rounded-[50%] bg-[#F65845] border border-solid border-[#C13A2B]">
              {news > 9 ? '9+' : news}
            </span>
          </HoverImage>
          {/* <div className="relative w-12 h-12 flex items-end">
            <img className="absolute" src={purpleBg} alt="" />
            <img className="absolute" src={alerts} alt="" />

            <span className="font-404px text-stroke text-10-10 z-10 text-white text-center w-full">ALERTS</span>
          </div> */}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {options.map((item, index) => (
          <div
            className="relative rounded-[15px] grid-item min-w-[156px] min-h-[156px] w-full"
            key={index}
            onClick={() => {
              if (!item.commonSoon) {
                navigate(item.path);
              }
            }}
          >
            <img
              className="absolute top-0 left-0 right-0 bottom-0 min-w-[156px] min-h-[156px] w-full"
              src={item.img}
              alt=""
            />
            {item.commonSoon && (
              <p className="absolute right-2.5 top-1.5 text-white text-10-14 p-1 bg-[#00000080] rounded">COMING SOON</p>
            )}
            {/* <p className="absolute bottom-3.5 left-[50%] -translate-x-[50%] text-white font-Kitty">memoo go</p> */}
            <div className="flex items-center justify-center absolute bottom-3.5 left-[50%] -translate-x-[50%]">
              <img src={MemooIcon} alt="" />
              <img src={item.icon} alt="" />
            </div>
          </div>
        ))}

        {/* <div onClick={() => navigate(homePath)}>memoo go</div> */}
      </div>
    </div>
  );
};

export default Landing;
