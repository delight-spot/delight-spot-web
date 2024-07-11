import { queryKeys } from '@/constants';
import { queryClient } from '@/QueryProvider';
import { toggleBooking } from '@/services/store/bookings';
import { useToastStore } from '@/store/useToastStore';
import { UseMutationCustomOptions } from '@/types/common';
import { StoreDetail } from '@/types/domain/stores';
import { useMutation } from '@tanstack/react-query';

export function useGetBookingList() {}

export function useToggleBooking(storeId: number, mutationOptions?: UseMutationCustomOptions) {
  const { addToast } = useToastStore();
  return useMutation({
    mutationFn: (storeId: number) => toggleBooking(storeId),
    onMutate: (storeId: number) => {
      const prevData = queryClient.getQueryData([queryKeys.STORE.GET_STORE_DETAIL, storeId]);
      queryClient.setQueryData([queryKeys.STORE.GET_STORE_DETAIL, storeId], (prevData: StoreDetail) => {
        if (prevData) {
          return {
            ...prevData,
            is_liked: !prevData.is_liked,
          };
        }
      });
      return prevData;
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STORE.GET_STORE_DETAIL, storeId],
      });
      addToast({
        message: '현재 북마크를 적용할 수 없습니다.',
        type: 'error',
      });
    },
    onSuccess: () => {},
    ...mutationOptions,
  });
}
