'use client';

import { useCallback, type MouseEvent } from 'react';
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
  const {
    photos,
    addPhotos,
    setSelectedPhoto,
    setSelectedPhotoRect,
    setInitialAlbumId,
    resetPhotoNoteState,
  } = usePhotoContext();

  /**
   * 웹 브라우저 환경에서는 보안 정책상 사용자의 전체 갤러리에 접근할 수 없음.
   * 따라서 파일 선택 시 바로 정보 기입 화면으로 이동하는 방식으로 구현.
   *
   * 네이티브 앱(React Native)에서는 갤러리 접근 권한을 받아 전체 사진 목록을
   * 표시할 수 있으므로, 앱 버전에서는 사진 선택 UI를 사용할 예정.
   */
  const handlePhotosSelected = useCallback(
    (newPhotos: SelectedPhoto[]) => {
      addPhotos(newPhotos);
      // 첫 번째 사진을 선택하고 바로 정보 기입 화면으로 이동
      if (newPhotos.length > 0) {
        setSelectedPhoto(newPhotos[0]);
        resetPhotoNoteState(newPhotos[0]);
        setInitialAlbumId(null);
        router.push(ROUTES.PHOTO.NOTE.ADD);
      }
    },
    [addPhotos, setSelectedPhoto, resetPhotoNoteState, setInitialAlbumId, router],
  );

  const { isLoading, selectPhotosFromFile } = usePhotoSelect({
    onPhotosSelected: handlePhotosSelected,
  });

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleSelectPhoto = useCallback(
    (photo: SelectedPhoto, event: MouseEvent<HTMLButtonElement>) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();

      setSelectedPhotoRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      setSelectedPhoto(photo);
      resetPhotoNoteState(photo);
      setInitialAlbumId(null);
      router.push(ROUTES.PHOTO.NOTE.ADD);
    },
    [
      router,
      setSelectedPhoto,
      setSelectedPhotoRect,
      resetPhotoNoteState,
      setInitialAlbumId,
    ],
  );

  const handleAddPhotos = useCallback(() => {
    selectPhotosFromFile();
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
              onClick={(event) => handleSelectPhoto(photo, event)}
            />
          ))}
        </PhotoGridContainer>
      </S.Content>
    </S.Container>
  );
}
