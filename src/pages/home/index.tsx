import './index.scss';
import { useNavigate } from 'react-router-dom';
import ConnectWallet from '@/components/ConnectWallet';
import { Button } from 'antd';
import BackButton from '@/components/BackButton';
import ITooltip from '@/components/ITooltip';
import Card from '@/components/Card';
import { IconArrow } from '@/components/icons';
import ImoImg from '@/assets/images/home/imo.png';
import memooGoImg from '@/assets/images/home/memoo-go.png';
import AirdropImg from '@/assets/images/home/airdrop.png';
import LaunchAppImg from '@/assets/images/home/launch-app.png';
import HoverImage from '@/components/HoverImage';
import Countdown from '@/components/Countdown';
import TaskImg from '@/assets/images/home/crownicon.svg';
import BellImg from '@/assets/images/home/bellicon.svg';
import NewsImg from '@/assets/images/home/news.svg';
import EndsIn from '@/assets/images/home/endsin.svg';
import { useEffect, useState } from 'react';
import { getTrendingToken } from '@/api/token';

const landingPath = import.meta.env.VITE_ROUTE_LANDING;
const airdropPath = import.meta.env.VITE_ROUTE_AIRDROP;
const imoPath = import.meta.env.VITE_ROUTE_IMO;
const website = import.meta.env.VITE_WEBSITE;

const Home = () => {
  const navigate = useNavigate();
  const [trendToken, setTrendToken] = useState<any>({});
  const options = [
    {
      key: 'airdrop',
      value: 'HUNT FREE\nAIRDROPS',
      commonSoon: false,
      img: AirdropImg,
      path: airdropPath,
    },
    {
      key: 'imo',
      value: 'GET IN EARLY\nON NEW MEMES',
      commonSoon: false,
      img: ImoImg,
      path: imoPath,
    },
  ];

  const trending = {
    endsIn: 1660000000000,
    title: 'HUNT FREE AIRDROPS',
    description: 'HUNT FREE AIRDROPS',
    image: AirdropImg,
    link: airdropPath,
  };

  useEffect(() => {
    (async () => {
      const { data } = await getTrendingToken();
      setTrendToken(data?.[0]);
    })();
  }, []);

  return (
    <div className="flex flex-col page_tabbar">
      <div className="home-banner mt-2 page_container">
        <div className="flex items-center w-full  gap-x-2">
          <ConnectWallet />
          <img src={memooGoImg} alt="" />
        </div>

        <div className=" relative">
          <BackButton className="absolute left-1.5 top-4" path={landingPath} />
          <div className="home-title-wrapper w-[132px] h-12 flex justify-center items-center mt-1 mx-auto relative">
            <h3 className="font-Kitty home-title">Featured</h3>
            <ITooltip title="Coming soon" className="absolute -right-4 top-[50%] translate-y-[-50%]" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div className="flex items-center justify-center gap-x-4 mt-1">
            <div className="flex flex-col gap-y-2.5">
              <HoverImage imgUrl={EndsIn} text="Ends IN" canClick={false} showBg={false} />
              <Countdown
                className="flex flex-col gap-x-1 font-OCR text-9-10 text-white"
                timefragments=""
                format={([days, hours, minutes, seconds]) => [
                  <div key="hours" className="bg-[#000000] px-1">
                    <time className="font-OCR text-lg leading-5 text-white">{hours}</time>
                    <span className="font-OCR text-lg leading-5 text-white">h</span>
                  </div>,
                  <div key="minutes" className="bg-[#000000] px-1">
                    <time className="font-OCR text-lg leading-5 text-white">{minutes}</time>
                    <span className="font-OCR text-lg leading-5 text-white">m</span>
                  </div>,
                  <div key="seconds">
                    <time className="font-OCR text-lg leading-5 text-white">{seconds}</time>
                    <span className="font-OCR text-lg leading-5 text-white">s</span>
                  </div>,
                ]}
                instant={Number(trendToken?.endsIn) * 1000}
                // instant={1720510654000}
                onEnded={(ended) => {
                  // setEnded(ended);
                }}
                symbol=""
              />
            </div>
            <div className="card-shadow">
              <Card item={trendToken} timeType="Countdown" timestamp={trending.endsIn}>
                <div className="flex items-center justify-center gap-x-2 text-10-10 text-purple">
                  TOKEN INFO
                  <IconArrow />
                </div>
              </Card>
            </div>
            <div className="flex flex-col gap-y-4">
              <HoverImage imgUrl={TaskImg} text="TASKS" />
              <HoverImage imgUrl={BellImg} text={`INVITE\nFRIENDs`} />
              <HoverImage
                className="mt-2"
                imgClassName="-top-2 left-[50%] translate-x-[-50%]"
                imgUrl={NewsImg}
                text={`News And\nUPDATES`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-4 page_container mt-4">
        <div
          className="flex flex-col items-start justify-between p-4 gap-x-4 mt-1 launch-app w-full h-[110px] relative"
          onClick={() => window.open(website, '_blank')}
        >
          <span className="font-404px whitespace-pre-wrap text-white text-stroke text-14-14">{`LAUNCH MEMOO APP\nfor FULL EXPERIENCE`}</span>
          <div className="button_after_reverse">
            <Button className="memoo_button  !rounded-[15px]  h-6 z-10">LAUNCH APP</Button>
          </div>
          <img className="absolute -top-3 right-6" src={LaunchAppImg} alt="" />
        </div>
        <div className="grid grid-cols-2 gap-4 w-full ">
          {options.map((item, index) => (
            <div
              className="relative rounded-[15px] grid-item min-w-[156px] min-h-[110px] w-full"
              key={index}
              onClick={() => {
                if (!item.commonSoon) {
                  console.log(item.path);
                  navigate(item.path);
                }
              }}
            >
              <img
                className="absolute top-0 left-0 right-0 bottom-0 min-w-[156px] min-h-[110px] w-full"
                src={item.img}
                alt=""
              />
              {item.commonSoon && (
                <p className="absolute right-2.5 top-1.5 text-white text-10-14 p-1 bg-[#00000080] rounded">
                  COMING SOON
                </p>
              )}
              <p className="absolute bottom-1 left-[50%] -translate-x-[50%] text-white font-404px text-stroke whitespace-pre-wrap w-full text-center text-14-14">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
