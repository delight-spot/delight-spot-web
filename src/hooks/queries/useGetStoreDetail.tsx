import { number, queryKeys } from '@/constants';
import { getStoreDetail } from '@/services/store/store';
import { UseQueryCustomOption } from '@/types/common';
import { StoreDetail } from '@/types/domain';
import { useQuery } from '@tanstack/react-query';

function useGetStoreDetail(id: number, queryOptions?: UseQueryCustomOption<StoreDetail>) {
  return useQuery({
    queryKey: [queryKeys.GET_STORE_DETAIL, id],
    queryFn: () => getStoreDetail(id),
    staleTime: number.QUERY_ONE_HOUR_TIMES,
    gcTime: number.QUERY_ONE_HOUR_TIMES,
    ...queryOptions,
  });
}

export { useGetStoreDetail };
