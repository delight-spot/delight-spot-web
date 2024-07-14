import { useModal } from '@/hooks/useModal';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

import MoreViewWrapper from '@/components/MoreViewWrapper';
import MyMoreViewList from '@/components/MyMoreViewList';

interface Props {
  isOpen: boolean;
  reviewId: number;
  storeId: number;
}

export default function ReviewMoreView({ isOpen, reviewId, storeId }: Props) {
  const { isLoggedIn } = useUser();
  const loginModal = useModal();
  const router = useRouter();

  const handleMenuItem = (type: string) => {
    if (!isLoggedIn) loginModal.show();

    if (type === 'edit') {
      return router.push(`/store/${storeId}/review/edit/${reviewId}`);
    }
    if (type === 'delete') {
      console.log('delete');
      // return deleteStore(storeId);
    }
  };
  return (
    <div>
      <MoreViewWrapper isOpen={isOpen} right={0} top={26} isAnimate={false}>
        <MyMoreViewList onMenuClick={handleMenuItem} />
      </MoreViewWrapper>
    </div>
  );
}
