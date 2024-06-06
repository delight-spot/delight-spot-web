import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  keepPreviousData,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { number, queryKeys } from '@/constants';
import { getStores } from '@/services/store/store';
import { ErrorStatus } from '@/types/common';
import { Store } from '@/types/domain';

function useGetInfiniteStores(
  selectedType: string = 'all',
  queryOptions?: UseInfiniteQueryOptions<Store[], ErrorStatus, InfiniteData<Store[], number>, Store[], QueryKey, number>
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getStores(pageParam, selectedType),
    queryKey: [queryKeys.GET_STORES, selectedType],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.length < number.INFINITE_QUERY_OFFSET) return undefined;
      const lastFeed = lastPage.at(-1);
      return lastFeed ? allPage.length + 1 : undefined;
    },
    staleTime: number.QUERY_ONE_HOUR_TIMES,
    gcTime: number.QUERY_ONE_HOUR_TIMES,
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

export { useGetInfiniteStores };
