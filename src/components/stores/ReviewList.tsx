'use client';

import { useGetReviews } from '@/hooks/queries/useGetReviews';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useRef } from 'react';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReveiwForm';

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
      <ul className="flex flex-col mb-20">
        {reviews?.pages.flat().map((review) => (
          <ReviewItem key={review.pk} review={review} />
        ))}

        <div ref={limitRef} />
      </ul>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-t-slate-S200 z-20">
        <ReviewForm />
      </div>
    </>
  );
}
