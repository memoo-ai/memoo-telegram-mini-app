/* eslint-disable react/no-unstable-nested-components */
import {
  getInvitation,
  getInvitationCode,
  getInvitationQuery,
  getInvitationTop,
  getUserReferral,
  invitationJoin,
} from '@/api/join';
import { IconCopy, IconFriends, IconJoin, IconTwitter } from '@/components/icons';
import { useAccount } from '@/hooks/useWeb3';
import { formatAddress, handleCopy, popupSharing } from '@/utils';
import { Button, Input, Spin } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { InvitationList, ReferralType } from '@/types';
import EnterReferralCodeModal from './enter-referral-code-modal';
import ResultModal, { ResultRef } from './result-modal';
import message from '@/components/IMessage';
import { useSearchParams } from 'react-router-dom';
import isMobile from 'is-mobile';
import starburstImg from '@/assets/images/join/30starburst.svg';
import couponImg from '@/assets/images/join/coupon.svg';
// import Wallet from '@/components/SolanaWallet';

const joinUrl = import.meta.env.VITE_ROUTE_JOIN;
const Referral = () => {
  const [invitationCode, setInvitationCode] = useState('');
  const [invitedAddress, setInvitedAddress] = useState('');
  const [refInvitationCode, setRefInvitationCode] = useState('');
  const iconRefs = useRef<any>({});
  const resultRef = useRef<ResultRef>(null);
  const [invitationList, setInvitationList] = useState<InvitationList[]>();
  const [refresh, setRefresh] = useState(0);
  const { address, useAddress } = useAccount();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [referral, setReferral] = useState<ReferralType>();
  const [searchParams] = useSearchParams();

  const shareUrl = `I've joined Memoo. Join the Memevolution with us. Use my referral code for a 100 point bonus! https://${import.meta.env.VITE_SHARE_URI}${joinUrl}?ref=${invitationCode}`;

  useEffect(() => {
    const InvitationCode = searchParams.get('ref');
    setRefInvitationCode(InvitationCode ?? '');
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (!address) return;

        const { data: result } = await getInvitationTop(address?.toBase58() ?? '');
        setInvitationList(result);

        const { data: invitation } = await getInvitation();
        setInvitedAddress(invitation ?? '');
        const { data: query } = await getInvitationQuery();
        setInvitationCode(query);

        const { data: referral } = await getUserReferral();
        setReferral(referral);
        setLoading(false);
        // const { data: query } = await getInvitationQuery();
        // setInvitationCode(query);
      } catch (e) {
        console.log('getInvitationTop:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [address, refresh]);

  const params = useMemo(() => {
    return [
      {
        key: 'Rank',
        value: referral?.Rank ?? 0,
      },
      {
        key: 'Total Pts',
        value: referral?.Score ?? 0,
        formatKey: (key: string) => (
          <div className="font-404px text-green text-[12px] leading-none flex items-center gap-x-1">
            <IconJoin color="#00FFA3" width={12} height={12} />
            {key}
          </div>
        ),
      },
      {
        key: 'CONTRIBUTED PTS',
        value: referral?.invitationScore ?? 0,
        formatKey: (key: string) => (
          <div className="font-404px text-green text-[12px] leading-none flex items-center gap-x-1">
            <IconJoin color="#00FFA3" width={12} height={12} />
            {key}
          </div>
        ),
      },
      {
        key: 'BONUS CONTRIBUTORS',
        value: referral?.Invitations ?? 0,
      },
    ];
  }, [referral]);
  const generateCode = useCallback(async () => {
    // const result = await useAddress('!mt-[130px]');
    // TODO
    const { data } = await getInvitationCode();
    setInvitationCode(data);
  }, [address]);

  const onConfirm = useCallback(async () => {
    try {
      if (!address) return;
      if (!refInvitationCode) {
        message.error('Please enter the referral code', { key: 'message', className: `!mt-[135px]` });

        return;
      }
      setConfirming(true);
      const { data } = await invitationJoin(refInvitationCode);
      // await message.success('Congratulations! You have successfully claimed your bonus points.');
      if (data) {
        resultRef.current?.open(data);
        setConfirming(false);
      } else {
        message.error(data.msg, { key: 'Failed' });
      }
    } catch (error) {
      console.log(error);
      message.error('Failed to claim bonus points', { key: 'Failed' });
    } finally {
      setConfirming(false);
    }
  }, [refInvitationCode]);
  return (
    <div className="flex flex-col justify-center items-center pt-7 pb-12">
      <Spin spinning={loading} fullscreen />
      <h3 className="font-404px text-2xl leading-none text-white max-lg:text-14-14  max-lg:mt-6">
        EARN FASTER WITH REFERRALS
      </h3>
      <h5 className="font-OCR text-sm leading-none text-[#9EA2C7] max-lg:text-9-9">
        Connect wallet to access Referrals.{' '}
      </h5>
      <div className="w-full flex items-center gap-x-2.5 mt-4 max-lg:flex-col max-lg:gap-y-2.5">
        {params.map((item, index) => {
          return (
            <div
              key={item.key}
              className="flex-1 bg-[#1F3B4F] border border-solid border-green rounded-[7px] flex flex-col items-center justify-center h-20 gap-y-2 max-lg:w-full max-lg:justify-between max-lg:flex-row-reverse max-lg:p-3.5"
            >
              <div className="font-404px text-white text-2xl leading-5 max-lg:text-14-14">{item.value}</div>
              {item?.formatKey ? (
                item.formatKey(item.key)
              ) : (
                <div className="font-404px text-green text-[12px] leading-none max-lg:text-10-10">{item.key}</div>
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full bg-[#2C1844] border border-solid border-[#B53BFF] rounded-[7px] flex flex-col mt-5 p-5 relative max-lg:mt-4">
        <img className="w-[92px] h-[85px] absolute right-1.5 -top-5" src={starburstImg} alt="" />
        <h3 className="font-404px text-green text-base leading-[18px] max-lg:text-14-14">
          EARN 30% FROM YOUR FRIENDS!
        </h3>
        <h3 className="font-OCR text-sm leading-[18px] text-[#9EA2C7] mt-2 max-lg:mt-1 whitespace-nowrap max-lg:text-9-11 max-lg:whitespace-pre-wrap">
          {`Invite your friends to join and\nreceive 30% of their points.`}
        </h3>
        <p className="font-OCR text-sm leading-[18px] text-[#9EA2C7] w-full text-center mt-5 max-lg:text-9-9 max-lg:mt-4">
          Invite friends now!
        </p>
        <div className="flex items-center justify-center gap-x-[6px] w-full mt-3 max-lg:flex-col max-lg:gap-y-2.5 max-lg:h-max">
          <div className="h-12 max-lg:!h-10 w-full">
            {invitationCode ? (
              <div className="flex flex-1 items-center justify-center gap-x-4 text-white h-12 bg-[#1F1131] border border-solid border-[#B53BFF] rounded-[7px] font-404px max-lg:w-full max-lg:h-full">
                {invitationCode}
                <IconCopy
                  className="w-[10px] h-[11px]"
                  color="#FFFFFF"
                  onClick={() => {
                    handleCopy(invitationCode ?? '', '!mt-[135px]');
                  }}
                />
              </div>
            ) : (
              <Button className="memoo_button flex-1 w-full !h-full" onClick={generateCode}>
                GENERATE CODE
              </Button>
              // <Wallet className="flex-1 w-full ">
              //   <Button
              //     className="memoo_button flex-1 w-[307px] max-lg:w-[297px] !h-[50px] max-lg:!h-10"
              //     onClick={generateCode}
              //   >
              //     <p className="!text-[16px] max-lg:!text-12-12">GENERATE CODE</p>
              //   </Button>
              // </Wallet>
            )}
          </div>
          <div className="h-12 max-lg:!h-10 w-full">
            <Button
              className="memoo_button join_disabled w-full h-full flex-1 flex items-center gap-x-1 p-0 max-lg:w-full max-lg:h-full"
              onMouseOver={() => {
                if (invitationCode) {
                  iconRefs.current[`IconTwitter`].setHovered(true);
                }
              }}
              onMouseLeave={() => {
                if (invitationCode) {
                  iconRefs.current[`IconTwitter`].setHovered(false);
                }
              }}
              onClick={() => popupSharing(`https://twitter.com/intent/tweet?url=${shareUrl}`)}
              disabled={!invitationCode}
            >
              <p className="!text-[16px] max-lg:!text-12-12">SHARE ON</p>
              <IconTwitter
                color="#B53BFF"
                hoverColor="#07E993"
                className="!w-[15px] !h-[15px]"
                ref={(ref) => (iconRefs.current[`IconTwitter`] = ref)}
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#2C1844] border border-solid border-[#B53BFF] rounded-[7px] flex flex-col mt-5 p-5 relative max-lg:mt-2.5">
        <img className="w-[101px] h-[73px] absolute right-1.5 -top-2" src={couponImg} alt="" />
        <h3 className="font-404px text-green text-base leading-[18px] max-lg:text-14-14">INVITED BY A FRIEND?</h3>
        <h3 className="font-OCR text-sm leading-[18px] text-[#9EA2C7] mt-2 whitespace-nowrap max-lg:whitespace-pre-wrap max-lg:text-9-11">
          {`Claim your bonus 100 points\non entering referral code.`}
        </h3>
        <p className="font-OCR text-sm leading-[18px] text-[#9EA2C7] w-full text-center mt-5 max-lg:text-9-9">{`${invitedAddress ? 'You were invited by' : 'Claim bonus points!'}`}</p>
        {invitedAddress ? (
          <div className="w-full bg-[#2C1844] border border-solid border-[#B53BFF] rounded-[7px] h-12 relative flex justify-center items-center mt-3 text-white font-404px text-base leading-none max-lg:justify-end max-lg:text-12-16 max-lg:pr-3">
            {formatAddress(invitedAddress)}
            <span className="absolute left-3.5 top-2/4 -translate-y-1/2 points-btn !w-[142px] flex items-center justify-center max-lg:text-10-14">
              30% pTS contribution TO
            </span>
          </div>
        ) : (
          <div className="flex gap-x-[3.3px] items-center mt-[21px] h-[50px] max-lg:flex-col max-lg:h-max max-lg:gap-y-2.5">
            <div className="max-lg:w-full max-lg:!h-10 h-[50px]">
              <Input
                className="flex-1 w-[307px] h-full code-input font-404px text-[16px] leading-[16px]  max-lg:!w-[297px] max-lg:!h-full max-lg:text-center"
                placeholder="ENTER CODE"
                value={refInvitationCode ?? 'ENTER CODE'}
                onChange={(e) => {
                  setRefInvitationCode(e.target.value);
                }}
              />
            </div>
            <Button className="memoo_button h-[50px] flex-1" onClick={onConfirm} loading={confirming}>
              <span className="!text-[16px]">ENTER REFERRAL CODE</span>
            </Button>
            {/* <div className="w-full">
              <Wallet className="max-lg:!w-full p-0">
                <Button
                  className="memoo_button h-[50px] flex-1 w-[307px] max-lg:!w-[297px] max-lg:h-10"
                  onClick={onConfirm}
                  loading={confirming}
                >
                  <p className="!text-[16px] max-lg:!text-12-12">ENTER REFERRAL CODE</p>
                </Button>
              </Wallet>
            </div> */}
          </div>
        )}
      </div>
      <div className="flex flex-col border border-solid border-[#B53BFF] bg-[#2C1844] rounded-[7px] p-5 mt-5 min-h-[230px] w-full max-lg:p-3.5 max-lg:mt-2.5">
        <h3 className="font-404px text-[10px] leading-[10px] text-white mb-5 max-lg:text-14-14 max-lg:text-green">
          BONUS CONTRIBUTORS
        </h3>
        {invitationList && invitationList.length > 0 ? (
          <div className="flex flex-col">
            {invitationList.map((item, index) => (
              <div className="w-full flex items-center gap-x-[5px] justify-between" key={item.address}>
                <span className=" text-white font-OCR text-base leading-[30px] text-nowrap flex items-center gap-x-4 max-lg:text-12-16">
                  <IconFriends /> {`${formatAddress(item.address)}`}
                </span>
                <span className=" text-white font-OCR text-base leading-[30px] text-nowrap max-lg:text-12-16">
                  {item.score} pts
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-x-4 font-OCR text-sm leading-none text-[#9EA2C7] h-full min-h-[230px] -mt-4 max-lg:text-9-9 max-lg:flex-1">
            <IconFriends color="#9EA2C7" />
            No contributors. Invite friends now!
          </div>
        )}
      </div>
      <ResultModal ref={resultRef} />
    </div>
  );
};
export default Referral;
