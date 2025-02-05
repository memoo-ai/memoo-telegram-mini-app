import { Children, cloneElement, HTMLProps, isValidElement, useCallback, useState } from 'react';
import { Button, Modal } from 'antd';
import './index.scss';
import CloseIcon from './assets/close.png';
import CompletedIcon from '@/assets/images/join/completed.svg';

interface ConnectProcessDialogProps extends Pick<HTMLProps<HTMLElement>, 'children'> {
  onConfirm?: () => void;
  data: any;
  serialNo: string;
}

function ConnectProcessDialog({ children, data, serialNo }: ConnectProcessDialogProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  const onClose = useCallback(() => {
    setOpened(false);
  }, []);

  const onJoinTgClick = useCallback(() => {
    // TODO
  }, []);

  const onVerifyClick = useCallback(() => {
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
      <Modal className="connect_process_dialog" title={null} open={opened} footer={null} closable={false}>
        <div className="connect_process_dialog_head w-full relative px-[16px]">
          <img
            className="connect_process_dialog_head_close w-[60px] absolute top-[0] right-[16px] object-contain translate-y-[-44%] cursor-pointer"
            src={CloseIcon}
            onClick={onClose}
          />
        </div>
        <div className="connect_process_dialog_body py-[53px] px-[16px]">
          <div className="flex p-[8px] items-center w-full gap-[10px] border-[1px] border-solid border-[var(--border-primary)] rounded-[7px]">
            {data?.taskFinish ? (
              <div className="w-8 h-8 max-lg:w-6 max-lg:h-6 completed-icon rounded-[8px]">
                <img className="w-8 h-8 max-lg:w-6 max-lg:h-6 " src={CompletedIcon} />
              </div>
            ) : (
              <div
                className={`w-8 h-8 max-lg:w-6 max-lg:h-6 max-lg:rounded-[4px] rounded-[7px] flex justify-center items-center border border-solid border-[#B53BFF] ${data?.taskFinish ? 'bg-[#B53BFF]' : 'bg-[#2C1844] bonus-item'}`}
              >
                {data.icon}
              </div>
            )}

            <span className="connect_process_dialog_text">
              {serialNo} / {data?.taskName}
            </span>
          </div>

          <ul className="mt-[20px]">
            <li className="flex gap-[10px] connect_process_dialog_per_step">
              <div>STEP 1</div>
              <Button className="common_btn_primary">JOIN TELEGRAM</Button>
            </li>

            <li className="flex gap-[10px] mt-[15px] connect_process_dialog_per_step">
              <div>STEP 2</div>
              <Button className="common_btn_primary">VERIFY</Button>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
}

export default ConnectProcessDialog;
