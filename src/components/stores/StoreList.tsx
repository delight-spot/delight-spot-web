'use client';

import { useGetInfiniteStores } from '@/hooks/queries/useGetStores';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

import StoreItem from './StoreItem';

export default function StoreList() {
  const { data, fetchNextPage } = useGetInfiniteStores();
  const limitRef = useRef<HTMLDivElement | null>(null);
  const { isInterSecting } = useIntersectionObserver({
    ref: limitRef,
  });

  useEffect(() => {
    if (isInterSecting) {
      fetchNextPage();
    }
  }, [isInterSecting, fetchNextPage]);

  return (
    <ul className="flex flex-col gap-8 px-4">
      {data?.pages.flat().map((item) => (
        <Link href={`/store/${item.pk}`} key={item.pk}>
          <StoreItem store={item} />
        </Link>
      ))}

      <div ref={limitRef} />
    </ul>
  );
}
