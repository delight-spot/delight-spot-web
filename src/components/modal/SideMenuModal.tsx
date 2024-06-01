'use client';

import { sideModalList } from '@/constants';
import Link from 'next/link';
import { useEffect } from 'react';
import { MdClose } from 'react-icons/md';

interface Props {
  isVisible: boolean;
  hide?: () => void;
}

export default function SideMenuModal({ isVisible, hide }: Props) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  return isVisible ? (
    <div className="absolute w-1/2 h-screen bg-slate-100  right-0 top-0 shadow-md">
      <button className="absolute right-4 top-4 p-3" onClick={hide}>
        <MdClose size={18} />
      </button>

      <ul className="mt-20 w-full flex flex-col items-center">
        {sideModalList.map((item) => (
          <li key={item.key} className="transition-colors w-full">
            <Link href={item.url} className="w-full flex p-3 justify-center items-center hover:bg-slate-200 ">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
