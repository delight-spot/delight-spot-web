import { TextareaHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegisterReturn;
  isError?: boolean;
}

export default function TextArea({ register, isError, ...props }: Props) {
  return (
    <textarea
      {...register}
      {...props}
      className="w-full appearance-none bg-transparent border-none outline-none resize-none py-3 placeholder:text-body-lg placeholder:font-regular placeholder:leading-body-lg placeholder:tracking-body-lg text-base font-medium leading-title-md tracking-title-md min-h-[23.4rem]"
    />
  );
}
