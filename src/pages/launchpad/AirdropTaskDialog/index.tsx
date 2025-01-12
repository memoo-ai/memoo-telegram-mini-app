import { Children, cloneElement, HTMLProps, isValidElement, useCallback, useEffect, useMemo, useState } from 'react';
import { Modal } from 'antd';
import './index.scss';
import CloseIcon from './assets/close.png';
import PandentIcon from './assets/pendant.png';
import ClockIcon from './assets/clock.png';
import TipIcon from './assets/tip.svg';
import FollowGoIcon from './assets/follow-go.png';
import FollowDoneIcon from './assets/follow-done.png';
import { useCountdown } from '@/hooks/useCountdown';
import classNames from 'classnames';

interface AirdropTaskDialogProps extends Pick<HTMLProps<HTMLElement>, 'children'> {
  onConfirm?: () => void;
  deadline?: number;
  hasPlatformFollowed?: boolean;
  hasCreatorFollowed?: boolean;
  platform?: string;
  creator?: string;
}

function AirdropTaskDialog({
  children,
  deadline,
  platform,
  creator,
  hasPlatformFollowed,
  hasCreatorFollowed,
}: AirdropTaskDialogProps): JSX.Element {
  const [opened, setOpened] = useState(false);
  const { startCountdown, stopCountdown, days, hours, minutes, seconds } = useCountdown();

  const onClose = useCallback(() => {
    setOpened(false);
  }, []);

  useEffect(() => {
    if (opened) {
      startCountdown(deadline ?? Date.now() + 3 * 24 * 60 * 60 * 1000);
    } else {
      stopCountdown();
    }

    return () => {
      stopCountdown();
    };
  }, [opened]);

  const timeDisplayItems = useMemo(
    () => [
      { unit: 'D', value: days },
      { unit: 'H', value: hours },
      { unit: 'M', value: minutes },
      { unit: 'S', value: seconds },
    ],
    [days, hours, minutes, seconds],
  );

  const followItems = useMemo(
    () => [
      { followed: hasCreatorFollowed, title: `Follow @${creator} on twitter` },
      { followed: hasPlatformFollowed, title: `Follow @${platform} on twitter` },
    ],
    [hasCreatorFollowed, hasPlatformFollowed, creator, platform],
  );

  return (
    <>
      {Children.map(children, (child) => {
        if (isValidElement<{ onClick: () => void }>(child)) {
          return cloneElement(child, { onClick: () => setOpened(true) });
        }
        return child;
      })}
      <Modal className="airdrop_task_dialog" title={null} open={opened} footer={null} closable={false}>
        <div className="airdrop_task_dialog_head w-full relative px-[16px]">
          <img
            className="airdrop_task_dialog_head_close w-[60px] absolute top-[0] right-[16px] object-contain translate-y-[-44%] cursor-pointer"
            src={CloseIcon}
            onClick={onClose}
          />
          <img
            className="object-contain w-[calc(360px/3)] absolute left-[50%] top-[0] translate-x-[-50%] translate-y-[calc(-50%-16px)]"
            src={PandentIcon}
          />
          <h2 className="airdrop_task_dialog_title pt-[60px] justify-center flex items-center gap-x-[10px]">
            AIRDROP TASK
            <a>
              <img src={TipIcon} />
            </a>
          </h2>
          <p className="mt-[8px] airdrop_task_dialog_desc">Airdrop is only claimable after pool is successful.</p>
        </div>
        <div className="airdrop_task_dialog_body px-[16px] flex flex-col items-center pb-[16px]">
          <div className="flex flex-col items-center">
            <div className="flex gap-x-[7px] items-center pt-[36px]">
              <img className="w-[18px] object-contain" src={ClockIcon} />
              <span className="uppercase airdrop_task_dialog_endsin">ends in</span>
            </div>

            <div className="airdrop_task_dialog_countdown flex gap-x-[5px] items-center mt-[8px]">
              {timeDisplayItems.map(({ unit, value }, index) => (
                <time key={index}>
                  <span className="value">{value}</span>
                  <span className="unit">{unit}</span>
                </time>
              ))}
            </div>
          </div>

          <ul className="airdrop_task_dialog_follows w-full pt-[43px]">
            {followItems.map((item, index) => (
              <li
                className="airdrop_task_dialog_follows_item py-[3px] pl-[10px] pr-[4px] flex items-center justify-between max-h-[40px]"
                key={index}
              >
                <span>{item.title}</span>

                <img
                  src={item.followed ? FollowDoneIcon : FollowGoIcon}
                  className={classNames({ '!w-[calc(174px/3)] !translate-x-[12px]': item.followed })}
                />
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
}

export default AirdropTaskDialog;
