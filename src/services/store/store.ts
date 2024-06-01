import api from '../httpClient';
import { Store } from '@/types/domain';

const getStores = async (page: number = 1): Promise<Store[]> => {
  const data = await (await api.get(`/stores?page=${page}`))?.data;
  return data;
};

export { getStores };
