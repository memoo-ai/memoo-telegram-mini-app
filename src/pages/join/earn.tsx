import isMobile from 'is-mobile';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const createPath = import.meta.env.VITE_ROUTE_CREATE;
const launchpadPath = import.meta.env.VITE_ROUTE_LAUNCHPAD;
const geckoPath = import.meta.env.VITE_ROUTE_GECKO;
const joinPath = import.meta.env.VITE_ROUTE_JOIN;
const Earn = () => {
  const navigate = useNavigate();
  const options = useMemo(() => {
    return [
      {
        key: 'Create a meme token',
        value: 100,
        link: createPath,
      },
      {
        key: 'MeMoo Score of 70',
        value: 200,
        link: createPath,
      },
      {
        key: 'Participate in token IMO',
        value: 10,
        link: launchpadPath,
      },
      {
        key: 'Make a DEX trade',
        value: 5,
        link: geckoPath,
      },
      {
        key: 'Complete bonus tasks',
        value: 1700,
        link: `${joinPath}?tab=BonusTasks`,
      },
      {
        key: 'Invite friends and earn from them',
        value: '30%',
        formatValue: (value: number | string) => {
          return `${value} Boost`;
        },
        link: `${joinPath}?tab=Referral`,
      },
    ];
  }, []);
  return (
    <div className="flex flex-col justify-center items-center pt-7 pb-12">
      <h3 className="font-404px text-2xl leading-none text-white max-lg:text-14-14 max-lg:mt-6">
        CLIMB THE SCOREBOARD
      </h3>
      <h5 className="font-OCR text-sm leading-none text-[#9EA2C7] max-lg:text-9-9 whitespace-nowrap">
        As a trailblazer on Memoo, become the alpha and get rewarded.
      </h5>
      <h5 className="font-OCR text-sm leading-none text-[#9EA2C7] max-lg:text-9-9 whitespace-nowrap">
        Check for reward updates on our twitter and telegram.
      </h5>
      <div className="w-full bg-[#2C1844] border border-solid border-[#B53BFF] rounded-[7px] flex flex-col mt-5 p-5 max-lg:p-0 relative max-lg:bg-transparent max-lg:border-none">
        {/* <img className="w-[92px] h-[85px] absolute right-1.5 -top-5" src="/join/30starburst.png" alt="" /> */}
        <h3 className="font-404px text-green text-base leading-[18px] max-lg:text-14-16">HOW TO EARN?</h3>
        <h3 className="font-OCR text-sm leading-[18px] text-[#9EA2C7] mt-2 max-lg:text-9-9">
          Connect wallet and complete these tasks to earn points.
        </h3>
        <ul className="flex flex-col gap-y-2.5 mt-5">
          {options.map((item, index) => {
            return (
              <li
                key={item.key}
                className="w-full flex items-center justify-between font-OCR text-[18px] leading-[18px] border border-solid rounded-[7px] bonus p-2.5 bg-[#2C1844] border-[#B53BFF] text-white hover:bg-[#B53BFF]"
                onClick={() => navigate(item.link)}
              >
                <span className="font-OCR text-[18px] leading-[18px] max-lg:text-10-12">
                  {`${index >= 10 ? '' : 0}${index + 1}`} / {item.key}
                </span>
                <var
                  className={`${!isMobile() && 'points-btn'} px-0.5 py-1 max-lg:p-0 max-lg:font-404px max-lg:text-8-8`}
                >
                  {item.formatValue ? item.formatValue(item.value) : `${item.value} points`}
                </var>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Earn;
