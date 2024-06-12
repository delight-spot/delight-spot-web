import SSRSuspense from '@/components/SSRSuspense';
import Header from '@/components/header/Header';
import StoreDetailInfo from '@/components/stores/StoreDetailInfo';

interface Props {
  params: {
    id: string;
  };
}

export default function StoreDetailPage({ params: { id } }: Props) {
  return (
    <section>
      <Header title="Detail" rightType="menu" isBack />
      <SSRSuspense fallback={<h1>Loading...</h1>}>
        <StoreDetailInfo id={Number(id)} />
      </SSRSuspense>
    </section>
  );
}
