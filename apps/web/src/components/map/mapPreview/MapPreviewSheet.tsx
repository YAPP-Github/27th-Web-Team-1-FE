'use client';

const emptyMapImage = '/empty_map.png';
import Button from '@/components/buttons/button/Button';
import ImagePin from '@/components/image/ImagePin';
import Image from 'next/image';
import * as S from './MapPreviewSheet.styles';

interface MapPreviewSheetProps {
  isOpen: boolean;
  photoUrl: string;
  onClose: () => void;
}

export default function MapPreviewSheet({
  isOpen,
  photoUrl,
  onClose,
}: MapPreviewSheetProps) {
  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.SheetWrapper>
        <S.HandleBar>
          <div className="handle" />
        </S.HandleBar>

        <S.TitleSection>
          <S.Title>지도뷰 미리보기</S.Title>
          <S.Subtitle>업로드한 사진이 이렇게 표시됩니다.</S.Subtitle>
        </S.TitleSection>

        <S.MapArea>
          <Image src={emptyMapImage} alt="지도" fill style={{ objectFit: 'cover' }} />
          <S.PinContainer>
            <ImagePin imageUrl={photoUrl} imageCount={1} />
          </S.PinContainer>
        </S.MapArea>

        <S.ButtonWrapper>
          <Button text="완료" onClick={onClose} variant="highlight" size="large" />
        </S.ButtonWrapper>
      </S.SheetWrapper>
    </S.Overlay>
  );
}
