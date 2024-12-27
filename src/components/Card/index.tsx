import React, { FC, Children, ReactNode } from 'react';
import DefaultBannerBg from '@/assets/images/default-banner-bg.png';
// import Wallet from '@/components/SolanaWallet';
import { IconCollect } from '@/components/icons';
import useFunctions from '@/hooks/useFunctions';
import IProgress from '@/components/IProgress';
// import Countdown from '@/pages/airdrop/countdown';
import IPopover from '@/components/IPopover';
import { formatRatioToPercentage, formatTs, getActualPath } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { increasedText, participantsText } from '@/config';
import { motion, useAnimationFrame } from 'framer-motion';

const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
interface CardProps {
  item: any;
  children: ReactNode;
  triggerRefresh?: Function;
  type?: 'mine' | 'other';
  isDraft?: boolean;
  timestamp?: string | number;
  timeType?: 'Countdown' | 'Time';
  status?: React.ReactNode;
  statusLeft?: React.ReactNode;
  showCollection?: boolean;
  itemClick?: Function;
}
const Card: FC<CardProps> = ({
  children,
  item,
  triggerRefresh,
  type = 'other',
  isDraft,
  timestamp = '',
  timeType = 'Time',
  status,
  statusLeft,
  showCollection = true,
  itemClick,
}) => {
  const { collection } = useFunctions();
  const navigate = useNavigate();
  const [content] = React.Children.toArray(children);

  return (
    <div
      className={`flex flex-col justify-between bg-[#131522] rounded-[15px] overflow-hidden h-max border-solid border border-[#2E3251] ${isDraft ? '' : ''} hover:border-green`}
    >
      <div className="w-full relative ">
        <img
          // className="w-full min-h-[200px] rounded-tl-[15px] rounded-tr-[15px] border border-solid border-[#5D64A2] max-lg:border-l-0 max-lg:border-r-0 overflow-hidden max-lg:rounded-none max-lg:min-h-32"
          className="w-full h-[75px] rounded-tl-[15px] rounded-tr-[15px] border-b border-solid border-[#5D64A2] min-w-[196px]"
          // src={item?.banners?.[0] ?? DefaultBannerBg}
          src={item?.icon ?? DefaultBannerBg}
          onClick={() => {
            itemClick ? itemClick() : navigate(getActualPath('airdrop', { ticker: item.ticker }));
          }}
        />
        <div className="absolute top-3 left-5">{statusLeft}</div>
        <div className="absolute top-3 right-5">{status}</div>
        <div className="absolute bottom-0 left-5 translate-y-1/2 flex items-end gap-x-2.5">
          {/* <img
            className="w-10 h-10 rounded-[50%] mr-2.5"
            src={item?.icon}
            onClick={() => {
              itemClick ? itemClick() : navigate(getActualPath('airdrop', { ticker: item.ticker }));
            }}
          /> */}
          <div className="flex justify-between">
            <div className="flex gap-x-1 items-center">
              {showCollection && (
                // <Wallet>
                <IconCollect
                  className="w-7 h-7"
                  color={item?.collectionFlag ? '#B53BFF' : '#3D255B'}
                  hoverColor={item?.collectionFlag ? '#B53BFF' : '#3D255B'}
                  onClick={async () => {
                    await collection(item.ticker, item?.collectionFlag, triggerRefresh, 135);
                  }}
                />
                // </Wallet>
              )}

              {Number(item.creatorTotalRaisedNumerator ?? 0) > 0 && (
                <IPopover
                  trigger="hover"
                  content={`${increasedText(formatRatioToPercentage(item.creatorTotalRaisedNumerator, item.creatorTotalRaisedDenominator))}`}
                >
                  <img className="w-7 h-6" src="/create/topupicon.png" />
                </IPopover>
              )}
              {item?.trendingFlag && (
                <IPopover trigger="hover" content={participantsText(10)}>
                  <img className="w-[21px] h-[23px]" src="/softcapicon.png" />
                </IPopover>
              )}
            </div>
            {/* <div>
              <Level />
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className={`flex  justify-between ${type === 'mine' ? 'items-start' : 'items-center'}`}>
        <div className="px-2">
          <img className="w-10 h-10 rounded-full my-1 " src={item.icon} alt="" />
        </div>
        <div>{header}</div>
      </div> */}
      <h5 className="font-OCR text-lg leading-5 text-[#fff]  px-5 w-full whitespace-nowrap overflow-hidden text-ellipsis mt-12">
        {item.tokenName}
      </h5>
      <h5 className="font-OCR text-xs leading-5 text-green px-5">{item.ticker}</h5>
      <div
        className="flex flex-col gap-y-1 mt-2.5"
        onClick={() => {
          itemClick ? itemClick() : navigate(getActualPath('airdrop', { ticker: item.ticker }));
        }}
      >
        <div className="flex justify-between items-center px-5 gap-y-1">
          <div className="flex items-center w-[50%]">
            {/* <span className="font-OCR text-[#7D83B5] text-9-10">Ends in</span> */}
            <img src="/common/date.svg" alt="" />
          </div>
          {/* {timeType === 'Countdown' ? (
              <Countdown
                className="flex gap-x-1 font-OCR text-9-10 text-white"
                timefragments=""
                format={([days, hours, minutes, seconds]) => [
                  <div key="hours">
                    <time className="font-OCR text-lg leading-5 text-white">{hours}</time>
                    <span className="font-OCR text-lg leading-5 text-white">h</span>
                  </div>,
                  <div key="minutes">
                    <time className="font-OCR text-lg leading-5 text-white">{minutes}</time>
                    <span className="font-OCR text-lg leading-5 text-white">m</span>
                  </div>,
                  <div key="seconds">
                    <time className="font-OCR text-lg leading-5 text-white">{seconds}</time>
                    <span className="font-OCR text-lg leading-5 text-white">s</span>
                  </div>,
                ]}
                instant={Number(timestamp) * 1000}
                // instant={1720510654000}
                onEnded={(ended) => {
                  // setEnded(ended);
                }}
                symbol=""
              />
            ) : (
              <div className="font-OCR text-white text-lg leading-5">{formatTs(Number(timestamp ?? 0))}</div>
            )} */}
        </div>
        <div className="flex justify-between items-start px-5 mt-4">
          <div className="flex items-center w-[50%]">
            {/* <span className="font-OCR text-[#7D83B5] text-9-10">Memoo Score</span> */}
            <img src="/common/memoo_score_icon.svg" alt="" />
          </div>
          <div className="flex flex-col w-[50%] h-max items-end">
            <p className="font-OCR text-white text-lg leading-5">
              {formatRatioToPercentage(item.memooScore, item.totalScore)}
            </p>
            <IProgress className="w-[60%] h-1" percent={formatRatioToPercentage(item.memooScore, item.totalScore)} />
          </div>
        </div>
        <div className="flex justify-between items-start px-5 mt-2.5">
          <div className="flex items-center w-[50%]">
            {/* <span className="font-OCR text-[#7D83B5] text-9-10">Total Raised</span> */}
            <img src="/common/total_raised.svg" alt="" />
          </div>
          <div className="flex flex-col w-[50%] items-end">
            <p className="font-OCR text-white text-lg leading-5 whitespace-nowrap">
              {/* {formatRatioToPercentage(item.totalRaisedNumerator, item.totalRaisedDenominator)}/100 {tokenSymbol} */}
              {item.totalRaisedNumerator}/{item.totalRaisedDenominator} {tokenSymbol}
            </p>
            <IProgress
              className="w-[60%] p-0 h-1"
              percent={formatRatioToPercentage(item.totalRaisedNumerator, item.totalRaisedDenominator)}
            />
          </div>
        </div>
      </div>
      <div className="min-h-10">{content}</div>
    </div>
  );
};
Card.displayName = Card.name;
export default Card;
