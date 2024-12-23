import http from '@/utils/http';
import axios, { AxiosRequestConfig } from 'axios';
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  showCustomError?: boolean;
}
export const prefix = '/backend/api/v1';
