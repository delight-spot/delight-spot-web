import api from '../httpClient';
import { Store } from '@/types/domain';

const getStores = async (): Promise<Store[]> => {
  const data = await (await api.get(`/stores`))?.data;
  return data;
};

export { getStores };
