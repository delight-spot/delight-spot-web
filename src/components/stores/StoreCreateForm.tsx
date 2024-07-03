'use client';

import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { useModal } from '@/hooks/useModal';

import Button from '../Button';
import Input from '../Input';
import Header from '../header/Header';
import FormLabel from './FormLabel';
import UploadPhoto from './UploadPhoto';
import Divider from '../Divider';
import UploadPhotoList from '../UploadPhotoList';
import TextArea from '../TextArea';
import SearchAddress from './SearchAddress';
import BottomModal from '../modal/BottomModal';
import SelectorStoreType from './SelectorStoreType';

type CreateForm = {
  description: string;
  name: string;
};

export default function StoreCreateForm() {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<CreateForm>();
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [typeSelector, setTypeSelector] = useState<Record<string, string>>();
  const typeSelectorModal = useModal();

  const onSelectorType = useCallback((type?: Record<string, string>) => {
    setTypeSelector(type);
  }, []);

  const onSelectAddress = useCallback((address: string) => {
    setAddress(address);
  }, []);

  const onSetFileUrls = useCallback(
    (fileUrl: string) => {
      if (fileUrls.length > 5) return;
      setFileUrls((prev) => [...prev, fileUrl]);
    },
    [fileUrls.length]
  );

  const onDeleteFileUrls = useCallback((fileUrl: string) => {
    setFileUrls((prev) => prev.filter((url) => url !== fileUrl));
  }, []);

  const onSubmit = (data: CreateForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-5">
      <Header
        title="작성하기"
        isBack
        custom={
          <div>
            <Button title="게시" type="submit" disabled={!isValid} />
          </div>
        }
      />
      <div className="pt-24">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FormLabel text="이름" htmlFor="name" isRequired />
              {errors.name?.message && (
                <p className="mt-1 text-label leading-label text-system-S200 font-semibold">{errors.name?.message}</p>
              )}
            </div>
            <Input
              id="name"
              placeholder="제목을 입력해주세요."
              register={register('name', {
                required: {
                  message: '필수입니다.',
                  value: true,
                },
              })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel text="종류" isRequired />
            <Input
              value={typeSelector?.name ?? ''}
              style={{ cursor: 'default' }}
              readOnly={true}
              placeholder="종류를 선택해주세요."
              onClick={typeSelectorModal.show}
            />
          </div>

          <SearchAddress onSelectAddress={onSelectAddress} />

          <div className="flex flex-col gap-1">
            <div>
              <FormLabel text="이미지 업로드" />
            </div>
            <UploadPhoto onSetFileUrls={onSetFileUrls} />
            <div className="my-4">
              <Divider type="sm" />
            </div>
            <div>
              <UploadPhotoList fileUrls={fileUrls} onDeleteFileUrls={onDeleteFileUrls} />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Divider type="sm" />
        </div>

        <div>
          <TextArea
            register={register('description', {
              required: {
                message: '필수입니다.',
                value: true,
              },
            })}
            isError={!!errors.description?.message}
            placeholder="소개를 작성해주세요!"
          />
        </div>
      </div>

      <BottomModal isOpen={typeSelectorModal.isVisible} onClose={typeSelectorModal.hide} title="종류">
        <div className="mt-10">
          <SelectorStoreType onSelector={onSelectorType} selectedType={typeSelector} onClose={typeSelectorModal.hide} />
        </div>
      </BottomModal>
    </form>
  );
}
