import * as S from './AlbumContainer.styles';
import {
  ALBUM_CONTAINER_TYPE,
  AlbumContainerType,
  MAX_GRID_PHOTOS,
} from './AlbumContainer.constants';

interface AlbumContainerProps {
  /** 앨범 제목 */
  title: string;
  /** 앨범 타입 (small: 사진 개수 숨김) */
  type?: AlbumContainerType;
  /** 썸네일 URL */
  thumbnailUrl?: string;
  /** 총 사진 수 */
  photoCount: number;
  /** 앨범 클릭 시 콜백 */
  onClick?: () => void;
}

const AlbumContainer = ({
  title,
  type = ALBUM_CONTAINER_TYPE.MEDIUM,
  thumbnailUrl,
  photoCount,
  onClick,
}: AlbumContainerProps) => {
  const remainingCount = photoCount - MAX_GRID_PHOTOS;
  const hasMorePhotos = remainingCount > 0;

  const renderPhotoGrid = () =>
    Array.from({ length: MAX_GRID_PHOTOS }).map((_, i) => {
      const isFirstPhoto = i === 0;
      const isLastPhoto = i === MAX_GRID_PHOTOS - 1;
      const showOverlay = isLastPhoto && hasMorePhotos;

      return (
        <S.PhotoWrapper key={`photo-${i}`} type={type}>
          {isFirstPhoto && thumbnailUrl ? (
            <>
              <S.Photo src={thumbnailUrl} alt={`${title}-thumbnail`} />
              {showOverlay && (
                <S.MoreOverlay type={type}>+{remainingCount}</S.MoreOverlay>
              )}
            </>
          ) : (
            <S.EmptyPhoto />
          )}
        </S.PhotoWrapper>
      );
    });

  return (
    <S.Container type={type} onClick={onClick}>
      <S.PhotoGrid type={type}>{renderPhotoGrid()}</S.PhotoGrid>

      <S.InfoSection type={type}>
        <S.Title>{title}</S.Title>
        {type === ALBUM_CONTAINER_TYPE.MEDIUM && (
          <S.PhotoCount>{photoCount}</S.PhotoCount>
        )}
      </S.InfoSection>
    </S.Container>
  );
};

export default AlbumContainer;
