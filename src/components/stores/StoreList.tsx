'use client';

import { useGetInfiniteStores } from '@/hooks/queries/useStores';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useRef } from 'react';
import { useStoreListTabState } from '@/store/useStoreListTabStore';
import Link from 'next/link';

import StoreItem from './StoreItem';
import EmptyNotice from '../EmptyNotice';

import { storeTabList } from '@/constants';
import StoreTabList from './StoreTabList';

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

  const handleSelectTab = (tabKey: string) => {
    setSelectedTab(tabKey as 'all' | 'food' | 'cafe');
  };

  const hasStoreList = data?.pages && data.pages.some((item) => item.length > 0);

  return (
    <>
      <div className="p-4 pt-20">
        <StoreTabList
          onTabClick={handleSelectTab}
          selectedTabKey={selectedTab}
          tabList={storeTabList}
          type="mainStore"
        />
      </div>

      {!isPending &&
        (hasStoreList ? (
          <ul className="flex flex-col gap-8 px-4">
            {data?.pages.flat().map((item) => (
              <Link href={`/store/${item.pk}`} key={item.pk}>
                <StoreItem store={item} />
              </Link>
            ))}
          </ul>
        ) : (
          <EmptyNotice height={400} />
        ))}
      <div ref={limitRef} className="mt-4" />
    </>
  );
}
