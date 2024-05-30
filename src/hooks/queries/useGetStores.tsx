import { InfiniteData, QueryKey, UseInfiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants';
import { getStores } from '@/services/store/store';
import { ErrorStatus } from '@/types/common';
import { Store } from '@/types/domain';

function useGetInfiniteStores(
  queryOptions?: UseInfiniteQueryOptions<Store[], ErrorStatus, InfiniteData<Store[], number>, Store[], QueryKey, number>
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getStores(pageParam),
    queryKey: [queryKeys.GET_STORES],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const lastFeed = lastPage.at(-1);
      return lastFeed ? allPage.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export { useGetInfiniteStores };
