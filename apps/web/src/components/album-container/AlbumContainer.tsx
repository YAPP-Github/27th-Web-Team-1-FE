import * as S from './AlbumContainer.styles';
import {
  ALBUM_CONTAINER_TYPE,
  AlbumContainerType,
  MAX_GRID_PHOTOS,
} from './AlbumContainer.constants';
import AlbumMenu from './albumMenu/AlbumMenu';
import { DEFAULT_ALBUM_TITLE } from '@/constants';

interface AlbumContainerProps {
  /** 앨범 제목 */
  title: string;
  /** 앨범 타입 (small: 사진 개수 숨김) */
  type?: AlbumContainerType;
  /** 썸네일 URL 목록 (최대 4개) */
  thumbnailUrls?: string[];
  /** 총 사진 수 */
  photoCount: number;
  /** 앨범 클릭 시 콜백 */
  onClick?: () => void;
  /** 앨범 이름 변경 메뉴 클릭 시 콜백 */
  onMenuRename?: () => void;
  /** 앨범 삭제 메뉴 클릭 시 콜백 */
  onMenuDelete?: () => void;
}

const AlbumContainer = ({
  title,
  type = ALBUM_CONTAINER_TYPE.MEDIUM,
  thumbnailUrls,
  photoCount,
  onClick,
  onMenuRename,
  onMenuDelete,
}: AlbumContainerProps) => {
  const remainingCount = photoCount - MAX_GRID_PHOTOS;
  const hasMorePhotos = remainingCount > 0;

  const renderPhotoGrid = () =>
    Array.from({ length: MAX_GRID_PHOTOS }).map((_, i) => {
      const isLastPhoto = i === MAX_GRID_PHOTOS - 1;
      const showOverlay = isLastPhoto && hasMorePhotos;
      const thumbnailUrl = thumbnailUrls?.[i];

      return (
        <S.PhotoWrapper key={`photo-${i}`} type={type}>
          {thumbnailUrl ? (
            <>
              <S.Photo src={thumbnailUrl} alt={`${title}-thumbnail-${i}`} />
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

  const showMenu =
    ALBUM_CONTAINER_TYPE.MEDIUM === type &&
    title !== DEFAULT_ALBUM_TITLE &&
    onMenuRename &&
    onMenuDelete;

  return (
    <S.Container type={type} onClick={onClick}>
      <S.PhotoGrid type={type}>{renderPhotoGrid()}</S.PhotoGrid>

      <S.InfoSection type={type}>
        {showMenu ? (
          <S.TitleRow>
            <S.Title>{title}</S.Title>
            <AlbumMenu onRename={onMenuRename} onDelete={onMenuDelete} />
          </S.TitleRow>
        ) : (
          <S.Title>{title}</S.Title>
        )}
        {type === ALBUM_CONTAINER_TYPE.MEDIUM && (
          <S.PhotoCount>{photoCount}</S.PhotoCount>
        )}
      </S.InfoSection>
    </S.Container>
  );
};

export default AlbumContainer;
