import { useEffect, useMemo, useState } from 'react';
import './index.scss';
import { IconAirdrop, IconEarn, IconHome, IconImo, IconMe } from '../icons';
import { useMatches, useNavigate } from 'react-router-dom';

const homePath = import.meta.env.VITE_ROUTE_HOME;
const earnPath = import.meta.env.VITE_ROUTE_EARN;
const airdropPath = import.meta.env.VITE_ROUTE_AIRDROP;
const imoPath = import.meta.env.VITE_ROUTE_IMO;
const mePath = import.meta.env.VITE_ROUTE_ME;
const Tabbar = () => {
  const [tabbarActive, setTabbarActive] = useState('home');
  const navigate = useNavigate();
  const tabbars = useMemo(() => {
    return [
      {
        key: 'home',
        icon: IconHome,
        path: homePath,
      },
      {
        icon: IconEarn,
        key: 'earn',
        path: earnPath,
      },
      {
        key: 'airdrop',
        icon: IconAirdrop,
        path: airdropPath,
      },
      {
        key: 'imo',
        icon: IconImo,
        path: imoPath,
      },
      {
        key: 'me',
        icon: IconMe,
        path: mePath,
      },
    ];
  }, [tabbarActive]);
  const matches = useMatches();
  useEffect(() => {
    const path = window.location.pathname;
    const tabbar = tabbars.find((item) => item.path === path);
    if (tabbar) {
      setTabbarActive(tabbar.key);
    }
  }, [matches]);
  return (
    <div className="memoo_tabbar flex items-center gap-x-9 justify-center">
      {tabbars.map((item) => {
        return (
          <div
            key={item.key}
            className="flex flex-col items-center justify-center gap-y-2"
            onClick={() => {
              setTabbarActive(item.key);
              navigate(item.path);
            }}
          >
            <item.icon color={tabbarActive === item.key ? '#07E993' : '#D899FF'} />
            <span
              className={`${tabbarActive === item.key ? 'text-[#07E993]' : 'text-[#D899FF]'} font-404px text-10-10`}
            >
              {item.key}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Tabbar;
