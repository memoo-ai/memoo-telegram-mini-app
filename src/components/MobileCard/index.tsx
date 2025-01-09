import React, { FC, Children, ReactNode, useRef } from 'react';
import DefaultBannerBg from '@/assets/images/default-banner-bg.png';
// import Wallet from '@/components/SolanaWallet';
import { IconArrow, IconCollect } from '@/components/icons';
import useFunctions from '@/hooks/useFunctions';
import IProgress from '@/components/IProgress';
// import Countdown from '@/pages/airdrop/countdown';
import IPopover from '@/components/IPopover';
import { formatNumberToFixed, formatTs, formatRatioToPercentage, isProd, getActualPath } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { increasedText, participantsText } from '@/config';
import { Button } from 'antd';
import DateIcon from '@/assets/images/common/date.svg';
import MemoScoreIcon from '@/assets/images/common/memoo_score_icon.svg';
import TotalRaisedIcon from '@/assets/images/common/total_raised.svg';
import TopUpIcon from '@/assets/images/common/topupicon.png';
import SoftCapIcon from '@/assets/images/common/softcapicon.png';

const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
const website = import.meta.env.VITE_WEBSITE;
interface MobileCardProps {
  item: any;
  children?: ReactNode;
  triggerRefresh?: Function;
  type?: 'mine' | 'other';
  isDraft?: boolean;
  showTotalRaised?: boolean;
  itemClick?: Function;
  className?: string;
  // tokenInfoPath: string;
}
const MobileCard: FC<MobileCardProps> = ({ item, showTotalRaised = true, itemClick, className }) => {
  const { collection } = useFunctions();
  const navigate = useNavigate();
  const iconRefs = useRef<any>({});
  // const [header, content] = React.Children.toArray(children);
  return (
    <div
      className={`flex flex-col justify-between bg-[#131522] rounded-[7px] overflow-hidden h-max border-solid border border-[#2E3251] hover:border-green min-w-[155px] ${className}`}
      onClick={() => itemClick?.()}
    >
      <img className="w-full max-h-full object-cover h-20" src={item?.icon} alt="" />
      <h5 className="font-OCR text-11-13 text-[#fff] px-1.5 w-full whitespace-nowrap overflow-hidden text-ellipsis mt-2">
        {item?.tokenName}
      </h5>
      <h5 className="font-OCR text-9-13 text-green px-1.5">{item?.ticker}</h5>
      <div className="h-5 px-1.5 mt-1">
        <div className="flex gap-x-2.5 h-full">
          {Number(item?.creatorTotalRaisedNumerator ?? 0) > 0 && (
            <IPopover
              trigger="hover"
              content={`${increasedText(formatRatioToPercentage(item?.creatorTotalRaisedNumerator, item.creatorTotalRaisedDenominator))}`}
            >
              <img className="icon_topup_mobile" src={TopUpIcon} />
            </IPopover>
          )}
          {item?.trendingFlag && (
            <IPopover trigger="hover" content={participantsText(item.participants ?? 0, item?.participantsDenom ?? 0)}>
              <img className="w-[14px] h-[17px]" src={SoftCapIcon} />
            </IPopover>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between items-center px-1.5 gap-y-1 h-7">
            <div className="flex items-center w-[50%]">
              <img className="w-3 h-3" src={DateIcon} alt="" />
            </div>
            <div className="font-OCR text-white text-9-10">
              {item.idoDate ? formatTs(Number(item.idoDate ?? 0)) : ''}
            </div>
          </div>
          <div className="flex justify-between items-start px-1.5">
            <div className="flex items-center w-[50%]">
              <img className="w-3 h-3" src={MemoScoreIcon} alt="" />
            </div>
            <div className="flex flex-col w-[50%] h-max items-end gap-y-1">
              <p className="font-OCR text-white text-9-10">
                {formatRatioToPercentage(item?.memooScore, item?.totalScore)}/100
              </p>
              <IProgress
                className="w-[60%] memoo_progress_mobile -mt-1"
                percent={formatRatioToPercentage(item?.memooScore, item?.totalScore)}
              />
            </div>
          </div>
          {showTotalRaised ? (
            <div className="flex justify-between items-start px-1.5">
              <div className="flex items-center w-[50%]">
                <img className="w-3.5 h-3" src={TotalRaisedIcon} alt="" />
              </div>
              <div className="flex flex-col w-[50%] items-end gap-y-1">
                <p className="font-OCR text-white text-9-10">
                  {formatRatioToPercentage(item?.totalRaisedNumerator, item?.totalRaisedDenominator)}/100
                </p>
                <IProgress
                  className="w-[60%] p-0 h-1 -mt-1"
                  percent={formatRatioToPercentage(item?.totalRaisedNumerator, item?.totalRaisedDenominator)}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start px-1.5">
              <div className="flex items-center w-[50%]">
                <img className="w-3.5 h-3" src={TotalRaisedIcon} alt="" />
              </div>
              <div className="flex flex-col w-[50%] h-max items-end gap-y-1">
                <span className="font-OCR text-white text-9-10">{item.participants}</span>
                <span className="h-1" />
              </div>
            </div>
          )}
        </div>
        <Button
          className="w-full memoo_button_mobile mt-3 h-6 !bg-transparent flex items-center justify-center text-purple hover:text-green"
          onClick={() => window.open(`${website}/${item.ticker}`, '_blank')}
          onMouseOver={() => iconRefs.current[`IconArrow`].setHovered(true)}
          onMouseLeave={() => iconRefs.current[`IconArrow`].setHovered(false)}
          onTouchStart={() => iconRefs.current[`IconArrow`]?.setHovered?.(true)}
          onTouchEnd={() => iconRefs.current[`IconArrow`]?.setHovered?.(false)}
        >
          <span className="font-404px text-10-10 flex items-center gap-x-1">
            TOKEN INFO <IconArrow ref={(ref) => (iconRefs.current[`IconArrow`] = ref)} />
          </span>
        </Button>
      </div>
    </div>
  );
};
export default MobileCard;
