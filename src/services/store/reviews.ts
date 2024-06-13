import { Review } from '@/types/domain/reviews';
import api from '../httpClient';

const getReviews = async (storeId: number): Promise<Review[]> => {
  const { data } = await api.get(`/stores/${storeId}/reviews`);
  return data;
};

export { getReviews };
