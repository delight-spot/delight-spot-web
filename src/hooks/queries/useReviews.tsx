import { queryClient } from '@/QueryProvider';
import { number, queryKeys } from '@/constants';
import { createReview, CreateReviewArgs, getReviews } from '@/services/store/reviews';
import { ErrorStatus, UseMutationCustomOptions } from '@/types/common';
import { Review } from '@/types/domain/reviews';
import { InfiniteData, QueryKey, UseInfiniteQueryOptions, useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  return useMutation({
    mutationFn: (reviewData: CreateReviewArgs) => createReview(storeId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STORE.GET_REVIEWS, storeId],
      });
      router.replace(`/store/${storeId}`);
    },
    ...mutationOptions,
  });
}

export { useGetReviews, useCreateReviews };
