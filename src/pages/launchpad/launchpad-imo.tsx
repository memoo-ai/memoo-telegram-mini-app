/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import './launchpad-imo.scss';
import { useState, useEffect, useCallback, useMemo, useRef, lazy } from 'react';
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
import StickyHeader from '@/components/StickyHeader';
import ImoImg from '@/assets/images/icons/icon-imo.svg';
import Select from '@/components/Select';

const ImoBuyDialog = lazy(() => import('./ImoBuyDialog'));

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
      <StickyHeader text="DISCOVER IMO" imgSrc={ImoImg}>
        <Select
          className="mt-1 mb-2"
          options={imoSelectOptions}
          onChange={(e) => setActiveKey(e)}
          defaultValue={imoSelectOptions[0].key}
        />
      </StickyHeader>
      {data.length > 0 && (
        <div className="grid grid-cols-2 gap-4 page_container launchpad_content_mobile ">
          {data.map((item) => (
            <div key={item?.ticker}>
              <ImoBuyDialog>
                <a>
                  <MobileCard item={item} />
                </a>
              </ImoBuyDialog>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LaunchPadImo;
