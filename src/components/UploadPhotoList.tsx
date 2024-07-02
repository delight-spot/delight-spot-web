import { useDeleteImage } from '@/hooks/queries/useImage';
import { useModal } from '@/hooks/useModal';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  fileUrls?: string[];
  onDeleteFileUrls: (fileUrl: string) => void;
}

export default function UploadPhotoList({ fileUrls = [], onDeleteFileUrls }: Props) {
  const totalSlots = 5;
  const modal = useModal();
  const { mutate: deleteImageMutate, isPending } = useDeleteImage({
    onError: () => {
      modal.show();
    },
  });

  const deleteImage = (fileUrl: string) => {
    onDeleteFileUrls(fileUrl);
    const urlObj = new URL(fileUrl);
    const fileName = urlObj.pathname.split('/')[1];
    if (!fileName) return;
    deleteImageMutate(fileName);
  };

  return (
    <ul className="grid grid-cols-3 gap-4 max-w-sm">
      {Array.from({ length: totalSlots }, (_, index) => (
        <li key={index} className="w-full aspect-square rounded-lg overflow-hidden  relative">
          {fileUrls[index] ? (
            <div className="w-full h-full flex items-center justify-center">
              {isPending ? (
                <LoadingSpinner />
              ) : (
                <div className="relative size-[75px] overflow-hidden rounded-lg">
                  <Image fill src={fileUrls[index]} alt="Upload Image" className="object-cover" />
                </div>
              )}
              <button
                onClick={() => deleteImage(fileUrls[index])}
                className="absolute right-1 top-0 z-20 p-1 bg-system-S200 rounded-full hover:bg-system-S100 transition-colors"
              >
                <IoClose color="white" size={16} />
              </button>
            </div>
          ) : (
            <div className="absolute w-full h-full bg-slate-S200" />
          )}
        </li>
      ))}
    </ul>
  );
}
