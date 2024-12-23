/* eslint-disable @typescript-eslint/consistent-type-assertions */
import http from '@/utils/http';
import { CustomAxiosRequestConfig, prefix } from '.';
import { SearchUserRanking, TelegramBind, pageParams } from '@/types';
import { ApiResponse } from './base';

export const searchUserRanking = (address: string) => {
  return http.get<SearchUserRanking[]>(`${prefix}/web-unauthorized/search-user-ranking`, { params: { address } });
};
export const getInvitationCode = () => {
  return http.get(`${prefix}/web-oriented/invitation-code`, {});
};
export const invitationJoin = (invitationCode: string) => {
  return http.post(`${prefix}/web-oriented/invitation-join`, { InvitationCode: invitationCode });
};
export const getInvitationTop = (address: string) => {
  return http.get(`${prefix}/web-oriented/invitation-top`, { params: { address } });
};
export const getInvitation = () => {
  return http.get(`${prefix}/web-oriented/invitation`, {});
};

export const getUserRankingList = (params: pageParams) => {
  return http.get(`${prefix}/web-unauthorized/search-user-ranking-list`, { params });
};
export const getInvitationQuery = () => {
  return http.get(`${prefix}/web-oriented/invitation-code-query`, {});
};
export const getTelegramBind = () => {
  return http.get(`${prefix}/web-oriented/telegram-bind`, {});
};
// export const telegramBind = (params: TelegramBind, showCustomError = true): Promise<ApiResponse<boolean>> => {
//   return http.post(`${prefix}/web-oriented/telegram-bind`, { params, showCustomError } as CustomAxiosRequestConfig);
// };
export const telegramBind = (params: TelegramBind) => {
  return http.post(`${prefix}/web-oriented/telegram-bind`, { ...params });
};
export const getUserTask = () => {
  return http.get(`${prefix}/web-oriented/user-task`, {});
};
export const getUserReferral = () => {
  return http.get(`${prefix}/web-oriented/peferral`, {});
};
export const docClick = () => {
  return http.post(`${prefix}/web-oriented/doc-click`, {});
};
