import Header from '@/components/header/Header';
import StoreList from '@/components/stores/StoreList';

export default function HomePage() {
  return (
    <section>
      <Header title="STORE LIST" rightType="menu" />
      <StoreList />
    </section>
  );
}
