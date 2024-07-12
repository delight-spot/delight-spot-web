import { KindMenu, Store, StoreDetail } from '@/types/domain/stores';
import api from '../httpClient';

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

type CreateStoreArgs = {
  name: string;
  description: string;
  kind_menu: KindMenu;
  city: string;
  store_photo: string[];
  pet_friendly: boolean;
};

const createStore = async ({ city, description, kind_menu, name, store_photo, pet_friendly }: CreateStoreArgs) => {
  const response = await (
    await api.post(`/stores`, {
      name,
      description,
      kind_menu,
      city,
      store_photo,
      pet_friendly,
    })
  ).data;

  return response;
};

const getStoreDetail = async (id: number): Promise<StoreDetail> => {
  const result = await (await api.get(`/stores/${id}`)).data;
  return result;
};

type StoreUpdateArgs = {};
const updateStore = async () => {};

const deleteStore = async ({ storeId }: { storeId: number; fileUrls?: string[] }) => {
  return await (
    await api.delete(`/stores/${storeId}`)
  ).data;
};

export { getStores, getStoreDetail, createStore, deleteStore };
