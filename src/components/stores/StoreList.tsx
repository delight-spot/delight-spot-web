'use client';

import { useGetInfiniteStores } from '@/hooks/queries/useGetStores';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import StoreItem from './StoreItem';
import { storeTabList } from '@/constants';
import LoginModal from '../modal/LoginModal';

export default function StoreList() {
  const [selectTab, setSelectTab] = useState<string>('all');
  const { data, fetchNextPage } = useGetInfiniteStores(selectTab);
  const limitRef = useRef<HTMLDivElement | null>(null);
  const { isInterSecting } = useIntersectionObserver({
    ref: limitRef,
  });

  useEffect(() => {
    if (isInterSecting) {
      fetchNextPage();
    }
  }, [isInterSecting, fetchNextPage]);

  const handleSelectTab = (tabKey: string) => {
    setSelectTab(tabKey);
  };

  return (
    <>
      <div className="p-4 pt-20">
        <ul className="flex items-center gap-2 border-b">
          {storeTabList.map((tab) => (
            <li className="p-4 relative cursor-pointer" key={tab.key} onClick={() => handleSelectTab(tab.key)}>
              <p className={tab.key === selectTab ? 'font-bold' : 'text-slate-S400'}>{tab.title}</p>
              {tab.key === selectTab && (
                <motion.div
                  data-testid="selected"
                  layoutId="tab"
                  className="border absolute w-full border-primary-P300 bottom-0 left-0"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex flex-col gap-8 px-4">
        {data?.pages.flat().map((item) => (
          <Link href={`/store/${item.pk}`} key={item.pk}>
            <StoreItem store={item} />
          </Link>
        ))}

        <div ref={limitRef} />
      </ul>
      <LoginModal isOpen />
    </>
  );
}
