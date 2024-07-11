import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query';

import { number, queryKeys } from '@/constants';
import { createStore, getStores } from '@/services/store/store';
import { ErrorStatus, UseMutationCustomOptions } from '@/types/common';
import { Store } from '@/types/domain/stores';
import { queryClient } from '@/QueryProvider';
import { useRouter } from 'next/navigation';
import { useStoreListTabState } from '@/store/useStoreListTabStore';
import { useToastStore } from '@/store/useToastStore';

function useGetInfiniteStores(
  selectedType: string = 'all',
  queryOptions?: UseInfiniteQueryOptions<Store[], ErrorStatus, InfiniteData<Store[], number>, Store[], QueryKey, number>
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => {
      return getStores(pageParam, selectedType);
    },
    queryKey: [queryKeys.STORE.GET_STORES, selectedType],
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

function useCreateStore(mutationOptions?: UseMutationCustomOptions) {
  const router = useRouter();
  const { addToast } = useToastStore();
  const { selectedTab } = useStoreListTabState();
  return useMutation({
    mutationFn: createStore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STORE.GET_STORES, selectedTab],
      });
      addToast({
        message: '스토어를 생성했습니다.',
        type: 'success',
      });
      router.push('/');
    },
    ...mutationOptions,
  });
}

export { useGetInfiniteStores, useCreateStore };
