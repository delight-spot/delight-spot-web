import Portal from '@/Portal';
import Button from '../Button';

import { IoAlertCircleOutline, IoCloseCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

interface Props {
  type: 'confirm' | 'warning' | 'error';
  isOpen: boolean;
  title: string;
  description?: string;
}

export default function AlertModal({ isOpen, type, title, description }: Props) {
  const typeMap = {
    confirm: {
      icon: <IoCheckmarkCircleOutline size={40} color="#5CFF63" />,
    },
    warning: {
      icon: <IoAlertCircleOutline size={40} color="#FFBD53" />,
    },
    error: {
      icon: <IoCloseCircleOutline size={40} color="#FF5F5F" />,
    },
  };

  const selectedType = typeMap[type];

  return (
    isOpen && (
      <Portal>
        <div className="fixed left-0 right-0 bottom-0 top-0 bg-black bg-opacity-65 z-50 flex justify-center items-center">
          <div className="min-h-[20rem] min-w-[17rem] bg-slate-S600 shadow-lg rounded-lg flex flex-col items-center justify-center *:text-slate-S200 p-6 gap-6">
            <div className="flex flex-col gap-4 *:text-center">
              <div className="flex justify-center items-center">{selectedType.icon}</div>
              <h1 className="font-bold text-subtitle leading-subtitle">{title}</h1>
              {description && <p className="text-body leading-body">{description}</p>}
            </div>
            <Button title="확인" size="lg" />
          </div>
        </div>
      </Portal>
    )
  );
}
