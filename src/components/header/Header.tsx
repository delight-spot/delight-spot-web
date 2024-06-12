'use client';

import { MdOutlineShare, MdChevronLeft, MdOutlineMenu } from 'react-icons/md';
import { useRouter } from 'next/navigation';

import HeaderButton from './HeaderButton';
import { useModal } from '@/hooks/useModal';
import SideMenuModal from '../modal/SideMenuModal';

type RightIconType = 'share' | 'menu';

interface Props {
  title: string;
  isBack?: boolean;
  backUrl?: string;
  rightType?: RightIconType;
}

function selectRightIcon(type?: RightIconType) {
  switch (type) {
    case 'share': {
      return <MdOutlineShare size={24} />;
    }
    case 'menu': {
      return <MdOutlineMenu size={24} />;
    }
    default:
      return null;
  }
}

export default function Header({ title, isBack, rightType, backUrl }: Props) {
  const router = useRouter();
  const rightMenuModal = useModal();

  const onBackPage = () => {
    if (backUrl) return router.push(backUrl);
    router.back();
  };

  const handleRightIcon = (type: RightIconType) => {
    if (type === 'share') {
      // 공유하기
      return;
    }
    if (type === 'menu') {
      rightMenuModal.show();
      return;
    }
  };

  return (
    <header className="fixed m-auto left-0 right-0 bg-white z-50">
      <div className="py-4 px-1 flex items-center relative justify-between w-sm m-auto">
        {isBack ? <HeaderButton icon={<MdChevronLeft color="#00000" size={24} />} onClick={onBackPage} /> : <div />}

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-h4 font-bold text-slate-S900">{title}</h1>

        {rightType && <HeaderButton icon={selectRightIcon(rightType)} onClick={() => handleRightIcon(rightType)} />}
      </div>

      <SideMenuModal isVisible={rightMenuModal.isVisible} hide={rightMenuModal.hide} />
    </header>
  );
}
