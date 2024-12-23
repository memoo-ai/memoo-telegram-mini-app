import http from '@/utils/http';
import { prefix } from '.';
import {
  IDOActiveDetail,
  IDOLaunchedDetail,
  IDOLaunchedDetailTop10,
  IDOQueueDetail,
  PageWrapper,
  AirdropDetail,
} from '@/types';
import { ApiResponse } from './base';
import { CustomAxiosRequestConfig } from '.';

export const getIDOActiveDetail = (ticker: string, address?: any) => {
  return http.get<IDOActiveDetail>(`${prefix}/web-unauthorized/ido-active-detail`, { params: { ticker, address } });
};

// export const getIDOCompleted = (params: { pageSize: number; pageNumber: number }) => {
//   return http.get(`${prefix}/web-oriented/ido-completed`, { params });
// };

export const getIDOLaunchedDetail = (ticker: string, address?: any) => {
  return http.get<IDOLaunchedDetail>(`${prefix}/web-unauthorized/ido-launched-detail`, {
    params: { ticker, address },
  });
};

export const getIDOLaunchedDetailTop10 = (params: {
  pageSize: number;
  pageNumber: number;
  ticker: string;
  address?: any;
}) => {
  return http.get(`${prefix}/web-unauthorized/ido-launched-detail-top10`, { params });
};

export const getIDOQueueDetail = (ticker: string, address?: any) => {
  return http.get<IDOQueueDetail>(`${prefix}/web-unauthorized/ido-queue-detail`, { params: { ticker, address } });
};

export const follow = (twitter: string) => {
  return http.get<boolean>(`${prefix}/web-oriented/twitter-follow`, { params: { twitter } });
};

export const imoParticipate = (postBody: { balance: number; ethAmout: number; ticker: string }) => {
  return http.get<string>(`${prefix}/web-oriented/imo-participate`, { data: postBody });
};
export const myAirdropDetail = (params: {
  ticker: string;
  signature: string;
  timestap: string;
  chain: 'Ethereum' | 'Solana';
}) => {
  return http.get<AirdropDetail>(`${prefix}/web-oriented/my-airdrop-detail`, { params });
};

export const getUnlockTimestamp = (ticker: string) => {
  return http.get(`${prefix}/web-unauthorized/token-unlock-date`, { params: { ticker } });
};

export const putIdoBuy = (params: { ticker: string; amount: number; balance?: number; txHash: string }) => {
  return http.put(`${prefix}/web-oriented/ido-buy`, params);
};
export const recordClaim = (params: { ticker: string; busType: string; txHash: string }) => {
  return http.put(`${prefix}/web-oriented/record-claim`, params);
};
export const transactionHistory = (params: { pageSize: number; pageNumber: number; ticker: string }) => {
  return http.get(`${prefix}/web-unauthorized/transction-history`, { params });
};
export const teamClaimSignature = (
  params: {
    ticker: string;
    signature: string;
    timestap: string;
    chain: 'Ethereum' | 'Solana';
  },
  showCustomError = true,
): Promise<ApiResponse> => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return http.get(`${prefix}/web-oriented/team-claim`, {
    params,
    showCustomError,
  } as CustomAxiosRequestConfig);
};
export const clickEmoji = (data: { ticker: string; busType: string }) => {
  return http.post(`${prefix}/web-oriented/user-click`, { ...data });
};
export const getEmoji = (ticker: string) => {
  return http.get(`${prefix}/web-oriented/user-click`, { params: { ticker } });
};
