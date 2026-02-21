'use client';

import AlbumSmallIcon from '@/assets/images/albumSmall.svg';
// TODO: 2차 MVP에서 반영 예정
// import CommentIcon from '@/assets/images/comment.svg';
import DateIcon from '@/assets/images/date.svg';
import Chip from '@/components/buttons/chip/Chip';
import MenuHeader from '@/components/header/menu/MenuHeader';
import { usePendingPhotoDetail } from '@/hooks/usePendingPhotosViewModel';
import { formatDate } from '@/utils/formatDate';
import { getGetPhotoDetailQueryOptions, useGetPhotoDetail } from '@repo/api-client';
import { AnimatePresence } from 'framer-motion';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import DeleteConfirmModal from './_components/DeleteConfirmModal';
import PhotoEditOverlay from './_components/PhotoEditOverlay';
import {
  useLongPress,
  usePhotoData,
  usePhotoDelete,
  usePhotoEdit,
  usePhotoSlider,
} from './_hooks';
import * as S from './page.styles';

export default function PhotoViewPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const photoId = Number(params.photoId);
  const albumIdFromQuery = searchParams.get('albumId')
    ? Number(searchParams.get('albumId'))
    : undefined;
  const clusterIdFromQuery = searchParams.get('clusterId') || undefined;

  // --- Pending photo ---
  const {
    isPendingMode,
    pendingPhoto,
    effectivePhotoId,
    resolvedServerId,
    isUploading,
    isError,
    activePendingId,
    setActivePendingId,
    removePendingPhoto,
    resolveDisplayData,
  } = usePendingPhotoDetail({ photoId, albumIdFromQuery });

  const { photoDetail, photos, isPhotoLoading } = usePhotoData({
    photoId: effectivePhotoId,
    albumIdFromQuery,
    clusterIdFromQuery,
    enabled: !isPendingMode,
  });

  // 서버 데이터가 로드되면 activePendingId 정리
  useEffect(() => {
    if (resolvedServerId !== null && photoDetail) {
      setActivePendingId(null);
    }
  }, [resolvedServerId, photoDetail, setActivePendingId]);

  const {
    currentPhotoIndex,
    currentPhoto,
    thumbnailContainerRef,
    handlePrevPhoto,
    handleNextPhoto,
    handleThumbnailClick,
  } = usePhotoSlider({
    photos,
    initialPhotoId: effectivePhotoId,
    albumIdFromQuery,
    clusterIdFromQuery,
  });

  // 슬라이더에서 현재 선택된 사진의 상세 정보 조회
  const currentPhotoIdForDetail = currentPhoto?.id ?? effectivePhotoId;
  const { data: displayPhotoDetail } = useGetPhotoDetail(currentPhotoIdForDetail, {
    query: {
      ...getGetPhotoDetailQueryOptions(currentPhotoIdForDetail),
      enabled: !isPendingMode && currentPhotoIdForDetail > 0,
    },
  });

  const { isOverlayVisible, longPressHandlers } = useLongPress();

  const {
    isEditing,
    isSaving,
    editingPhotoId,
    openEditOverlay,
    closeEditOverlay,
    saveEdit,
  } = usePhotoEdit();

  const {
    isModalOpen: isDeleteModalOpen,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  } = usePhotoDelete();

  const [isMemoExpanded, setIsMemoExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const memoRef = useRef<HTMLParagraphElement>(null);

  // 표시할 데이터 결정 (pending vs server)
  const {
    photoUrl: resolvedPhotoUrl,
    description: resolvedDescription,
    takenAt: resolvedTakenAt,
    detail: resolvedDetail,
    displayPhotoId,
  } = resolveDisplayData({ photoDetail, currentPhoto, displayPhotoDetail });

  // 메모가 2줄을 초과하는지 확인
  useEffect(() => {
    if (memoRef.current) {
      const style = getComputedStyle(memoRef.current);
      const lineHeight = parseInt(style.lineHeight) || parseInt(style.fontSize) * 1.2;
      const height = memoRef.current.scrollHeight;
      setShowMoreButton(height > lineHeight * 2);
    }
  }, [resolvedDescription]);

  const handleBack = () => {
    if (activePendingId) {
      setActivePendingId(null);
    }
    router.back();
  };

  const handleCancelUpload = () => {
    if (pendingPhoto) {
      removePendingPhoto(pendingPhoto.pendingId);
      setActivePendingId(null);
      router.back();
    }
  };

  // Pending 사진이 외부에서 제거된 경우 (자동 정리 등) 뒤로 이동
  useEffect(() => {
    if (activePendingId && !pendingPhoto && resolvedServerId === null) {
      setActivePendingId(null);
      router.back();
    }
  }, [activePendingId, pendingPhoto, resolvedServerId, setActivePendingId, router]);

  // 로딩 상태 (서버 모드에서만)
  if (!isPendingMode && isPhotoLoading) {
    return (
      <S.Container>
        <S.LoadingContainer>불러오는 중...</S.LoadingContainer>
      </S.Container>
    );
  }

  // 사진 없음 (서버 모드 + 서버 전환 중이 아닐 때만)
  if (
    !isPendingMode &&
    resolvedServerId === null &&
    (!photoDetail || photos.length === 0)
  ) {
    return (
      <S.Container>
        <S.LoadingContainer>사진을 찾을 수 없습니다.</S.LoadingContainer>
      </S.Container>
    );
  }

  // Pending 사진이 없는 경우
  if (isPendingMode && !pendingPhoto) {
    return null;
  }

  return (
    <S.Container {...longPressHandlers}>
      <S.PhotoBackground $url={resolvedPhotoUrl || ''} />

      {!isPendingMode && (
        <>
          <S.TouchAreaLeft onClick={handlePrevPhoto} />
          <S.TouchAreaRight onClick={handleNextPhoto} />
        </>
      )}

      {isOverlayVisible && (
        <>
          <S.HeaderWrapper>
            <MenuHeader
              title={
                isPendingMode
                  ? isUploading
                    ? '업로드 중...'
                    : isError
                      ? '업로드 실패'
                      : ''
                  : resolvedDetail?.address || ''
              }
              onClickBack={handleBack}
              showLocation={!isPendingMode && !!resolvedDetail?.address}
              showMenu={!isPendingMode}
            >
              {!isPendingMode && (
                <MenuHeader.Menu>
                  <MenuHeader.Item onClick={() => openEditOverlay(displayPhotoId)}>
                    기록 수정하기
                  </MenuHeader.Item>
                  <MenuHeader.Item variant="danger" onClick={openDeleteModal}>
                    사진 삭제하기
                  </MenuHeader.Item>
                </MenuHeader.Menu>
              )}
            </MenuHeader>
          </S.HeaderWrapper>

          <S.BottomOverlay>
            <S.ContainerA>
              {!isPendingMode && (
                <S.UploaderInfo>
                  <S.ProfileImage />
                  <S.UploaderName>
                    {resolvedDetail?.uploaderName || '알 수 없음'}
                  </S.UploaderName>
                </S.UploaderInfo>
              )}
              {resolvedDescription && (
                <S.MemoWrapper>
                  <S.Memo ref={memoRef} $isExpanded={isMemoExpanded}>
                    {resolvedDescription}
                  </S.Memo>
                  {showMoreButton && !isMemoExpanded && (
                    <S.MoreButton onClick={() => setIsMemoExpanded(true)}>
                      더보기
                    </S.MoreButton>
                  )}
                </S.MemoWrapper>
              )}
            </S.ContainerA>

            <S.ContainerB>
              <Chip
                text={formatDate(resolvedTakenAt)}
                variant="white"
                size="small"
                icon={<DateIcon width={14} height={14} />}
              />
              {!isPendingMode && (
                <Chip
                  text={resolvedDetail?.albumName || '앨범 없음'}
                  variant="white"
                  size="small"
                  icon={<AlbumSmallIcon />}
                />
              )}
              {/* TODO: 2차 MVP에서 반영 예정
              <Chip
                text="댓글 추가..."
                variant="white"
                size="small"
                icon={<CommentIcon width={14} height={14} />}
                onClick={() => {}}
              />
              */}
            </S.ContainerB>

            {/* Pending: 진행률 바 */}
            {isPendingMode && isUploading && pendingPhoto && (
              <S.ProgressBarWrapper>
                <S.ProgressBarTrack>
                  <S.ProgressBarFill style={{ width: `${pendingPhoto.progress}%` }} />
                </S.ProgressBarTrack>
                <S.ProgressLabel>{pendingPhoto.progress}%</S.ProgressLabel>
              </S.ProgressBarWrapper>
            )}

            {/* Pending: 에러 메시지 */}
            {isPendingMode && isError && pendingPhoto && (
              <S.ProgressLabel>
                {pendingPhoto.errorMessage || '업로드에 실패했습니다.'}
              </S.ProgressLabel>
            )}

            {/* Pending: 취소/삭제 버튼 */}
            {isPendingMode && (isUploading || isError) && (
              <S.CancelUploadButton type="button" onClick={handleCancelUpload}>
                {isUploading ? '업로드 취소' : '삭제'}
              </S.CancelUploadButton>
            )}

            {/* 서버 모드: 썸네일 슬라이더 */}
            {!isPendingMode && photos.length > 1 && (
              <S.SliderWrapper>
                <S.ThumbnailSlider ref={thumbnailContainerRef}>
                  {photos.map((photo, index) => (
                    <S.ThumbnailItem
                      key={photo.id}
                      $isActive={index === currentPhotoIndex}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <S.ThumbnailImage src={photo.url} alt="" />
                    </S.ThumbnailItem>
                  ))}
                </S.ThumbnailSlider>
              </S.SliderWrapper>
            )}
          </S.BottomOverlay>
        </>
      )}

      {!isPendingMode && (
        <>
          <AnimatePresence>
            {isEditing && editingPhotoId && (
              <PhotoEditOverlay
                photoId={editingPhotoId}
                onClose={closeEditOverlay}
                onSave={saveEdit}
                isSaving={isSaving}
              />
            )}
          </AnimatePresence>

          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            isDeleting={isDeleting}
            onClose={closeDeleteModal}
            onConfirm={() =>
              confirmDelete({
                photoId: displayPhotoId,
                albumId: albumIdFromQuery,
              })
            }
          />
        </>
      )}
    </S.Container>
  );
}
