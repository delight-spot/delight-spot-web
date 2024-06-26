import { ACCESS_TOKEN, number, queryKeys } from '@/constants';
import { getMyInfo } from '@/services/user';
import { ErrorStatus } from '@/types/common';
import { User } from '@/types/domain/user';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

function useUser() {
  const accessToken = getCookie(ACCESS_TOKEN);
  const {
    data: users,
    isError,
    error: usersError,
  } = useQuery<User, ErrorStatus>({
    queryKey: [queryKeys.USER.INFO],
    queryFn: getMyInfo,
    gcTime: number.QUERY_ONE_HOUR_TIMES,
    staleTime: number.QUERY_ONE_HOUR_TIMES,
    enabled: !!accessToken,
  });

  return {
    userInfo: users,
    isLoggedIn: users && !isError && !!accessToken,
    userError: usersError,
    isUserError: isError,
  };
}

export { useUser };
