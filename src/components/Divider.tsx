type Props = {
  type: 'lg' | 'md' | 'sm';
};

const styleMap = {
  sm: 'h-[0.0625rem]',
  md: 'h-[0.25rem]',
  lg: 'h-[0.5rem]',
};

export default function Divider({ type }: Props) {
  const style = styleMap[type];

  return <div className={`w-full bg-slate-S300 ${style}`}></div>;
}
