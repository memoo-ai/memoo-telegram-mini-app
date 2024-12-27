/* eslint-disable react/no-unstable-nested-components */
import Tabbar from '@/components/TabBar';
import './index.scss';
import StickyHeader from '@/components/StickyHeader';
import Select from '@/components/Select';
import { meSelectOptions } from '@/config';
import { useEffect, useMemo, useState } from 'react';
import HoverImage from '@/components/HoverImage';
import { ReferralType } from '@/types';
import { getUserReferral } from '@/api/join';
import { IconJoin } from '@/components/icons';
import { useNavigate } from 'react-router-dom';

import MeImg from '@/assets/images/icons/icon-me.svg';
import SettingImg from '@/assets/images/icons/icon-settings.svg';
import TaskImg from '@/assets/images/home/crownicon.svg';
import BellImg from '@/assets/images/home/bellicon.svg';
import alerts from '@/assets/images/landing/bellicon.svg';
import starburstImg from '@/assets/images/join/30starburst.svg';
import CollectionImg from '@/assets/images/icons/icon-collection.svg';
import ReturnImg from '@/assets/images/icons/icon-return.svg';
import ScoreImg from '@/assets/images/icons/icon-score.svg';

const returnPath = import.meta.env.VITE_ROUTE_RETURN;
const collectionPath = import.meta.env.VITE_ROUTE_COLLECTION;

const Mine = () => {
  const [activeKey, setActiveKey] = useState('1');
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [referral, setReferral] = useState<ReferralType>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // if (!address) return;

        const { data: referral } = await getUserReferral();
        setReferral(referral);
        setLoading(false);
      } catch (e) {
        console.log('getInvitationTop:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const params = useMemo(() => {
    return [
      {
        key: 'Rank',
        value: referral?.Rank ?? 0,
      },
      {
        key: 'Total Pts',
        value: referral?.Score ?? 0,
        formatKey: (key: string) => (
          <div className="font-404px text-green text-[12px] leading-none flex items-center gap-x-1">
            <IconJoin color="#00FFA3" width={12} height={12} />
            {key}
          </div>
        ),
      },
      {
        key: 'CONTRIBUTED PTS',
        value: referral?.invitationScore ?? 0,
        formatKey: (key: string) => (
          <div className="font-404px text-green text-[12px] leading-none flex items-center gap-x-1">
            <IconJoin color="#00FFA3" width={12} height={12} />
            {key}
          </div>
        ),
      },
      {
        key: 'BONUS CONTRIBUTORS',
        value: referral?.Invitations ?? 0,
      },
    ];
  }, [referral]);

  const options = [
    {
      key: 'COLLECTION',
      value: 'COLLECTION',
      commonSoon: false,
      img: CollectionImg,
      path: collectionPath,
    },
    {
      key: 'memoo go',
      value: 'memoo go',
      commonSoon: false,
      img: ReturnImg,
      path: returnPath,
    },
  ];
  return (
    <div className="page_tabbar">
      <StickyHeader text="Account" imgSrc={MeImg}>
        <Select
          className="mt-1 mb-2"
          options={meSelectOptions}
          onChange={(e) => setActiveKey(e)}
          defaultValue={meSelectOptions[1].key}
        />
      </StickyHeader>
      <div className="mine-content page_container">
        <div className=" mine-icons w-full pt-3 px-4 pb-2 rounded-[15px] relative">
          <div className="flex items-center gap-x-4">
            <HoverImage imgUrl={SettingImg} showBg={false} />
            <HoverImage imgUrl={alerts} text="ALERTS">
              <span className="absolute top-0 right-0 text-10-10 font-404px text-white flex items-center justify-center h-4 w-4 rounded-[50%] bg-[#F65845] border border-solid border-[#C13A2B]">
                9+
              </span>
            </HoverImage>
            <HoverImage imgUrl={TaskImg} text="TASKS" />
            <HoverImage imgUrl={BellImg} text={`INVITE\nFRIENDs`} />
          </div>
          <img className="w-[84px] h-[77px] absolute -right-4 -top-0.5" src={starburstImg} alt="" />
          <p className="font-OCR text-9-11 text-white text-center mt-1">
            Invite your friends and receive 30% of their points.
          </p>
        </div>
        <div className="mine-reward-points p-4 mt-10 relative">
          <div className="  absolute -top-9 left-[50%] -translate-x-[50%] mine-reward-points-title-bg">
            <h3 className="mine-reward-points-title  w-max h-12 px-4 flex items-center justify-center font-Kitty">
              Reward Points
            </h3>
            <img className="absolute -top-2 -right-11" src={ScoreImg} alt="" />
          </div>
          <div className="w-full flex items-center gap-x-2.5 flex-col gap-y-2.5">
            {params.map((item, index) => {
              return (
                <div key={item.key} className="mine-reward-points-item w-full flex items-center justify-between">
                  {/* {item?.formatKey ? (
                    item.formatKey(item.key)
                  ) : (
                    <div className="font-404px text-green text-[12px] leading-none max-lg:text-10-10">{item.key}</div>
                  )} */}
                  <div className="font-404px text-white text-12-10">{item.key}</div>
                  <div className="font-404px text-white text-2xl leading-5 max-lg:text-14-14">{item.value}</div>
                </div>
              );
            })}
          </div>
          <p className="font-OCR text-9-11 text-white text-center mt-2.5">Connect wallet to access Reward Points.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full h-max mt-4">
          {options.map((item, index) => (
            <div
              className="relative rounded-[15px] min-w-[156px] min-h-[92px] w-full flex flex-col items-end"
              key={index}
              onClick={() => {
                if (!item.commonSoon) {
                  navigate(item.path);
                }
              }}
            >
              <img
                className="absolute top-0 left-0 right-0 bottom-0 min-w-[156px] min-h-[92px] w-full"
                src={item.img}
                alt=""
              />
              {item.commonSoon && (
                <p className="absolute right-2.5 top-1.5 text-white text-10-14 p-1 bg-[#00000080] rounded">
                  COMING SOON
                </p>
              )}
              <p className="absolute bottom-3.5 left-[50%] -translate-x-[50%] text-white font-Kitty whitespace-nowrap text-14-14 text-stroke">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Mine;
