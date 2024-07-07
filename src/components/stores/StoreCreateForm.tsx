'use client';

import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { useCreateStore } from '@/hooks/queries/useStores';

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
import RadioButton from '../RadioButton';

import { KindMenu } from '@/types/domain/stores';

type CreateForm = {
  description: string;
  name: string;
  address: string;
  type: string;
  petFriendly: boolean;
};

const petFriendlyOptions = [
  { label: '가능', value: 'possible' },
  { label: '불가능', value: 'impossible' },
] as const;

export default function StoreCreateForm() {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
    setValue,
    getValues,
    clearErrors,
  } = useForm<CreateForm>({
    defaultValues: {
      petFriendly: false,
    },
  });
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [typeSelector, setTypeSelector] = useState<Record<string, string>>();
  const [petFriendlyType, setPetFriendlyType] = useState<Record<string, string>>({
    label: '뷸가능',
    value: 'impossible',
  });
  const typeSelectorModal = useModal();
  const { mutate: createStore, isPending, data } = useCreateStore();

  const onSelectorType = useCallback(
    (type?: Record<string, string>) => {
      if (!type) return;
      setTypeSelector(type);
      setValue('type', type.key);
      clearErrors('type');
    },
    [clearErrors, setValue]
  );

  const onSelectorPetFriendly = (type: Record<string, string>) => {
    setPetFriendlyType(type);
    if (type.value === 'possible') {
      setValue('petFriendly', true);
    } else {
      setValue('petFriendly', false);
    }
    clearErrors('petFriendly');
  };

  const onSelectAddress = useCallback(
    (address: string) => {
      if (!address) return;
      setValue('address', address);
      clearErrors('address');
    },
    [clearErrors, setValue]
  );

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
    if (!data.address) {
      return setError('address', { message: '주소를 입력해주세요.' });
    }
    if (!data.type) {
      return setError('type', { message: '종류를 입력해주세요.' });
    }
    createStore({
      city: data.address,
      description: data.description,
      kind_menu: data.type as KindMenu,
      name: data.name,
      pet_friendly: data.petFriendly,
      store_photo: fileUrls,
    });
  };

  const disabled = !isValid || !getValues('address') || !getValues('type');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-5">
      <Header
        title="작성하기"
        isBack
        customButton={
          <div>
            <Button title="게시" type="submit" disabled={disabled} />
          </div>
        }
      />
      <div className="pt-24">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-1">
            <FormLabel text="이름" isRequired errorMessage={errors.name?.message} />
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
            <FormLabel text="종류" isRequired errorMessage={errors.type?.message} />
            <Input
              value={typeSelector?.name ?? ''}
              style={{ cursor: 'default' }}
              readOnly={true}
              placeholder="종류를 선택해주세요."
              onClick={typeSelectorModal.show}
            />
          </div>

          <SearchAddress onSelectAddress={onSelectAddress} errorMessage={errors.address?.message} />

          <div className="flex flex-col gap-1">
            <FormLabel text="애완동물 가능 여부" />
            <ul className="flex gap-4 items-center">
              {petFriendlyOptions.map((item) => (
                <li onClick={() => onSelectorPetFriendly(item)} key={item.value} className="flex items-center gap-1">
                  <FormLabel text={item.label} />
                  <RadioButton checked={petFriendlyType.value === item.value} />
                </li>
              ))}
            </ul>
          </div>

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
