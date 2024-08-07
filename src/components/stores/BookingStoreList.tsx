'use client';

import { useGetBookingList } from '@/hooks/queries/useBookings';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import BookingStoreItem from '../mypage/BookingStoreItem';
import EmptyNotice from '../EmptyNotice';

export default function BookingStoreList() {
  const { data, fetchNextPage, isPending, isSuccess } = useGetBookingList();

  const limitRef = useRef<HTMLDivElement | null>(null);
  const { isInterSecting } = useIntersectionObserver({
    node: limitRef.current,
  });
  const hasStoreList = data?.pages && data.pages.some((item) => item.length > 0);

  useEffect(() => {
    if (isSuccess && isInterSecting) {
      fetchNextPage();
    }
  }, [isInterSecting, fetchNextPage, isSuccess]);

  return (
    <div className="pt-20">
      {!isPending &&
        (hasStoreList ? (
          <ul className="grid grid-cols-2 gap-4">
            {data?.pages.flat().map((item) => (
              <BookingStoreItem key={item.pk} item={item} size={170} />
            ))}
          </ul>
        ) : (
          <EmptyNotice height={400} />
        ))}

      <div ref={limitRef} className="mt-4" />
    </div>
  );
}
