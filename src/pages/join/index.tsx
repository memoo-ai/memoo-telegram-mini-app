import { useRef, useState, useEffect, useMemo } from 'react';
import './index.scss';
import { Button, Tabs } from 'antd';
import { useCallback } from 'react';
import Referral from './referral';
import BonusTasks from './bonus-tasks';
import Earn from './earn';
import Scoreboard from './scoreboard';
import isMobile from 'is-mobile';
import PageFixed from '@/components/PageFixed';
import { IconInviteUser, IconEarn, IconTasks, IconTrophy } from '@/components/icons';
import { useSearchParams } from 'react-router-dom';
import Tabbar from '@/components/TabBar';
import StickyHeader from '@/components/StickyHeader';
import JoinImg from '@/assets/images/icons/icon-join.svg';

const joinUrl = import.meta.env.VITE_ROUTE_JOIN;
const Join = () => {
  const [activeKey, setActiveKey] = useState('Referral');
  const [searchParams] = useSearchParams();
  const onChange = useCallback((e: any) => {
    setActiveKey(e);
  }, []);

  useEffect(() => {
    const query = searchParams.get('tab');
    if (query) {
      setActiveKey(query);
    }
  }, [searchParams]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authData = {
      id: queryParams.get('id'),
      first_name: queryParams.get('first_name'),
      last_name: queryParams.get('last_name'),
      username: queryParams.get('username'),
      photo_url: queryParams.get('photo_url'),
      auth_date: queryParams.get('auth_date'),
      hash: queryParams.get('hash'),
    };

    const state = queryParams.get('state');
    const storedState = sessionStorage.getItem('telegram_auth_state');

    if (authData.hash && state === storedState) {
      console.log('telegram_auth_state');
      sessionStorage.removeItem('telegram_auth_state');
    }
  }, []);

  const items: any = useMemo(() => {
    return [
      {
        key: 'Referral',
        label: (
          <div className="flex flex-col items-center gap-y-1.5 ">
            <IconInviteUser
              className="hidden max-lg:flex w-4 h-4"
              color={activeKey === 'Referral' ? '#B53BFF' : '#00C48C'}
              hoverColor={activeKey === 'Referral' ? '#B53BFF' : '#00C48C'}
            />
            <span className="max-lg:!text-10-8">Referral</span>
          </div>
        ),
        children: <Referral />,
      },
      {
        key: 'BonusTasks',
        label: (
          <div className="flex flex-col items-center gap-y-1.5 ">
            <IconTasks
              className="hidden max-lg:flex w-4 h-4"
              color={activeKey === 'BonusTasks' ? '#B53BFF' : '#00C48C'}
              hoverColor={activeKey === 'BonusTasks' ? '#B53BFF' : '#00C48C'}
            />
            <span className="max-lg:!text-10-8">Bonus Tasks</span>
          </div>
        ),
        children: <BonusTasks />,
      },
      {
        key: 'HOW TO EARN',
        label: (
          <div className="flex flex-col items-center gap-y-1.5 ">
            <IconEarn
              className="hidden max-lg:flex w-4 h-4"
              color={activeKey === 'HOW TO EARN' ? '#B53BFF' : '#00C48C'}
              hoverColor={activeKey === 'HOW TO EARN' ? '#B53BFF' : '#00C48C'}
            />
            <span className="max-lg:!text-10-8">HOW TO EARN</span>
          </div>
        ),
        children: <Earn />,
      },
      {
        key: 'Scoreboard',
        label: (
          <div className="flex flex-col items-center gap-y-1.5 ">
            <IconTrophy
              className="hidden max-lg:flex w-4 h-4"
              color={activeKey === 'Scoreboard' ? '#B53BFF' : '#00C48C'}
              hoverColor={activeKey === 'Scoreboard' ? '#B53BFF' : '#00C48C'}
            />
            <span className="max-lg:!text-10-8">Scoreboard</span>
          </div>
        ),
        children: <Scoreboard />,
      },
    ];
  }, [activeKey]);

  // const search = useCallback(async () => {
  //   // TODO
  //   try {
  //     console.log('keyword:', keyword);
  //     if (!keyword) {
  //       message.error('Please input address!', { className: '!mt-[130px]' });
  //       return;
  //     }
  //     setLoading(true);
  //     const { data } = await searchUserRanking(keyword);
  //     console.log('searchUserRanking:', data);
  //     if (data && data.length > 0) {
  //       setLoading(false);
  //       setSearchList(data);
  //       return true;
  //     } else {
  //       setLoading(false);
  //       message.error('address not found', { className: '!mt-[130px]' });
  //       return false;
  //     }
  //   } catch (e) {
  //     console.log('searchUserRanking:', e);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [keyword]);
  const BotId = import.meta.env.VITE_BOT_ID;
  const loginTelegram = () => {
    (window as any).Telegram.Login.auth(
      {
        bot_id: BotId,
        request_access: 'write',
        embed: 1,
      },
      (data: any) => {
        console.log(data, 'this is callback data');
        if (data) {
          // telegramBind(data);
        }
      },
    );
  };

  return (
    <div className=" page_tabbar">
      <div className="w-full ">
        <StickyHeader text="EaRN Rewards" imgSrc={JoinImg}>
          <div className="mb-2 flex items-center justify-between h-[46px] bg-[#5E0198] border border-solid border-[#c273f2] rounded-[10px] p-0.5 mt-0.5">
            {items.map((item: any) => {
              return (
                <div
                  key={item.key}
                  className={`font-404px text-14-14 h-full flex items-center justify-center flex-col px-2 ${activeKey === item.key ? 'active-tab text-purple rounded-[9px]' : ' text-green'}`}
                  onClick={() => onChange(item.key)}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </StickyHeader>

        <div className="w-full page_container relative">
          {items.map((item: any) => {
            return activeKey === item.key && item.children;
          })}
        </div>
      </div>
    </div>
  );
};
export default Join;
