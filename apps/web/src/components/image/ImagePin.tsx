import * as S from './ImagePin.styles';

interface ImagePinProps {
  /** 이미지 경로 */
  imageUrl: string;
  /** 이미지 개수 */
  imageCount: number;
  /** 클릭 이벤트 */
  onClick?: () => void;
}

const ImagePin = ({ imageUrl, imageCount, onClick }: ImagePinProps) => {
  return (
    <S.PinButton onClick={onClick} type="button" aria-label="핀 상세 보기">
      <S.ImageWrapper>
        <S.StyledImage src={imageUrl} alt="pin-location" />
        {imageCount > 1 && <S.Badge>{imageCount}</S.Badge>}
      </S.ImageWrapper>
      <S.Tail />
    </S.PinButton>
  );
};

export default ImagePin;
