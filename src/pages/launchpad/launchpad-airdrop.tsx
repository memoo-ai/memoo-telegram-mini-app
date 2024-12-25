/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import './launchpad-airdrop.scss';
import { useState, useEffect, useCallback } from 'react';
import type { PaginationProps } from 'antd';
import { Spin, Button } from 'antd';
import { increasedText } from '@/config';
import { useNavigate } from 'react-router-dom';
import { getLaunchpadAirdrop, getAirdropCard } from '@/api/launchpad';
import { LaunchpadAirdrop, AirdropCard } from '@/types';
import { useAccount } from '@/hooks/useWeb3';
import { formatRatioToPercentage, formatTs, getActualPath, isProd } from '@/utils';
import MobileCard from '@/components/MobileCard';
import IProgress from '@/components/IProgress';
import IPopover from '@/components/IPopover';
import isMobile from 'is-mobile';
import Tabbar from '@/components/TabBar';

const LaunchPadAirdrop = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('');
  const [orderBy, setOrderBy] = useState('desc');
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: isMobile() ? 12 : 10,
    total: 0,
  });
  const [data, setData] = useState<LaunchpadAirdrop[]>([]);
  const [cardData, setCardData] = useState<AirdropCard[]>([]);
  const [loading, setLoading] = useState(false);
  const { address, useAddress } = useAccount();
  const [refresh, setRefresh] = useState(0);
  const [displayType, setDisplayType] = useState<'grid' | 'row'>('grid');

  const triggerRefresh = useCallback(async () => {
    await setRefresh((v) => v + 1);
  }, []);

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
      const { data } = await getLaunchpadAirdrop(params);
      // console.log(data);
      if (data) {
        displayType === 'row' ? setData(data.records ?? []) : setData((state) => state.concat(data?.records ?? []));
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

  useEffect(() => {
    fetchData();
  }, [pagination.current, activeKey, orderBy]);

  useEffect(() => {
    (async () => {
      const { data } = await getAirdropCard(address?.toBase58() ?? '');
      setCardData(data);
    })();
  }, [address, refresh]);

  return (
    <div>
      <Spin spinning={loading} fullscreen />
      {data.length > 0 && (
        <div
          className={`grid grid-cols-2 gap-4 ${data.length > 0 ? 'mobile_page_padding' : 'm-0'} launchpad_content_mobile`}
        >
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
                  <div className="flex flex-col gap-y-1">
                    <div className="flex justify-between items-center px-2 gap-y-1 h-7">
                      <div className="flex items-center w-[50%]">
                        {/* <span className="font-OCR text-[#7D83B5] text-9-10">IMO Date</span> */}
                        <img className="w-3 h-3" src="/common/date.svg" alt="" />
                      </div>
                      <div className="font-OCR text-white text-9-10">
                        {item.idoDate ? formatTs(Number(item.idoDate ?? 0)) : ''}
                      </div>
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
                          className="w-[60%] memoo_progress_mobile -mt-1"
                          percent={formatRatioToPercentage(item.memooScore, item.totalScore)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-start px-2">
                      <div className="flex items-center w-[50%]">
                        {/* <span className="font-OCR text-[#7D83B5] text-9-10">Participants</span> */}
                        <img className="w-3.5 h-3" src="/common/total_raised.svg" alt="" />
                      </div>
                      <div className="flex flex-col w-[50%] h-max items-end gap-y-1">
                        <span className="font-OCR text-white text-9-10">{item.participants}</span>
                        <span className="h-1" />
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full memoo_button_mobile mt-3 h-6"
                    onClick={() => navigate(getActualPath('airdrop', { ticker: item.ticker }))}
                  >
                    <span className="font-404px text-10-10">AIRDROP</span>
                  </Button>
                </div>
              </MobileCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LaunchPadAirdrop;
