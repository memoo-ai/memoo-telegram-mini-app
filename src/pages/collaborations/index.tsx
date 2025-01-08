import './index.scss';
import ConnectWallet from '@/components/ConnectWallet';
import pendantImage1 from './assets/pendant_001.png';
import pendantImage2 from './assets/pendant_002.png';
import { FC, useCallback } from 'react';
import { collaborations } from './constant';
import Back from './back';
import { useNavigate } from 'react-router-dom';

const Collaborations: FC = () => {
  const navigate = useNavigate();

  // TODO Back

  const onSwitchToGameClick = useCallback(() => {
    // TODO
  }, []);

  const onTaskClick = useCallback((taskId: string) => {
    navigate(`/collaborations/${taskId}`);
  }, []);

  return (
    <div className="collaborations_page">
      <div className="collaborations_head mx-[16px] mb-[16px] relative">
        <div className="pt-[13px]">
          <ConnectWallet />
        </div>

        <div className="common_title mx-[auto] mt-[2px]">
          <span>Collaborations</span>
        </div>

        <img className="w-[60px] object-contain absolute top-0 left-[50%] translate-x-[-50%]" src={pendantImage1} />

        <a className="flex absolute right-0 top-[10px]" onClick={onSwitchToGameClick}>
          <img className="w-[51px] object-contain" src={pendantImage2} />
        </a>
      </div>

      <ul className="collaborations_body gap-y-[16px] flex flex-col px-[18px]">
        {Object.entries(collaborations).map(([id, item], index) => (
          <li key={index}>
            <a className="flex" onClick={() => onTaskClick(id)}>
              <img src={item.icon} alt="" />
            </a>
          </li>
        ))}

        <Back content="BACK TO MAIN" />
      </ul>
    </div>
  );
};

export default Collaborations;
