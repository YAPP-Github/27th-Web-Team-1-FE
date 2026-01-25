import { useState, type MouseEvent } from 'react';
import * as S from './PhotoGridItem.styles';

export interface PhotoGridItemProps {
  /** 이미지 alt 텍스트 */
  alt?: string;
  /** 이미지 src URL */
  src: string;
  /** ISO 8601 형식의 날짜 문자열 (있으면 배지 표시) */
  date?: string;
  /** 클릭 이벤트 */
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const PhotoGridItem = ({ alt = '', src, date, onClick }: PhotoGridItemProps) => {
  const [hasError, setHasError] = useState(false);

  const dateObj = date ? new Date(date) : null;
  const day = dateObj?.getDate();
  const month = dateObj ? dateObj.getMonth() + 1 : null;

  const showFallback = hasError || !src;

  return (
    <S.Container type="button" onClick={onClick}>
      {showFallback ? (
        <S.Fallback>{alt}</S.Fallback>
      ) : (
        <S.Photo src={src} alt={alt} onError={() => setHasError(true)} />
      )}
      {dateObj && (
        <S.DateBadge>
          <S.Day>{day}</S.Day>
          <S.Month>{month}월</S.Month>
        </S.DateBadge>
      )}
    </S.Container>
  );
};

export default PhotoGridItem;
