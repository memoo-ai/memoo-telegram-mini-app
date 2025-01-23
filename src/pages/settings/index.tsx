import './index.scss';
import ConnectWallet from '@/components/ConnectWallet';
import BellIcon from './assets/bell.png';
import pendantImage2 from './assets/pendant_002.png';
import StaticBarImage from './assets/static_bar.png';
import { FC, useCallback } from 'react';
import Back from './back';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const Settings: FC = () => {
  const navigate = useNavigate();

  const onSwitchToGameClick = useCallback(() => {
    // TODO
  }, []);

  return (
    <div className="settings_page">
      <div className="settings_head sticky top-[0] relative z-[1] px-[16px] pb-[16px] relative">
        <div className="pt-[13px]">
          <ConnectWallet />
        </div>

        <div className="relative">
          <span className="settings_updated absolute whitespace-pre-wrap top-[50%] translate-y-[-50%]">
            {'42\nUNREAD'}
          </span>

          <div className="common_title !w-[133px] mx-[auto] mt-[2px] text-center">
            <span>Settings</span>
          </div>
        </div>

        <img className="w-[calc(141px/3)] object-contain absolute top-0 left-[50%] translate-x-[-50%]" src={BellIcon} />

        <a className="flex absolute right-[16px] top-[10px]" onClick={onSwitchToGameClick}>
          <img className="w-[51px] object-contain" src={pendantImage2} />
        </a>

        <img className="w-full object-contain mt-[4px]" src={StaticBarImage} />
      </div>

      {/* TODO */}
      <ul className="settings_list flex flex-col gap-y-[10px]">
        {new Array(10).fill(0).map((_, index) => (
          <li
            key={index}
            className={classNames('settings_list_item', { read: index % 2 === 0, unread: index % 2 === 1 })}
          >
            <h4>⚡ Join now and secure your IMO spot! </h4>
            <p>Participate in the XXXXXXXX IMO. Don’t miss out on this exciting token!</p>
            <time>Now</time>
          </li>
        ))}
      </ul>

      <Back content="BACK TO MAIN" />
    </div>
  );
};

export default Settings;
