import { queryClient } from '@/QueryProvider';
import { number, queryKeys } from '@/constants';
import { createReview, getReviews } from '@/services/store/reviews';
import { ErrorStatus, UseMutationCustomOptions } from '@/types/common';
import { Review } from '@/types/domain/reviews';
import { InfiniteData, QueryKey, UseInfiniteQueryOptions, useInfiniteQuery, useMutation } from '@tanstack/react-query';

function useGetReviews(
  { storeId, page = 1 }: { storeId: number; page?: number },
  queryOptions?: UseInfiniteQueryOptions<
    Review[],
    ErrorStatus,
    InfiniteData<Review[], number>,
    Review[],
    QueryKey,
    number
  >
) {
  return useInfiniteQuery({
    queryKey: [queryKeys.STORE.GET_REVIEWS, storeId],
    queryFn: () => getReviews({ storeId, page }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.length < number.INFINITE_QUERY_OFFSET) return undefined;
      const lastFeed = lastPage.at(-1);
      return lastFeed ? allPage.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

function useCreateReviews(storeId: number, mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (description: string) => createReview({ storeId, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STORE.GET_REVIEWS, storeId],
      });
    },
    ...mutationOptions,
  });
}

export { useGetReviews, useCreateReviews };
