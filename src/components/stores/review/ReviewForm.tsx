'use client';

import { useForm } from 'react-hook-form';
import { useUser } from '@/hooks/useUser';
import { useModal } from '@/hooks/useModal';
import { useCreateReviews } from '@/hooks/queries/useReviews';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '../../Button';
import LoginModal from '../../modal/LoginModal';
import AlertModal from '../../modal/AlertModal';
import Header from '../../header/Header';
import UploadPhoto from '../UploadPhoto';
import UploadPhotoList from '../../UploadPhotoList';
import Divider from '../../Divider';
import ReviewRating from './ReviewRating';
import TextArea from '@/components/TextArea';

import { cls } from '@/utils/cls';

interface Props {
  storeId: number;
}

type ReviewFormValue = {
  text: string;
};

export default function ReviewForm({ storeId }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<ReviewFormValue>();
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const loginModal = useModal();
  const errorModal = useModal();

  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [ratings, setRatings] = useState({
    taste_rating: 0,
    atmosphere_rating: 0,
    kindness_rating: 0,
    clean_rating: 0,
    parking_rating: 0,
    restroom_rating: 0,
  });

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

  const handleRatingChange = (key: string, value: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [key]: value,
    }));
  };

  const onSubmit = ({ text }: ReviewFormValue) => {
    if (isPending || !text) return;
    console.log(text);
    //reviewMutate(text);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header
        title="리뷰 작성"
        isBack
        custom={
          <div>
            <Button title="게시" type="submit" disabled={!isValid} />
          </div>
        }
      />
      <div className="pt-20 px-4">
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

        <div className="my-10">
          <ReviewRating onRatingChange={handleRatingChange} ratings={ratings} />
        </div>

        <div>
          <p
            className={cls(
              errors.text?.message ? 'border-b border-b-system-S200' : 'border-0',
              'text-h4 leading-h4 font-bold mb-4 inline-block'
            )}
          >
            내용을 입력해 주세요.
          </p>
          <TextArea
            register={register('text', {
              required: {
                message: '입력해주세요.',
                value: true,
              },
            })}
          />
        </div>

        <LoginModal isOpen={loginModal.isVisible} onCloseModal={loginModal.hide} />
        <AlertModal close={errorModal.hide} isOpen={errorModal.isVisible} type="error" />
      </div>
    </form>
  );
}
