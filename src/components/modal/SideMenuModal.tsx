'use client';

import Link from 'next/link';

import Divider from '../Divider';

import { sideModalList } from '@/constants';
import { MdClose } from 'react-icons/md';

interface Props {
  isVisible: boolean;
  hide?: () => void;
}

export default function SideMenuModal({ isVisible, hide }: Props) {
  return isVisible ? (
    <div className="absolute w-full h-screen top-0 bottom-0">
      <div className="absolute w-full top-0 bottom-0 bg-black opacity-50" />
      <div className="m-auto relative sm:w-sm md:w-md">
        <div className="bg-white min-w-[250px] md:w-[400px] shadow-md right-0 absolute top-0 h-screen">
          <button className="absolute right-4 top-4 p-3" onClick={hide}>
            <MdClose size={18} />
          </button>

          <div className="mt-20">
            <div className="px-4">
              <h1 className="text-h3 leading-h3 text-primary-P200 font-bold">Hi, ooo님</h1>
            </div>

            <div className="my-5">
              <Divider type="sm" />
            </div>

            <ul className="w-full flex flex-col items-center">
              {sideModalList.map((item) => (
                <li key={item.key} className="transition-colors w-full">
                  <Link href={item.url} className="w-full flex items-center hover:bg-slate-200 gap-2 p-4">
                    <div className="size-4 bg-slate-S300 rounded-full" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
