import { Review } from '@/types/domain/reviews';
import api from '../httpClient';

const getReviews = async ({ storeId, page = 1 }: { storeId: number; page?: number }): Promise<Review[]> => {
  const { data } = await api.get(`/stores/${storeId}/reviews?page=${page}`);
  return data;
};

export { getReviews };
