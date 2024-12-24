import { Tooltip } from 'antd';
import { IconTip } from '@/components/icons';
import './index.scss';
import { useRef } from 'react';

const ITooltip = ({ className, title, placement = 'top', color, bgColor, tooltipRef }: any) => {
  // const ref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <Tooltip
        title={title}
        placement={placement}
        color="#20222C"
        overlayClassName="i-tooltip"
        getPopupContainer={() => tooltipRef?.current || document.body}
      >
        <IconTip color={color} bgColor={bgColor} className={className} />
      </Tooltip>
    </div>
  );
};
export default ITooltip;
