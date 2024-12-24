import React, { FC, Children, ReactNode } from 'react';
import DefaultBannerBg from '@/assets/images/default-banner-bg.png';
// import Wallet from '@/components/SolanaWallet';
import { IconCollect } from '@/components/icons';
import useFunctions from '@/hooks/useFunctions';
import IProgress from '@/components/IProgress';
// import Countdown from '@/pages/airdrop/countdown';
import IPopover from '@/components/IPopover';
import { formatNumberToFixed, formatTs, formatRatioToPercentage, isProd, getActualPath } from '@/utils';
import { useNavigate } from 'react-router-dom';

const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
interface MobileCardProps {
  item: any;
  children: ReactNode;
  triggerRefresh?: Function;
  type?: 'mine' | 'other';
  isDraft?: boolean;
  itemClick?: Function;
}
const MobileCard: FC<MobileCardProps> = ({ children, item, triggerRefresh, type = 'other', isDraft, itemClick }) => {
  const { collection } = useFunctions();
  const navigate = useNavigate();
  const [header, content] = React.Children.toArray(children);
  return (
    <div
      className={`flex flex-col justify-between bg-[#131522] rounded-[7px] overflow-hidden h-max border-solid border border-[#2E3251] ${isDraft ? '' : ''}`}
    >
      <img
        className={`${isDraft ? '' : ''}`}
        src={item?.banners ? item.banners[0] : DefaultBannerBg}
        alt=""
        onClick={() => (itemClick ? itemClick() : navigate(getActualPath('airdrop', { ticker: item.ticker })))}
      />
      <div className={`flex  justify-between ${type === 'mine' ? 'items-start' : 'items-center'}`}>
        <div className="px-2">
          <img className="w-10 h-10 rounded-full my-1 " src={item.icon} alt="" />
        </div>
        <div>{header}</div>
      </div>
      <h5 className="font-OCR text-11-13 text-[#fff] px-2 w-full whitespace-nowrap overflow-hidden text-ellipsis">
        {item.tokenName}
      </h5>
      <h5 className="font-OCR text-9-13 text-green px-2">{item.ticker}</h5>
      <div className="min-h-20">{content}</div>
    </div>
  );
};
export default MobileCard;
