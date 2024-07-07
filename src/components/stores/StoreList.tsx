'use client';

import { useGetInfiniteStores } from '@/hooks/queries/useStores';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useRef } from 'react';
import { useStoreListTabState } from '@/store/useStoreListTabStore';
import Link from 'next/link';
import { motion } from 'framer-motion';

import StoreItem from './StoreItem';

import { storeTabList } from '@/constants';

export default function StoreList() {
  const { selectedTab, setSelectedTab } = useStoreListTabState();
  const { data, fetchNextPage, isPending, hasNextPage, isSuccess } = useGetInfiniteStores(selectedTab);
  const limitRef = useRef<HTMLDivElement | null>(null);
  const { isInterSecting } = useIntersectionObserver({
    node: limitRef.current,
  });

  useEffect(() => {
    if (isSuccess && isInterSecting) {
      fetchNextPage();
    }
  }, [isInterSecting, fetchNextPage, isSuccess]);

  const handleSelectTab = (tabKey: 'all' | 'food' | 'cafe') => {
    setSelectedTab(tabKey);
  };

  return (
    <>
      <div className="p-4 pt-20">
        <ul className="flex items-center gap-2 border-b">
          {storeTabList.map((tab) => (
            <li className="p-4 relative cursor-pointer" key={tab.key} onClick={() => handleSelectTab(tab.key)}>
              <p className={tab.key === selectedTab ? 'font-bold' : 'text-slate-S400'}>{tab.title}</p>
              {tab.key === selectedTab && (
                <motion.div layoutId="tab" className="border absolute w-full border-primary-P300 bottom-0 left-0" />
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

        <div ref={limitRef} className="mb-4" />
      </ul>
    </>
  );
}
