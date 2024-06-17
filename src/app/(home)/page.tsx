import Header from '@/components/header/Header';
import StoreList from '@/components/stores/StoreList';
import SSRSuspense from '@/components/SSRSuspense';
import StoreListSkeleton from '@/components/stores/StoreListSkeleton';

export default function HomePage() {
  return (
    <section>
      <Header title="STORE LIST" rightType="menu" />
      <SSRSuspense fallback={<StoreListSkeleton length={10} paddingTop={70} />}>
        <StoreList />
      </SSRSuspense>
    </section>
  );
}
