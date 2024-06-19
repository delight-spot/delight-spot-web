import { ACCESS_TOKEN } from '@/constants';
import { kakaoAuthCode, signup } from '@/services/user';
import { UseMutationCustomOptions } from '@/types/common';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
  const router = useRouter();
  return useMutation({
    mutationFn: (code: string) => kakaoAuthCode(code),
    onSuccess: (data) => {
      if (data.is_member && data.kakao_jwt) {
        setCookie(ACCESS_TOKEN, data.kakao_jwt);
        router.replace('/');
        return;
      }
    },
    ...mutationOptions,
  });
}

function useSignUp(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (state: { code: string; email: string }) => signup(state),
    onSuccess: (data) => {
      console.log('useSignUp ', data);
      setCookie(ACCESS_TOKEN, data.kakao_jwt);
    },
    ...mutationOptions,
  });
}

export { useKakaoLogin, useSignUp };
