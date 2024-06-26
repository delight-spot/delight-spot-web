'use client';

import { useForm } from 'react-hook-form';
import Button from '../Button';
import Input from '../Input';
import { useUser } from '@/hooks/useUser';
import { useModal } from '@/hooks/useModal';
import LoginModal from '../modal/LoginModal';

interface Props {}

type ReviewFormValue = {
  text: string;
};

export default function ReviewForm({}: Props) {
  const { register, handleSubmit, reset } = useForm<ReviewFormValue>();
  const { isLoggedIn } = useUser();
  const modal = useModal();

  const onSubmit = (data: ReviewFormValue) => {
    console.log('review form ', data);
    reset();
  };

  const onCheckLogin = () => {
    if (!isLoggedIn) return modal.show();
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

      <LoginModal isOpen={modal.isVisible} onCloseModal={modal.hide} />
    </form>
  );
}
