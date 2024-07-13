import SSRSuspense from '@/components/SSRSuspense';
import StoreDetailInfo from '@/components/stores/StoreDetailInfo';
import StoreDetailSkeleton from '@/components/stores/StoreDetailSkeleton';
import Toast from '@/components/Toast';

interface Props {
  params: {
    id: string;
  };
}

export default function StoreDetailPage({ params: { id } }: Props) {
  return (
    <section>
      <SSRSuspense fallback={<StoreDetailSkeleton />}>
        <StoreDetailInfo id={Number(id)} />
      </SSRSuspense>
      <Toast isShowing />
    </section>
  );
}
