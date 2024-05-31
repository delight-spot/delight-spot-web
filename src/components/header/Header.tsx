'use client';

import { MdOutlineShare, MdChevronLeft, MdOutlineMenu } from 'react-icons/md';
import { useRouter } from 'next/navigation';

import HeaderButton from './HeaderButton';

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
      return <MdOutlineShare size={20} />;
    }
    case 'menu': {
      return <MdOutlineMenu size={20} />;
    }
    default:
      return null;
  }
}

export default function Header({ title, isBack, rightType, backUrl }: Props) {
  const router = useRouter();

  const onBackPage = () => {
    if (backUrl) return router.push(backUrl);
    router.back();
  };

  const handleRightIcon = (type: RightIconType) => {
    console.log('type ', type);
    if (type === 'share') {
      // 공유하기
      return;
    }
    if (type === 'menu') {
      // 메뉴 모달창
      return;
    }
  };

  return (
    <header className="py-4 px-1 flex items-center relative  justify-between">
      {isBack ? <HeaderButton icon={<MdChevronLeft color="#00000" size={16} />} onClick={onBackPage} /> : <div />}

      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-h4 font-bold text-slate-S900">{title}</h1>

      {rightType && <HeaderButton icon={selectRightIcon(rightType)} onClick={() => handleRightIcon(rightType)} />}
    </header>
  );
}
