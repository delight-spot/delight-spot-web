import { Review } from '@/types/domain/reviews';
import api from '../httpClient';

const getReviews = async ({ storeId, page = 1 }: { storeId: number; page?: number }): Promise<Review[]> => {
  const { data } = await api.get(`/stores/${storeId}/reviews?page=${page}`);
  return data;
};

type CreateReviewArgs = {
  taste_rating?: number;
  atmosphere_rating?: number;
  kindness_rating?: number;
  clean_rating?: number;
  parking_rating?: number;
  restroom_rating?: number;
  review_photo?: string[];
  description: string;
};

const createReview = async (storeId: number, reviewData: CreateReviewArgs) => {
  const response = await (
    await api.post(`/stores/${storeId}/reviews`, {
      ...reviewData,
    })
  ).data;
  return response;
};

export { getReviews, createReview };
export type { CreateReviewArgs };
