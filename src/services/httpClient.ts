import axios, { AxiosError } from 'axios';
import HttpError from './httpError';
import { getCookie } from 'cookies-next';
import { ACCESS_TOKEN } from '@/constants';
import { handleNetworkError } from '@/utils/handleNetworkError';

export const SSR_BASE_URL = 'http://localhost:8000/api/v1';
export const CSR_BASE_URL = '/api/v1/';

const isServer = typeof window === 'undefined';

const api = axios.create({
  baseURL: isServer ? SSR_BASE_URL : CSR_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const prevAccessToken = getCookie(ACCESS_TOKEN);
  if (prevAccessToken) {
    config.headers.Authorization = prevAccessToken;
  }

  const csrftoken = getCookie('csrftoken'); // csrftoken 쿠키에서 가져오는 예시 함수
  if (csrftoken) {
    config.headers['X-CSRFToken'] = csrftoken;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.warn('error ', error);
    handleNetworkError(error);
  }
);

export default api;
