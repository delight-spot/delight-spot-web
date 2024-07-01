'use client';

import { useGetReviews } from '@/hooks/queries/useReviews';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useRef } from 'react';

import ReviewItem from './ReviewItem';

interface Props {
  storeId: number;
}

export default function ReviewList({ storeId }: Props) {
  const { data: reviews, fetchNextPage } = useGetReviews({ storeId });
  const limitRef = useRef<HTMLDivElement | null>(null);
  const { isInterSecting } = useIntersectionObserver({
    ref: limitRef,
  });

  useEffect(() => {
    if (isInterSecting) {
      fetchNextPage();
    }
  }, [fetchNextPage, isInterSecting]);

  return (
    <>
      <ul className="flex flex-col">
        {reviews?.pages.flat().map((review) => (
          <ReviewItem key={review.pk} review={review} />
        ))}

        <div ref={limitRef} />
      </ul>
    </>
  );
}
