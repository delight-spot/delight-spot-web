import SSRSuspense from '@/components/SSRSuspense';
import StoreDetail from '@/components/stores/StoreDetail';

interface Props {
  params: {
    id: string;
  };
}

export default function StoreDetailPage({ params: { id } }: Props) {
  return (
    <section>
      <SSRSuspense fallback={<h1>Loading...</h1>}>
        <StoreDetail id={Number(id)} />
      </SSRSuspense>
    </section>
  );
}
