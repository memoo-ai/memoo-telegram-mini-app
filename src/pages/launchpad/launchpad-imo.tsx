/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import './launchpad-imo.scss';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { PaginationProps } from 'antd';
import { Table, Spin, Button } from 'antd';
import { imoSelectOptions, increasedText } from '@/config';
import { useNavigate } from 'react-router-dom';
import { getLaunchpadImo, getImoPvCard } from '@/api/launchpad';
import { LaunchpadIMO, ImoPvCard } from '@/types';
import { useAccount } from '@/hooks/useWeb3';
import { isProd, formatRatioToPercentage, getActualPath, formatPxToVw, formatDecimals } from '@/utils';
import isMobile from 'is-mobile';
import MobileCard from '@/components/MobileCard';
import useFunctions from '@/hooks/useFunctions';
import IPopover from '@/components/IPopover';
import Countdown from '@/components/Countdown';
import IProgress from '@/components/IProgress';
import Tabbar from '@/components/TabBar';
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;

const LaunchPadImo = () => {
  const [activeKey, setActiveKey] = useState('');
  const [orderBy, setOrderBy] = useState('desc');
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: isMobile() ? 12 : 10,
    total: 0,
  });
  const [data, setData] = useState<LaunchpadIMO[]>([]);
  const [cardData, setCardData] = useState<ImoPvCard[]>([]);
  const [loading, setLoading] = useState(false);
  const { address, memooConfig, idoBuy, getMemeUserData } = useAccount();
  const [refresh, setRefresh] = useState(0);
  const [displayType, setDisplayType] = useState<'grid' | 'row'>('grid');
  const [selected, setSelected] = useState(0);
  const iconRefs = useRef<any>({});
  const [openSlippageModal, setOpenSlippageModal] = useState(false);

  // const triggerRefresh = useCallback(async () => {
  //   await setRefresh((v) => v + 1);
  //   setTimeout(() => {
  //     fetchData();
  //   }, 1000);
  // }, []);

  const triggerRefresh = () => {
    setPagination({
      ...pagination,
      current: 1,
    });
    setRefresh((v) => v + 1);
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let params = {
        pageNumber: pagination.current ?? 1,
        pageSize: pagination.pageSize ?? 10,
        sortField: activeKey,
        sortDirection: orderBy,
        address: address?.toBase58() ?? '',
      };
      const { data } = await getLaunchpadImo(params);
      // console.log(data);
      if (data) {
        displayType === 'row' || data?.records.length <= 10
          ? setData(data.records ?? [])
          : setData((state) => state.concat(data?.records ?? []));
        // setData([]);
        setPagination({
          ...pagination,
          total: data.total_record ?? 0,
        });
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [address, refresh]);
  // }, [address, refresh, pagination, displayType]);

  useEffect(() => {
    fetchData();
  }, [pagination.current, activeKey, orderBy, displayType, refresh]);

  useEffect(() => {
    (async () => {
      const { data } = await getImoPvCard(address?.toBase58() ?? '');
      setCardData(data);
    })();
  }, [address, refresh]);

  return (
    <div>
      <Spin spinning={loading} fullscreen />
      {data.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mobile_page_padding launchpad_content_mobile ">
          {data.map((item) => (
            <div key={item.ticker}>
              <MobileCard item={item}>
                <div className="mr-2">
                  <div className="flex gap-x-[12px] h-full">
                    {Number(item.creatorTotalRaisedNumerator ?? 0) > 0 && (
                      <IPopover
                        trigger="hover"
                        content={`${increasedText(formatRatioToPercentage(item.creatorTotalRaisedNumerator, item.creatorTotalRaisedDenominator))}`}
                      >
                        <img className="icon_topup_mobile" src="/create/topupicon.png" />
                      </IPopover>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="flex justify-between items-center px-2 gap-y-1">
                    <div className="flex items-center w-[50%]">
                      {/* <span className="font-OCR text-[#7D83B5] text-9-10">Ends in</span> */}
                      <img className="w-3 h-3" src="/common/date.svg" alt="" />
                    </div>
                    <Countdown
                      className="flex gap-x-1 font-OCR text-9-10 text-white"
                      timefragments=""
                      format={([days, hours, minutes, seconds]) => [
                        <div key="hours">
                          <time className="font-OCR text-9-10 text-white">{hours}</time>
                          <span className="font-OCR text-9-10 text-white">h</span>
                        </div>,
                        <div key="minutes">
                          <time className="font-OCR text-9-10 text-white">{minutes}</time>
                          <span className="font-OCR text-9-10 text-white">m</span>
                        </div>,
                        <div key="seconds">
                          <time className="font-OCR text-9-10 text-white">{seconds}</time>
                          <span className="font-OCR text-9-10 text-white">s</span>
                        </div>,
                      ]}
                      instant={Number(item.endsIn) * 1000}
                      // instant={1720510654000}
                      onEnded={(ended) => {
                        // setEnded(ended);
                      }}
                      symbol=""
                    />
                  </div>
                  <div className="flex justify-between items-start px-2">
                    <div className="flex items-center w-[50%]">
                      {/* <span className="font-OCR text-[#7D83B5] text-9-10">Memoo Score</span> */}
                      <img className="w-3 h-3" src="/common/memoo_score_icon.svg" alt="" />
                    </div>
                    <div className="flex flex-col w-[50%] h-max items-end gap-y-1">
                      <p className="font-OCR text-white text-9-10">
                        {formatRatioToPercentage(item.memooScore, item.totalScore)}/100
                      </p>
                      <IProgress
                        className="w-[60%] h-1 -mt-1"
                        percent={formatRatioToPercentage(item.memooScore, item.totalScore)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-start px-2">
                    <div className="flex items-center w-[50%]">
                      {/* <span className="font-OCR text-[#7D83B5] text-9-10">Total Raised</span> */}
                      <img className="w-3.5 h-3" src="/common/total_raised.svg" alt="" />
                    </div>
                    <div className="flex flex-col w-[50%] items-end gap-y-1">
                      <p className="font-OCR text-white text-9-10">
                        {formatRatioToPercentage(item.totalRaisedNumerator, item.totalRaisedDenominator)}/100
                      </p>
                      <IProgress
                        className="w-[60%] p-0 h-1 -mt-1"
                        percent={formatRatioToPercentage(item.totalRaisedNumerator, item.totalRaisedDenominator)}
                      />
                    </div>
                  </div>
                  <div className="w-full flex mt-3">11</div>
                </div>
              </MobileCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LaunchPadImo;
