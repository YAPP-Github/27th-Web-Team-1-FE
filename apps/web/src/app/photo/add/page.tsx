'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PlusIcon from '@/assets/images/plus.svg';
import DefaultHeader from '@/components/header/default/DefaultHeader';
import PhotoGridContainer from '@/components/photoGridContainer/PhotoGridContainer';
import PhotoGridItem from '@/components/photoGridItem/PhotoGridItem';
import { ROUTES } from '@/constants';
import { usePhotoContext } from '../_contexts/PhotoContext';
import { usePhotoSelect } from './_hooks/usePhotoSelect';
import type { SelectedPhoto } from './_types/photo';
import * as S from './page.styles';

export default function PhotoAddPage() {
  const router = useRouter();
  const { photos, addPhotos, setSelectedPhoto } = usePhotoContext();
  const { isLoading, selectPhotosFromFile } = usePhotoSelect({
    onPhotosSelected: addPhotos,
  });

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleSelectPhoto = useCallback(
    (photo: SelectedPhoto) => {
      setSelectedPhoto(photo);
      router.push(ROUTES.PHOTO.NOTE.ADD);
    },
    [router, setSelectedPhoto],
  );

  const handleAddPhotos = useCallback(async () => {
    await selectPhotosFromFile();
  }, [selectPhotosFromFile]);

  if (isLoading && photos.length === 0) {
    return (
      <S.Container>
        <DefaultHeader title="사진 선택" onClickBack={handleBack} />
        <S.LoadingContainer>불러오는 중...</S.LoadingContainer>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <DefaultHeader title="사진 선택" onClickBack={handleBack} />
      <S.Content>
        <PhotoGridContainer>
          <S.AddPhotoButton onClick={handleAddPhotos}>
            <PlusIcon width={32} height={32} />
          </S.AddPhotoButton>
          {photos.map((photo) => (
            <PhotoGridItem
              key={photo.id}
              src={photo.uri}
              alt={photo.filename}
              onClick={() => handleSelectPhoto(photo)}
            />
          ))}
        </PhotoGridContainer>
      </S.Content>
    </S.Container>
  );
}
