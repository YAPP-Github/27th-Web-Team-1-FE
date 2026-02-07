'use client';

import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import PlusIcon from '@/assets/images/plus.svg';
import DefaultHeader from '@/components/header/default/DefaultHeader';
import PhotoGridContainer from '@/components/photoGridContainer/PhotoGridContainer';
import PhotoGridItem from '@/components/photoGridItem/PhotoGridItem';
import { useToast } from '@/components/toast';
import { ROUTES } from '@/constants';
import { usePhotoContext } from '../_contexts/PhotoContext';
import { usePhotoSelect } from './_hooks/usePhotoSelect';
import type { SelectedPhoto } from './_types/photo';
import * as S from './page.styles';

export default function PhotoAddPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { photos, addPhotos, selectedPhoto, setSelectedPhoto, setSelectedPhotoRect } =
    usePhotoContext();

  // 라우팅할 대상 사진 ID - 상태 업데이트 완료 확인용
  const [pendingNavigationPhotoId, setPendingNavigationPhotoId] = useState<string | null>(
    null,
  );

  // selectedPhoto.id가 pendingNavigationPhotoId와 일치할 때 라우팅
  // 이렇게 하면 Context 상태가 확실히 반영된 후에만 라우팅됨
  useEffect(() => {
    if (pendingNavigationPhotoId && selectedPhoto?.id === pendingNavigationPhotoId) {
      setPendingNavigationPhotoId(null);
      router.push(ROUTES.PHOTO.NOTE.ADD);
    }
  }, [pendingNavigationPhotoId, selectedPhoto?.id, router]);

  /**
   * 웹 브라우저 환경에서는 보안 정책상 사용자의 전체 갤러리에 접근할 수 없음.
   * 따라서 파일 선택 시 바로 정보 기입 화면으로 이동하는 방식으로 구현.
   *
   * 네이티브 앱(React Native)에서는 갤러리 접근 권한을 받아 전체 사진 목록을
   * 표시할 수 있으므로, 앱 버전에서는 사진 선택 UI를 사용할 예정.
   */
  const handlePhotosSelected = useCallback(
    (newPhotos: SelectedPhoto[]) => {
      if (newPhotos.length === 0) {
        showToast('이미지를 불러올 수 없습니다. 다시 시도해주세요.');
        return;
      }

      addPhotos(newPhotos);
      const targetPhoto = newPhotos[0];
      // 먼저 라우팅 대상 ID 설정, 그 다음 사진 선택
      // useEffect에서 selectedPhoto.id === pendingNavigationPhotoId 확인 후 라우팅
      setPendingNavigationPhotoId(targetPhoto.id);
      setSelectedPhoto(targetPhoto);
    },
    [addPhotos, setSelectedPhoto, showToast],
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
      setPendingNavigationPhotoId(photo.id);
      setSelectedPhoto(photo);
    },
    [setSelectedPhoto, setSelectedPhotoRect],
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
              onClick={(event) => handleSelectPhoto(photo, event)}
            />
          ))}
        </PhotoGridContainer>
      </S.Content>
    </S.Container>
  );
}
