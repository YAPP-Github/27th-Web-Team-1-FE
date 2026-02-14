'use client';

import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <S.PinButton onClick={onClick} type="button" aria-label="핀 상세 보기">
        <S.ImageWrapper>
          <S.StyledImage src={imageUrl} alt="pin-location" />
          {imageCount > 1 && <S.Badge>{imageCount}</S.Badge>}
        </S.ImageWrapper>
        <S.Tail />
      </S.PinButton>
    </motion.div>
  );
};

export default ImagePin;
