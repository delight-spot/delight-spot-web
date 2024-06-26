import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ACCESS_TOKEN } from '@/constants';
import { kakaoAuthCode, signup } from '@/services/user';
import { useLoginState } from '@/store/useLoginState';
import { UseMutationCustomOptions } from '@/types/common';
import { setCookie } from 'cookies-next';

function useKakaoLogin(authCode: string | null, mutationOptions?: UseMutationCustomOptions) {
  const router = useRouter();
  const { setLoginState } = useLoginState();
  return useMutation({
    mutationFn: (code: string) => kakaoAuthCode(code),
    onSuccess: (data) => {
      setLoginState({ code: authCode });
      if (data.is_member && data.kakao_jwt) {
        setLoginState({
          is_member: true,
          token: data.kakao_jwt,
        });
        setCookie(ACCESS_TOKEN, data.kakao_jwt);
        router.replace('/');
        return;
      } else {
        router.replace('/signup');
      }
    },
    ...mutationOptions,
  });
}

function useSignUp(mutationOptions?: UseMutationCustomOptions) {
  const router = useRouter();
  const { setLoginState } = useLoginState();
  return useMutation({
    mutationFn: (state: { code: string; email: string }) => signup(state),
    onSuccess: (data) => {
      setLoginState({
        is_member: true,
        token: data.kakao_jwt,
      });
      setCookie(ACCESS_TOKEN, data.kakao_jwt);
      router.replace('/');
    },
    ...mutationOptions,
  });
}

export { useKakaoLogin, useSignUp };
