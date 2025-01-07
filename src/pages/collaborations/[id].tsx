import './index.scss';
import ConnectWallet from '@/components/ConnectWallet';
import pendantImage1 from './assets/pendant_001.png';
import pendantImage2 from './assets/pendant_002.png';
import { FC, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { collaborations } from './constant';
import { Collaboration } from './types';
import Back from './back';

const CollaborationDetail: FC = () => {
  const { id } = useParams();

  const onSwitchToGameClick = useCallback(() => {
    // TODO
  }, []);

  const task: Collaboration | null = useMemo(() => {
    return id && collaborations[id] ? collaborations[id] : null;
  }, [id]);

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

      {task && (
        <div className="collaborations_body px-[16px]">
          <img src={task.icon} />

          <div className="common_title !w-[133px] !h-[48px] !px-[32px] !pt-[13px] !pb-[15px] mx-[auto] mt-[16px]">
            <span>Tasks</span>
          </div>

          <ul className="flex flex-col gap-y-[10px] mt-[16px]">
            {task.tasks.map((item, index) => (
              <li
                key={index}
                className="p-[8px] flex items-center bg-[#2C1844] rounded-[7px] border-[1px] border-[#B53BFF] border-solid"
              >
                <img src={item.icon} alt="" />

                <span className="block ml-[10px] collaborations_tasks_title">{item.title}</span>

                <span className="block ml-[auto] collaborations_tasks_points">{item.points} POINTS</span>
              </li>
            ))}
          </ul>

          <div className="mt-[46px]">
            <Back content="BACK TO COLLABS" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationDetail;
