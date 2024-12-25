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
              color={activeKey === 'Referral' ? '#00C48C' : '#B53BFF'}
              hoverColor={activeKey === 'Referral' ? '#00C48C' : '#B53BFF'}
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
              color={activeKey === 'BonusTasks' ? '#00C48C' : '#B53BFF'}
              hoverColor={activeKey === 'BonusTasks' ? '#00C48C' : '#B53BFF'}
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
              color={activeKey === 'HOW TO EARN' ? '#00C48C' : '#B53BFF'}
              hoverColor={activeKey === 'HOW TO EARN' ? '#00C48C' : '#B53BFF'}
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
              color={activeKey === 'Scoreboard' ? '#00C48C' : '#B53BFF'}
              hoverColor={activeKey === 'Scoreboard' ? '#00C48C' : '#B53BFF'}
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
    <div className="page_container page_tabbar">
      <div className="w-full ">
        <PageFixed top={0} className="w-full">
          <div className="flex items-center justify-between h-[45px] bg-[#5E0198] ">
            {items.map((item: any) => {
              return (
                <div
                  key={item.key}
                  className={`font-404px text-14-14 ${activeKey === item.key ? 'text-green' : 'text-purple'}`}
                  onClick={() => onChange(item.key)}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </PageFixed>
        <div className="w-full">
          {items.map((item: any) => {
            return activeKey === item.key && item.children;
          })}
        </div>
      </div>
    </div>
  );
};
export default Join;
