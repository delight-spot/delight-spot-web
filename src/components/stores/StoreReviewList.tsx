'use client';

import { useGetReviews } from '@/hooks/queries/useGetReviews';

interface Props {
  storeId: number;
}

export default function StoreReviewList({ storeId }: Props) {
  const { data } = useGetReviews(storeId);

  return <ul></ul>;
}
