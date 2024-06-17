'use client';

import ModalWrapper from './ModalWrapper';
import { IoChatbubbleSharp } from 'react-icons/io5';

interface Props {
  isOpen: boolean;
}

export default function LoginModal({ isOpen }: Props) {
  const kakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://127.0.0.1:3000/social/kakao',
    });
  };

  return (
    isOpen && (
      <ModalWrapper>
        <h1 className="text-h4 font-bold leading-h4">로그인이 필요해요.</h1>
        <button
          onClick={kakaoLogin}
          className="gap-2 bg-[#FEE500] py-4 w-full flex items-center justify-center rounded-xl"
        >
          <IoChatbubbleSharp color="#000000" />
          <span className="text-black text-subtitle leading-subtitle font-bold">카카오로 로그인하기</span>
        </button>
      </ModalWrapper>
    )
  );
}
