import axios, { AxiosError } from 'axios';
import HttpError from './httpError';

export const SSR_BASE_URL = 'http://localhost:8000/api/v1';
export const CSR_BASE_URL = '/api/v1/';

const isServer = typeof window === 'undefined';

const api = axios.create({
  baseURL: isServer ? SSR_BASE_URL : CSR_BASE_URL,
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('error ', error);
    if (!(error instanceof AxiosError)) throw new Error('네트워크 통신 에러');
    throw new HttpError(error.response?.status, error.response?.statusText).errorData;
  }
);

export default api;
