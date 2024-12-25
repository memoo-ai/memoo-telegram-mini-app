import { Button, Drawer, Modal } from 'antd';
import message from '@/components/IMessage';
import { forwardRef, useState, useImperativeHandle } from 'react';
import isMobile from 'is-mobile';
// import { IconClose } from '@/components/icons';

export interface ResultRef {
  open: (status: boolean) => void;
}

const ResultModal = forwardRef<ResultRef>(({ ...rest }, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: (status: boolean) => {
      setOpen(status);
    },
  }));

  const content = (
    <div className="flex flex-col items-center justify-center">
      <img className="mt-[-6px] w-[100px] h-[72.39px]" src="/join/stakingstar.png" alt="" />
      <h5 className="join-modal-title max-lg:!text-18-18">100 BONUS POINTS CLAIMED</h5>
      <p className="font-OCR text-[13px] leading-[18px] text-white whitespace-pre-wrap max-lg:text-9-9">
        You’re all set! Climb the scoreboard for more rewards.
      </p>
      <div className="flex gap-x-[3.3px] items-center mt-[21px]" />
      <Button className="memoo_button h-[50px] w-full " onClick={() => setOpen(false)}>
        <span className="!text-[16px]">BACK TO SCOREBOARD</span>
      </Button>
    </div>
  );

  return isMobile() ? (
    <Drawer
      className="memoo_drawer"
      title=""
      open={open}
      placement="bottom"
      onClose={() => {
        setOpen(false);
      }}
      destroyOnClose
    >
      {content}
    </Drawer>
  ) : (
    <Modal
      className="min-w-[469px] "
      wrapClassName="memoo_modal"
      title=""
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      destroyOnClose
      {...rest}
    >
      {content}
    </Modal>
  );
});

ResultModal.displayName = ResultModal.name;

export default ResultModal;
