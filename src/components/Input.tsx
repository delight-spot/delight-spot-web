import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  width?: number | string;
  height?: number | string;
  register?: UseFormRegisterReturn;
}

export default function Input({ height, width = '100%', register, ...props }: Props) {
  return (
    <input
      {...register}
      style={{
        width,
        height,
      }}
      {...props}
      className="border px-4 py-2.5 rounded-md placeholder:text-body-s placeholder:text-slate-S300 outline-none"
    />
  );
}
