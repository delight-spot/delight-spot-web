import { KindMenu } from '@/types/domain/stores';
import api from '../httpClient';

type BookingListParams = {
  page: number;
  keyword?: string;
  type: KindMenu;
};

const getBookingStoreList = async ({ storeId, params }: { storeId: number; params: BookingListParams }) => {
  const response = await (
    await api.get(`/bookings`, {
      params,
    })
  ).data;
  return response;
};

const toggleBooking = async (storeId: number): Promise<void> => {
  const response = await (
    await api.post(`/bookings`, {
      store_pk: [storeId],
    })
  ).data;
  return response;
};

export { getBookingStoreList, toggleBooking };
export type { BookingListParams };
