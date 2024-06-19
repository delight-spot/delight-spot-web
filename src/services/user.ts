import api from './httpClient';

const kakaoAuthCode = async (code: string): Promise<{ is_member?: boolean; kakao_jwt?: string }> => {
  const response = await (
    await api.post('/users/kakao', {
      code,
    })
  ).data;

  return response;
};

const signup = async ({ code, email }: { code: string; email: string }): Promise<{ kakao_jwt: string }> => {
  const response = await (
    await api.post('/users/kakao-signup', {
      code,
      email,
    })
  ).data;
  return response;
};

const logout = async () => {
  const response = await (await api.post('/users/log-out', {})).data;
  return response;
};

export { kakaoAuthCode, logout, signup };
