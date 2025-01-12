import './index.scss';
import ConnectWallet from '@/components/ConnectWallet';
import BellIcon from './assets/bell.png';
import pendantImage2 from './assets/pendant_002.png';
import { FC, useCallback } from 'react';
import Back from './back';
import { useNavigate } from 'react-router-dom';

const Alerts: FC = () => {
  const navigate = useNavigate();

  const onSwitchToGameClick = useCallback(() => {
    // TODO
  }, []);

  return (
    <div className="alerts_page">
      <div className="alerts_head mx-[16px] mb-[16px] relative">
        <div className="pt-[13px]">
          <ConnectWallet />
        </div>

        <div className="relative">
          <span className="alerts_updated absolute whitespace-pre-wrap top-[50%] translate-y-[-50%]">
            {'42\nUNREAD'}
          </span>

          <div className="common_title !w-[133px] mx-[auto] mt-[2px] text-center">
            <span>Alerts</span>
          </div>
        </div>

        <img className="w-[calc(141px/3)] object-contain absolute top-0 left-[50%] translate-x-[-50%]" src={BellIcon} />

        <a className="flex absolute right-0 top-[10px]" onClick={onSwitchToGameClick}>
          <img className="w-[51px] object-contain" src={pendantImage2} />
        </a>
      </div>

      {/* TODO */}

      <Back content="BACK TO MAIN" />
    </div>
  );
};

export default Alerts;
