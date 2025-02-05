import { Children, cloneElement, HTMLProps, isValidElement, useCallback, useState } from 'react';
import { Button, Modal } from 'antd';
import './index.scss';
import CloseIcon from './assets/close.png';
import PandentIcon from './assets/stakingstar.png';

interface BounsPointsClaimedDialogProps extends Pick<HTMLProps<HTMLElement>, 'children'> {
  onConfirm?: () => void;
}

function BounsPointsClaimedDialog({ children }: BounsPointsClaimedDialogProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  const onClose = useCallback(() => {
    setOpened(false);
  }, []);

  const onGotitClick = useCallback(() => {
    // TODO
  }, []);

  return (
    <>
      {Children.map(children, (child) => {
        if (isValidElement<{ onClick: () => void }>(child)) {
          return cloneElement(child, { onClick: () => setOpened(true) });
        }
        return child;
      })}
      <Modal className="bouns_points_claimed_dialog" title={null} open={opened} footer={null} closable={false}>
        <div className="bouns_points_claimed_dialog_head w-full relative px-[16px]">
          <img
            className="bouns_points_claimed_dialog_head_close w-[60px] absolute top-[0] right-[16px] object-contain translate-y-[-44%] cursor-pointer"
            src={CloseIcon}
            onClick={onClose}
          />
          <img
            className="object-contain w-[calc(530px/3)] absolute left-[50%] top-[0] translate-x-[-50%] translate-y-[-20px]"
            src={PandentIcon}
          />
        </div>
        <div className="bouns_points_claimed_dialog_body pt-[127px] px-[16px] flex flex-col items-center">
          <h2 className="bouns_points_claimed_dialog_title">100 BONUS POINTS CLAIMED</h2>
          <p className="bouns_points_claimed_dialog_desc mt-[9px]">
            You’re all set! Climb the scoreboard for more rewards.
          </p>

          <Button onClick={onGotitClick} className="common_btn_primary !mt-[32px] !w-full">
            GOT IT
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default BounsPointsClaimedDialog;
