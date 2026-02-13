'use client';

import AlbumIcon from '@/assets/images/album.svg';
// TODO: 2차 MVP에서 반영 예정
// import CommentIcon from '@/assets/images/comment.svg';
import DateIcon from '@/assets/images/date.svg';
import Chip from '@/components/buttons/chip/Chip';
import MenuHeader from '@/components/header/menu/MenuHeader';
import { formatDate } from '@/utils/formatDate';
import { useGetPhotoDetail, getGetPhotoDetailQueryOptions } from '@repo/api-client';
import { AnimatePresence } from 'framer-motion';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { type PhotoDetailResponse } from '@repo/api-client';
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

  const { photoDetail, photos, isPhotoLoading } = usePhotoData({
    photoId,
    albumIdFromQuery,
    clusterIdFromQuery,
  });

  const {
    currentPhotoIndex,
    currentPhoto,
    thumbnailContainerRef,
    handlePrevPhoto,
    handleNextPhoto,
    handleThumbnailClick,
  } = usePhotoSlider({
    photos,
    initialPhotoId: photoId,
    albumIdFromQuery,
    clusterIdFromQuery,
  });

  // 슬라이더에서 현재 선택된 사진의 상세 정보 조회
  const currentPhotoIdForDetail = currentPhoto?.id ?? photoId;
  const { data: displayPhotoDetail } = useGetPhotoDetail(currentPhotoIdForDetail, {
    query: getGetPhotoDetailQueryOptions(currentPhotoIdForDetail),
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

  // 메모가 2줄을 초과하는지 확인
  useEffect(() => {
    if (memoRef.current) {
      const style = getComputedStyle(memoRef.current);
      const lineHeight = parseInt(style.lineHeight) || parseInt(style.fontSize) * 1.2;
      const height = memoRef.current.scrollHeight;
      setShowMoreButton(height > lineHeight * 2);
    }
  }, [displayPhotoDetail?.description]);

  // 현재 표시할 사진 결정
  const displayPhoto = currentPhoto ?? photoDetail;
  const displayPhotoUrl = displayPhoto?.url;
  const displayPhotoId = displayPhoto?.id ?? photoId;
  // fetch 중이면 이전 데이터 표시
  const currentDisplayPhotoDetail: PhotoDetailResponse | undefined = displayPhotoDetail;

  const handleBack = () => {
    router.back();
  };

  if (isPhotoLoading) {
    return (
      <S.Container>
        <S.LoadingContainer>불러오는 중...</S.LoadingContainer>
      </S.Container>
    );
  }

  if (!photoDetail || photos.length === 0) {
    return (
      <S.Container>
        <S.LoadingContainer>사진을 찾을 수 없습니다.</S.LoadingContainer>
      </S.Container>
    );
  }

  return (
    <S.Container {...longPressHandlers}>
      <S.PhotoBackground $url={displayPhotoUrl || ''} />

      <S.TouchAreaLeft onClick={handlePrevPhoto} />
      <S.TouchAreaRight onClick={handleNextPhoto} />

      {isOverlayVisible && (
        <>
          <S.HeaderWrapper>
            <MenuHeader
              title={currentDisplayPhotoDetail?.address || ''}
              onClickBack={handleBack}
              showLocation={!!currentDisplayPhotoDetail?.address}
            >
              <MenuHeader.Menu>
                <MenuHeader.Item onClick={() => openEditOverlay(displayPhotoId)}>
                  기록 수정하기
                </MenuHeader.Item>
                <MenuHeader.Item variant="danger" onClick={openDeleteModal}>
                  사진 삭제하기
                </MenuHeader.Item>
              </MenuHeader.Menu>
            </MenuHeader>
          </S.HeaderWrapper>

          <S.BottomOverlay>
            <S.ContainerA>
              <S.UploaderInfo>
                <S.ProfileImage />
                <S.UploaderName>
                  {currentDisplayPhotoDetail?.uploaderName || '알 수 없음'}
                </S.UploaderName>
              </S.UploaderInfo>
              {currentDisplayPhotoDetail?.description && (
                <S.MemoWrapper>
                  <S.Memo ref={memoRef} $isExpanded={isMemoExpanded}>
                    {currentDisplayPhotoDetail.description}
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
                text={formatDate(currentDisplayPhotoDetail?.takenAt)}
                variant="white"
                size="small"
                icon={<DateIcon width={14} height={14} />}
              />
              <Chip
                text={currentDisplayPhotoDetail?.albumName || '앨범 없음'}
                variant="white"
                size="small"
                icon={<AlbumIcon width={14} height={14} />}
              />
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

            {photos.length > 1 && (
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
        onConfirm={() => confirmDelete(displayPhotoId)}
      />
    </S.Container>
  );
}
