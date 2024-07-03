import { LabelHTMLAttributes } from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  isRequired?: boolean;
}

export default function FormLabel({ text, isRequired, ...props }: Props) {
  return (
    <div className="flex items-center gap-1">
      <label {...props} className="text-body-s leading-body text-slate-S400 md:text-body md:leading-body">
        {text}
      </label>
      {isRequired && <span className="text-system-S200 font-bold">﹡</span>}
    </div>
  );
}
