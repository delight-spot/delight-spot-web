import Header from '@/components/header/Header';
import StoreList from '@/components/stores/StoreList';
import StoreSkeleton from '@/components/stores/StoreSkeleton';
import SSRSuspense from '@/components/SSRSuspense';

export default function HomePage() {
  return (
    <section>
      <Header title="STORE LIST" rightType="menu" />
      <SSRSuspense fallback={<StoreSkeleton length={10} />}>
        <StoreList />
      </SSRSuspense>
    </section>
  );
}
