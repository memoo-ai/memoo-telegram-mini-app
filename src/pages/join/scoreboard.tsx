import { IconJoin } from '@/components/icons';
// import IPagination from '@/components/IPagination';
import { formatAddress, isEven } from '@/utils';
import { Spin, type PaginationProps } from 'antd';
import { useEffect, useState } from 'react';
// import Empty from '@/components/Empty';
import { SearchUserRanking } from '@/types';
import { getUserRankingList } from '@/api/join';
import { useAccount } from '@/hooks/useWeb3';
import isMobile from 'is-mobile';
const Scoreboard = () => {
  const [data, setData] = useState<SearchUserRanking[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 20,
    total: 1,
  });

  const { address, useAddress } = useAccount();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getUserRankingList({
          pageNumber: pagination.current ?? 1,
          pageSize: pagination.pageSize ?? 20,
        });
        setData(data?.records ?? []);
        setPagination(data?.total ?? 0);
        setLoading(false);
      } catch (e) {
        console.log('getInvitationTop:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [address, pagination]);
  return (
    <div>
      <h3 className="font-404px text-2xl leading-none text-white text-center mt-7 max-lg:mt-6 max-lg:text-14-14">
        Earn Points and Claim Your Glory!
      </h3>
      <h5 className="font-OCR text-sm leading-none text-[#9EA2C7] text-center max-lg:text-9-9">
        Show them who’s the alpha. Claim your spot today!
      </h5>
      {/* <div className="max-lg:flex justify-end hidden my-4 pr-4">
        <IPagination
          currentPage={pagination.current ?? 0}
          total={pagination.total ?? 0}
          pageSize={pagination.pageSize}
          onChangePageNumber={(page) => {
            setPagination({ ...pagination, current: page });
          }}
        />
      </div> */}
      <div className="w-[824px] mt-7 max-lg:m-0 py-[31px] max-lg:pt-0 max-lg:w-full">
        <Spin spinning={loading} fullscreen />
        {/* <div className="join-table mt-[30px]"> */}
        <div className="flex items-center justify-between px-[104px] mb-[10px] max-lg:px-4">
          <th className="font-OCR text-[#7D83B5] text-[12px] leading-[20px] text-left flex-1 max-lg:w-7">Rank</th>
          <th className="font-OCR text-[#7D83B5] text-[12px] leading-[20px] text-left flex-1">Address</th>
          <th className="font-OCR text-[#7D83B5] text-[12px] leading-[20px] text-center flex-1">Total Points</th>
        </div>
        {data && data.length > 0
          ? data.map((item, index) => (
              <th
                key={index}
                className={`flex items-center justify-between py-[9px] px-[104px] max-lg:px-4 ${isEven(index) ? 'bg-[#181A2B]' : 'bg-[#1D2034]'}`}
              >
                <tr className="font-OCR text-white text-[18px] leading-[20px]">{item.rank}</tr>
                <tr className="flex items-center gap-x-[18px] font-OCR text-white text-[18px] leading-[20px]">
                  <img className="w-[30px] h-[30px] rounded-[50%]" src={item.profileImage} />
                  {formatAddress(item.address)}
                </tr>
                <tr>
                  {isMobile() ? (
                    <div className="text-white font-OCR text-12-12">{Number(item.score).toLocaleString()}</div>
                  ) : (
                    <div className="flex items-center justify-start gap-x-[7px] bg-[#2C1844] px-[10px] py-[11px] rounded-[50px] join-border w-[196px]">
                      <IconJoin />
                      <span className="text-[18px] text-[#EBCDFE] leading-[20px] font-OCR">
                        {Number(item.score).toLocaleString()}
                      </span>
                    </div>
                  )}
                </tr>
              </th>
            ))
          : // <Empty showBorder={false} />
            null}
        {/* <Table
    className="common-table mb-10"
    columns={columns}
    dataSource={data}
    pagination={false}
    // loading={loading}
    // onChange={handleTableChange}
    // onRow={(record) => {
    //   return {
    //     onClick: (event) => {
    //       navigate(`/airdrop/${record.ticker}`);
    //     },
    //   };
    // }}
    locale={{
      emptyText: <Empty showBorder={false} />,
    }}
  /> */}
        {/* <div className="px-[44px] my-[44px] max-lg:hidden">
          <IPagination
            currentPage={pagination.current ?? 0}
            total={pagination.total ?? 0}
            pageSize={pagination.pageSize}
            onChangePageNumber={(page) => {
              setPagination({ ...pagination, current: page });
            }}
          />
        </div> */}
      </div>
    </div>
  );
};
export default Scoreboard;
