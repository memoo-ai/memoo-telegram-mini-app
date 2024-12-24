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

const memooGo = import.meta.env.VITE_ROUTE_GO;
const airdropPath = import.meta.env.VITE_ROUTE_AIRDROP;
const imoPath = import.meta.env.VITE_ROUTE_AIRDROP;

const Home = () => {
  const navigate = useNavigate();
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
  return (
    <div className="flex flex-col ">
      <div className="home-banner mt-2 page_container">
        <div className="flex items-center w-full  gap-x-2">
          <ConnectWallet />
          <img src={memooGoImg} alt="" />
        </div>
        {/* <BackButton /> */}
        <div className="home-title-wrapper w-[132px] h-12 flex justify-center items-center mt-1 mx-auto relative">
          <h3 className="font-Kitty home-title">Featured</h3>
          <ITooltip title="Coming soon" className="absolute -right-4 top-[50%] translate-y-[-50%]" />
        </div>
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div className="flex items-center justify-center gap-x-4 mt-1">
            <div>1</div>
            <div>
              <Card item={trending} timeType="Countdown" timestamp={trending.endsIn}>
                <div className="flex items-center justify-center gap-x-2 text-10-10 text-purple">
                  TOKEN INFO
                  <IconArrow />
                </div>
              </Card>
            </div>
            <div>1</div>
          </div>
          <div className="flex flex-col items-start justify-between p-4 gap-x-4 mt-1 launch-app w-full h-[110px] relative">
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
    </div>
  );
};

export default Home;
