import { ImageResponse, uploadImage } from '@/services/store/upload';
import { UseMutationCustomOptions } from '@/types/common';
import { useMutation } from '@tanstack/react-query';

function useUploadImage(mutationOptions?: UseMutationCustomOptions<ImageResponse>) {
  return useMutation({
    mutationFn: (formData: FormData) => uploadImage(formData),
    onSuccess: () => {},
    ...mutationOptions,
  });
}

export { useUploadImage };
