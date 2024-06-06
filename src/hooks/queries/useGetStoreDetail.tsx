import { queryKeys } from '@/constants';
import { getStoreDetail } from '@/services/store/store';
import { UseQueryCustomOption } from '@/types/common';
import { useQuery } from '@tanstack/react-query';

function useGetStoreDetail(id: number, queryOptions?: UseQueryCustomOption) {
  return useQuery({
    queryKey: [queryKeys.GET_STORE_DETAIL],
    queryFn: () => getStoreDetail(id),
    ...queryOptions,
  });
}

export { useGetStoreDetail };
