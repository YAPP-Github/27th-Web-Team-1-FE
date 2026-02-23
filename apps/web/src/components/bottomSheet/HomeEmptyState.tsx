import Image from 'next/image';
import * as S from './HomeEmptyState.styles';

const folder3dSrc = '/folder_3d.png';
const location3dIcon = '/location_3d.png';

interface HomeEmptyStateProps {
  onAddPhoto: () => void;
  onAddAlbum: () => void;
}

const HomeEmptyState = ({ onAddPhoto, onAddAlbum }: HomeEmptyStateProps) => {
  return (
    <S.Wrapper>
      <S.TextSection>
        <S.Title>기록이 없어요</S.Title>
        <S.Subtitle>함께 기록을 추가해볼까요?</S.Subtitle>
      </S.TextSection>
      <S.CardRow>
        <S.Card onClick={onAddPhoto}>
          <S.CardLabel>내 갤러리에서</S.CardLabel>
          <S.CardTitle>사진 추가</S.CardTitle>
          <S.IconWrapper>
            <Image src={location3dIcon} alt="사진 추가" width={68} height={65} />
          </S.IconWrapper>
        </S.Card>
        <S.Card onClick={onAddAlbum}>
          <S.CardLabel>보기 쉽게 분류할</S.CardLabel>
          <S.CardTitle>앨범 추가</S.CardTitle>
          <S.IconWrapper>
            <Image src={folder3dSrc} alt="앨범 추가" width={66} height={56} />
          </S.IconWrapper>
        </S.Card>
      </S.CardRow>
    </S.Wrapper>
  );
};

export default HomeEmptyState;
