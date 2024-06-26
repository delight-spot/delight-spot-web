'use client';

import { useForm } from 'react-hook-form';
import Button from '../Button';
import Input from '../Input';

interface Props {}

type ReviewFormValue = {
  text: string;
};

export default function ReviewForm({}: Props) {
  const { register, handleSubmit, reset } = useForm<ReviewFormValue>();

  const onSubmit = (data: ReviewFormValue) => {
    console.log('review form ', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-2 px-4 flex items-center gap-2 w-sm m-auto md:w-md">
      <div className="flex-1">
        <Input register={register('text', { required: true })} placeholder="입력해주세요." />
      </div>
      <div className="">
        <Button title="게시" />
      </div>
    </form>
  );
}
