'use client';

import { useForm } from 'react-hook-form';
import { useUser } from '@/hooks/useUser';
import { useModal } from '@/hooks/useModal';
import { useCreateReviews } from '@/hooks/queries/useReviews';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '../Button';
import Input from '../Input';
import LoginModal from '../modal/LoginModal';
import AlertModal from '../modal/AlertModal';
import Header from '../header/Header';
import UploadPhoto, { PhotoItem } from './UploadPhoto';
import UploadPhotoList from '../UploadPhotoList';
import Divider from '../Divider';

interface Props {
  storeId: number;
}

type ReviewFormValue = {
  text: string;
};

export default function ReviewForm({ storeId }: Props) {
  const { register, handleSubmit, reset } = useForm<ReviewFormValue>();
  const { isLoggedIn } = useUser();
  const loginModal = useModal();
  const errorModal = useModal();
  const router = useRouter();
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const {
    mutate: reviewMutate,
    isPending,
    error: reviewError,
  } = useCreateReviews(storeId, {
    onError: (error) => {
      if (error.statusCode === 403 || error.statusCode === 403) {
        return loginModal.show();
      } else {
        errorModal.show();
      }
    },
  });

  const onSetFileUrls = (fileUrl: string) => {
    if (fileUrls.length > 5) return;
    setFileUrls((prev) => [...prev, fileUrl]);
  };

  const onSubmit = ({ text }: ReviewFormValue) => {
    if (isPending || !text) return;
    reviewMutate(text);
    reset();
  };

  return (
    <div>
      <Header title="리뷰 작성" isBack />
      <form onSubmit={handleSubmit(onSubmit)} className="pt-20 px-4">
        <div className="flex gap-2 items-end">
          <UploadPhoto onSetFileUrls={onSetFileUrls} />
          <div className="flex flex-col text-label text-system-S200 font-semibold">
            <p>최대 5개 이미지만 가능합니다.</p>
            <p>jpg, jpeg, png 형식만 가능합니다.</p>
            <p>최대 10MB까지만 가능합니다.</p>
          </div>
        </div>

        <div className="my-4">
          <Divider type="sm" />
        </div>

        <div>
          <UploadPhotoList fileUrls={fileUrls} />
        </div>

        <div className="mt-10"></div>

        <LoginModal isOpen={loginModal.isVisible} onCloseModal={loginModal.hide} />
        <AlertModal close={errorModal.hide} isOpen={errorModal.isVisible} type="error" />
      </form>
    </div>
  );
}
