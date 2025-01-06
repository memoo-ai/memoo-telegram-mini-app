import { useCallback, useState } from 'react';
import { Modal } from 'antd';
import { LS_KEY_LIVE_DIALOG_DISABLED } from '@/constants';
import './index.scss';
import TitleImg from './assets/title.png';
import CloseIcon from './assets/close.png';
import PosterImg from './assets/poster.png';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

function LiveDialog({ poster, onPosterClick }: { poster?: String; onPosterClick?: () => void }): JSX.Element {
  const [opened, setOpened] = useState(!localStorage.getItem(LS_KEY_LIVE_DIALOG_DISABLED));
  const [checked, setChecked] = useState(false);

  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setChecked(e.target.checked);
  };

  const onClose = useCallback(() => {
    setOpened(false);

    if (checked) {
      localStorage.setItem(LS_KEY_LIVE_DIALOG_DISABLED, '1');
    }
  }, [checked]);

  return (
    <Modal className="live_dialog" title={null} open={opened} footer={null} closable={false}>
      <div className="live_dialog_head w-full relative">
        <img
          className="live_dialog_head_title absolute left-[50%] translate-x-[-50%] top-[0] translate-y-[-63%] w-[225px] object-contain"
          src={TitleImg}
        />
        <img
          className="live_dialog_head_close w-[60px] absolute top-[0] right-[16px] object-contain translate-y-[-44%] cursor-pointer"
          src={CloseIcon}
          onClick={onClose}
        />
      </div>
      <div className="live_dialog_body pt-[24px] px-[6.5px] pb-[11px]">
        <img className="w-full object-contain mx-[auto]" src={poster ?? PosterImg} onClick={onPosterClick} />

        <div className="w-full mx-[auto] px-[10.5px]">
          <Checkbox rootClassName="live_dialog_checkbox" onChange={onChange}>
            Don’t show again
          </Checkbox>
        </div>
      </div>
    </Modal>
  );
}

export default LiveDialog;
