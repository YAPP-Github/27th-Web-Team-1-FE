import * as S from './AlbumRow.styles';

interface AlbumRowProps {
  /** 앨범 제목 */
  title: string;
  /** 앨범 썸네일 이미지 URL */
  thumbnail?: string;
  /** 사진 개수 */
  photoCount: number;
  /** 클릭 핸들러 */
  onClick: () => void;
  /** 선택 여부 */
  isSelected: boolean;
}

const AlbumRow = ({
  title,
  thumbnail,
  photoCount,
  onClick,
  isSelected,
}: AlbumRowProps) => {
  return (
    <S.Container onClick={onClick}>
      <S.InfoContainer>
        {thumbnail && <S.Thumbnail src={thumbnail} alt={title} />}
        <S.TextSection>
          <S.Title>{title}</S.Title>
          <S.PhotoCount>{photoCount}</S.PhotoCount>
        </S.TextSection>
      </S.InfoContainer>
      <S.RadioButton isSelected={isSelected} />
    </S.Container>
  );
};

export default AlbumRow;
