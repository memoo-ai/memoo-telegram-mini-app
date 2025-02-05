import './index.scss';
import ConnectWallet from '@/components/ConnectWallet';
import BellIcon from './assets/bell.png';
import pendantImage2 from './assets/pendant_002.png';
import StaticBarImage from './assets/static_bar.png';
import { FC, useCallback, useMemo } from 'react';
import Back from './back';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Switch } from 'antd';

const Settings: FC = () => {
  const navigate = useNavigate();

  const settingItems = useMemo(
    () => [
      { title: 'Status of tokens in collection', checked: false },
      { title: 'Latest airdrops and IMOs', checked: false },
      { title: 'News and updates', checked: true },
      { title: 'Collaboration events', checked: false },
      { title: 'New daily check-in tasks', checked: false },
      { title: 'When new friends have joined', checked: false },
    ],
    [],
  );

  const onSwitchToGameClick = useCallback(() => {
    // TODO
  }, []);

  const onToggleChange = useCallback(() => {
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
        {settingItems.map(({ title, checked }, index) => (
          <li key={index} className={classNames('settings_list_item')}>
            <h4>{title}</h4>

            <Switch checked={checked} className="settings_switch ml-[auto]" onChange={onToggleChange} />
          </li>
        ))}
      </ul>

      <Back content="BACK TO MAIN" />
    </div>
  );
};

export default Settings;
