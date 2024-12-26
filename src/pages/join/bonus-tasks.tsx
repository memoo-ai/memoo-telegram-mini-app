import {
  IconBoost,
  IconCompleted,
  IconDocs,
  IconInviteUser,
  IconRight,
  IconTelegram,
  IconTwitter,
  IconUser,
} from '@/components/icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './bonus-tasks.scss';
import { Spin } from 'antd';
import { useAccount } from '@/hooks/useWeb3';
import { getUserTask } from '@/api/join';
import TaskModal from './task-modal';
import isMobile from 'is-mobile';
import CompletedIcon from '@/assets/images/join/completed.svg';

interface Task {
  manual: boolean;
  taskCode: string;
  taskFinish: boolean;
  canTask: boolean;
  taskName: string;
  taskScore: number;
  taskSort: number;
  taskUri: string;
  popupTaskName: string;
  popupButtonName: string;
  iconClassName: string;
  taskType: string;
  icon: any;
}

const BonusTasks = () => {
  const iconRefs = useRef<any>({});
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const [refresh, setRefresh] = useState(0);
  const [userTask, setUserTask] = useState();
  const defaultOptions = [
    {
      key: 'CONNECT_TO_TWITTER',
      icon: (
        <IconTwitter
          ref={(ref: any) => (iconRefs.current['CONNECT_TO_TWITTER'] = ref)}
          color="#B53BFF"
          hoverColor="#2C1844"
          className="w-[15px] h-[15px]"
        />
      ),
      taskCode: 'CONNECT_TO_TWITTER',
      taskType: 'bindTwitter',
    },
    {
      key: 'CONNECT_TO_TELEGRAM',
      icon: (
        <IconTelegram
          ref={(ref: any) => (iconRefs.current['CONNECT_TO_TELEGRAM'] = ref)}
          color="#B53BFF"
          hoverColor="#2C1844"
          className="w-[15px] h-[15px]"
        />
      ),
      taskCode: 'CONNECT_TO_TELEGRAM',
      taskType: 'bindTelegram',
    },
    {
      key: 'Follow @Memoo.Ai',
      icon: (
        <IconTwitter
          ref={(ref: any) => (iconRefs.current['FOLLOW_MEMOO_TWITTER'] = ref)}
          color="#B53BFF"
          hoverColor="#2C1844"
          className="w-[15px] h-[15px]"
        />
      ),
      taskCode: 'FOLLOW_MEMOO_TWITTER',
      taskType: 'twitter',
    },
    {
      key: 'Join Memoo Telegram',
      icon: (
        <IconTelegram
          ref={(ref: any) => (iconRefs.current['JOIN_MEMOO_TG'] = ref)}
          color="#B53BFF"
          hoverColor="#2C1844"
          className="w-[15px] h-[15px]"
        />
      ),
      taskCode: 'JOIN_MEMOO_TG',
    },
    {
      key: 'Read Memoo docsg',
      icon: (
        <IconDocs
          ref={(ref: any) => (iconRefs.current['READ_MEMOO_DOGS'] = ref)}
          color="#B53BFF"
          hoverColor="#2C1844"
          className="w-[14px] h-[16px]"
        />
      ),
      taskCode: 'READ_MEMOO_DOGS',
      taskType: 'readDocs',
    },
    {
      key: 'Interact with launch tweet',
      icon: (
        <IconTwitter
          ref={(ref: any) => (iconRefs.current['INTERACT_WITH_LAUNCH_TWEET'] = ref)}
          color="#B53BFF"
          hoverColor="#2C1844"
          className="w-[15px] h-[15px]"
        />
      ),
      taskCode: 'INTERACT_WITH_LAUNCH_TWEET',
    },
    {
      key: 'First 15,000 users (FCFS)',
      icon: (
        <IconUser
          ref={(ref: any) => (iconRefs.current['FIRST_15000_USERS'] = ref)}
          color="#B53BFF"
          hoverColor="#2C1844"
          className="w-[15px] h-[15px]"
        />
      ),
      taskCode: 'FIRST_15000_USERS',
    },
    {
      key: 'Boost Memoo Channel',
      icon: (
        <IconBoost
          ref={(ref: any) => (iconRefs.current['BOOST_MEMOO_CHANNEL'] = ref)}
          color="#B53BFF"
          hoverColor="#2C1844"
          className="w-[15px] h-[15px]"
        />
      ),
      taskCode: 'BOOST_MEMOO_CHANNEL',
    },
    {
      key: 'Invite 3 friends',
      icon: (
        <IconInviteUser
          ref={(ref: any) => (iconRefs.current['INVITE_3_FRIENDS'] = ref)}
          color="#B53BFF"
          hoverColor="#2C1844"
          className="w-[20px] h-5"
        />
      ),
      taskCode: 'INVITE_3_FRIENDS',
    },
    {
      key: 'Invite 7 friends',
      icon: (
        <IconInviteUser
          ref={(ref: any) => (iconRefs.current['INVITE_7_FRIENDS'] = ref)}
          color="#B53BFF"
          hoverColor="#2C1844"
          className="w-[20px] h-5"
        />
      ),
      taskCode: 'INVITE_7_FRIENDS',
    },
    {
      key: 'Invite 10 friends',
      icon: (
        <IconInviteUser
          ref={(ref: any) => (iconRefs.current['INVITE_10_FRIENDS'] = ref)}
          color="#B53BFF"
          hoverColor="#2C1844"
          className="w-[20px] h-5"
        />
      ),
      taskCode: 'INVITE_10_FRIENDS',
    },
    {
      key: 'Invite 25 friends',
      icon: (
        <IconInviteUser
          ref={(ref: any) => (iconRefs.current['INVITE_25_FRIENDS'] = ref)}
          color="#B53BFF"
          hoverColor="#2C1844"
          className="w-[20px] h-5"
        />
      ),
      taskCode: 'INVITE_25_FRIENDS',
    },
  ];
  const options = useMemo(() => {
    const mergedArray = [...defaultOptions, ...(userTask ?? [])].reduce<Task[]>((acc, item) => {
      const existingItem = acc.find((obj) => obj.taskCode === item.taskCode);

      const defaultValues: Partial<Task> = {
        manual: false,
        taskFinish: false,
        taskName: item.key || '',
        taskScore: 0,
        taskSort: 0,
        taskUri: '',
        canTask: false,
      };

      if (existingItem) {
        Object.assign(existingItem, { ...defaultValues, ...item });
      } else {
        acc.push(item as any);
      }

      return acc;
    }, []);

    console.log('mergedArray: ', mergedArray);
    return mergedArray;
  }, [userTask]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // if (!address) return;

        const { data } = await getUserTask(address?.toBase58() ?? '');
        setUserTask(data);
      } catch (e) {
        console.log('getInvitationTop:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [address, refresh]);

  return (
    <div className="flex flex-col justify-center items-center pt-7 pb-12">
      <Spin spinning={loading} fullscreen />
      <h3 className="font-404px text-2xl leading-none text-white max-lg:text-14-14  max-lg:mt-6">EARN BONUS POINTS</h3>
      <h5 className="font-OCR text-sm leading-none text-[#9EA2C7] max-lg:text-9-9">
        Complete these tasks to maximize your rewards.
      </h5>
      <div className="w-full bg-[#2C1844] border border-solid border-[#B53BFF] max-lg:bg-transparent max-lg:border-none rounded-[7px] flex flex-col mt-5 p-5 max-lg:p-0 relative">
        {/* <img className="w-[92px] h-[85px] absolute right-1.5 -top-5" src="/join/30starburst.png" alt="" /> */}
        <h3 className="font-404px text-green text-base leading-[18px] max-lg:text-14-16">UNLOCK CHECKLIST</h3>
        <h3 className="font-OCR text-sm leading-[18px] text-[#9EA2C7] mt-2 max-lg:text-9-9">
          Unlock these bonus quests and get rewarded.
        </h3>
        <ul className="flex flex-col gap-y-2.5 mt-5 w-full">
          {options.map((item, index) => {
            return (
              <TaskModal
                key={index}
                popupTaskName={item?.popupTaskName}
                taskScore={item?.taskScore}
                popupButtonName={item?.popupButtonName}
                disabled={!item?.manual || !item?.canTask || !address}
                taskType={item?.taskType ?? ''}
                taskUri={item?.taskUri}
                taskFinish={item?.taskFinish}
                index={index}
                onVerify={() => setRefresh((r) => r + 1)}
                className="w-full"
              >
                <div
                  className={`w-full flex items-center justify-between font-OCR max-lg:text-9-9 text-[18px] leading-[18px] border border-solid rounded-[7px] bonus p-2.5 ${item.taskFinish ? 'bg-[#1F1131] border-[#623D8F] text-[#623D8F]' : 'bg-[#2C1844] border-[#B53BFF] text-white hover:bg-[#B53BFF]'} ${item.manual && 'cursor-pointer'}`}
                  onMouseOver={() => {
                    if (!item?.taskFinish) {
                      iconRefs.current[item.taskCode].setHovered(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!item?.taskFinish) {
                      iconRefs.current[item.taskCode].setHovered(false);
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!item?.taskFinish && !item?.manual) {
                      return true;
                    }
                  }}
                >
                  <div className="flex items-center gap-x-5">
                    {item?.taskFinish ? (
                      <div className="w-8 h-8 max-lg:w-6 max-lg:h-6 completed-icon rounded-[8px]">
                        <img className="w-8 h-8 max-lg:w-6 max-lg:h-6 " src={CompletedIcon} />
                        {/* <IconCompleted /> */}
                      </div>
                    ) : (
                      <div
                        className={`w-8 h-8 max-lg:w-6 max-lg:h-6 max-lg:rounded-[4px] rounded-[7px] flex justify-center items-center border border-solid border-[#B53BFF] ${item?.taskFinish ? 'bg-[#B53BFF]' : 'bg-[#2C1844] bonus-item'}`}
                      >
                        {item.icon}
                      </div>
                    )}
                    <span>
                      {`${index >= 9 ? '' : 0}${index + 1}`} / {item?.taskName}
                    </span>
                  </div>

                  <var className={`${!isMobile() && 'points-btn'} px-0.5 py-1 max-lg:font-404px max-lg:text-8-8`}>
                    {item?.taskScore} points
                  </var>
                </div>
              </TaskModal>
            );
          })}
        </ul>
      </div>
      {/* <div className="w-full bg-[#2C1844] border border-solid border-[#B53BFF] max-lg:bg-transparent max-lg:border-none rounded-[7px] flex flex-col mt-5 p-5 max-lg:p-0 relative">
        <h3 className="font-404px text-green text-base leading-[18px] max-lg:text-14-16">DAILY CHECK-IN</h3>
        <h3 className="font-OCR text-sm leading-[18px] text-[#9EA2C7] mt-2 max-lg:text-9-9">
          Interact with our recent tweets to receive daily points.
        </h3>
        <ul className="flex gap-y-2.5 mt-5 overflow-auto">
          {options.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div>
                    <img src="/logo.svg" alt="" />
                    @MemooAI
                  </div>
                  <div
                    className={`w-8 h-8 max-lg:w-6 max-lg:h-6 max-lg:rounded-[4px] rounded-[7px] flex justify-center items-center border border-solid border-[#B53BFF] ${item?.taskFinish ? 'bg-[#B53BFF]' : 'bg-[#2C1844] bonus-item'}`}
                  >
                    <IconTwitter
                      ref={(ref: any) => (iconRefs.current['INTERACT_WITH_LAUNCH_TWEET'] = ref)}
                      color="#B53BFF"
                      hoverColor="#2C1844"
                      className="w-[15px] h-[15px]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div> */}
    </div>
  );
};
export default BonusTasks;
