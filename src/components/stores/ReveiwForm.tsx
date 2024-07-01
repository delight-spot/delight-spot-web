'use client';

import { useForm } from 'react-hook-form';
import { useUser } from '@/hooks/useUser';
import { useModal } from '@/hooks/useModal';
import { useCreateReviews } from '@/hooks/queries/useReviews';

import Button from '../Button';
import Input from '../Input';
import LoginModal from '../modal/LoginModal';
import AlertModal from '../modal/AlertModal';

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

  const onSubmit = ({ text }: ReviewFormValue) => {
    if (isPending || !text) return;
    reviewMutate(text);
    reset();
  };

  const onCheckLogin = () => {
    reviewMutate({});
    if (!isLoggedIn) return loginModal.show();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-2 px-4 flex items-center gap-2 w-sm m-auto md:w-md">
      <div className="flex-1">
        <Input register={register('text', { required: true })} placeholder="입력해주세요." disabled={!isLoggedIn} />
        {!isLoggedIn && <div className="absolute inset-0 bg-transparent" onClick={onCheckLogin} />}
      </div>
      <div className="">
        <Button title="게시" disabled={!isLoggedIn} />
      </div>

      <LoginModal isOpen={loginModal.isVisible} onCloseModal={loginModal.hide} />
      <AlertModal close={errorModal.hide} isOpen={errorModal.isVisible} type="error" />
    </form>
  );
}
