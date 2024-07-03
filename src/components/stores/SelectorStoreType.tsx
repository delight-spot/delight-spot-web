'use client';

import { storeTypeList } from '@/constants';
import RadioButton from '../RadioButton';
import Button from '../Button';
import ButtonOutline from '../ButtonOutline';

interface Props {
  onSelector: (type: Record<string, string>) => void;
  onClose: () => void;
  selectedType?: Record<string, string>;
}

export default function SelectorStoreType({ onSelector, selectedType, onClose }: Props) {
  const handleApply = () => {
    onClose();
  };
  const handleReset = () => {
    onSelector({});
    onClose();
  };

  return (
    <ul className="flex flex-col gap-8">
      {storeTypeList.map((item) => (
        <li onClick={() => onSelector(item)} key={item.key} className="flex items-center gap-2 cursor-pointer">
          <RadioButton checked={selectedType?.key === item.key} />
          <p>{item.name}</p>
        </li>
      ))}
      <div className="flex items-center gap-2">
        <ButtonOutline title="취소" type="button" onClick={handleReset} />
        <Button title="적용" type="button" onClick={handleApply} disabled={!selectedType?.key} />
      </div>
    </ul>
  );
}
