import api from '../httpClient';
import { Store } from '@/types/domain';

const getStores = async (page: number = 1, type?: string): Promise<Store[]> => {
  const data = await (
    await api.get(`/stores`, {
      params: {
        ...(type !== 'all' && { type }),
        page,
      },
    })
  )?.data;
  return data;
};

const getStoreDetail = async (id: number) => {
  const result = await (await api.get(`/stores/${id}`)).data;
  return result;
};

export { getStores, getStoreDetail };
