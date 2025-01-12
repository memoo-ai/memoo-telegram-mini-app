/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import './launchpad-airdrop.scss';
import { useState, useEffect, useCallback, lazy } from 'react';
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
import StickyHeader from '@/components/StickyHeader';
import AirdropImg from '@/assets/images/icons/icon-airdrop.svg';
import Select from '@/components/Select';
import { airdropSelectOptions } from '@/config';

const AirdropTaskDialog = lazy(() => import('./AirdropTaskDialog'));

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
  }, [address, refresh, activeKey, orderBy]);

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
      <StickyHeader text="Hunt AIRDROPS" imgSrc={AirdropImg}>
        <Select
          className="mt-1 mb-2"
          options={airdropSelectOptions}
          onChange={(e) => setActiveKey(e)}
          defaultValue={airdropSelectOptions[0].key}
        />
      </StickyHeader>
      {data.length > 0 && (
        <div className="grid grid-cols-2 gap-4 page_container launchpad_content_mobile">
          {data.map((item) => (
            <div key={item?.ticker}>
              <AirdropTaskDialog hasCreatorFollowed={true}>
                <a>
                  <MobileCard item={item} showTotalRaised={false} />
                </a>
              </AirdropTaskDialog>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LaunchPadAirdrop;
