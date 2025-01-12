import { Children, cloneElement, HTMLProps, isValidElement, useCallback, useState } from 'react';
import { Button, Modal } from 'antd';
import './index.scss';
import CloseIcon from './assets/close.png';
import PandentIcon from './assets/pendant.png';
import TipIcon from './assets/tip.svg';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

interface ImoBuyDialogProps extends Pick<HTMLProps<HTMLElement>, 'children'> {
  onConfirm?: () => void;
}

function ImoBuyDialog({ children, onConfirm }: ImoBuyDialogProps): JSX.Element {
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(false);

  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setChecked(e.target.checked);
  };

  const onClose = useCallback(() => {
    setOpened(false);
  }, []);

  const onConfirmClick = useCallback(() => {
    if (checked) {
      onConfirm?.();
      setOpened(false);
    }
  }, [checked]);

  return (
    <>
      {Children.map(children, (child) => {
        if (isValidElement<{ onClick: () => void }>(child)) {
          return cloneElement(child, { onClick: () => setOpened(true) });
        }
        return child;
      })}
      <Modal className="imo_buy_dialog" title={null} open={opened} footer={null} closable={false}>
        <div className="imo_buy_dialog_head px-[16px] w-full relative">
          <img
            className="imo_buy_dialog_head_close w-[60px] absolute top-[0] right-[16px] object-contain translate-y-[-44%] cursor-pointer"
            src={CloseIcon}
            onClick={onClose}
          />
          <img
            className="object-contain w-[calc(404px/3)] absolute left-[50%] top-[0] translate-x-[-50%] translate-y-[-50%]"
            src={PandentIcon}
          />
          <h2 className="imo_buy_dialog_title pt-[70px] justify-center flex items-center gap-x-[10px]">
            IMO PARTICIPATION{' '}
            <a>
              <img src={TipIcon} />
            </a>
          </h2>
          <p className="mt-[8px] imo_buy_dialog_desc">
            Total IMO raise is always capped at 66.6 SOL. Contribution capped at 0.9 SOL per wallet.
          </p>
        </div>
        <div className="imo_buy_dialog_body pt-[24px] px-[16px] pb-[11px] flex flex-col items-center">
          <ul className="imo_buy_dialog_list w-full hidden-scrollbar px-[3px]">
            {new Array(10).fill('').map((Item, index) => (
              <li
                className="imo_buy_dialog_list_item text-[var(--text-secondary)] hover:bg-[var(--list-item-hover)] hover:text-[var(--text-tertiary)] rounded-[7px]"
                key={index}
              >
                <span className="sols">0.36 SOL</span>
                <span className="equal-tokens">~20,000,000 TOKENs</span>
              </li>
            ))}
          </ul>

          <div className="my-[13px]">
            <Checkbox rootClassName="imo_buy_dialog_checkbox" onChange={onChange}>
              I accept MeMoo’s <a className="contents text-[var(--text-secondary)]">terms & conditions.</a>
            </Checkbox>
          </div>

          <div className="w-full">
            <Button onClick={onConfirmClick} disabled={!checked} className="common_btn_primary !w-full">
              CONFIRM
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ImoBuyDialog;
