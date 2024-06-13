import { queryKeys } from '@/constants';
import { getReviews } from '@/services/store/reviews';
import { UseQueryCustomOption } from '@/types/common';
import { Review } from '@/types/domain/reviews';
import { useQuery } from '@tanstack/react-query';

function useGetReviews(storeId: number, queryOptions?: UseQueryCustomOption<Review[]>) {
  return useQuery({
    queryKey: [queryKeys.GET_REVIEWS, storeId],
    queryFn: () => getReviews(storeId),
    ...queryOptions,
  });
}

export { useGetReviews };
