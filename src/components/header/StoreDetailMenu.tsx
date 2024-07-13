'use client';

import { IoPencilSharp, IoTrashSharp } from 'react-icons/io5';

import MenuItem from './MenuItem';

import { queryKeys, storeDetailMenuList } from '@/constants';
import { useDeleteStore } from '@/hooks/queries/useStores';
import { useModal } from '@/hooks/useModal';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import AlertModal from '../modal/AlertModal';
import { queryClient } from '@/QueryProvider';
import { StoreDetail } from '@/types/domain/stores';

interface Props {
  storeId: number;
}

export default function StoreDetailMenu({ storeId }: Props) {
  const router = useRouter();
  const { isLoggedIn, userInfo } = useUser();
  const detailInfoCache = queryClient.getQueryData<StoreDetail>([queryKeys.STORE.GET_STORE_DETAIL, storeId]);
  const loginModal = useModal();
  const alertModal = useModal();
  const { mutate: deleteStore, isSuccess } = useDeleteStore(storeId, {
    onError: () => {
      alertModal.show();
    },
  });
  const handleIconType = (type: string) => {
    if (type === 'edit') {
      return <IoPencilSharp />;
    }
    if (type === 'delete') {
      return <IoTrashSharp color="#FF5F5F" />;
    }
  };

  const handleMenuItem = (type: string) => {
    if (!isLoggedIn) loginModal.show();
    if (detailInfoCache?.owner.pk !== userInfo?.pk) return;
    if (type === 'edit') {
      return router.push(`/store/edit/${storeId}`);
    }
    if (type === 'delete') {
      return deleteStore(storeId);
    }
  };

  return (
    <ul aria-label="store-detail-menu">
      {storeDetailMenuList.map((item) => (
        <div onClick={() => handleMenuItem(item.key)} key={item.key} className="border-b last:border-0 cursor-pointer">
          <MenuItem>
            <div className="p-2 mr-1">{handleIconType(item.key)}</div>
            <p className={item.key === 'delete' ? 'text-system-S200' : ''}>{item.name}</p>
          </MenuItem>
        </div>
      ))}
      <AlertModal close={alertModal.hide} isOpen={alertModal.isVisible} type="error" />
    </ul>
  );
}
